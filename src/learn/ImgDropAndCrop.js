import './ImgDropAndCrop.css';
import React, { Component, createRef } from 'react'

import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'

import { base64StringtoFile, downloadBase64File, image64toCanvasRef, extractImageFileExtensionFromBase64 } from './ReusableUtils'

const imageMaxSize = 1000000000
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })

class ImgDropAndCrop extends Component {
    constructor(props) {
        super(props)
        this.imagePreviewCanvasRef = React.createRef()
        this.fileInputRef = React.createRef()
        this.state = {
            imgSrc: null,
            imgSrcExt: null,
            crop: {
                aspect: 1 / 1
            }
        }
    }

    verifyFiles = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0]
            //console.log(files)
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if (currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    handleOnDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            this.verifyFiles(rejectedFiles)
        }
        if (files && files.length > 0) {
            const isVerified = this.verifyFiles(files)
            if (isVerified) {
                //imageBase64Data
                const currentFile = files[0]
                const myFileItemreader = new FileReader()
                myFileItemreader.addEventListener("load", () => {
                    //console.log(myFileItemreader.result)
                    const myResult = myFileItemreader.result
                    this.setState({
                        imgSrc: myResult,
                        imgSrcExt: extractImageFileExtensionFromBase64(myResult)
                    })
                }, false)

                myFileItemreader.readAsDataURL(currentFile)
            }
        }
    }

    handleImageLoaded = (image) => {
        // console.log(image)
    }

    handleOnCropChange = (crop) => {
        // console.log(crop)
        this.setState({ crop: crop })
        // console.log(this.state)
    }

    handleOnCropComplete = (pixelCrop, crop) => {
        // console.log((crop, pixelCrop))
        // console.log(pixelCrop)

        const canvasRef = this.imagePreviewCanvasRef.current
        const { imgSrc } = this.state
        image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
    }

    handleDownloadButton = (e) => {
        e.preventDefault()

        const { imgSrc } = this.state
        if (imgSrc) {
            const canvasRef = this.imagePreviewCanvasRef.current

            const { imgSrcExt } = this.state
            const imageData64 = canvasRef.toDataURL('image/')

            const myFilename = "previewFile." + imgSrcExt

            // file to be uploaded
            const myNewCroppedFile = base64StringtoFile(imgSrc, myFilename)
            console.log(myNewCroppedFile)

            // file to be downloaded
            downloadBase64File(imageData64, myFilename)
            this.handleClearToDefault()
        }
    }

    handleClearToDefault = (e) => {
        if(e) e.preventDefault()
        const canvas = this.imagePreviewCanvasRef.current
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width, canvas.height)

        this.setState({
            imgSrc: null,
            imgSrcExt: null,
            crop: {
                aspect: 1 / 1
            }
        })
        this.fileInputRef.current.value = null

    }

    handleFileSelect = event => {
        // console.log(event)
        const files = event.target.files
        console.log(files)
        if (files && files.length > 0){
              const isVerified = this.verifyFiles(files)
             if (isVerified){
                 // imageBase64Data 
                 const currentFile = files[0]
                 const myFileItemReader = new FileReader()
                 myFileItemReader.addEventListener("load", ()=>{
                     // console.log(myFileItemReader.result)
                     const myResult = myFileItemReader.result
                     this.setState({
                         imgSrc: myResult,
                         imgSrcExt: extractImageFileExtensionFromBase64(myResult)
                     })
                 }, false)

                 myFileItemReader.readAsDataURL(currentFile)

             }
        }
    }

    render() {
        const { imgSrc } = this.state
        return (
            <div>
                <h1>Drop and Crop</h1>
                <input ref={this.fileInputRef} type="file" accept={acceptedFileTypes} multiple={false} onChange={this.handleFileSelect}/>
                {imgSrc !== null ?
                    <div>
                        {/* {imgSrc}
                        <img src={imgSrc} alt = 'Preview of Uploaded Image'/> */}

                        <ReactCrop
                            src={imgSrc}
                            crop={this.state.crop}
                            onChange={this.handleOnCropChange}
                            onImageLoaded={this.handleImageLoaded}
                            onComplete={this.handleOnCropComplete}
                        />
                        <br />
                        <p>Preview Canvas Crop </p>
                        <canvas ref={this.imagePreviewCanvasRef} />
                        <br />
                        <button onClick={this.handleDownloadButton}>Download</button>
                        <button onClick={this.handleClearToDefault}>Clear</button>
                    </div>
                    :
                    <Dropzone onDrop={this.handleOnDrop} multiple={false} maxSize={imageMaxSize} accept={acceptedFileTypes}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className='dropzone'>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        )}
                    </Dropzone>}
            </div>
        )
    }
}


export default ImgDropAndCrop
