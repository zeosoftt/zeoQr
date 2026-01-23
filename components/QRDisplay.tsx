'use client'

interface QRDisplayProps {
  dataUrl: string
}

export default function QRDisplay({ dataUrl }: QRDisplayProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <img
          src={dataUrl}
          alt="Generated QR Code"
          className="w-72 h-72"
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center font-light">
        Scan with any QR code reader
      </p>
    </div>
  )
}
