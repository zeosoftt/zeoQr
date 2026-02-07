import Link from 'next/link'
import QRGenerator from '@/components/QRGenerator'
import PremiumBanner from '@/components/PremiumBanner'
import AdBanner from '@/components/AdBanner'
import { getSessionId } from '@/lib/session'
import { checkPremiumStatus } from '@/lib/premium'

export default async function Home() {
  const sessionId = await getSessionId()
  const isPremium = await checkPremiumStatus(sessionId || null)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 bg-subtle-pattern">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        {/* Hero */}
        <header className="text-center mb-14 md:mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              ZeoQR
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Anında QR kod oluşturun. Ücretsiz, giriş gerektirmez. URL, metin, telefon veya e-posta için tek tıkla QR kod oluşturup PNG olarak indirin.
          </p>
        </header>

        {/* ZeoQR Nedir - Yayıncı içeriği */}
      

        {/* Premium Banner */}
        {!isPremium && <PremiumBanner />}

        {/* QR Generator */}
        <QRGenerator isPremium={isPremium} />

        {/* Ad Banner - sadece yeterli içerik varken (ana sayfa) ve provider açıksa */}
        {!isPremium && <AdBanner position="below-result" />}
  <section className="mb-16 mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
            ZeoQR Nedir?
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card hover:shadow-card-hover transition-shadow p-6 md:p-8">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 font-light">
              ZeoQR, web siteleri, iletişim bilgileri veya kısa metinler için anında QR kod üreten ücretsiz bir araçtır. Hesap açmadan, tarayıcınızda çalışır; oluşturduğunuz QR kodları PNG görsel olarak indirip baskı, kartvizit, menü veya dijital içeriklerinizde kullanabilirsiniz.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              QR kodlar, akıllı telefon kamerasıyla taranarak kullanıcıyı bir web sayfasına, metne, arama ekranına veya e-posta taslağına yönlendirir. İşletmeler, etkinlikler ve günlük kullanım için pratik bir çözüm sunar.
            </p>
          </div>
        </section>
        {/* QR Kod Türleri - Kaliteli içerik */}
        <section className="mt-20 mb-16">
          <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-8 text-center tracking-tight">
            Hangi Tür QR Kodlar Oluşturabilirsiniz?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-card hover:shadow-card-hover transition-all duration-200 border-l-4 border-l-primary-500 dark:border-l-primary-400">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">URL / Web adresi</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                Herhangi bir web adresini QR koda çevirir. Tarandığında kullanıcı o sayfayı açar. Restoran menüsü, kampanya sayfası veya portfolyo linki için idealdir.
              </p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-card hover:shadow-card-hover transition-all duration-200 border-l-4 border-l-primary-500 dark:border-l-primary-400">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Metin</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                Kısa veya uzun metinleri QR kod olarak saklayabilirsiniz. Tarandığında metin ekranda görünür. Bilgi notu, şiir veya talimatlar için kullanılabilir.
              </p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-card hover:shadow-card-hover transition-all duration-200 border-l-4 border-l-primary-500 dark:border-l-primary-400">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Telefon numarası</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                Telefon numarası QR kodu, taranınca cihazın arama ekranını açar. Kartvizit, tabela veya müşteri hizmetleri için pratiktir.
              </p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-card hover:shadow-card-hover transition-all duration-200 border-l-4 border-l-primary-500 dark:border-l-primary-400">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">E-posta</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                E-posta adresi ve isteğe bağlı konu ile QR kod oluşturulur. Taranınca e-posta istemcisi açılır. İletişim ve geri bildirim için kullanılır.
              </p>
            </div>
          </div>
        </section>

        {/* Nasıl Kullanılır */}
        <section className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-6 tracking-tight">
            Nasıl Kullanılır?
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card hover:shadow-card-hover transition-shadow p-6 md:p-8">
            <ol className="space-y-5">
              {[
                { num: 1, title: 'Tür seçin', desc: 'URL, metin, telefon veya e-posta seçeneğinden birini işaretleyin.' },
                { num: 2, title: 'İçeriği girin', desc: 'İlgili alana web adresi, metin, telefon numarası veya e-posta adresinizi yazın.' },
                { num: 3, title: 'Oluştur', desc: '"QR Kod Oluştur" butonuna tıklayın. Kod anında ekranda belirir.' },
                { num: 4, title: 'İndir', desc: 'PNG olarak indirip baskı veya dijital materyallerinizde kullanın.' },
              ].map((step) => (
                <li key={step.num} className="flex gap-4 text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center text-sm font-medium">
                    {step.num}
                  </span>
                  <span>
                    <span className="font-medium text-gray-900 dark:text-white">{step.title}:</span> {step.desc}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SSS */}
        <section className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-6 tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card hover:shadow-card-hover transition-shadow p-6 md:p-8">
            <ul className="space-y-6">
              <li className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ZeoQR ücretsiz mi?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  Evet. Temel QR kod oluşturma (URL, metin, telefon, e-posta) tamamen ücretsizdir. Giriş yapmanız gerekmez. Premium planlarla reklamsız deneyim, logo ekleme ve toplu üretim gibi ek özellikler sunulur.
                </p>
              </li>
              <li className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Oluşturduğum QR kodlar ne kadar süre geçerli?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  QR kod görseli kalıcıdır. URL türünde, hedef linki değiştirmediğiniz sürece aynı QR kodu kullanmaya devam edebilirsiniz. Metin, telefon ve e-posta kodları da süresiz kullanılabilir.
                </p>
              </li>
              <li className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">QR kodumu nasıl test ederim?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  Akıllı telefonunuzun kamera uygulaması veya bir QR okuyucu uygulamasıyla kodu tarayın. Doğru sayfaya, metne veya arama ekranına yönlendirildiğinizi kontrol edin.
                </p>
              </li>
            </ul>
            <p className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <Link
                href="/sss"
                className="inline-flex items-center gap-1.5 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors"
              >
                Tüm SSS sayfası
                <span aria-hidden>→</span>
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
