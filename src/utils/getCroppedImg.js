export default async function getCroppedImg(imageSrc, pixelCrop) {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.setAttribute("crossOrigin", "anonymous"); 
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = url;
    });

  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.9 // Quality
    );
  });
}
