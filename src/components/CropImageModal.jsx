import React, { useState } from 'react'
import Button from './Button';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/getCroppedImg';
import toast from 'react-hot-toast';

const CropImageModal = ({croppingImage, currentImageSetter, setCroppingImage}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);


  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(croppingImage, croppedAreaPixels);
      const croppedFile = new File([croppedImage], `image-${Date.now()}.jpeg`, { type: "image/jpeg" });

      currentImageSetter(croppedFile);
    } catch (error) {
      console.error(error)
      toast.error("Failed to crop the image!");
    } finally {
      setCroppingImage(null);
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
            onClick={() => setCroppingImage(null)}
          >
            Cancel
          </Button>
          <Button
            variant='secondary'
            onClick={handleCrop}
          >
            Confirm
          </Button>
        </div>
            </div>
  )
}

export default CropImageModal