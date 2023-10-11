import { useEffect, useState } from "react"



export const UseDebounce = (value: string, delay = 300): string => {
    const [debounce, setDebounce] = useState(value)

    useEffect(() => {
        const handle = setTimeout(() => setDebounce(value), delay)
        return () => clearTimeout(handle)
    }, [value, delay])

    return debounce
}