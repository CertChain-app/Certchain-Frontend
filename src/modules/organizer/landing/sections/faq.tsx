"use client"
import { Accordion, AccordionItem } from "@mantine/core"

import type { FC } from "react"

const faqs = [
  {
    question: "How does cert-chain ensure certificate authenticity?",
    answer:
      "CertChain creates an immutable record of each certificate, making it tamper-proof and easily verifiable by anyone with the certificate's unique identifier.",
  },
  {
    question: "Can I customize the certificate design?",
    answer:
      "Yes, CertChain offers a range of customization options. You can add your logo, change colors, and modify layouts to match your brand identity.",
  },
  {
    question: "Is CertChain suitable for both online and offline events?",
    answer:
      "CertChain is designed to work seamlessly for both virtual and in-person events, providing flexible options for certificate issuance and verification.",
  },
  {
    question: "How long does it take to set up an event on CertChain?",
    answer:
      "With our user-friendly interface, you can set up a basic event in as little as 5 minutes. More complex events with custom features may take a bit longer, but our platform is designed for efficiency.",
  },
]

const FaqSection: FC = ({}) => {
  return (
    <section id='faq' className='bg-gray-100 py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          Frequently Asked Questions
        </h2>
        <Accordion variant='separated' className='w-full max-w-3xl mx-auto'>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <Accordion.Control>{faq.question}</Accordion.Control>
              <Accordion.Panel>{faq.answer}</Accordion.Panel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FaqSection
