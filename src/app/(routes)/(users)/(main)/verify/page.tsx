import VerifyCertificateTemplate from "@/modules/users/certificates/templates/verify"
import type { Metadata } from "next"
import type { FC } from "react"

export const metadata: Metadata = {
  title: "Verify a certificate",
  description:
    "Check who a CertChain certificate was issued to, for which event, and by whom.",
}

const VerifyPage: FC = () => {
  return <VerifyCertificateTemplate />
}

export default VerifyPage
