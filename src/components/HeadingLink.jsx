import { Link } from 'react-router-dom';
// import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { HiArrowLongRight } from 'react-icons/hi2';

function HeadingLink({ title, link }) {
    return (
        <div className='w-full flex justify-between items-center mb-4 px-2'>
            <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>

            <Link
                to={`${link}`}
                className='text-sm text-[#6a6a6a] hover:underline flex items-center group'
            >
                View All 
                {/* <span className="ml-1 opacity-0 text-md group-hover:opacity-100 transition-opacity duration-300">
                <HiArrowLongRight />
                </span> */}
            </Link>
        </div>
    );
}

export default HeadingLink;
