import { Container, Divider, Paper, Text, Title } from "@mantine/core"
import type { FC } from "react"
import SampleCertificate from "../components/sample-certificate"
import VerifyCertificateForm from "../components/verify-form"

const VerifyCertificateTemplate: FC = () => {
  return (
    <Container size='sm' py={60}>
      <div className='text-center mb-8'>
        <Title order={1} className='mb-3 text-3xl'>
          Verify a certificate
        </Title>
        <Text c='dimmed'>
          Paste a certificate ID or the link from a certificate to check who it
          was issued to, for which event, and by whom.
        </Text>
      </div>

      <Paper radius='md' p='xl' withBorder className='bg-white'>
        <VerifyCertificateForm size='md' autoFocus />

        <Text size='xs' c='dimmed' mt='md'>
          Anyone can verify a certificate — no account needed. The ID is the
          last part of a certificate link, for example
          <span className='font-mono'> /certificates/&lt;id&gt;</span>.
        </Text>

        <Divider my='lg' />

        <SampleCertificate />
      </Paper>
    </Container>
  )
}

export default VerifyCertificateTemplate
