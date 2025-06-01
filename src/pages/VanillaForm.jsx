import { useRef, useState, useEffect } from 'react'

export default function VanillaForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [errors, setErrors] = useState({})
    const [isValid, setIsValid] = useState(false)

    const buttonRef = useRef(null)

    useEffect(() => {
        const newErrors = {}

        if (!email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
            newErrors.email = 'Некорректный email'
        }

        if (password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов'
        }

        if (password !== confirm) {
            newErrors.confirm = 'Пароли не совпадают'
        }

        setErrors(newErrors)
        setIsValid(Object.keys(newErrors).length === 0)
    }, [email, password, confirm])

    useEffect(() => {
        if (isValid) buttonRef.current?.focus()
    }, [isValid])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ email, password, confirm })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация (Vanilla)</h2>

            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <label>Пароль</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>}

            <label>Повтор пароля</label>
            <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
            />
            {errors.confirm && <span className="error">{errors.confirm}</span>}

            <button ref={buttonRef} type="submit" disabled={!isValid}>
                Зарегистрироваться
            </button>
        </form>
    )
}
