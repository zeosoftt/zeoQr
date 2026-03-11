'use client'

interface PremiumFeaturesProps {
  logoUrl: string | null
  colorDark: string
  colorLight: string
  onLogoChange: (url: string | null) => void
  onColorDarkChange: (color: string) => void
  onColorLightChange: (color: string) => void
}

export default function PremiumFeatures({
  logoUrl,
  colorDark,
  colorLight,
  onLogoChange,
  onColorDarkChange,
  onColorLightChange,
}: PremiumFeaturesProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // For MVP, we'll use a simple file reader
      // In production, upload to cloud storage and get URL
      const reader = new FileReader()
      reader.onload = (event) => {
        onLogoChange(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="border-t border-editor-border pt-6 space-y-4">
      <h3 className="font-mono text-sm font-medium text-editor-text">
        Özelleştirme
      </h3>

      <div>
        <label className="block text-xs font-medium text-editor-muted mb-2">
          Logo (isteğe bağlı)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="block w-full text-xs text-editor-muted file:mr-4 file:py-2 file:px-3 file:rounded file:border file:border-editor-border file:text-xs file:font-medium file:bg-editor-surface file:text-editor-text"
        />
        {logoUrl && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt="Logo preview" className="w-12 h-12 object-contain rounded" />
            <button
              onClick={() => onLogoChange(null)}
              className="mt-1 text-xs text-editor-muted hover:text-editor-text"
            >
              Kaldır
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-editor-muted mb-2">
            Koyu
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={colorDark}
              onChange={(e) => onColorDarkChange(e.target.value)}
              className="w-12 h-9 rounded border border-editor-border cursor-pointer"
            />
            <input
              type="text"
              value={colorDark}
              onChange={(e) => onColorDarkChange(e.target.value)}
              className="flex-1 px-2 py-1.5 text-xs border border-editor-border rounded bg-editor-surface text-editor-text focus:ring-2 focus:ring-editor-accent/40 placeholder:text-editor-muted"
              placeholder="#000000"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-editor-muted mb-2">
            Açık
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={colorLight}
              onChange={(e) => onColorLightChange(e.target.value)}
              className="w-12 h-9 rounded border border-editor-border cursor-pointer"
            />
            <input
              type="text"
              value={colorLight}
              onChange={(e) => onColorLightChange(e.target.value)}
              className="flex-1 px-2 py-1.5 text-xs border border-editor-border rounded bg-editor-surface text-editor-text focus:ring-2 focus:ring-editor-accent/40 placeholder:text-editor-muted"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
