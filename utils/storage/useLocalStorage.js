import { useEffect, useState, useReducer, useMemo, memo } from "react"
const initialState = {}
const reducer = (state, action) => {
    switch (action.type) {
        case 'setValue':
            if (!action?.payload?.valueName) return state
            if (!action?.payload?.valueData) return state
            state[action.payload.valueName] = action.payload.valueData
            return Object?.assign({}, state)
        case 'setObject':
            if (Object?.keys(action.payload).length) return Object?.assign({}, action.payload)
            break
        case 'reset':
            return {}
        default:
            return state
    }
}
const useLocalStorage = (keyName='defaultKey') => {
    const [value, dispatchValue] = useReducer(reducer, initialState)
    useEffect(() => {dispatchValue({type: 'reset'})}, [])
    useEffect(() => window.localStorage.setItem(keyName, JSON.stringify(value)), [value])
    return [value, dispatchValue]
}

export default useLocalStorage