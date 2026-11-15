# AI Project Manager

Bu dosya, projeye yeni bir oturumda devam etmek için güncel yapıyı, kabul edilen tasarım kararlarını ve bu sohbet boyunca yapılan çalışmaları kaydeder. Son güncelleme 15 Kasım 2026.

## Güncel uygulama

- AI ve yazılım projelerini ekleme, düzenleme, silme ve takip etme uygulaması. React 19, Vite 8, Tailwind CSS 4 ve JavaScript/JSX kullanır.
- Arayüz dili İngilizce. Tek ana ekran **Projects**. Liste en yeni projeden başlayarak sıralanır. Arama proje adı ve açıklamayı kapsar. Durum sekmeleri ile kategori ve öncelik filtreleri birlikte kullanılabilir.
- Kartlar proje adını, kategoriyi, durumu ve önceliği gösterir. **Show details** düğmesi açıklamayı ve kullanılan teknolojileri kartın içinde açar. Proje ekleme ve düzenleme formu ayrı bir pencerede açılır. Silme işlemi onay ister.
- Veriler tarayıcıdaki `ai-project-manager-projects` LocalStorage anahtarında saklanır. İlk açılışta örnek kayıtlar yüklenir. Yerel önizleme ve Netlify farklı adreslerden çalıştığı için tarayıcı kayıtları ayrı tutulur.
- Proje alanları `id`, `title`, `description`, `category`, `technologies`, `status`, `priority` ve `createdAt`. Durumlar **Başlanmadı**, **Devam Ediyor**, **Tamamlandı**. Öncelikler **Düşük**, **Orta**, **Yüksek**. Bu değerler eski kayıtlarla uyum için Türkçe saklanır; arayüzde `PROJECT_STATUS_LABELS` ve `PROJECT_PRIORITY_LABELS` ile İngilizce gösterilir.

## Dosya haritası

| Dosya | Sorumluluğu |
| --- | --- |
| [src/main.jsx](src/main.jsx) | React giriş noktası ve ana stil dosyasının yüklenmesi |
| [src/App.jsx](src/App.jsx) | Proje listesinin durumu ve ekleme, güncelleme, silme işlemlerinin bağlanması |
| [src/pages/Projects/Projects.jsx](src/pages/Projects/Projects.jsx) | Projeler ekranı, sıralama, arama, filtreler ve form pencereleri |
| [src/components/ProjectCard/ProjectCard.jsx](src/components/ProjectCard/ProjectCard.jsx) | Proje kartı, durum ve öncelik etiketleri, açılır açıklama |
| [src/components/ProjectForm/ProjectForm.jsx](src/components/ProjectForm/ProjectForm.jsx) | Ekleme ve düzenleme formu |
| [src/components/Modal/Modal.jsx](src/components/Modal/Modal.jsx) | Yerel `dialog` öğesi, Escape ile kapatma ve odağı açan öğeye geri verme |
| [src/interfaces/project.js](src/interfaces/project.js) | Veri modeli, geçerli kategori, durum ve öncelik değerleri |
| [src/services/localStorage.js](src/services/localStorage.js) | Okuma, doğrulama, örnek kayıtlar ve kaydetme işlemleri |
| [src/tokens.css](src/tokens.css), [src/base.css](src/base.css) | Renk, yazı, boşluk ve süre değişkenleri; temel sıfırlama stilleri |
| [src/index.css](src/index.css) | Bileşen stilleri ve mobil yerleşim |
| [index.html](index.html), [public/favicon.svg](public/favicon.svg) | İngilizce sayfa dili, Google Fonts, tarayıcı tema rengi ve klasör simgesi |

## Kabul edilen tasarım

- **Console** teması: grafit zemin (`--color-paper`), amber vurgu (`--color-accent`). Yazılar Host Grotesk, sayılar Atkinson Hyperlegible Mono.
- Projeler çizgilerle ayrılmış kompakt bir liste (register) halindedir. Durum, başlığın solunda renkli bir nokta; öncelik başlığın yanında etikettir. Kategori ve teknolojiler **Show details** alanında görünür.
- Kontroller en az 44px dokunma alanına sahiptir. Durum sekmeleri dar ekranda yatay kaydırılır.
- Renk ve yerleşim değişikliklerinde `src/tokens.css` içindeki değişkenleri ve `src/index.css` içindeki bileşenleri kullan. Veri modeli değişirse mevcut tarayıcı kayıtlarıyla uyumluluğunu kontrol et.

## Yapılan çalışmalar

1. **31 Ekim 2026 — Tek proje ekranına geçiş.** Açılış proje listesine taşındı. Sürekli açık form pencereye alındı, ek filtreler isteğe bağlı açılır hale geldi. Sonraki düzenlemelerde Genel Bakış sekmesi, açık tema ve tema düğmesi kaldırıldı. Proje adlarının yanındaki harf kutuları kaldırıldı, durum etiketleri renklendirildi ve öncelik durumun yanına taşındı. Tarayıcı simgesi sade bir klasörle değiştirildi. Bu sürüm `76c2103` ile GitHub ve Netlify’a gönderildi.
2. **Krem ve turuncu panel denemesi.** Özet kartları, iki sütunlu liste ve proje düzenleyici ile bitiş tarihi, ilerleme ve görev takibi yerelde denendi. Mevcut kayıtlarla uyumluluk ve kaydedilmemiş değişiklik uyarısı test edildi. Kullanıcı eski tasarıma dönmeyi istediği için prototip ve ona ait testler geri alındı. Prototip canlıya çıkmadı.
3. **Kartların ayrılması ve açıklamaların gizlenmesi.** Kartlar arasında boşluk ve belirgin kenarlık eklendi, başlıklar güçlendirildi. Açıklama ve teknoloji listesi açılır alana taşındı.
4. **Palet ve terminal denemeleri.** Önce petrol, turkuaz ve mint paleti denendi. Terminal görünümüne geçildikten sonra bordo, çelik mavisi ve altın paleti uygulandı. Kullanıcı bordo zemini beğenmeyince düz siyah, füme ve altın paleti seçildi.
5. **9 Kasım 2026 — Terminal sürümü canlıda.** Son tasarım `bea0970` commit’iyle `main` dalına gönderildi. Lint ve üretim derlemesi geçti. Netlify’ın canlı sayfada yeni JS ve CSS dosyalarını sunduğu doğrulandı. Yerel geliştirme sunucusu daha sonra kullanıcının isteğiyle kapatıldı.
6. **15 Kasım 2026 — İngilizce arayüz ve Console tasarımı.** Terminal teması yerine grafit ve amber tonlu kompakt liste tasarımına geçildi. Tüm arayüz metinleri İngilizceye çevrildi; saklanan durum ve öncelik değerleri değişmedi.

## Çalıştırma ve yayın

| Komut | Kullanım |
| --- | --- |
| `npm install` | Bağımlılıklar eksikse kur |
| `npm run dev -- --host 127.0.0.1` | Yerel geliştirme sunucusunu başlat. Varsayılan adres `http://127.0.0.1:5173/` |
| `npm run lint` | ESLint kontrolünü çalıştır |
| `npm run build` | Üretim dosyalarını `dist/` klasörüne derle |
| `npm run preview` | Derlenmiş sürümü yerelde önizle |

- GitHub deposu [burakkyildiz/ai-project-manager](https://github.com/burakkyildiz/ai-project-manager). Uzak depo `origin`, üretim dalı `main`.
- Netlify otomatik yayını `main` dalına gönderilen commit’lerle tetiklenir. Son doğrulanan yayın `bea0970`. [Canlı uygulama](https://aiproject-manager.netlify.app/)
- Arayüz değişikliklerini masaüstü ve dar ekranda kontrol et. Açılır açıklama, durum filtreleri ve düzenleme penceresi kart görünümünü doğrulamak için temel akışlardır.
