import axios from "axios"

export const queryFn = (path: string) => async() => {
    const host = process.env.REACT_APP_API_URL
    const url = `${host}/${path}`
    const response = await fetch(url)
    return response.json()
}

export const mutationFn = (path: string, data?: unknown) => {
    const host = process.env.REACT_APP_API_URL
    const url = `${host}/${path}`
    return axios.post(url, data)
}

export const deleteFn = (path: string) => {
    const host = process.env.REACT_APP_API_URL
    const url = `${host}/${path}`
    return axios.delete(url)
}