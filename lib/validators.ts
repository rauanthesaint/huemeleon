export const isURL = (link: string): boolean => {
    const pattern = new RegExp(
        '^(https?:\\/\\/)' + // protocol
            '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' + // port and path
            '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' + // query string
            '(\\#[-a-zA-Z\\d_]*)?$', // fragment locator
        'i'
    )
    return pattern.test(link)
}

export const isEmail = (email: string): boolean => {
    const pattern = new RegExp(
        '^[a-zA-Z\\d._%+-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,}$'
    )
    return pattern.test(email)
}
