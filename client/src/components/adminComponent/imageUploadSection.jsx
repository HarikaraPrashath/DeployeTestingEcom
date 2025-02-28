import React, {  useRef,useEffect } from 'react';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import axios from 'axios';

function imageUploadSection({imageFile, setImageFile,setImageLoadingState,setUploadedImageUrl,uploadedImageUrl }) {
 
 
    const inputRef = useRef(null); // To reset the input field
  
    // Handle file selection from input
    function handleImageFileChange(event) {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setImageFile(selectedFile);
      
      }
    }
  
    // Handle drag-over event
    function handleDragOver(e) {
      e.preventDefault();
    }
  
    // Handle file drop event
    function handleDrop(e) {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) {
        setImageFile(droppedFile);
      }
    }
  
    // Remove selected image
    function handleRemoveImage() {
      setImageFile(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }

    // upload the image to cloudinary
    async function uploadingImageToCloudinary() {
      setImageLoadingState(true);
      const data = new FormData();
      data.append('my_file', imageFile);
    
      try {
        const response = await axios.post(
          'http://localhost:5000/api/admin/product/uploadimage', data
        );
    
        console.log('response',response);  // Check the API response structure

        if(response.data.success){
          setUploadedImageUrl(response.data.result.url);  
        }
        
      } catch (error) {
        console.error('Image upload failed:', error);
        setImageLoadingState(false);
      }
    }

    useEffect(() => {
      if (imageFile !== null) {
        uploadingImageToCloudinary(); // Upload the image to Cloudinary
      }
    }, [imageFile]);
    
  return (
    <div>
     <div className="border-4 rounded-lg border-dotted border-green-500 w-ful">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="w-full px-4 py-6  border-green-500 rounded-lg bg-green-50 shadow-md hover:shadow-lg transition-all duration-300"
      >
        {!imageFile ? (
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center cursor-pointer text-center text-green-700"
          >
            <UploadCloudIcon className="w-10 h-10 text-green-500 mb-2" />
            <span className="font-semibold">Click to upload an image</span>
            <span className="text-sm text-green-500">
              (Supported formats: JPG, PNG, GIF)
            </span>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              ref={inputRef}
              onChange={handleImageFileChange}
            />
          </label>
        )  : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-green-500 mr-2" />
              <p className="text-sm font-medium truncate">{imageFile.name}</p>
            </div>
            <button
              variant="ghost"
              size="icon"
              className="text-green-500 hover:text-red-500"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}


imageUploadSection.propTypes = {
    imageFile: PropTypes.object,
    setImageFile: PropTypes.func.isRequired,
  };

export default imageUploadSection;