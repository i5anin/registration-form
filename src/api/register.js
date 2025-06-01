import { axiosInstance } from '@/api/axiosConfig'
import { handleApiError, handleResponse } from '@/api/errorHandler'

export async function registerUser(formData) {
    return axiosInstance
        .post('/register', formData)
        .then(handleResponse)
        .catch(handleApiError)
}
