// const baseUrl = 'http://localhost:5500/api'
// const baseUrl = 'http://192.168.43.222:5500/api'
// const baseUrl = 'http://139.59.91.232:5500/api'
const baseUrl = 'https://fitwingz.herokuapp.com/api'


export const get = async url => {
    try {
        const promise = await fetch(`${baseUrl + url}`, {
            method: 'GET',
            credentials: 'include'
        })
        const response = await promise.json()
        return response
    } catch (error) {
        console.log(error);
    }
}
export const post = async (url, data) => {
    try {
        const promise = await fetch(`${baseUrl + url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        })
        const response = await promise.json()
        return response
    } catch (error) {
        console.log(error);
    }
}
export const patch = async (url, data) => {
    try {
        const promise = await fetch(`${baseUrl + url}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        const response = await promise.json()
        return response
    } catch (error) {
        console.log(error);
    }
}
export const remove = async (url) => {
    try {
        const promise = await fetch(`${baseUrl + url}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        const response = await promise.json()
        return response
    } catch (error) {
        console.log(error);
    }
}