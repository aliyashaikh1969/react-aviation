import { useState } from 'react'
import toast from 'react-hot-toast'

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

// Shared state + validation for the newsletter / deal-alert sign-up boxes.
// There is no backend for this yet, so a valid address is only acknowledged.
export const useEmailSubscribe = (successMessage = "Thanks for subscribing!") => {
  const [email, setEmail] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!EMAIL_PATTERN.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }
    toast.success(successMessage)
    setEmail('')
  }

  return { email, setEmail, submit }
}
