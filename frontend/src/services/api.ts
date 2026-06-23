import axios from 'axios'

const api = axios.create({
    //use the api url from dotenv if possible otherwise use local host 
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
})

export const linkApi = {
    //sends the original url to backend 
    //and return the shortened url
    makeShortURL: async (originalUrl: string) => {
        const response = await api.post('/links', {originalUrl})
        return response.data
    }
}