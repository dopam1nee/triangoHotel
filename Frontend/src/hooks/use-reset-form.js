import { useEffect } from 'react'
import { useStore } from 'react-redux'

export const useResetForm = reset => {
	const store = useStore()

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout // false

		const unsubscribe = store.subscribe(() => {
			let previousWasLogout = currentWasLogout // false
			currentWasLogout = store.getState().app.wasLogout // true

			if (currentWasLogout !== previousWasLogout) {
				reset()
			}
		})

		return unsubscribe // () => unsubscribe(); useEffect возвращает функцию unsubscribe, в которой лежит условие для сброса данных формы. То есть после первого монтирования компонента (рендера, одного вызова), у нас всегда будет лежать функция unsubscribe и проверять условие. Когда какие-либо данные в состоянии приложения изменятся, форма сбросится (subscribe проверяет наличие изменений в состоянии). При клике на logout отправляется dispatch, где инвертируется флаг wasLogout
	}, [reset, store])
}
