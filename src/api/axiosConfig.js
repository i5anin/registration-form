import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://example.com/api', // 🔁 замени на свой API
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})
