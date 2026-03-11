import Link from 'next/link'
import QRGenerator from '@/components/QRGenerator'
import PremiumBanner from '@/components/PremiumBanner'
import AdBanner from '@/components/AdBanner'
import { getSessionId } from '@/lib/session'
import { checkPremiumStatus } from '@/lib/premium'
import {
  QrCode,
  Link2,
  FileText,
  Phone,
  Mail,
  ChevronRight,
  ListOrdered,
  Pencil,
  Zap,
  Download,
  HelpCircle,
} from 'lucide-react'

export default async function Home() {
  const sessionId = await getSessionId()
  const isPremium = await checkPremiumStatus(sessionId || null)

  return (
    <main className="min-h-screen bg-editor bg-subtle-pattern">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        {/* Hero */}
        <header className="text-center mb-14 md:mb-16">
          <div className="animate-in-1 flex justify-center mb-4">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-editor-accent/20 text-editor-accent border border-editor-accent/30 transition-transform duration-300 hover:scale-110">
              <QrCode className="w-8 h-8" strokeWidth={1.8} />
            </span>
          </div>
          <h1 className="animate-in-2 font-mono text-5xl md:text-6xl font-medium text-editor-text mb-4 tracking-tight">
            <span className="text-[#cccccc]">ZeoQR</span>
          </h1>
          <p className="animate-in-3 text-editor-muted font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Anında QR kod oluşturun. Ücretsiz, giriş gerektirmez. URL, metin, telefon veya e-posta için tek tıkla QR kod oluşturup PNG olarak indirin.
          </p>
        </header>

        {/* ZeoQR Nedir */}
        <section className="mb-16 max-w-3xl mx-auto animate-in-2">
          <h2 className="font-mono text-2xl font-medium text-editor-text mb-4 tracking-tight">
            ZeoQR Nedir?
          </h2>
          <div className="bg-editor-sidebar rounded-lg border border-editor-border shadow-card p-6 md:p-8 transition-all duration-300 hover:shadow-card-hover hover:border-editor-accent/30">
            <p className="text-editor-text/90 leading-relaxed mb-4 font-light">
              ZeoQR, web siteleri, iletişim bilgileri veya kısa metinler için anında QR kod üreten ücretsiz bir araçtır. Hesap açmadan, tarayıcınızda çalışır; oluşturduğunuz QR kodları PNG görsel olarak indirip baskı, kartvizit, menü veya dijital içeriklerinizde kullanabilirsiniz.
            </p>
            <p className="text-editor-text/90 leading-relaxed font-light">
              QR kodlar, akıllı telefon kamerasıyla taranarak kullanıcıyı bir web sayfasına, metne, arama ekranına veya e-posta taslağına yönlendirir. İşletmeler, etkinlikler ve günlük kullanım için pratik bir çözüm sunar.
            </p>
            <p className="mt-4">
              <Link
                href="/rehber"
                className="inline-flex items-center gap-1.5 text-editor-accent hover:underline font-medium text-sm transition-all duration-300 hover:gap-2"
              >
                QR kod rehberi
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </p>
          </div>
        </section>

        {/* Premium Banner */}
        {!isPremium && <PremiumBanner />}

        {/* QR Generator */}
        <QRGenerator isPremium={isPremium} />

        {/* Ad Banner - sadece NEXT_PUBLIC_ADS_PROVIDER=adsense ve onay sonrası gösterilir */}
        {!isPremium && <AdBanner position="below-result" />}
        {/* QR Kod Türleri */}
        <section className="mt-20 mb-16">
          <h2 className="font-mono text-2xl font-medium text-editor-text mb-8 text-center tracking-tight animate-in-3">
            Hangi Tür QR Kodlar Oluşturabilirsiniz?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Link2, title: 'URL / Web adresi', desc: 'Herhangi bir web adresini QR koda çevirir. Tarandığında kullanıcı o sayfayı açar. Restoran menüsü, kampanya sayfası veya portfolyo linki için idealdir.', delay: 'animate-in-3' },
              { icon: FileText, title: 'Metin', desc: 'Kısa veya uzun metinleri QR kod olarak saklayabilirsiniz. Tarandığında metin ekranda görünür. Bilgi notu, şiir veya talimatlar için kullanılabilir.', delay: 'animate-in-4' },
              { icon: Phone, title: 'Telefon numarası', desc: 'Telefon numarası QR kodu, taranınca cihazın arama ekranını açar. Kartvizit, tabela veya müşteri hizmetleri için pratiktir.', delay: 'animate-in-5' },
              { icon: Mail, title: 'E-posta', desc: 'E-posta adresi ve isteğe bağlı konu ile QR kod oluşturulur. Taranınca e-posta istemcisi açılır. İletişim ve geri bildirim için kullanılır.', delay: 'animate-in-6' },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <div
                key={title}
                className={`group bg-editor-sidebar rounded-lg p-6 border border-editor-border border-l-4 border-l-editor-accent transition-all duration-300 hover:border-editor-accent/70 hover:scale-[1.02] hover:shadow-card-hover ${delay}`}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-editor-accent/20 text-editor-accent mb-3 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <h3 className="font-mono text-sm font-medium text-editor-text mb-2">{title}</h3>
                <p className="text-sm text-editor-muted leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nasıl Kullanılır */}
        <section className="mb-16 max-w-3xl mx-auto animate-in-4">
          <h2 className="font-mono text-2xl font-medium text-editor-text mb-6 tracking-tight">
            Nasıl Kullanılır?
          </h2>
          <div className="bg-editor-sidebar rounded-lg border border-editor-border shadow-card p-6 md:p-8 transition-all duration-300 hover:shadow-card-hover">
            <ol className="space-y-5">
              {[
                { num: 1, icon: ListOrdered, title: 'Tür seçin', desc: 'URL, metin, telefon veya e-posta seçeneğinden birini işaretleyin.' },
                { num: 2, icon: Pencil, title: 'İçeriği girin', desc: 'İlgili alana web adresi, metin, telefon numarası veya e-posta adresinizi yazın.' },
                { num: 3, icon: Zap, title: 'Oluştur', desc: '"QR Kod Oluştur" butonuna tıklayın. Kod anında ekranda belirir.' },
                { num: 4, icon: Download, title: 'İndir', desc: 'PNG olarak indirip baskı veya dijital materyallerinizde kullanın.' },
              ].map((step) => {
                const StepIcon = step.icon
                return (
                <li key={step.num} className="flex gap-4 text-editor-text/90 font-light leading-relaxed group/item">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-editor-accent/20 text-editor-accent flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-editor-accent/30">
                    <StepIcon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="font-medium text-editor-text">{step.title}:</span> {step.desc}
                  </span>
                </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* SSS */}
        <section className="mb-20 max-w-3xl mx-auto animate-in-5">
          <h2 className="font-mono text-2xl font-medium text-editor-text mb-6 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-editor-accent" strokeWidth={1.8} />
            Sıkça Sorulan Sorular
          </h2>
          <div className="bg-editor-sidebar rounded-lg border border-editor-border shadow-card p-6 md:p-8 transition-all duration-300 hover:shadow-card-hover">
            <ul className="space-y-6">
              <li className="border-b border-editor-border pb-6 last:border-0 last:pb-0 transition-colors duration-300 hover:text-editor-text">
                <h3 className="font-mono text-sm font-medium text-editor-text mb-2">ZeoQR ücretsiz mi?</h3>
                <p className="text-sm text-editor-muted leading-relaxed font-light">
                  Evet. Temel QR kod oluşturma (URL, metin, telefon, e-posta) tamamen ücretsizdir. Giriş yapmanız gerekmez. Premium planlarla reklamsız deneyim, logo ekleme ve toplu üretim gibi ek özellikler sunulur.
                </p>
              </li>
              <li className="border-b border-editor-border pb-6 last:border-0 last:pb-0">
                <h3 className="font-mono text-sm font-medium text-editor-text mb-2">Oluşturduğum QR kodlar ne kadar süre geçerli?</h3>
                <p className="text-sm text-editor-muted leading-relaxed font-light">
                  QR kod görseli kalıcıdır. URL türünde, hedef linki değiştirmediğiniz sürece aynı QR kodu kullanmaya devam edebilirsiniz. Metin, telefon ve e-posta kodları da süresiz kullanılabilir.
                </p>
              </li>
              <li className="border-b border-editor-border pb-6 last:border-0 last:pb-0">
                <h3 className="font-mono text-sm font-medium text-editor-text mb-2">QR kodumu nasıl test ederim?</h3>
                <p className="text-sm text-editor-muted leading-relaxed font-light">
                  Akıllı telefonunuzun kamera uygulaması veya bir QR okuyucu uygulamasıyla kodu tarayın. Doğru sayfaya, metne veya arama ekranına yönlendirildiğinizi kontrol edin.
                </p>
              </li>
            </ul>
            <p className="mt-6 pt-4 border-t border-editor-border">
              <Link
                href="/sss"
                className="inline-flex items-center gap-1.5 text-editor-accent hover:underline font-medium text-sm transition-all duration-300 hover:gap-2"
              >
                Tüm SSS sayfası
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
