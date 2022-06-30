import React from "react"
import { useState, useReducer, useRef } from "react"
import Uploaded from "./components/Uploaded"
import Uploading from "./components/Uploading"
import FilePreview from "./components/FilePreview"
import axios from "axios"

export default function Home() {
	const [isUploading, setIsUploading] = useState(false)
	const [isUploaded, setIsUploaded] = useState(false)
	const [imgPath, setImgPath] = useState("")
	const containerRef = useRef(null)
	const inputRef = useRef(null)
	const reducer = (state, action) => {
		switch (action.type) {
			case "SET_IN_DROP_ZONE":
				return { ...state, inDropZone: action.inDropZone }
			case "ADD_FILE_TO_LIST":
				return { ...state, fileList: action.files }
			default:
				return state
		}
	}

	// destructuring state and dispatch, initializing fileList to empty array
	const [data, dispatch] = useReducer(reducer, {
		inDropZone: false,
		fileList: [],
	})

	const handleChange = (file) => {
		// API handler
		setIsUploading(true)

		const data = new FormData()
		data.append("image", file)

		var config = {
			method: "post",
			url: `${process.env.NEXT_PUBLIC_API_URL}/upload`,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		}

		axios(config)
			.then((response) => {
				setImgPath(response.data.imgPath)
				setIsUploading(false)
				setIsUploaded(true)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	// Dropzone handlers
	const handleDragEnter = (e) => {
		e.preventDefault()
		e.stopPropagation()
		dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true })
	}

	// onDragLeave sets inDropZone to false
	const handleDragLeave = (e) => {
		e.preventDefault()
		e.stopPropagation()

		dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false })
	}

	// onDragOver sets inDropZone to true
	const handleDragOver = (e) => {
		e.preventDefault()
		e.stopPropagation()

		// set dropEffect to copy i.e copy of the source item
		e.dataTransfer.dropEffect = "copy"
		dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true })
	}

	// onDrop sets inDropZone to false and adds files to fileList
	const handleDrop = (e) => {
		e.preventDefault()
		e.stopPropagation()

		// get files from event on the dataTransfer object as an array
		let files = [...e.dataTransfer.files]

		// ensure a file or files are dropped
		if (files && files.length > 0) {
			// loop over existing files
			const existingFiles = data.fileList.map((f) => f.name)
			// check if file already exists, if so, don't add to fileList
			// this is to prevent duplicates
			files = files.filter((f) => !existingFiles.includes(f.name))
			// dispatch action to add droped file or files to fileList
			dispatch({ type: "ADD_FILE_TO_LIST", files })
			// reset inDropZone to false
			dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false })

			// API handler
			handleChange(files[0])
		}
	}

	return (
		<React.Fragment>
			<div className="container">
				<div className="row min-vh-100 justify-content-center align-items-center">
					<div
						ref={containerRef}
						className="center w-50 mx-auto shadow px-5 py-5 text-center rounded"
					>
						{isUploading ? (
							<Uploading />
						) : isUploaded && !isUploading && imgPath != "" ? (
							<Uploaded path={imgPath} />
						) : (
							<React.Fragment>
								<h2 className="py-0 my-0">Upload your image</h2>
								<p className="p-4 my-0">File should be JPEG, PNG...</p>
								{/*<DropZone data={data} dispatch={dispatch} />*/}
								<div
									id="drop-container"
									className="container border border-primary rounded px-4 py-4"
								>
									<div
										className="text-center"
										onDragEnter={(e) => handleDragEnter(e)}
										onDragOver={(e) => handleDragOver(e)}
										onDragLeave={(e) => handleDragLeave(e)}
										onDrop={(e) => handleDrop(e)}
									>
										<img
											className="img-fluid center-block w-50 rounded mx-auto py-4"
											src="/upload.svg"
											alt="upload"
											height={50}
											width={50}
										/>

										<input
											id="fileSelect"
											type="file"
											multiple
											className="h-0"
											style={{ visibility: "hidden" }}
										/>
										<label htmlFor="fileSelect" className="center">
											Drag & Drop your image here
										</label>
									</div>
									{/* Pass the selectect or dropped files as props */}
									<FilePreview fileData={data} />
								</div>
								<p className="p-4 my-0">or</p>
								<input
									id="files"
									style={{ visibility: "hidden" }}
									type="file"
									ref={inputRef}
									onChange={(e) => {
										handleChange(e.target.files[0])
									}}
								/>
								<label
									htmlFor="files"
									className="bg-primary text-white py-2 px-4 rounded shadow-sm"
								>
									Choose a file
								</label>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}
