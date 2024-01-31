import { createRoot } from 'react-dom/client'
import { onError, reportWebVitals } from '@praxis/component-logging'
import App from './App'

// Standard errors will be automatically logged to STDOUT when thrown.
// The logging sidecar in TAP will process and send logs to the appropriate environment in Kibana.
// Learn more about TAP sidecars: https://tapdocs.prod.target.com/runtime/sidecars/#_platform_sidecars
window.onerror = onError

// If you want to start measuring performance in your app, enable the reportWebVitals()
// function below. Learn more: https://praxis.prod.target.com/components/logging#quick-start-metrics
reportWebVitals()

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
