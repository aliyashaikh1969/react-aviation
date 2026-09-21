import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import flightsHandler from './api/flights.js'

// Serves the Vercel function in api/ during `npm run dev`, so the app works the same
// locally and in production. Server-only variables (e.g. SERPAPI_KEY) are read from .env.
const devApi = () => ({
  name: 'dev-api',
  configureServer(server) {
    Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))

    server.middlewares.use('/api/flights', (req, res) => {
      let raw = ''
      req.on('data', (chunk) => { raw += chunk })
      req.on('end', () => {
        try { req.body = raw ? JSON.parse(raw) : {} } catch { req.body = {} }
        res.status = (code) => { res.statusCode = code; return res }
        res.json = (payload) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(payload))
        }
        flightsHandler(req, res)
      })
    })
  },
})

export default defineConfig({
  plugins: [react(), devApi()],
})
