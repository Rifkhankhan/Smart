// import React, { useEffect, useRef, useState } from 'react'
// import "./ImageUploader.css"

// function ImageUploader(props) {

//     const [file, setFile] = useState()
//     const [previewUrl, setPreviewUrl] = useState()

//     const filePickerRef = useRef()

//     useEffect(() => {
//         if (!file) {
//             return
//         }


//         const fileReader = new FileReader()
//         fileReader.onload = () => {
//             setPreviewUrl(fileReader.result)
//         }
//         fileReader.readAsDataURL(file)

//     }, [file])
//   const pickHandler = (e) => {
//     let pickedFile 

//     if (e.target.files && e.target.files.length === 1) {
//         pickedFile = e.target.files[0]
//         setFile(pickedFile)
  
//     }

//     props.onInput(pickedFile)
//   }

//   const pickImageHandler = () => {
//     filePickerRef.current.click()
//   }
//   return (
//     <div className='form-control1'>
//         <input type="file" name="" value="" style={{display:'none'}} accept='.jpg,.png,.jpeg' onChange={pickHandler} ref={filePickerRef} />

//         <div className='image-upload'>
//             <div className='image-upload__preview'>
//             {previewUrl ? <><img src={previewUrl} alt='preview' /></> : <>{props.image && <img src={props.image} alt='preview' />}</> }
//             </div>

//             {!props.loading && <button type='button' onClick={pickImageHandler} >Pick Image</button>}
//             {props.loading && <button type='button' style={{backgroundColor:'red'}} onClick={pickImageHandler} disabled={props.loading}>Pick Image</button>}
//         </div>
//     </div>


//   )
// }


// export default ImageUploader


import React, { useState, useEffect, useRef } from 'react';
import './ImageUploader.css';

function ImageUploader(props) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const filePickerRef = useRef();

  // Effect for generating preview URL
  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);

    // Clean up the preview URL when the file changes
    return () => {
      setPreviewUrl(null);
    };
  }, [file]);

  // Handler for picking a file
  const pickHandler = (e) => {
    const pickedFile = e.target.files[0];

    if (pickedFile) {
      setFile(pickedFile);
      props.onInput(pickedFile); // Pass picked file to parent
    }
  };

  // Trigger file input click event
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  // Limit file size for upload (e.g., max 5MB)
  const isValidFileSize = (file) => file.size <= 5 * 1024 * 1024; // 5MB

  // Handle image size check
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidFileSize(file)) {
      pickHandler(e);
    } else {
      alert('File is too large. Please select a file less than 5MB.');
    }
  };

  return (
    <div className="form-control1">
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={handleFileChange}
        ref={filePickerRef}
        style={{ display: 'none' }}
      />

      <div className="image-upload">
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="preview" />
          ) : (
            props.image && <img src={props.image} alt="preview" />
          )}
        </div>

        <button
          type="button"
          onClick={pickImageHandler}
          disabled={props.loading}
          style={props.loading ? { backgroundColor: 'red' } : {}}
        >
          {props.loading ? 'Loading...' : 'Pick Image'}
        </button>
      </div>
    </div>
  );
}

export default ImageUploader;

