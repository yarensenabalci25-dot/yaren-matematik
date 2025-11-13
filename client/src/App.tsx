import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

const defaultReviews = [
  { id: 1, name: 'Ahmet Y.', rating: 5, comment: 'Çok faydalı bir uygulama! Çocuklarla birlikte kullanıyoruz.', date: '10.11.2025' },
  { id: 2, name: 'Zeynep K.', rating: 4, comment: 'Testler çok eğlenceli, matematiği sevmeye başladım!', date: '08.11.2025' },
  { id: 3, name: 'Mehmet A.', rating: 5, comment: 'Konu anlatımları çok açık ve anlaşılır. Teşekkürler!', date: '05.11.2025' }
];

function App() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  
  // localStorage'dan yorumları yükle
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews')
    return saved ? JSON.parse(saved) : defaultReviews
  })

  // Yorumlar değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating > 0 && comment.trim()) {
      const newReview = {
        id: reviews.length + 1,
        name: 'Kullanıcı',
        rating,
        comment: comment.trim(),
        date: new Date().toLocaleDateString('tr-TR')
      }
      setReviews([newReview, ...reviews])
      setRating(0)
      setComment('')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Yaren Matematik</h1>
        <p>7. Sınıf Matematik - Eğlenerek Öğren!</p>
      </header>

      <main className="units-container">
        <section className="features-section">
          <h2>🎯 Uygulama Özellikleri</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Konu Anlatımı</h3>
              <p>Her ünite için özet, anlaşılır ve görsel destekli konu anlatımları</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Eğlenceli Testler</h3>
              <p>Çoktan seçmeli, doğru/yanlış ve boşluk doldurma formatlarında testler</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Puanlama Sistemi</h3>
              <p>Her doğru cevap için puan kazan ve lider tablosunda yüksel</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">❓</div>
              <h3>Soru Önerisi</h3>
              <p>Anlamadığın konular için soru sor veya yeni sorular öner</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧</div>
              <h3>Veli Takibi</h3>
              <p>Veliler öğrenci gelişimini ve test sonuçlarını takip edebilir</p>
            </div>
          </div>
        </section>

        <section className="units-section">
          <h2>📖 Matematik Üniteleri</h2>
          <div className="units-grid">
            <div className="unit-card" onClick={() => navigate('/unit/1')}>
              <h3>📊 Ünite 1</h3>
              <p>Tam Sayılarla İşlemler</p>
            </div>
            <div className="unit-card" onClick={() => navigate('/unit/2')}>
              <h3>🔢 Ünite 2</h3>
              <p>Rasyonel Sayılar</p>
            </div>
            <div className="unit-card" onClick={() => navigate('/unit/3')}>
              <h3>🔤 Ünite 3</h3>
              <p>Cebirsel İfadeler - Eşitlik ve Denklem</p>
            </div>
            <div className="unit-card" onClick={() => navigate('/unit/4')}>
              <h3>📈 Ünite 4</h3>
              <p>Oran ve Orantı - Yüzdeler</p>
            </div>
            <div className="unit-card" onClick={() => navigate('/unit/5')}>
              <h3>📐 Ünite 5</h3>
              <p>Doğrular ve Açılar, Çokgenler, Çember ve Daire</p>
            </div>
            <div className="unit-card" onClick={() => navigate('/unit/6')}>
              <h3>📊 Ünite 6</h3>
              <p>Veri Analizi</p>
            </div>
          </div>
        </section>

        <section className="reviews-section">
          <h2>⭐ Kullanıcı Yorumları ve Değerlendirmeler</h2>
          
          <div className="review-form-container">
            <h3>Yorumunuzu Paylaşın</h3>
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="rating-input">
                <label>Değerlendirme:</label>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${(hoverRating || rating) >= star ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="comment-input">
                <label>Yorumunuz:</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Düşüncelerinizi paylaşın..."
                  rows={4}
                  required
                />
              </div>
              <button type="submit" className="submit-review-btn">
                Yorum Yap
              </button>
            </form>
          </div>

          <div className="reviews-list">
            <h3>Tüm Yorumlar ({reviews.length})</h3>
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-author">
                    <strong>{review.name}</strong>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${review.rating >= star ? 'active' : ''}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2025 Yaren Matematik - Tüm hakları saklıdır</p>
      </footer>
    </div>
  )
}

export default App
