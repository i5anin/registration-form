export function handleResponse(response) {
    return response.data
}

export function handleApiError(error) {
    const err = error?.response?.data || { message: 'Неизвестная ошибка' }
    console.error('[API]', err.message || err)
    throw err
}
