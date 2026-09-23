import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

// Fake UPI QR code, drawn on a canvas — there's no real payment gateway here.
export const UpiQrCode = ({ amount }) => {
  const canvasRef = useRef(null)
  const [seconds, setSeconds] = useState(299)
  const [copied, setCopied] = useState(false)

  const UPI_ID = "skybook@okaxis"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 180
    const mod = 18
    const cell = Math.floor(size / mod)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)

    // random-ish pattern, just to look like a QR code
    const pattern = []
    for (let r = 0; r < mod; r++) {
      pattern[r] = []
      for (let c = 0; c < mod; c++) {
        const seed = (r * 17 + c * 13 + r * c * 7) % 3
        pattern[r][c] = seed < 2
      }
    }

    // draw the 3 corner squares every real QR code has
    ;[[0, 0], [0, mod - 7], [mod - 7, 0]].forEach(([br, bc]) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const row = br + r
          const col = bc + c
          if (row < mod && col < mod) {
            pattern[row][col] = (
              r === 0 || r === 6 ||
              c === 0 || c === 6 ||
              (r >= 2 && r <= 4 && c >= 2 && c <= 4)
            )
          }
        }
      }
    })

    ctx.fillStyle = '#031e3d' // matches the app's navy (see tailwind.config.js)
    for (let r = 0; r < mod; r++)
      for (let c = 0; c < mod; c++)
        if (pattern[r][c])
          ctx.fillRect(c * cell + 2, r * cell + 2, cell - 1, cell - 1)
  }, [])

  // countdown timer
  useEffect(() => {
    if (seconds <= 0) return
    const timer = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds])

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0')
    const sec = String(s % 60).padStart(2, '0')
    return `${m}:${sec}`
  }

  const copyUpi = async () => {
    if (!navigator.clipboard) return toast.error(`Couldn't copy automatically — the UPI ID is ${UPI_ID}`)
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error(`Couldn't copy automatically — the UPI ID is ${UPI_ID}`)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 border border-slate-200 rounded-2xl p-5 w-full">

      {/* QR */}
      <div className="border border-slate-200 rounded-xl p-3 bg-white">
        <canvas ref={canvasRef} width={180} height={180} />
      </div>

      {/* Amount */}
      <div className="bg-slate-50 rounded-xl px-6 py-2 text-center w-full">
        <p className="text-xs text-slate-500">Total amount</p>
        <p className="text-xl font-medium text-navy">
          ₹{amount.toLocaleString('en-IN')}
        </p>
      </div>

      {/* UPI ID */}
      <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 w-full">
        <span className="text-sm font-mono flex-1 text-slate-700">{UPI_ID}</span>
        <button type='button' onClick={copyUpi} className="text-blue-600 text-xs px-2 py-1 rounded hover:bg-blue-50">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Apps */}
      <div className="flex gap-2 flex-wrap justify-center">
        {["PhonePe", "GPay", "Paytm", "BHIM"].map(app => (
          <span key={app} className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {app}
          </span>
        ))}
      </div>

      {/* Timer */}
      <p className={`text-xs flex items-center gap-1 ${seconds <= 0 ? "text-red-500" : "text-amber-600"}`}>
        QR expires in{" "}
        <span className="font-medium">
          {seconds <= 0 ? "Expired" : formatTime(seconds)}
        </span>
      </p>

      <p className="text-xs text-slate-400 text-center">
        Do not refresh while payment is in progress
      </p>
    </div>
  )
}
