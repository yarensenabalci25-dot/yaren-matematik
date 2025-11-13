import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './TopicPages.css';

const testQuestions: Record<string, any> = {
  '1': {
    title: 'Tam Sayılarla İşlemler',
    questions: [
      { 
        q: '(-8) + (+12) işleminin sonucu kaçtır?',
        options: ['+4', '-4', '+20', '-20'],
        correct: 0
      },
      { 
        q: '(+15) - (-5) işleminin sonucu kaçtır?',
        options: ['+10', '+20', '-10', '-20'],
        correct: 1
      },
      { 
        q: '(-6) × (-4) işleminin sonucu kaçtır?',
        options: ['-24', '+24', '-10', '+10'],
        correct: 1
      },
      { 
        q: '(+20) ÷ (-4) işleminin sonucu kaçtır?',
        options: ['+5', '-5', '+16', '-16'],
        correct: 1
      },
      { 
        q: 'Hangi işlemin sonucu negatif sayıdır?',
        options: ['(-5) × (-3)', '(+8) + (+2)', '(-10) ÷ (+2)', '(+7) - (+3)'],
        correct: 2
      }
    ]
  },
  '2': {
    title: 'Rasyonel Sayılar',
    questions: [
      { 
        q: '3/4 + 1/4 işleminin sonucu nedir?',
        options: ['4/4 = 1', '4/8', '2/4', '3/8'],
        correct: 0
      },
      { 
        q: '1/2 × 2/3 işleminin sonucu nedir?',
        options: ['3/4', '1/3', '2/6', '1/6'],
        correct: 1
      },
      { 
        q: '0.5 + 0.75 işleminin sonucu nedir?',
        options: ['1.25', '1.0', '0.25', '1.5'],
        correct: 0
      },
      { 
        q: 'Aşağıdakilerden hangisi rasyonel sayı değildir?',
        options: ['2/3', '√2', '0.5', '-3'],
        correct: 1
      },
      { 
        q: '2/5 kesrinin ondalık gösterimi nedir?',
        options: ['0.4', '0.5', '0.2', '0.25'],
        correct: 0
      }
    ]
  },
  '3': {
    title: 'Cebirsel İfadeler',
    questions: [
      { 
        q: '3x + 5 = 20 denkleminde x kaçtır?',
        options: ['5', '6', '4', '7'],
        correct: 0
      },
      { 
        q: '2(x + 3) = 14 denkleminde x kaçtır?',
        options: ['5', '4', '6', '7'],
        correct: 1
      },
      { 
        q: 'x² = 16 ise x kaçtır?',
        options: ['4', '8', '2', '16'],
        correct: 0
      },
      { 
        q: '5x - 7 = 18 denkleminde x kaçtır?',
        options: ['3', '4', '5', '6'],
        correct: 2
      },
      { 
        q: 'x/2 = 6 denkleminde x kaçtır?',
        options: ['3', '12', '6', '24'],
        correct: 1
      }
    ]
  },
  '4': {
    title: 'Oran ve Orantı',
    questions: [
      { 
        q: '80 sayısının %25 i kaçtır?',
        options: ['20', '25', '30', '15'],
        correct: 0
      },
      { 
        q: '50 nin %40 ı kaçtır?',
        options: ['10', '15', '20', '25'],
        correct: 2
      },
      { 
        q: '4:6 oranı hangi orana eşittir?',
        options: ['1:2', '2:3', '3:4', '1:3'],
        correct: 1
      },
      { 
        q: '300 ün %10 u kaçtır?',
        options: ['30', '20', '40', '50'],
        correct: 0
      },
      { 
        q: 'Bir sayının %50 si 40 ise bu sayı kaçtır?',
        options: ['60', '70', '80', '90'],
        correct: 2
      }
    ]
  },
  '5': {
    title: 'Geometri',
    questions: [
      { 
        q: 'Bir üçgenin iç açıları toplamı kaç derecedir?',
        options: ['180°', '360°', '90°', '270°'],
        correct: 0
      },
      { 
        q: 'Dik açı kaç derecedir?',
        options: ['45°', '90°', '180°', '60°'],
        correct: 1
      },
      { 
        q: 'Bir dörtgenin iç açıları toplamı kaç derecedir?',
        options: ['180°', '270°', '360°', '540°'],
        correct: 2
      },
      { 
        q: 'Eşkenar üçgenin bir açısı kaç derecedir?',
        options: ['45°', '60°', '90°', '120°'],
        correct: 1
      },
      { 
        q: 'Dikdörtgenin köşegenleri birbirini nasıl keser?',
        options: ['Ortalar', 'Üçe böler', 'Eşit değildir', 'Dik keser'],
        correct: 0
      }
    ]
  },
  '6': {
    title: 'Veri Analizi',
    questions: [
      { 
        q: '5, 10, 15, 20 sayılarının aritmetik ortalaması kaçtır?',
        options: ['10', '12.5', '15', '50'],
        correct: 1
      },
      { 
        q: '8, 8, 8, 8 sayılarının ortalaması kaçtır?',
        options: ['4', '8', '16', '32'],
        correct: 1
      },
      { 
        q: 'Bir veri setinde en çok tekrar eden değere ne denir?',
        options: ['Ortalama', 'Medyan', 'Mod', 'Aralık'],
        correct: 2
      },
      { 
        q: '1, 3, 5, 7, 9 sayılarının ortanca değeri (medyan) kaçtır?',
        options: ['3', '5', '7', '6'],
        correct: 1
      },
      { 
        q: '10, 20, 30, 40 sayılarının toplamı kaçtır?',
        options: ['80', '90', '100', '110'],
        correct: 2
      }
    ]
  }
};

function TopicTest() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const test = testQuestions[unitId || '1'];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  if (!test) {
    return <div>Test bulunamadı</div>;
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === test.questions[currentQuestion].correct) {
      setScore(score + 20);
    }

    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (showResult) {
    return (
      <div className="topic-page">
        <header className="topic-header">
          <button className="back-button" onClick={() => navigate(`/unit/${unitId}`)}>
            ← Üniteye Dön
          </button>
          <h1>🎉 Test Tamamlandı!</h1>
        </header>

        <main className="topic-content">
          <div className="test-result">
            <div className="result-card">
              <h2>Test Sonucun</h2>
              <div className="result-score">
                <div className="score-circle">
                  <span className="score-number">{score}</span>
                  <span className="score-total">/ 100</span>
                </div>
              </div>
              <p className="result-text">
                {score >= 80 ? '🌟 Mükemmel! Konuyu çok iyi öğrenmişsin!' :
                 score >= 60 ? '👍 İyi iş çıkardın! Biraz daha pratik yapabilirsin.' :
                 score >= 40 ? '📚 Fena değil! Konu anlatımını tekrar gözden geçir.' :
                 '💪 Daha fazla çalışmalısın! Konu anlatımından başla.'}
              </p>
              <div className="result-actions">
                <button onClick={restartTest} className="action-btn">
                  🔄 Testi Tekrarla
                </button>
                <button onClick={() => navigate(`/unit/${unitId}`)} className="action-btn primary">
                  Üniteye Dön
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="topic-page">
      <header className="topic-header">
        <button className="back-button" onClick={() => navigate(`/unit/${unitId}`)}>
          ← Üniteye Dön
        </button>
        <h1>🧪 {test.title}</h1>
        <p>Test</p>
      </header>

      <main className="topic-content">
        <div className="test-container">
          <div className="progress-bar">
            <div className="progress-text">
              Soru {currentQuestion + 1} / {test.questions.length}
            </div>
            <div className="progress-score">
              Puan: {score}
            </div>
          </div>

          <div className="question-card">
            <h2>Soru {currentQuestion + 1}</h2>
            <p className="question-text">{test.questions[currentQuestion].q}</p>
            
            <div className="options-container">
              {test.questions[currentQuestion].options.map((option: string, index: number) => (
                <button
                  key={index}
                  className={`option-btn ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => handleAnswer(index)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>

            <div className="test-actions">
              <button 
                onClick={handleNext}
                className="next-btn"
                disabled={selectedAnswer === null}
              >
                {currentQuestion < test.questions.length - 1 ? 'Sonraki Soru →' : 'Testi Bitir'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TopicTest;
