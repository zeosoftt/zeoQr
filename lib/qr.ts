import QRCode from 'qrcode'
import crypto from 'crypto'

export type QRType = 'url' | 'text' | 'phone' | 'email'

export interface QROptions {
  type: QRType
  content: string
  logoUrl?: string
  colorDark?: string
  colorLight?: string
}

export function generateQRHash(content: string, type: QRType): string {
  return crypto.createHash('sha256').update(`${type}:${content}`).digest('hex').substring(0, 16)
}

export async function generateQRCodeDataURL(options: QROptions): Promise<string> {
  const { content, logoUrl, colorDark, colorLight } = options

  const qrOptions: QRCode.QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
    color: {
      dark: colorDark || '#000000',
      light: colorLight || '#FFFFFF',
    },
    width: 512,
  }

  if (logoUrl) {
    // For MVP, we'll handle logo overlay in the frontend
    // This is a simplified version - production would need image processing
    qrOptions.errorCorrectionLevel = 'H' // Higher error correction for logo
  }

  return QRCode.toDataURL(content, qrOptions)
}

export function formatContentForQR(type: QRType, content: string): string {
  switch (type) {
    case 'url':
      return content.startsWith('http') ? content : `https://${content}`
    case 'phone':
      return `tel:${content.replace(/\D/g, '')}`
    case 'email':
      return `mailto:${content}`
    case 'text':
    default:
      return content
  }
}
