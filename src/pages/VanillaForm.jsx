import { useRef, useState, useEffect } from 'react'
import { registerUser } from '@/api/register'

export default function VanillaForm() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirm: ''
    })

    const [touched, setTouched] = useState({
        email: false,
        password: false,
        confirm: false
    })

    const [errors, setErrors] = useState({})
    const [isValid, setIsValid] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const buttonRef = useRef(null)

    useEffect(() => {
        const newErrors = {}

        if (touched.email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
            newErrors.email = 'Некорректный email'
        }

        if (touched.password && form.password.length < 6) {
            newErrors.password = 'Минимум 6 символов'
        }

        if (touched.confirm && form.password !== form.confirm) {
            newErrors.confirm = 'Пароли не совпадают'
        }

        setErrors(newErrors)
        setIsValid(Object.keys(newErrors).length === 0)
    }, [form, touched])

    useEffect(() => {
        if (isValid) buttonRef.current?.focus()
    }, [isValid])

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value })
    }

    const handleBlur = (field) => () => {
        setTouched({ ...touched, [field]: true })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setTouched({
            email: true,
            password: true,
            confirm: true
        })

        if (!isValid) return

        setIsSubmitting(true)

        try {
            const result = await registerUser({
                email: form.email,
                password: form.password
            })

            console.log('✅ Регистрация успешна:', result)
            // можно сбросить форму: setForm({ email: '', password: '', confirm: '' })
        } catch (err) {
            console.error('❌ Ошибка регистрации:', err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация (Vanilla)</h2>

            <label>Email</label>
            <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <label>Пароль</label>
            <input
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
            />
            {errors.password && <span className="error">{errors.password}</span>}

            <label>Повтор пароля</label>
            <input
                type="password"
                value={form.confirm}
                onChange={handleChange('confirm')}
                onBlur={handleBlur('confirm')}
            />
            {errors.confirm && <span className="error">{errors.confirm}</span>}

            <button
                ref={buttonRef}
                type="submit"
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
            </button>
        </form>
    )
}
