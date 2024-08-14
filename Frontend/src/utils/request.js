export const request = (url, method, data) => {
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined, // преобразуем данные в строку (браузер работает со строками)
	}).then(res => res.json()) // преобразуем ответ в JSON объект, чтобы было удобно работать с данными
}
