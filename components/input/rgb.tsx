import { Input } from '@/ui'
import Slider from '@/ui/slider/slider'
import {
    Control,
    Controller,
    FieldValues,
    Path,
    UseFormSetValue,
    useWatch,
} from 'react-hook-form'

type ColorInputProps<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    setValue: UseFormSetValue<T>
}

export default function RGBInput<T extends FieldValues>({
    control,
    name,
    setValue,
}: ColorInputProps<T>) {
    const rgbString = useWatch({ control, name })

    const [r, g, b] = rgbString
        ? rgbString.split(' ').map((v: string) => parseInt(v) || 0)
        : [0, 0, 0]

    const handleSliderChange = (index: number, value: number) => {
        const values = [r, g, b]
        values[index] = value
        const newValue = values.join(' ') as T[typeof name]
        setValue(name, newValue)
    }

    return (
        <div>
            <Controller
                control={control}
                name={name}
                rules={{
                    required: 'RGB value is required',
                    pattern: {
                        value: /^(?:([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\s){2}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
                        message: 'Input must be in format: 0-255 0-255 0-255',
                    },
                }}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        hint={fieldState.error?.message}
                        placeholder="255 255 255"
                    />
                )}
            />

            <div style={{ marginTop: '1rem' }}>
                <Slider
                    style={{ backgroundColor: 'red' }}
                    max={255}
                    value={r}
                    onChange={(val) => handleSliderChange(0, val)}
                    label="Red"
                />
                <Slider
                    style={{ backgroundColor: 'green' }}
                    max={255}
                    value={g}
                    onChange={(val) => handleSliderChange(1, val)}
                    label="Green"
                />
                <Slider
                    style={{ backgroundColor: 'blue' }}
                    max={255}
                    value={b}
                    onChange={(val) => handleSliderChange(2, val)}
                    label="Blue"
                />
            </div>
        </div>
    )
}
