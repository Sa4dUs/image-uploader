import React from "react"
import { useRef } from "react"

const Uploaded = ({ path }) => {
	const inputRef = useRef(null)
	return (
		<React.Fragment>
			<h4>Uploaded Successfully!</h4>{" "}
			<img
				className="img-fluid center-block w-50 rounded mx-auto py-4"
				src={ path ? `${process.env.NEXT_PUBLIC_API_URL}/${path.replace(/\\/g, "/")}` : ""}
				alt="upload"
				height={50}
				width={50}
			/>
			<br />
			<div class="input-group mb-3">
				<input
					type="text"
					class="form-control"
					value={path ? `${process.env.NEXT_PUBLIC_API_URL}/${path.replace(/\\/g, "/")}` : ""}
					aria-describedby="basic-addon2"
					ref={inputRef}
				/>
				<button
					class="input-group-append btn btn-primary"
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
