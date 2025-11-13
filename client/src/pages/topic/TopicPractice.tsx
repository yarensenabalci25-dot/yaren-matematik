import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './TopicPages.css';

const practiceQuestions: Record<string, any> = {
  '1': {
    title: 'Tam Sayılarla İşlemler',
    questions: [
      { q: '(+5) + (+3) = ?', answer: '8', hint: 'Aynı işaretli pozitif sayıları topla', difficulty: 'Kolay' },
      { q: '(+12) - (+5) = ?', answer: '7', hint: 'Pozitif sayılardan çıkarma', difficulty: 'Kolay' },
      { q: '(+8) + (-3) = ?', answer: '5', hint: 'Farklı işaretli sayıları toplarken, büyük sayının işaretini al', difficulty: 'Orta' },
      { q: '(-10) × (+2) = ?', answer: '-20', hint: 'Farklı işaretlerin çarpımı negatiftir', difficulty: 'Orta' },
      { q: '(+15) ÷ (-3) = ?', answer: '-5', hint: 'Farklı işaretlerin bölümü negatiftir', difficulty: 'Zor' }
    ]
  },
  '2': {
    title: 'Rasyonel Sayılar',
    questions: [
      { q: '1/2 + 1/2 = ?', answer: '1', hint: 'Paydalar eşit, payları topla', difficulty: 'Kolay' },
      { q: '2/3 - 1/3 = ?', answer: '1/3', hint: 'Paydalar eşit, payları çıkar', difficulty: 'Kolay' },
      { q: '0.5 + 0.25 = ?', answer: '0.75', hint: 'Ondalık sayıları topla', difficulty: 'Orta' },
      { q: '1/2 × 2/3 = ?', answer: '1/3', hint: 'Pay ile payı, payda ile paydayı çarp', difficulty: 'Orta' },
      { q: '3/4 ÷ 1/2 = ?', answer: '3/2', hint: 'Bölen kesrin ters çevirip çarp', difficulty: 'Zor' }
    ]
  },
  '3': {
    title: 'Cebirsel İfadeler',
    questions: [
      { q: 'x + 5 = 12 ise x = ?', answer: '7', hint: '5 i sağdan sola taşı', difficulty: 'Kolay' },
      { q: '2x = 10 ise x = ?', answer: '5', hint: 'Her iki tarafı 2 ye böl', difficulty: 'Kolay' },
      { q: 'x - 3 = 7 ise x = ?', answer: '10', hint: '3 ü sağa taşıyınca işareti değişir', difficulty: 'Orta' },
      { q: '3x + 4 = 13 ise x = ?', answer: '3', hint: 'Önce 4 ü taşı, sonra 3 e böl', difficulty: 'Orta' },
      { q: '5x - 2 = 18 ise x = ?', answer: '4', hint: 'Önce 2 yi taşı, sonra 5 e böl', difficulty: 'Zor' }
    ]
  },
  '4': {
    title: 'Oran ve Orantı',
    questions: [
      { q: '100 ün %50 si kaçtır?', answer: '50', hint: '100 ün yarısı', difficulty: 'Kolay' },
      { q: '60 nın %10 u kaçtır?', answer: '6', hint: '60 × 0.10', difficulty: 'Kolay' },
      { q: '4/8 kesrini sadeleştir', answer: '1/2', hint: 'Pay ve paydayı 4 e böl', difficulty: 'Orta' },
      { q: '20 nin %25 i kaçtır?', answer: '5', hint: '20 × 0.25', difficulty: 'Orta' },
      { q: '200 ün %75 i kaçtır?', answer: '150', hint: '200 × 0.75', difficulty: 'Zor' }
    ]
  },
  '5': {
    title: 'Geometri',
    questions: [
      { q: '90 derecelik açıya ne denir?', answer: 'dik', hint: 'Dik açı', difficulty: 'Kolay' },
      { q: 'Karenin bir açısı kaç derecedir?', answer: '90', hint: 'Dik açı', difficulty: 'Kolay' },
      { q: 'Eşkenar üçgenin her açısı kaç derecedir?', answer: '60', hint: '180 ÷ 3', difficulty: 'Orta' },
      { q: 'Bir üçgenin iç açıları toplamı kaç derecedir?', answer: '180', hint: 'Üçgen için standart kural', difficulty: 'Orta' },
      { q: 'Bir dörtgenin iç açıları toplamı kaç derecedir?', answer: '360', hint: '4 köşeli şekil', difficulty: 'Zor' }
    ]
  },
  '6': {
    title: 'Veri Analizi',
    questions: [
      { q: '5, 5, 5, 5 sayılarının ortalaması kaçtır?', answer: '5', hint: 'Hepsi aynı sayı', difficulty: 'Kolay' },
      { q: '10, 20, 30 sayılarının ortalaması kaçtır?', answer: '20', hint: 'Sayıları topla ve 3 e böl', difficulty: 'Kolay' },
      { q: '0, 10, 20 sayılarının ortalaması kaçtır?', answer: '10', hint: '(0+10+20) ÷ 3', difficulty: 'Orta' },
      { q: '2, 4, 6, 8 sayılarının ortalaması kaçtır?', answer: '5', hint: '(2+4+6+8) ÷ 4', difficulty: 'Orta' },
      { q: '3, 6, 9, 12 sayılarının ortalaması kaçtır?', answer: '7.5', hint: '30 ÷ 4', difficulty: 'Zor' }
    ]
  }
};

function TopicPractice() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const practice = practiceQuestions[unitId || '1'];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  if (!practice) {
    return <div>Alıştırmalar bulunamadı</div>;
  }

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === practice.questions[currentQuestion].answer.toLowerCase();
    
    if (correct) {
      setFeedback('✅ Doğru! Tebrikler!');
      setScore(score + 20);
    } else {
      setFeedback(`❌ Yanlış. Doğru cevap: ${practice.questions[currentQuestion].answer}`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < practice.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
      setFeedback('');
      setShowHint(false);
    } else {
      navigate(`/unit/${unitId}/test`);
    }
  };

  return (
    <div className="topic-page">
      <header className="topic-header">
        <button className="back-button" onClick={() => navigate(`/unit/${unitId}`)}>
          ← Üniteye Dön
        </button>
        <h1>📝 {practice.title}</h1>
        <p>Alıştırmalar</p>
      </header>

      <main className="topic-content">
        <div className="practice-container">
          <div className="progress-bar">
            <div className="progress-text">
              Soru {currentQuestion + 1} / {practice.questions.length}
            </div>
            <div className="progress-score">
              Puan: {score}
            </div>
          </div>

          <div className="question-card">
            <h2>Soru {currentQuestion + 1}</h2>
            <p className="question-text">{practice.questions[currentQuestion].q}</p>
            
            <div className="answer-input">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Cevabınızı yazın..."
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button onClick={handleSubmit} className="submit-btn">
                Cevapla
              </button>
            </div>

            {feedback && (
              <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'wrong'}`}>
                {feedback}
              </div>
            )}

            <div className="question-actions">
              <button 
                onClick={() => setShowHint(!showHint)}
                className="hint-btn"
              >
                💡 {showHint ? 'İpucunu Gizle' : 'İpucu Göster'}
              </button>
              
              {feedback && (
                <button onClick={nextQuestion} className="next-btn">
                  {currentQuestion < practice.questions.length - 1 ? 'Sonraki Soru →' : 'Teste Geç →'}
                </button>
              )}
            </div>

            {showHint && (
              <div className="hint-box">
                <strong>💡 İpucu:</strong> {practice.questions[currentQuestion].hint}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TopicPractice;
