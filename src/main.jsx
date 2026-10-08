import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
const App = lazy(() => import("./App.jsx"))
import "./styles/index.scss"
import Leazy from './components/leazy/Leazy.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import "./utils/i18n.js"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Leazy />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </StrictMode>,
)
