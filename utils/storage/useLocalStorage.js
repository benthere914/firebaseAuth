import { useEffect, useState } from "react"
export const useLocalStorage = (keyName='defaultKey', initialValue='') => {
    const [value, setValue] = useState(initialValue)
    useEffect(() => {
        const valueFromLocalStorage = JSON.parse(window.localStorage.getItem(keyName))
        setValue(valueFromLocalStorage)
    }, [])
    useEffect(() => {
        window.localStorage.setItem(keyName, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}