import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import UnitPage from './pages/UnitPage.tsx'
import TopicLesson from './pages/topic/TopicLesson.tsx'
import TopicPractice from './pages/topic/TopicPractice.tsx'
import TopicTest from './pages/topic/TopicTest.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/unit/:unitId" element={<UnitPage />} />
        <Route path="/unit/:unitId/lesson" element={<TopicLesson />} />
        <Route path="/unit/:unitId/practice" element={<TopicPractice />} />
        <Route path="/unit/:unitId/test" element={<TopicTest />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
