// Booking reference (PNR) such as "SBLK7Q2XA".
export const generatePnr = () => `SBLK${Math.random().toString(36).slice(2, 7).toUpperCase()}`
