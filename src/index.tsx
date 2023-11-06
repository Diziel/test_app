import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/common.scss'
import App from './App.tsx'
import { store } from './store/store'
import { Provider } from 'react-redux'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
}