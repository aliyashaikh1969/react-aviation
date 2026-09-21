// Single place that reads environment variables (see .env.example).
// Only VITE_* variables are exposed to the browser, so never put a secret here:
// the SerpApi key lives server-side (SERPAPI_KEY) and is used by api/flights.js.

export const env = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },
}

if (import.meta.env.DEV) {
  const missing = Object.entries(env.firebase).filter(([, value]) => !value).map(([key]) => key)
  if (missing.length) {
    console.warn(`Missing Firebase settings (${missing.join(', ')}). Copy .env.example to .env and fill it in.`)
  }
}
