import { useEffect, useState } from "react";
import Box from "../components/Box";
import ContactForm from "../components/ContactForm";
import AboutForm from "../components/AboutForm";
import SocialForm from "../components/SocialForm";
import HomeForm from "../components/HomeForm";
import ReviewForm from "../components/ReviewForm";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";

const TABS = {
  HOME: 'home',
  ABOUT: 'about',
  REVIEW: 'review',
  CONTACT: 'contact',
  SOCIAL: 'social'
};

const StoreCustomization = () => {
  const [activeTab, setActiveTab] = useState(TABS.ABOUT);

  const { setPageTitle } = useContext(ShopContext);
  useEffect(() => {
    setPageTitle("Store Customization");
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case TABS.HOME:
        return <HomeForm />;
      case TABS.ABOUT:
        return <AboutForm />;
      case TABS.REVIEW:
        return <ReviewForm />;
      case TABS.CONTACT:
        return <ContactForm />;
      case TABS.SOCIAL:
        return <SocialForm />;
      default:
        return null;
    }
  };

  return (
    <div className=" h-full" >
      <div className="bg-white border-b  py-3 -ml-8 -mr-8 -mt-8 w-full">
        <ul className="hidden md:flex gap-8 z-[999] px-5">
          {Object.entries(TABS).map(([key, value]) => (
            <li
              key={key}
              className={`cursor-pointer text-base`}
              onClick={() => setActiveTab(value)}
            >
              <p className={`${activeTab === value ? 'text-dark-2' : 'text-gray-400'}`}>{value.charAt(0).toUpperCase() + value.slice(1)}</p>
              <hr className={`w-full border-none h-[1.5px] bg-primary-1 ${activeTab === value ? 'opacity-1' : 'opacity-0'
                }`} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex-1 w-full h-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoreCustomization;
