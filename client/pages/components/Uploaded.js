import React from "react"
import { useRef } from "react"

const Uploaded = ({ path }) => {
	const inputRef = useRef(null)
	return (
		<React.Fragment>
		<svg  xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
			<h4 className="mt-3">Uploaded Successfully!</h4>{" "}
			<img
				className="img-fluid center-block w-50 rounded mx-auto py-4"
				src={ path || ""}
				alt="upload"
				height={50}
				width={50}
			/>
			<br />
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					value={path || ""}
					readOnly
					aria-describedby="basic-addon2"
					ref={inputRef}
				/>
				<button
					className="input-group-append btn btn-primary"
					onClick={() => {
						navigator.clipboard.writeText(inputRef.current.value)
					}}
				>
					Copy link!
				</button>
			</div>
		</React.Fragment>
	)
}

export default Uploaded
