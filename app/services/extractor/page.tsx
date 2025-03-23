'use client'

import { Container, Overlay } from '@/components'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect, useRef } from 'react'
import NextImage from 'next/image'
import styles from './page.module.scss'
import { Button } from '@/ui'
import { ImageUploadIcon } from '@/public/icons'
import Notification from '@/ui/notification/notification'
import { useStore } from '@/app/hooks/useStore'

type FormValues = {
    file: FileList | null
}

// Updated ColorResult type to include frequency
type ColorResult = {
    color: string
    position: { x: number; y: number }
    frequency?: number // Percentage of pixels with this color
}

/**
 * Extracts the most common colors from an image and their positions
 * @param imageSrc - URL or base64 string of the image
 * @param colorCount - Number of colors to extract (defaults to 10)
 * @returns Promise resolving to array of the most common colors with their positions
 */
function getCommonColors(
    imageSrc: string,
    colorCount: number = 10
): Promise<ColorResult[]> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous' // Enable CORS if the image is from another domain

        img.onload = () => {
            // Create canvas to draw and analyze the image
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                reject(new Error('Could not get canvas context'))
                return
            }

            // Set canvas dimensions to match image
            canvas.width = img.width
            canvas.height = img.height

            // Draw image to canvas
            ctx.drawImage(img, 0, 0)

            // Get pixel data from canvas
            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            )
            const pixels = imageData.data

            // Map to store color frequencies and their first occurrence position
            const colorMap: Map<
                string,
                {
                    count: number
                    position: { x: number; y: number }
                    rgb: number[]
                }
            > = new Map()

            // Option to quantize colors for more variety
            const quantizationLevel = colorCount > 50 ? 16 : 8 // Increased quantization levels

            // Process each pixel (RGBA values come in groups of 4)
            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i]
                const g = pixels[i + 1]
                const b = pixels[i + 2]

                // Quantize colors if needed to get more distinct colors
                const quantizedR =
                    Math.floor(r / quantizationLevel) * quantizationLevel
                const quantizedG =
                    Math.floor(g / quantizationLevel) * quantizationLevel
                const quantizedB =
                    Math.floor(b / quantizationLevel) * quantizationLevel

                // Convert RGB to HEX
                const hex = rgbToHex(quantizedR, quantizedG, quantizedB)

                // Calculate x and y coordinates of the pixel
                const pixelIndex = i / 4
                const x = pixelIndex % canvas.width
                const y = Math.floor(pixelIndex / canvas.width)

                // If color already exists in map, increment its count
                // Otherwise, add new entry with count 1 and store position
                if (colorMap.has(hex)) {
                    const data = colorMap.get(hex)!
                    colorMap.set(hex, {
                        count: data.count + 1,
                        position: data.position, // Keep the first occurrence position
                        rgb: [quantizedR, quantizedG, quantizedB],
                    })
                } else {
                    colorMap.set(hex, {
                        count: 1,
                        position: { x, y },
                        rgb: [quantizedR, quantizedG, quantizedB],
                    })
                }
            }

            // Convert map to array and sort by frequency (count)
            const sortedColors = Array.from(colorMap.entries())
                .sort((a, b) => b[1].count - a[1].count)
                .map(([color, data]) => ({
                    color,
                    position: data.position,
                    frequency:
                        (data.count / (canvas.width * canvas.height)) * 100,
                    rgb: data.rgb,
                }))

            // Filter colors to ensure diversity
            const diverseColors: typeof sortedColors = []
            const colorDistanceThreshold = 60 // Threshold for color distance (higher means more diverse)

            for (const color of sortedColors) {
                if (diverseColors.length >= colorCount) break

                // Check if this color is significantly different from already selected colors
                const isDiverse = diverseColors.every((selectedColor) => {
                    const distance = getColorDistance(
                        color.rgb,
                        selectedColor.rgb
                    )
                    return distance > colorDistanceThreshold
                })

                if (isDiverse || diverseColors.length === 0) {
                    diverseColors.push(color)
                }
            }

            // If we don't have enough diverse colors, add the remaining most frequent colors
            if (diverseColors.length < colorCount) {
                const remainingColors = sortedColors
                    .filter(
                        (color) =>
                            !diverseColors.some((c) => c.color === color.color)
                    )
                    .slice(0, colorCount - diverseColors.length)

                diverseColors.push(...remainingColors)
            }

            // Remove the RGB array from the final result
            const finalColors = diverseColors.map(
                ({ color, position, frequency }) => ({
                    color,
                    position,
                    frequency,
                })
            )

            resolve(finalColors)
        }

        img.onerror = () => {
            reject(new Error('Failed to load image'))
        }

        // Set the source of the image
        img.src = imageSrc
    })
}

function getColorDistance(rgb1: number[], rgb2: number[]): number {
    const rDiff = rgb1[0] - rgb2[0]
    const gDiff = rgb1[1] - rgb2[1]
    const bDiff = rgb1[2] - rgb2[2]

    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff)
}

/**
 * Helper function to convert RGB values to HEX
 */
function rgbToHex(r: number, g: number, b: number): string {
    return (
        '#' +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex
            })
            .join('')
    )
}

export default function Page() {
    const { control, watch } = useForm<FormValues>({ mode: 'onChange' })
    const fileList = watch('file')
    const imageRef = useRef<HTMLImageElement>(null)

    const { state, dispatch } = useStore()

    const [preview, setPreview] = useState<string | null>(state.extractor.image)
    const [filename, setFilename] = useState<string | null>(null)
    const [extension, setExtension] = useState<string | null>(null)
    const [commonColors, setCommonColors] = useState<ColorResult[]>(
        state.extractor.colors
    )
    const [isProcessing, setIsProcessing] = useState(false)
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    })
    const [imageNaturalDimensions, setImageNaturalDimensions] = useState({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        dispatch({
            type: 'UPDATE_EXTRACTOR',
            payload: { image: preview, colors: commonColors },
        })
    }, [dispatch, preview, commonColors])

    const [copied, setCopied] = useState<boolean>(false)

    const divide = (filename: string): { extension: string; name: string } => {
        const dot = filename.lastIndexOf('.')
        const name = filename.slice(0, dot)
        const extension = filename.slice(dot + 1)
        return { name, extension }
    }

    // Handle image loading to get actual dimensions
    const handleImageLoad = () => {
        if (imageRef.current) {
            setImageDimensions({
                width: imageRef.current.clientWidth,
                height: imageRef.current.clientHeight,
            })
        }
    }

    useEffect(() => {
        if (fileList?.length) {
            const file = fileList[0]
            const reader = new FileReader()

            const { name, extension } = divide(file.name)
            setFilename(name)
            setExtension(extension)
            setIsProcessing(true)

            reader.onload = async (e) => {
                if (e.target?.result) {
                    const imageSrc = e.target.result.toString()
                    setPreview(imageSrc)

                    try {
                        // Create a temporary image to get the natural dimensions
                        const tempImg = new Image()
                        tempImg.src = imageSrc

                        // Wait for the image to load
                        await new Promise<void>((resolve) => {
                            tempImg.onload = () => resolve()
                        })

                        // Store the natural dimensions for scaling
                        const naturalWidth = tempImg.naturalWidth
                        const naturalHeight = tempImg.naturalHeight
                        setImageNaturalDimensions({
                            width: naturalWidth,
                            height: naturalHeight,
                        })

                        // Extract common colors from the image
                        const colors = await getCommonColors(imageSrc, 128)
                        setCommonColors(colors)
                    } catch (error) {
                        console.error('Error extracting colors:', error)
                    } finally {
                        setIsProcessing(false)
                    }
                }
            }

            reader.readAsDataURL(file)
        }
    }, [fileList])

    return (
        <Container as="main">
            <section className={styles.container}>
                <header>
                    <span>
                        {filename}
                        <span
                            className="label sm"
                            style={{
                                padding: '4px 8px',
                                backgroundColor: '#121212',
                                marginLeft: 8,
                                borderRadius: 4,
                            }}
                        >
                            {extension}
                        </span>
                    </span>
                    <div className={styles.block}>
                        <label htmlFor="file" className={styles.uploader}>
                            {preview ? (
                                <Button variant="secondary" as={'div'}>
                                    Replace
                                </Button>
                            ) : (
                                <Button variant="secondary" as={'div'}>
                                    <ImageUploadIcon />
                                    Choose a file
                                </Button>
                            )}
                            <Controller
                                name="file"
                                control={control}
                                render={({ field: { onChange, ref } }) => (
                                    <input
                                        id="file"
                                        type="file"
                                        accept="image/*"
                                        title="Hello"
                                        hidden
                                        ref={ref}
                                        onChange={(e) =>
                                            onChange(e.target.files)
                                        }
                                    />
                                )}
                            />
                        </label>
                    </div>
                </header>

                <section className={styles.content}>
                    <div className={styles.view}>
                        <Overlay
                            show={isProcessing}
                            content={<p>Processing...</p>}
                        />
                        <Notification
                            show={copied}
                            onHide={setCopied}
                            message={`Copied`}
                        />
                        {commonColors.length > 0 &&
                            preview &&
                            commonColors.map((result, index) => {
                                // Calculate the scaling factor between the natural image dimensions and the displayed dimensions
                                const scaleX =
                                    imageNaturalDimensions.width > 0
                                        ? imageDimensions.width /
                                          imageNaturalDimensions.width
                                        : 1
                                const scaleY =
                                    imageNaturalDimensions.height > 0
                                        ? imageDimensions.height /
                                          imageNaturalDimensions.height
                                        : 1

                                // Apply scaling to the position
                                const displayX = result.position.x * scaleX
                                const displayY = result.position.y * scaleY

                                return (
                                    <div
                                        key={index}
                                        style={{
                                            backgroundColor: result.color,
                                            left: `${displayX}px`,
                                            top: `${displayY}px`,
                                            boxShadow: '0 0 0 2px white',
                                        }}
                                        className={styles.color}
                                        title={`${result.color}`}
                                        onClick={() => {
                                            // Copy color code to clipboard
                                            navigator.clipboard
                                                .writeText(result.color)
                                                .then(() => {
                                                    setCopied(true)
                                                    // Optionally show a notification or alert that the color was copied
                                                })
                                                .catch((err) => {
                                                    console.error(
                                                        'Error copying color to clipboard',
                                                        err
                                                    )
                                                })
                                        }}
                                    ></div>
                                )
                            })}
                        {preview && (
                            <NextImage
                                ref={imageRef}
                                src={preview}
                                alt="Uploaded"
                                width={100}
                                height={100}
                                onLoad={handleImageLoad}
                            />
                        )}
                    </div>
                </section>
            </section>
            <p className="label muted sm">
                Сервис не сохраняет изображения и не передает их третьим лицам.
                Ваши данные в безопасности, все операции выполняются локально
            </p>
        </Container>
    )
}
