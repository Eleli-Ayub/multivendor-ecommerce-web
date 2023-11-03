import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({
    image,
    name,
    price,
    seller,
    // description,
    id,
}: productCard) {
    const navigate = useNavigate();
    return (
        <div className="relative w-full lg:w-72 lg:h-96 h-24 mb-2 cursor-pointer">
            <div className="absolute top-0 right-[5px] lg:left-0 z-10 ">
                <button className="bg-blue-800 text-[8px] px-[3px] py-[1px] lg:text-sm text-white lg:px-2 lg:py-1 rounded ">
                    Sponsored
                </button>
            </div>
            <div
                className="flex h-full py-1 flex-row lg:flex-col max-w-sm rounded-lg bg-stone-50 radius-2xl  border-gray-300 mb-2 price relative hover:bg-green-100 hover:scale-105 duration-300"
                onClick={() => navigate(`/ad_info/${id}`)}
            >
                <img className="rounded-lg w-1/3 h-full lg:h-3/5 lg:w-full object-cover bg-gray-light " src={image} />
                <div className="px-3 py-2 w-2/3">
                    <div className="flex flex-row justify-between text-md">
                        <p className="text-green-400 truncate text-[10px] lg:text-md ">{seller} </p>
                    </div>
                    <h1 className="text-slate-700 text-xs lg:text-md font-bold uppercase truncate">{name}</h1>
                    <p className="text-stone-500 text-sm font-bold">Ksh: {price}</p>
                    <div className="flex flex-row items-center justify-start">
                        <p className="text-slate-400 text-xs"> rated 4.5 </p>
                        <p className="text-xs text-slate-400 my-2">(of 200 reviews)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productcard;
