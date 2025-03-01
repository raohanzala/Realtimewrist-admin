import { useEffect, useState } from 'react';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductInfo from '../components/ProductInfo';
import SpinnerMini from '../components/SpinnerMini';
import { useProduct } from '../features/useProduct';
import Box from '../components/Box';
import Modal from '../components/Modal';
import AddProductForm from '../components/AddProductForm';


const Product = () => {
  const [image, setImage] = useState('');
  const [isProductModal, setIsProductModal] = useState(false)

  const {isLoading, product} = useProduct()

  useEffect(() => {
    if (product) {
      setImage(product?.images?.[0]);
    }
  }, [product]);

  // if (!product) {
  //   return <div className='w-full h-screen flex justify-center items-center'> <SpinnerMini variant='secondary' /></div>;
  // }

  if(isLoading){
    return <SpinnerMini variant='secondary'/>
  }

  return (
    <Box className="transition-opacity ease-in duration-500 opacity-100 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* <Breadcrumb breadcrumbs={breadcrumbs} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-12 gap-8 ">
        <ProductImageGallery setImage={setImage} image={image} product={product}/>

        <ProductInfo productData={product} setIsProductModal={setIsProductModal} />
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border-t border-l px-5 py-3 text-sm cursor-pointer">Description</b>
          <p className="border px-5 border-b-0 py-3 text-sm cursor-not-allowed">Reviews (0)</p>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-500 flex flex-col gap-4">
          <p>{product.description}</p>
        </div>
      </div>

      <Modal
        isOpen={isProductModal}
        title={"Edit Product"}
        onClose={() => setIsProductModal(false)}
      >
        <AddProductForm
          onClose={() => setIsProductModal(false)}
          productToEdit={product}
        />
      </Modal>
    </Box>
  );
};

export default Product;

