import { useState } from "react";
import Box from "../components/Box";
import ContactForm from "../components/ContactForm";
import AboutForm from "../components/AboutForm";
import SocialForm from "../components/SocialForm";

const TABS = {
  ABOUT: 'about',
  CONTACT: 'contact',
  SOCIAL: 'social'
};

const StoreCustomization = () => {
  const [activeTab, setActiveTab] = useState(TABS.ABOUT);

  const renderContent = () => {
    switch (activeTab) {
      case TABS.ABOUT:
        return <AboutForm />;
      case TABS.CONTACT:
        return <ContactForm />;
      case TABS.SOCIAL:
        return <SocialForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Box className="shadow-sm">
        <ul className="hidden md:flex gap-5 text-sm z-[999]">
          {Object.entries(TABS).map(([key, value]) => (
            <li
              key={key}
              className={`flex flex-col items-center gap-1 cursor-pointer ${
                activeTab === value ? 'text-primary-1 font-bold' : ''
              }`}
              onClick={() => setActiveTab(value)}
            >
              <p>{value.charAt(0).toUpperCase() + value.slice(1)}</p>
              <hr className={`w-full border-none h-[1.5px] ${
                activeTab === value ? 'bg-primary-1' : 'bg-gray-200'
              }`} />
            </li>
          ))}
        </ul>
      </Box>

      <div className="mt-5 flex-1 w-full h-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoreCustomization;
