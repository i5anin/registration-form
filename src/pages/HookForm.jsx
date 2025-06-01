import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useRef, useState } from 'react'
import { registerUser } from '@/api/register'

const schema = yup.object({
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    password: yup.string().min(6, 'Минимум 6 символов').required(),
    confirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
        .required(),
})

export default function HookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
    } = useForm({ resolver: yupResolver(schema), mode: 'onChange' })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const buttonRef = useRef(null)

    useEffect(() => {
        if (isValid) buttonRef.current?.focus()
    }, [isValid])

    const onSubmit = async (data) => {
        setIsSubmitting(true)

        try {
            const result = await registerUser({
                email: data.email,
                password: data.password,
            })

            console.log('✅ Регистрация успешна:', result)
            // Можно добавить очистку формы или редирект
        } catch (err) {
            console.error('❌ Ошибка регистрации:', err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Регистрация (Hook Form + Yup)</h2>

            <label>Email</label>
            <input type="email" {...register('email')} />
            {errors.email && <span className="error">{errors.email.message}</span>}

            <label>Пароль</label>
            <input type="password" {...register('password')} />
            {errors.password && <span className="error">{errors.password.message}</span>}

            <label>Повтор пароля</label>
            <input type="password" {...register('confirm')} />
            {errors.confirm && <span className="error">{errors.confirm.message}</span>}

            <button
                type="submit"
                disabled={!isValid || isSubmitting}
                ref={buttonRef}
            >
                {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
            </button>
        </form>
    )
}
