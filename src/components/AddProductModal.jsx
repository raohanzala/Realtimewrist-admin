import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { backendUrl } from '../App';
import { ShopContext } from '../contexts/ShopContext';
import Button from './BUtton';
import { assets } from '../assets/assets';

const AddProductModal = ({onClose}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('Quartz Machine, Stainless Steel Chain, Date Working, Master Lock, Best Quality.');
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [category, setCategory] = useState('men');
  const [subCategory, setSubcategory] = useState('quartz');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [availability, setAvailability] = useState('in_stock');

  const { setActionLoading,actionLoading, setPageTitle, fetchPaginatedList, token } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!oldPrice || isNaN(Number(oldPrice))) {
      toast.error("Please enter a valid Old Price");
      return;
    }
    if (!newPrice || isNaN(Number(newPrice))) {
      toast.error("Please enter a valid New Price");
      return;
    }
    if (!subCategory) {
      toast.error("Please select a Sub-Category");
      return;
    }
    if (!availability) {
      toast.error("Please select Availability");
      return;
    }

    setActionLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("oldPrice", oldPrice);
      formData.append("newPrice", newPrice);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("availibility", availability === "in_stock");
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });

      console.log(response)

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setOldPrice("");
        setNewPrice("");
        setCategory("");
        setSubcategory("");
        setAvailability("in_stock");
        setBestSeller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        fetchPaginatedList()
        onClose()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    setPageTitle('Add Product');
  }, []);

  return (
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] relative">
        <form onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-1 text-sm lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <label className="block mb-4">
                <span className="text-base">Product Title</span>
                <input
                  type="text"
                  className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring-primary focus:ring-2 "
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className="block mb-4">
                <span className="text-base">Product Description</span>
                <textarea
                  className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring-primary focus:ring-2 "
                  placeholder="Enter product description"
                  value={'Quartz Machine, Stainless Steel Chain, Date Working, Master Lock, Best Quality.'}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-base">Price</span>
                  <input
                    type="number"
                    className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring-primary focus:ring-2 "
                    placeholder="Regular price"
                    min="0"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-base">Sale Price</span>
                  <input
                    type="number"
                    className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring-primary focus:ring-2 "
                    placeholder="Sale price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </label>
              </div>

              <label className="block mt-4">
                <span className="text-base">Availability</span>
                <select
                  className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring-primary focus:ring-2 "
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </label>
            </div>

            {/* Right Column */}
            <div>
              {/* <label className="block mb-4">
                <span className="text-base">Sizes</span>
                <div className="flex gap-2 mt-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <span
                      key={size}
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                        )
                      }
                      className={`px-3 py-1 text-sm cursor-pointer rounded ${
                        sizes.includes(size) ? 'bg-black text-white' : 'bg-gray-200'
                      }`}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </label> */}

              <label className="block mb-4">
                <span className="text-base">Upload Images</span>
                <div className="flex gap-2 mt-2">
                  {[image1, image2, image3, image4].map((image, index) => (
                    <label key={index} className="cursor-pointer">
                      <img
                        src={!image ? assets.upload_area : URL.createObjectURL(image)}
                        alt=""
                        className="w-24 h-24 object-cover border rounded"
                      />
                      <input
                        type="file"
                        hidden
                        onChange={(e) =>
                          [setImage1, setImage2, setImage3, setImage4][index](e.target.files[0])
                        }
                      />
                    </label>
                  ))}
                </div>
              </label>

              <label className="block mb-4">
                <span className="text-base">Category</span>
                <select
                  className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring-primary focus:ring-2 "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                </select>
              </label>

              <label className="block mb-4">
                <span className="text-base">Sub Category</span>
                <select
                  className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring-primary focus:ring-2 "
                  value={subCategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option value="automatic">Automatic</option>
                  <option value="quartz">Quartz</option>
                  <option value="chain">Chain</option>
                  <option value="strap">Strap</option>
                </select>
              </label>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={bestSeller}
                  onChange={(e) => setBestSeller(e.target.checked)}
                  name='bestseller'
                />
                <span className="text-base" id='bestseller'>Best Seller</span>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center mt-6'>
            <Button type='button' btnType='cancel' onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit"
              disabled={actionLoading} isLoading={actionLoading}>
              Add product
            </Button>
          </div>
        </form>
      </div>
    // </div>
  );
};

export default AddProductModal;
