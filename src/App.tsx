import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { config } from './config'
import BridesmaidPage from './pages/BridesmaidPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Skip to co ntent
      </a>
      <Routes>
        {Object.values(config.bridesmaids).map((b) => (
          <Route
            key={b.slug}
            path={`/${b.slug}`}
            element={<BridesmaidPage bridesmaid={b} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
