import { useState } from "react"

export function useToast() {
  const [toast, setToast] = useState(null)

  const showToast = (toast) => {
    setToast(toast)
    setTimeout(() => setToast(null), 3000)
  }

  return { toast, showToast }
}