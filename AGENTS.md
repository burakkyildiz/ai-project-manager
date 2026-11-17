# AI Project Manager

Bu dosya, projeye yeni bir oturumda devam etmek için güncel yapıyı, kabul edilen tasarım kararlarını ve bu sohbet boyunca yapılan çalışmaları kaydeder. Son güncelleme 17 Kasım 2026.

## Güncel uygulama

- AI ve yazılım projelerini ekleme, düzenleme, silme ve takip etme uygulaması. React 19, Vite 8, Tailwind CSS 4 ve JavaScript/JSX kullanır.
- Arayüz dili İngilizce. Tek ana ekran **Projects**. Projeler tutamacı sürükleyerek (fare, dokunma veya ↑/↓ tuşları) yeniden sıralanır. Sıra hiç değiştirilmemişse en yeni proje üstte görünür, yeni eklenen proje her zaman en üste gelir. Arama proje adı, eski açıklama ve görev metinlerini kapsar. Durum sekmeleri ile kategori ve öncelik filtreleri birlikte kullanılabilir.
- Kartlar proje adını, durumu ve önceliği gösterir. Satırın boş bir yerine ya da proje adına tıklamak (veya başlık düğmesine Enter/Space) görev listesini, kategoriyi ve kullanılan teknolojileri açıp kapatır; görev etiketleri ve detay yazıları sadece kendi genişlikleri kadardır, üzerlerine tıklamak satırı kapatmaz. Görevi olan bir proje ancak tüm görevleri bitince **Completed** olur: son görevi işaretlemek projeyi tamamlar, açık görev eklemek veya işareti kaldırmak **In progress**'e döndürür (`getStatusForTasks`); formda açık görevliyken elle Completed seçmek hata verir. Completed satırlar soluk görünür. Görevler onay kutusuyla işaretlenir, değişiklik hemen kaydedilir; düğmenin yanında `1/3 done` sayacı görünür. Formda açıklama yerine **Tasks** bölümü bulunur: görev ekleme, silme, Enter ile yeni satır, boş satırda Backspace ile silme. Proje ekleme ve düzenleme formu ayrı bir pencerede açılır. Silme işlemi onay ister.
- Veriler tarayıcıdaki `ai-project-manager-projects` LocalStorage anahtarında saklanır. Manuel sıra ayrı bir `ai-project-manager-order` anahtarında proje kimlikleri listesi olarak tutulur. İlk açılışta örnek kayıtlar yüklenir. Yerel önizleme ve Netlify farklı adreslerden çalıştığı için tarayıcı kayıtları ayrı tutulur.
- Proje alanları `id`, `title`, `description`, `tasks`, `category`, `technologies`, `status`, `priority` ve `createdAt`. `tasks` isteğe bağlıdır ve `{ id, text, done }` öğelerinden oluşur. `description` eski kayıtlar içindir: yeni ve düzenlenen projelerde boş kalır, `tasks` boşsa eski açıklamanın her satırı `getProjectTasks` ile görev gibi gösterilir. Durumlar **Başlanmadı**, **Devam Ediyor**, **Tamamlandı**. Öncelikler **Düşük**, **Orta**, **Yüksek**. Bu değerler eski kayıtlarla uyum için Türkçe saklanır; arayüzde `PROJECT_STATUS_LABELS` ve `PROJECT_PRIORITY_LABELS` ile İngilizce gösterilir.

## Dosya haritası

| Dosya | Sorumluluğu |
| --- | --- |
| [src/main.jsx](src/main.jsx) | React giriş noktası ve ana stil dosyasının yüklenmesi |
| [src/App.jsx](src/App.jsx) | Proje listesinin durumu ve ekleme, güncelleme, silme işlemlerinin bağlanması |
| [src/pages/Projects/Projects.jsx](src/pages/Projects/Projects.jsx) | Projeler ekranı, manuel sıra, arama, filtreler, görev işaretleme ve form pencereleri |
| [src/hooks/useDragReorder.js](src/hooks/useDragReorder.js) | Fare ve dokunmayla sürükleyerek sıralama, kenarda otomatik kaydırma |
| [src/components/ProjectCard/ProjectCard.jsx](src/components/ProjectCard/ProjectCard.jsx) | Proje kartı, sürükleme tutamacı, durum noktası, öncelik etiketi, açılır görev listesi |
| [src/components/ProjectForm/ProjectForm.jsx](src/components/ProjectForm/ProjectForm.jsx) | Ekleme ve düzenleme formu, görev düzenleyici |
| [src/components/Modal/Modal.jsx](src/components/Modal/Modal.jsx) | Yerel `dialog` öğesi, Escape ile kapatma ve odağı açan öğeye geri verme |
| [src/interfaces/project.js](src/interfaces/project.js) | Veri modeli, geçerli kategori, durum ve öncelik değerleri, `getProjectTasks` |
| [src/services/localStorage.js](src/services/localStorage.js) | Okuma, doğrulama, örnek kayıtlar, kaydetme ve manuel sıra işlemleri |
| [src/tokens.css](src/tokens.css), [src/base.css](src/base.css) | Renk, yazı, boşluk ve süre değişkenleri; temel sıfırlama stilleri |
| [src/index.css](src/index.css) | Bileşen stilleri ve mobil yerleşim |
| [index.html](index.html), [public/favicon.svg](public/favicon.svg) | İngilizce sayfa dili, Google Fonts, tarayıcı tema rengi ve klasör simgesi |

## Kabul edilen tasarım

- **Console** teması: grafit zemin (`--color-paper`), amber vurgu (`--color-accent`). Yazılar Host Grotesk, sayılar Atkinson Hyperlegible Mono.
- Projeler çizgilerle ayrılmış kompakt bir liste (register) halindedir. Durum, başlığın solunda renkli bir nokta; öncelik, sürükleme tutamacının altında `High` / `Medium` / `Low` etiketidir, böylece uzun başlıklar etiketi aşağı itmez. Liste üstünde proje sayısı satırı yoktur; sayı yalnızca ekran okuyucuya duyurulur. Görevler, kategori ve teknolojiler satır açılınca görünür; başlığın yanında `0/2 done` sayacı ve ok bulunur.
- Kontroller en az 44px dokunma alanına sahiptir. Durum sekmeleri dar ekranda yatay kaydırılır.
- Renk ve yerleşim değişikliklerinde `src/tokens.css` içindeki değişkenleri ve `src/index.css` içindeki bileşenleri kullan. Veri modeli değişirse mevcut tarayıcı kayıtlarıyla uyumluluğunu kontrol et.

## Yapılan çalışmalar

1. **31 Ekim 2026 — Tek proje ekranına geçiş.** Açılış proje listesine taşındı. Sürekli açık form pencereye alındı, ek filtreler isteğe bağlı açılır hale geldi. Sonraki düzenlemelerde Genel Bakış sekmesi, açık tema ve tema düğmesi kaldırıldı. Proje adlarının yanındaki harf kutuları kaldırıldı, durum etiketleri renklendirildi ve öncelik durumun yanına taşındı. Tarayıcı simgesi sade bir klasörle değiştirildi. Bu sürüm `76c2103` ile GitHub ve Netlify’a gönderildi.
2. **Krem ve turuncu panel denemesi.** Özet kartları, iki sütunlu liste ve proje düzenleyici ile bitiş tarihi, ilerleme ve görev takibi yerelde denendi. Mevcut kayıtlarla uyumluluk ve kaydedilmemiş değişiklik uyarısı test edildi. Kullanıcı eski tasarıma dönmeyi istediği için prototip ve ona ait testler geri alındı. Prototip canlıya çıkmadı.
3. **Kartların ayrılması ve açıklamaların gizlenmesi.** Kartlar arasında boşluk ve belirgin kenarlık eklendi, başlıklar güçlendirildi. Açıklama ve teknoloji listesi açılır alana taşındı.
4. **Palet ve terminal denemeleri.** Önce petrol, turkuaz ve mint paleti denendi. Terminal görünümüne geçildikten sonra bordo, çelik mavisi ve altın paleti uygulandı. Kullanıcı bordo zemini beğenmeyince düz siyah, füme ve altın paleti seçildi.
5. **9 Kasım 2026 — Terminal sürümü canlıda.** Son tasarım `bea0970` commit’iyle `main` dalına gönderildi. Lint ve üretim derlemesi geçti. Netlify’ın canlı sayfada yeni JS ve CSS dosyalarını sunduğu doğrulandı. Yerel geliştirme sunucusu daha sonra kullanıcının isteğiyle kapatıldı.
6. **15 Kasım 2026 — İngilizce arayüz ve Console tasarımı.** Terminal teması yerine grafit ve amber tonlu kompakt liste tasarımına geçildi. Tüm arayüz metinleri İngilizceye çevrildi; saklanan durum ve öncelik değerleri değişmedi. README de İngilizceye çevrildi.
7. **17 Kasım 2026 — Sıralama ve görev listesi.** Proje sayısı satırı kaldırıldı, projeler sürükleyerek sıralanır hale geldi (`a1ad849`). Öncelik etiketi tutamacın altına taşındı (`a078364`). Açıklama alanı işaretlenebilir görev listesine dönüştü, eski açıklamalar satır satır göreve çevrilerek korundu (`8e5dc69`). Ardından tüm görevler bitince otomatik Completed kuralı, soluk Completed satırı ve satıra tıklayarak açıp kapama eklendi; "Show details" düğmesi kaldırıldı.

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
