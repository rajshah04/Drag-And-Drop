import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const DragNDrop = () => {
    const [selectedImages, setSelectedImages] = useState([]) ;
    const [isDragging, setIsDragging] = useState(false) ;

    const handleImageUpload = (e) => {
        const files = e.target.files || e.dataTransfer.files ;
        // console.log("Files : ", files) ;
        // console.log("Files ki length : ", files.length) ;
        // console.log(`${files.length} images are selected.`) ;

        if(files.length > 14){
            toast.error("Please select less than 14 images.") ;
            return ;
        }

        const images = [] ;

        for(let i = 0 ; i < files.length ; i++){
            const file = files[i] ;

            if(file.type.startsWith("image/")){
                const reader = new FileReader() ;

                reader.onload = () => {
                    images.push(reader.result) ;
                    if(images.length === files.length){
                        setSelectedImages((prevImages) => [...prevImages, ...images]) ;
                    }
                }

                reader.readAsDataURL(file) ; 
            }
            else{
                toast.error(`Unsupported file type: ${file.name}`) ;
            }
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault() ;
        setIsDragging(true) ;
    }

    const handleDragLeave = () => {
        setIsDragging(false) ;
    }

    const handleDrop = (e) => {
        e.preventDefault() ;
        setIsDragging(false) ;
        handleImageUpload(e) ;
    }

    const handleClearImages = () => {
        setSelectedImages([]) ;
    }

    const handleRemoveSpecificImage = (index) => {
        // console.log("Images before deleting : ", selectedImages) ;

        setSelectedImages((prevImages) => prevImages.filter((_, ind) => ind !== index)) ;

        // console.log("Images after deleting : ", selectedImages) ;
    }

    return (
        <div className="flex flex-col items-center">

            {/* Drag-and-Drop Zone */}
            <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`mt-4 w-80 h-40 border-2 rounded-lg flex items-center justify-center transition-all 
             ${ isDragging ? "border-blue-500" : "bg-slate-500 opacity-60" }`} >
                
                <div className='flex flex-col items-center justify-center'>
                    <div className='grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800'>
                        <FaCloudUploadAlt className='text-white opacity-90 text-3xl' />
                    </div>

                    <p className='text-white text-sm'>
                        {
                            isDragging ? "Drop Here" : "Drag & Drop Images here"
                        }
                    </p>
                </div>
            </div>

            {/* buttons wala div */}
            <div className='mt-6 flex justify-center items-center gap-4'>
                {/* image upload button */}
                <label htmlFor="file-upload" className='px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200 text-base'>
                    Select Images
                </label>

                <input id="file-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} className='hidden' />

                {/* button to clear all images */}
                {
                    selectedImages.length > 0 && (
                        <button onClick={handleClearImages} className='mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 text-base -translate-y-2' >
                            Clear All Images
                        </button>
                    )
                }
            </div>

            {/* Selected Images Preview */}
            <div className='mt-6 grid grid-cols-7 gap-4'>
                {
                    selectedImages.map((image, index) => (
                        <div key={index} className='w-40 h-40 mb-8'>
                            <div className='w-40 h-40'>
                                <img src={image} alt={`Selected ${index + 1}`} className='w-full h-full object-cover rounded-lg image-shadow-1' />
                            </div>

                            <div className='flex justify-end mt-2 cursor-pointer'>
                                <div className='w-8 h-8 bg-red-500 rounded-full grid place-items-center'>
                                    <RiDeleteBin5Line onClick={() => handleRemoveSpecificImage(index)} className='text-white' />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DragNDrop