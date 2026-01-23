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
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Özelleştirme
      </h3>

      {/* Logo Upload */}
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
          Logo (isteğe bağlı)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border file:border-gray-300 dark:file:border-gray-600 file:text-xs file:font-medium file:bg-white dark:file:bg-gray-700 file:text-gray-700 dark:file:text-gray-300 hover:file:bg-gray-50 dark:hover:file:bg-gray-600"
        />
        {logoUrl && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt="Logo preview" className="w-12 h-12 object-contain rounded" />
            <button
              onClick={() => onLogoChange(null)}
              className="mt-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Kaldır
            </button>
          </div>
        )}
      </div>

      {/* Custom Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
            Koyu
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={colorDark}
              onChange={(e) => onColorDarkChange(e.target.value)}
              className="w-12 h-9 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={colorDark}
              onChange={(e) => onColorDarkChange(e.target.value)}
              className="flex-1 px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent"
              placeholder="#000000"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
            Açık
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={colorLight}
              onChange={(e) => onColorLightChange(e.target.value)}
              className="w-12 h-9 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={colorLight}
              onChange={(e) => onColorLightChange(e.target.value)}
              className="flex-1 px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
