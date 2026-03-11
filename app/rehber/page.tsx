import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowLeft, Link2, FileText, CheckCircle2, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'QR Kod Rehberi',
  description: 'QR kod nedir, nerede kullanılır, en iyi uygulamalar. URL, metin, telefon ve e-posta QR kodları hakkında rehber.',
  openGraph: {
    title: 'QR Kod Rehberi | ZeoQR',
    description: 'QR kod türleri, kullanım alanları ve oluşturma ipuçları.',
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://zeoqr.com'}/rehber`,
    type: 'article',
    locale: 'tr_TR',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://zeoqr.com'}/rehber`,
  },
}

export default function RehberPage() {
  return (
    <main className="min-h-screen bg-editor">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <header className="mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-editor-accent/20 text-editor-accent border border-editor-accent/30 mb-4 transition-transform duration-300 hover:scale-105">
            <BookOpen className="w-7 h-7" strokeWidth={1.8} />
          </div>
          <h1 className="font-mono text-4xl md:text-5xl font-medium text-editor-text mb-4 tracking-tight">
            QR Kod Rehberi
          </h1>
          <p className="text-editor-muted font-light text-lg">
            QR kodların ne olduğu, nerede kullanıldığı ve nasıl etkili kullanılacağı hakkında kısa rehber.
          </p>
        </header>

        <div className="max-w-none space-y-8 text-editor-text/90 font-light leading-relaxed">
          <section className="transition-all duration-300 hover:opacity-100">
            <h2 className="font-mono text-xl font-medium text-editor-text mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-editor-accent/20 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-editor-accent" strokeWidth={1.8} />
              </span>
              QR Kod Nedir?
            </h2>
            <p>
              QR kod (Quick Response code), kare bir matris içinde bilgi taşıyan 2B bir barkoddur. Akıllı telefon veya tablet kamerasıyla taranarak anında web sayfası açma, metin görüntüleme, arama başlatma veya e-posta taslağı oluşturma gibi işlemler yapılabilir. Günlük hayatta menüler, kartvizitler, afişler ve dijital ödeme noktalarında sıkça karşımıza çıkar.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xl font-medium text-editor-text mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-editor-accent/20 flex items-center justify-center">
                <FileText className="w-4 h-4 text-editor-accent" strokeWidth={1.8} />
              </span>
              QR Kod Türleri ve Kullanım Alanları
            </h2>
            <p className="mb-4">
              ZeoQR ile dört tür QR kod oluşturabilirsiniz; her biri farklı ihtiyaçlara hitap eder.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-editor-text">URL / Web adresi:</strong> Kullanıcıyı bir web sayfasına yönlendirir. Restoran dijital menüsü, etkinlik kayıt sayfası, ürün kampanya sayfası veya portfolyo linki için idealdir. Linki değiştirmeden aynı QR kodu uzun süre kullanabilirsiniz.</li>
              <li><strong className="text-editor-text">Metin:</strong> Kısa veya uzun metin saklar. Tarandığında metin ekranda görünür. Bilgi notları, tebrik mesajları, talimatlar veya şiir paylaşmak için kullanılabilir.</li>
              <li><strong className="text-editor-text">Telefon numarası:</strong> Taranınca cihazın arama ekranını açar. Kartvizit, mağaza tabelası veya müşteri hizmetleri için pratiktir.</li>
              <li><strong className="text-editor-text">E-posta:</strong> E-posta adresi ve isteğe bağlı konu ile QR kod oluşturulur. Taranınca e-posta istemcisi açılır. İletişim ve geri bildirim toplama için uygundur.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-xl font-medium text-editor-text mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-editor-accent/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-editor-accent" strokeWidth={1.8} />
              </span>
              QR Kod Oluştururken Dikkat Edilecekler
            </h2>
            <p className="mb-4">
              Kaliteli bir kullanıcı deneyimi ve güvenilir sonuç için şu noktalara dikkat edin.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-editor-text">Hedef URL geçerli olsun:</strong> URL tipi kullanıyorsanız, linkin çalıştığından ve mobil uyumlu bir sayfaya gittiğinden emin olun.</li>
              <li><strong className="text-editor-text">Boyut ve kontrast:</strong> QR kodu baskıda veya ekranda yeterince büyük ve net gösterin; arka planla yeterli kontrast olmalı.</li>
              <li><strong className="text-editor-text">Test edin:</strong> Yayınlamadan önce farklı cihazlarla tarayıp doğru sayfaya, metne veya arama ekranına gittiğini kontrol edin.</li>
              <li><strong className="text-editor-text">Kısa açıklama ekleyin:</strong> QR kodun yanına &quot;Menüyü görmek için tarayın&quot; gibi kısa bir cümle koymak kullanımı kolaylaştırır.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-xl font-medium text-editor-text mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-editor-accent/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-editor-accent" strokeWidth={1.8} />
              </span>
              Neden ZeoQR?
            </h2>
            <p>
              ZeoQR, hesap açmadan tarayıcıda çalışan ücretsiz bir QR kod oluşturucudur. URL, metin, telefon ve e-posta için anında kod üretir, PNG olarak indirirsiniz. İsterseniz premium ile reklamsız deneyim, logo ekleme, özel renkler ve toplu üretim gibi ek özelliklerden yararlanabilirsiniz. Tüm temel işlemler ücretsiz ve gizlilik odaklıdır.
            </p>
          </section>
        </div>

        <footer className="mt-12 pt-8 border-t border-editor-border">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-editor-accent hover:underline font-medium font-mono transition-all duration-300 hover:gap-3"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Ana sayfaya dön, QR kod oluştur
          </Link>
        </footer>
      </article>
    </main>
  )
}
