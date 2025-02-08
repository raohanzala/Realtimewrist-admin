import React, { useState } from 'react'
import Button from './Button';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/getCroppedImg';
import toast from 'react-hot-toast';
import SpinnerMini from './SpinnerMini';

const CropImageModal = ({croppingImage, currentImageSetter, setCroppingImage}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isLoading, setIsLoading] = useState(false)


  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    setIsLoading(true)
    try {
      const croppedImage = await getCroppedImg(croppingImage, croppedAreaPixels);
      const croppedFile = new File([croppedImage], `image-${Date.now()}.jpeg`, { type: "image/jpeg" });

      currentImageSetter(croppedFile);
    } catch (error) {
      console.error(error)
      toast.error("Failed to crop the image!");
    } finally {
      setCroppingImage(null);
      setIsLoading(false)
    }
  };

  return (
    <div>

    <div className="relative w-96 h-96">
          <Cropper
            image={croppingImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="mt-4 flex justify-between gap-2">
          <Button
            variant='cancel'
            size='medium'
            onClick={() => setCroppingImage(null)}
          >
            Cancel
          </Button>
          <Button
            variant='secondary'
            size='medium'
            onClick={handleCrop}
          >
            {!isLoading ? 'Confirm' : <SpinnerMini/>}
          </Button>
        </div>
            </div>
  )
}

export default CropImageModal