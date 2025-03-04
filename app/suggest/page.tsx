import { Container } from '@/components'
import { Link01Icon, Mail01Icon } from '@/public/icons'
import { Button, Input } from '@/ui'

export default function Page() {
    return (
        <Container max={480} as={'main'}>
            <form>
                <Input icon={<Mail01Icon />} placeholder="example@domain.com" />
                <Input
                    label="Reference (optional)"
                    icon={<Link01Icon />}
                    placeholder="https://example.com"
                />

                <Button>Send</Button>
            </form>
        </Container>
    )
}
