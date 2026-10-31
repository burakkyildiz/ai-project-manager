import { useState } from 'react'
import { PROJECT_CATEGORIES, PROJECT_STATUSES, PROJECT_PRIORITIES } from '../../interfaces/project.js'

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => ({
    title: project?.title ?? '', description: project?.description ?? '',
    category: project?.category ?? PROJECT_CATEGORIES[0], technologies: project?.technologies.join(', ') ?? '',
    status: project?.status ?? PROJECT_STATUSES[0], priority: project?.priority ?? PROJECT_PRIORITIES[1],
  }))
  const [error, setError] = useState('')
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.description.trim()) {
      setError('Proje adını ve açıklamasını doldur.'); return
    }
    try {
      onSubmit({ ...form, title: form.title.trim(), description: form.description.trim(),
        technologies: [...new Set(form.technologies.split(',').map((item) => item.trim()).filter(Boolean))] })
    } catch {
      setError('Proje kaydedilemedi. Tarayıcı depolama alanını kontrol edip tekrar dene.')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="modal-heading"><div><p className="eyebrow">PROJE BİLGİLERİ</p>
        <h2 id="project-form-title">{project ? 'Projeyi düzenle' : 'Yeni proje'}</h2></div>
        <button type="button" className="close-button" aria-label="Formu kapat" onClick={onCancel}>×</button>
      </div>
      <div className="form-fields">
        <label htmlFor="project-title">Proje adı<input id="project-title" name="title" value={form.title} onChange={handleChange} required placeholder="Örn. Görüntü sınıflandırma" /></label>
        <label htmlFor="project-description">Açıklama<textarea id="project-description" name="description" value={form.description} onChange={handleChange} required rows="3" placeholder="Bu projeyle ne yapmak istiyorsun?" /></label>
        <div className="form-grid">
          <label htmlFor="project-status">Durum<select id="project-status" name="status" value={form.status} onChange={handleChange}>{PROJECT_STATUSES.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label htmlFor="project-priority">Öncelik<select id="project-priority" name="priority" value={form.priority} onChange={handleChange}>{PROJECT_PRIORITIES.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <label htmlFor="project-category">Kategori<select id="project-category" name="category" value={form.category} onChange={handleChange}>{PROJECT_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label htmlFor="project-technologies">Teknolojiler <span className="optional">(isteğe bağlı)</span><input id="project-technologies" name="technologies" value={form.technologies} onChange={handleChange} placeholder="Python, PyTorch, OpenCV" aria-describedby="technologies-help" /></label>
        <p id="technologies-help" className="field-help">Birden fazla teknolojiyi virgülle ayır.</p>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="modal-footer"><button type="button" className="button button-secondary" onClick={onCancel}>Vazgeç</button>
        <button type="submit" className="button button-primary">{project ? 'Değişiklikleri kaydet' : 'Proje oluştur'}</button></div>
    </form>
  )
}
