import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular - ZeoQR',
  description: 'ZeoQR ile QR kod oluşturma, indirme, premium özellikler ve kullanım hakkında sıkça sorulan sorular ve yanıtları.',
}

const faqs = [
  {
    question: 'ZeoQR ücretsiz mi?',
    answer: 'Evet. Temel QR kod oluşturma (URL, metin, telefon, e-posta) tamamen ücretsizdir. Hesap açmanız veya giriş yapmanız gerekmez. Premium planlarla reklamsız deneyim, QR kodun içine logo ekleme, özel renkler, tarama analitiği ve toplu QR üretimi gibi ek özellikler sunulur.',
  },
  {
    question: 'Oluşturduğum QR kodlar ne kadar süre geçerli?',
    answer: 'QR kod görseli kalıcıdır. URL türünde, hedef web adresini değiştirmediğiniz sürece aynı QR kodu kullanmaya devam edebilirsiniz. Metin, telefon ve e-posta kodları da süresiz kullanılabilir. İndirdiğiniz PNG dosyası silinmedikçe kodu her zaman kullanabilirsiniz.',
  },
  {
    question: 'QR kodumu nasıl test ederim?',
    answer: 'Akıllı telefonunuzun kamera uygulaması veya herhangi bir QR okuyucu uygulamasıyla kodu tarayın. Doğru web sayfasına, metne, arama ekranına veya e-posta taslağına yönlendirildiğinizi kontrol edin. Baskı öncesi mutlaka test etmenizi öneririz.',
  },
  {
    question: 'Hangi formatlarda indirebilirim?',
    answer: 'ZeoQR, QR kodlarınızı PNG (görsel) formatında indirmenizi sağlar. PNG, baskı ve dijital kullanım için yaygın ve uyumludur. İndirdiğiniz dosyayı kartvizit, menü, afiş veya web sitenizde kullanabilirsiniz.',
  },
  {
    question: 'Premium ile neler eklenir?',
    answer: 'Premium abonelikle reklamsız kullanım, QR kodun ortasına logo ekleme, özel koyu ve açık renkler, oluşturduğunuz QR kodların tarama istatistikleri (analitik) ve CSV ile toplu QR kod üretimi özelliklerine erişirsiniz. Aylık veya yaşam boyu plan seçenekleri mevcuttur.',
  },
  {
    question: 'Verilerim güvende mi?',
    answer: 'QR kod oluştururken girdiğiniz URL, metin veya iletişim bilgileri yalnızca o anki oturumda işlenir. Hesap zorunlu olmadığı için kişisel veri toplama minimumda tutulur. Oluşturduğunuz kodlar isterseniz yalnızca cihazınıza indirilir.',
  },
]

export default function SSSPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-3 tracking-tight">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-light text-lg max-w-xl mx-auto">
            ZeoQR ile QR kod oluşturma, indirme ve premium özellikler hakkında merak ettiklerinizin yanıtları.
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <ul className="space-y-0">
            {faqs.map((faq, index) => (
              <li
                key={index}
                className={`py-6 ${index < faqs.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}
              >
                <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {faq.question}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm">
                  {faq.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
