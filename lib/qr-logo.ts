// Utility for overlaying logo on QR code (client-side)
// This is a simplified MVP version - production should use proper image processing

export async function overlayLogoOnQR(
  qrDataUrl: string,
  logoDataUrl: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const qrImg = new Image()
    const logoImg = new Image()

    qrImg.onload = () => {
      logoImg.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        canvas.width = qrImg.width
        canvas.height = qrImg.height

        // Draw QR code
        ctx.drawImage(qrImg, 0, 0)

        // Calculate logo size (20% of QR code size)
        const logoSize = Math.min(qrImg.width, qrImg.height) * 0.2
        const logoX = (qrImg.width - logoSize) / 2
        const logoY = (qrImg.height - logoSize) / 2

        // Draw white background for logo
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(
          logoX - 4,
          logoY - 4,
          logoSize + 8,
          logoSize + 8
        )

        // Draw logo
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)

        resolve(canvas.toDataURL('image/png'))
      }
      logoImg.onerror = () => reject(new Error('Failed to load logo'))
      logoImg.src = logoDataUrl
    }
    qrImg.onerror = () => reject(new Error('Failed to load QR code'))
    qrImg.src = qrDataUrl
  })
}
