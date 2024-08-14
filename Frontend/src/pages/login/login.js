import { request } from '../../utils/request'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import '../register/register.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { setUser } from '../../actions'
import { useEffect, useState } from 'react'
import { ROLE } from '../../constants'
import { Link, Navigate } from 'react-router-dom'
import { selectUserRole } from '../../selectors'
import { useResetForm } from '../../hooks'

const loginFormSchema = yup.object().shape({
	// валидация
	login: yup
		.string()
		.required('Fill in the login field') // обязательно заполнить
		.matches(/^\w+$/, 'Invalid user name. Only letters and numbers are allowed')
		.min(3, 'Invalid user name. Minimum of 3 characters')
		.max(15, 'Invalid user name. Maximum of 15 characters'),
	password: yup
		.string()
		.required('Fill in the password field') // обязательно заполнить
		.matches(
			/^[\w#$%]+$/,
			'Invalid password. Only letters, numbers and signs are allowed: # $ %',
		)
		.min(6, 'Invalid password. Minimum of 6 characters')
		.max(30, 'Invalid password. Maximum of 30 characters'),
})

export const Login = () => {
	const {
		register, // функция useForm
		reset, // сброс формы
		handleSubmit, // обработка подтверждения формы
		formState: { errors }, // отсюда достаём текст об ошибке
	} = useForm({
		defaultValues: {
			// значения по умолчанию
			login: '',
			password: '',
		},
		resolver: yupResolver(loginFormSchema), // подключили валидацию
	})

	const [serverError, setServerError] = useState(null)

	const dispatch = useDispatch()

	const role = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		// принимаем данные из формы по name (login, password)

		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(error)
				return // если есть ошибка, прерываем работу кода
			}

			dispatch(setUser(user)) // { type: 'SET_USER', payload: user }
			sessionStorage.setItem('userData', JSON.stringify(user)) // установили в сессию JSON строку (преобразовали из объекта) по ключу userData
		})
	}

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message // ошибка в логине или пароле
	const errorMessage = formError || serverError // ошибка из всех возможных (+ ошибка с сервера)

	if (role !== ROLE.GUEST) {
		return <Navigate to="/" />
	}

	return (
		<div className="register">
			<div className="register-card">
				<h2 className="register-card-title">Authorization</h2>
				<form className="register-card-form" onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						placeholder="Login"
						{...register('login', {
							onChange: () => setServerError(null), // присвоили обработчику onChange из useForm новый функицонал
						})}
					/>
					{/* пропсы из useForm и поле name='login' */}
					<input
						type="password"
						placeholder="Password"
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>
					<button
						className="header-link-log-in control-panel-link link register-button login-button"
						type="submit"
						disabled={!!formError}
					>
						Log in
					</button>
					{/*<Link to="/register">Sign up</Link>*/}
				</form>
			</div>

			{errorMessage && <h3 className="error-message">{errorMessage}</h3>}
		</div>
	)
}
