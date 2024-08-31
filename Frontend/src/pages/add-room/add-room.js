import { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../register/register.css'

export const AddRoom = () => {
	const [number, setNumber] = useState(null)
	const [price, setPrice] = useState(null)
	const [info, setInfo] = useState(null)
	const [images, setImages] = useState(null)

	const [imageUrlValue, setImageUrlValue] = useState('imageUrl')
	const [titleValue, setTitleValue] = useState('title')
	const contentRef = useRef(null)

	//useLayoutEffect(() => {
	//	setImageUrlValue(imageUrl)
	//	setTitleValue(title)
	//}, [imageUrl, title])

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSave = () => {
		//const newContent = sinitizeContent(contentRef.current.innerHTML)
		//dispatch(
		//	savePostAsync(id, {
		//		imageUrl: imageUrlValue,
		//		title: titleValue,
		//		content: newContent,
		//	}),
		//).then(({ id }) => navigate(`/post/${id}`))
	}

	const onNumberChange = ({ target }) => setNumber(target.value)
	const onPriceChange = ({ target }) => setPrice(target.value)
	const onInfoChange = ({ target }) => setInfo(target.value)
	const onImagesChange = ({ target }) => setImages(target.value)

	return (
		<div className="register">
			<div className="register-card add-room-card">
				<h2 className="register-card-title">Add room</h2>
				<div className="register-card-form">
					<input
						type="text"
						placeholder="Number"
						value={number}
						onChange={onNumberChange}
					/>
					<input
						type="text"
						placeholder="Price"
						value={price}
						onChange={onPriceChange}
					/>
					<input
						type="text"
						placeholder="Info"
						value={info}
						onChange={onInfoChange}
					/>
					<input
						type="text"
						placeholder="Images"
						value={images}
						onChange={onImagesChange}
					/>
					<button
						className="header-link-sign-up control-panel-link link register-button"
						type="submit"
					>
						Save
					</button>
				</div>
			</div>

			{/*{errorMessage && <h3 className="error-message">{errorMessage}</h3>}*/}
		</div>
	)
}
