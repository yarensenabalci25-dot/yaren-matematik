import { useParams, useNavigate } from 'react-router-dom';
import './UnitPage.css';

const units = [
  { id: 1, title: 'Tam Sayılarla İşlemler', icon: '📊' },
  { id: 2, title: 'Rasyonel Sayılar', icon: '🔢' },
  { id: 3, title: 'Cebirsel İfadeler - Eşitlik ve Denklem', icon: '🔤' },
  { id: 4, title: 'Oran ve Orantı - Yüzdeler', icon: '📈' },
  { id: 5, title: 'Doğrular ve Açılar, Çokgenler, Çember ve Daire', icon: '📐' },
  { id: 6, title: 'Veri Analizi', icon: '📊' }
];

function UnitPage() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const unit = units.find(u => u.id === Number(unitId));

  if (!unit) {
    return <div>Ünite bulunamadı</div>;
  }

  return (
    <div className="unit-page">
      <header className="unit-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Ana Sayfa
        </button>
        <h1>{unit.icon} Ünite {unitId}</h1>
        <h2>{unit.title}</h2>
      </header>

      <main className="unit-content">
        <section className="topics-section">
          <h3>📚 Konu Başlıkları</h3>
          <div className="topics-grid">
            <div className="topic-card">
              <h4>🎯 Konu Anlatımı</h4>
              <p>Ünitenin temel kavramlarını öğren</p>
              <button className="topic-button" onClick={() => navigate(`/unit/${unitId}/lesson`)}>Başla</button>
            </div>
            <div className="topic-card">
              <h4>📝 Alıştırmalar</h4>
              <p>Pratik yaparak pekiştir</p>
              <button className="topic-button" onClick={() => navigate(`/unit/${unitId}/practice`)}>Başla</button>
            </div>
            <div className="topic-card">
              <h4>🧪 Test</h4>
              <p>Bilgini ölç, puan kazan</p>
              <button className="topic-button" onClick={() => navigate(`/unit/${unitId}/test`)}>Başla</button>
            </div>
          </div>
        </section>

        <section className="progress-section">
          <h3>📊 İlerleme Durumun</h3>
          <div className="progress-card">
            <div className="progress-item">
              <span>Tamamlanan Konular</span>
              <strong>0 / 3</strong>
            </div>
            <div className="progress-item">
              <span>Toplam Puan</span>
              <strong>0</strong>
            </div>
            <div className="progress-item">
              <span>Doğru Cevap Oranı</span>
              <strong>--%</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UnitPage;
