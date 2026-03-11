import Link from 'next/link'
import { BookOpen, HelpCircle, CreditCard, Sparkles } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { href: '/rehber', label: 'Rehber', icon: BookOpen },
    { href: '/sss', label: 'SSS', icon: HelpCircle },
    { href: '/pricing', label: 'Fiyatlandırma', icon: CreditCard },
  ]

  return (
    <footer className="border-t border-editor-border bg-editor-sidebar mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm text-editor-muted font-light">
            <Sparkles className="w-4 h-4 text-editor-accent/70" strokeWidth={1.5} />
            © {currentYear} ZeoQR. Ücretsiz QR kod oluşturucu.
          </p>
          <nav className="flex items-center gap-6" aria-label="Alt menü">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-sm text-editor-muted hover:text-editor-text font-light transition-all duration-300 hover:translate-x-0.5"
              >
                <Icon className="w-4 h-4" strokeWidth={1.8} />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
