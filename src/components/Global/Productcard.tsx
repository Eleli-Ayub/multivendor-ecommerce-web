// import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';
// import { BsBookmarkPlus, BsCloudDownload, BsWhatsapp } from "react-icons/bs";
// import { PiShareFatLight } from "react-icons/pi";
// import { AiOutlineComment, AiOutlineEye, AiOutlinePhone } from "react-icons/ai";
// import { MdOutlineEmail, MdOutlineFavoriteBorder } from "react-icons/md";

function Productcard({
    image,
    name,
    price,
    seller,
    // description,
    id,
}: productCard) {
    // const navigate = useNavigate();
    return (
        <div
            className="rounded-lg bg-stone-100 radius-2xl w-[200px]
      h-[200px] lg:h-[300px] mb-2  border border-gray-300 duration-200 cursor-pointer hover:bg-stone-200 hover:scale-95"
            onClick={() => console.log(id)}
        >
            <img className="rounded-lg h-2/5 lg:h-3/5 w-full object-cover " src={image} />
            <div className="px-3 py-1">
                <div className="flex flex-col justify-between text-md">
                    <h1 className="text-slate-700 text-[14px] font-bold uppercase truncate">
                        {name}
                    </h1>
                    <p className="text-xs text-green-400 truncate ">{seller} </p>
                </div>
                <p className="text-stone-500 font-bold text-[14px]">Ksh: {price}</p>
                <div className="flex flex-row items-center justify-start">
                    <p className="text-slate-400 text-xs"> rated 4.5 </p>
                    <p className="text-xs text-slate-400">(of 200 reviews)</p>
                </div>
                <button className=" bg-secondary-orange mt-2 w-full rounded-[20px] duration-300 hover:bg-orange-300 hover:scale-105 ">
                    Inquire
                </button>
            </div>
        </div>
    );
}

export default Productcard;
