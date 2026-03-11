'use client'

interface QRDisplayProps {
  dataUrl: string
}

export default function QRDisplay({ dataUrl }: QRDisplayProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-editor-surface p-6 rounded-lg border border-editor-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dataUrl}
          alt="Generated QR Code"
          className="w-72 h-72"
        />
      </div>
      <p className="text-xs text-editor-muted text-center font-light font-mono">
        Herhangi bir QR kod okuyucu ile tarayın
      </p>
    </div>
  )
}
