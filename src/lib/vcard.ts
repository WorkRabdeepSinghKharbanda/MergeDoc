export type ContactInfo = { name: string; org?: string; phone?: string; email?: string; url?: string }

export function buildVCard(contact: ContactInfo): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contact.name}`,
    contact.org ? `ORG:${contact.org}` : '',
    contact.phone ? `TEL:${contact.phone}` : '',
    contact.email ? `EMAIL:${contact.email}` : '',
    contact.url ? `URL:${contact.url}` : '',
    'END:VCARD',
  ]
  return lines.filter(Boolean).join('\n')
}
