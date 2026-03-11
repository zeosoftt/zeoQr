# AdSense Politika Uyum Kontrol Listesi

Google AdSense başvurusu veya yeniden inceleme talebi öncesi aşağıdakileri kontrol edin.

## 1. Reklam gösterimi

- **Reklamlar kapalı olmalı.** Ortam değişkeni: `NEXT_PUBLIC_ADS_PROVIDER=none` (veya tanımsız).
- Head’deki AdSense script’i **doğrulama** için kalabilir; sayfada **reklam birimi (ad unit) gösterilmemeli**.
- Kod: `lib/ads.ts` varsayılanı `none`; `AdBanner` sadece `enabled` true iken reklam render eder. Başvuru/inceleme süresince `enabled` false kalmalı.

## 2. İçerik gereksinimleri

- **Yayıncı içeriği önce:** Ana sayfada “ZeoQR Nedir?” ve açıklayıcı metin, araç ve reklam alanından **önce** yer alır.
- **Minimum ve kaliteli içerik:**
  - Ana sayfa: ZeoQR nedir, QR türleri, nasıl kullanılır, SSS özeti.
  - **Rehber** (`/rehber`): QR kod rehberi (nedir, türler, ipuçları) — indekslenebilir, uzun metin.
  - **SSS** (`/sss`): Sıkça sorulan sorular.
  - **Fiyatlandırma** (`/pricing`): Plan açıklamaları.
- Tüm bu sayfalar sitemap’te ve navigasyonda olmalı.

## 3. Başvuru öncesi kontrol

- [ ] `NEXT_PUBLIC_ADS_PROVIDER` **none** veya tanımsız; sitede **hiç reklam birimi** görünmüyor.
- [ ] Ana sayfa, rehber, SSS, fiyatlandırma sayfalarında **yeterli benzersiz metin** var.
- [ ] “Yapım aşamasında” veya sadece uyarı/gezinme ekranı yok; her sayfa gerçek içerik sunuyor.
- [ ] `NEXT_PUBLIC_APP_URL` Google Search Console’daki mülk (zeoqr.com / vercel.app vb.) ile **aynı**.
- [ ] Sitemap ve robots.txt doğru; GSC’de sitemap gönderilmiş.

## 4. Onay sonrası

- AdSense onayı geldikten sonra `NEXT_PUBLIC_ADS_PROVIDER=adsense` ve `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...` ile reklamları açın.
- Rıza banner (CMP) zaten mevcut; Consent Mode v2 ile uyumlu kullanın.

## Kaynaklar

- [AdSense Program politikaları](https://support.google.com/adsense/answer/48182)
- [Minimum içerik gereksinimleri](https://support.google.com/adsense/answer/9190028)
- [Web yöneticisi kalite yönergeleri](https://developers.google.com/search/docs/essentials/spam-policies)
