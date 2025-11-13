import { useParams, useNavigate } from 'react-router-dom';
import './TopicPages.css';

const lessonContent: Record<string, any> = {
  '1': {
    title: 'Tam Sayılarla İşlemler',
    sections: [
      {
        subtitle: 'Tam Sayılar Nedir?',
        content: 'Tam sayılar, pozitif sayılar, negatif sayılar ve sıfırdan oluşan sayılardır. Örnek: ..., -3, -2, -1, 0, 1, 2, 3, ...',
        example: 'Örnekler: +5, -7, 0, +12, -20'
      },
      {
        subtitle: 'Tam Sayılarda Toplama',
        content: 'İki tam sayıyı toplarken işaretlerine dikkat ederiz.',
        example: '(+5) + (+3) = +8\n(-5) + (-3) = -8\n(+5) + (-3) = +2\n(-5) + (+3) = -2'
      },
      {
        subtitle: 'Tam Sayılarda Çıkarma',
        content: 'Çıkarma işleminde, çıkan sayının işaretini değiştirip toplama yaparız.',
        example: '(+8) - (+3) = (+8) + (-3) = +5\n(-8) - (-3) = (-8) + (+3) = -5'
      }
    ]
  },
  '2': {
    title: 'Rasyonel Sayılar',
    sections: [
      {
        subtitle: 'Rasyonel Sayılar Nedir?',
        content: 'a/b şeklinde yazılabilen sayılara rasyonel sayılar denir. Burada a ve b tam sayı, b≠0 olmalıdır.',
        example: 'Örnekler: 1/2, -3/4, 5, 0.25, -1.5'
      },
      {
        subtitle: 'Rasyonel Sayılarda Toplama ve Çıkarma',
        content: 'Paydaları eşit olan rasyonel sayılarda paylar toplanır veya çıkarılır.',
        example: '1/4 + 2/4 = 3/4\n3/5 - 1/5 = 2/5'
      }
    ]
  },
  '3': {
    title: 'Cebirsel İfadeler',
    sections: [
      {
        subtitle: 'Cebirsel İfade Nedir?',
        content: 'Sayılar, değişkenler ve işlem sembolleri ile oluşturulan ifadelerdir.',
        example: 'Örnekler: 3x + 5, 2a - 7b, x² + 2x + 1'
      },
      {
        subtitle: 'Denklem Nedir?',
        content: 'İçinde bilinmeyen bulunan ve eşitlik içeren matematiksel ifadelerdir.',
        example: 'x + 5 = 12\nÇözüm: x = 7'
      }
    ]
  },
  '4': {
    title: 'Oran ve Orantı - Yüzdeler',
    sections: [
      {
        subtitle: 'Oran Nedir?',
        content: 'İki büyüklüğün birbirine bölümüne oran denir.',
        example: 'a/b şeklinde gösterilir.\n6/3 = 2:1 (6 nın 3 e oranı)'
      },
      {
        subtitle: 'Yüzde Nedir?',
        content: 'Bir büyüklüğün 100 e bölündüğünde kaçı olduğunu gösteren sayılardır.',
        example: '%25 = 25/100 = 1/4\n200 nın %50 si = 200 × 0.50 = 100'
      }
    ]
  },
  '5': {
    title: 'Geometri',
    sections: [
      {
        subtitle: 'Doğru ve Açılar',
        content: 'Doğru: Sonsuz uzunlukta, iki yöne doğru uzanan çizgidir. Açı: İki doğru veya ışının kesişmesiyle oluşan şekildir.',
        example: 'Dar açı: 0° < α < 90°\nDik açı: 90°\nGeniş açı: 90° < α < 180°'
      },
      {
        subtitle: 'Çokgenler',
        content: 'Üç veya daha fazla doğru parçası ile sınırlanan kapalı şekillerdir.',
        example: 'Üçgen: 3 kenar\nDörtgen: 4 kenar\nBeşgen: 5 kenar'
      }
    ]
  },
  '6': {
    title: 'Veri Analizi',
    sections: [
      {
        subtitle: 'Veri Toplama',
        content: 'Verileri toplama, düzenleme ve yorumlama işlemlerine veri analizi denir.',
        example: 'Örnek: Sınıftaki öğrencilerin boy uzunlukları'
      },
      {
        subtitle: 'Ortalama',
        content: 'Verilerin toplamının veri sayısına bölümüne ortalama denir.',
        example: 'Veriler: 5, 7, 9, 11\nOrtalama = (5+7+9+11)/4 = 32/4 = 8'
      }
    ]
  }
};

function TopicLesson() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const lesson = lessonContent[unitId || '1'];

  if (!lesson) {
    return <div>Konu bulunamadı</div>;
  }

  return (
    <div className="topic-page">
      <header className="topic-header">
        <button className="back-button" onClick={() => navigate(`/unit/${unitId}`)}>
          ← Üniteye Dön
        </button>
        <h1>📚 {lesson.title}</h1>
        <p>Konu Anlatımı</p>
      </header>

      <main className="topic-content">
        {lesson.sections.map((section: any, index: number) => (
          <div key={index} className="lesson-section">
            <h2>{section.subtitle}</h2>
            <p className="lesson-text">{section.content}</p>
            <div className="example-box">
              <h3>💡 Örnekler:</h3>
              <pre>{section.example}</pre>
            </div>
          </div>
        ))}

        <div className="lesson-actions">
          <button 
            className="action-btn primary"
            onClick={() => navigate(`/unit/${unitId}/practice`)}
          >
            Alıştırmalara Geç →
          </button>
        </div>
      </main>
    </div>
  );
}

export default TopicLesson;
