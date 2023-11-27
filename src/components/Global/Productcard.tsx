import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({ image, name, price, id }: productCard) {
    const navigate = useNavigate();

    return (
        <div
            className="rounded-lg bg-none radius-2xl w-[46vw] lg:w-[220px]  lg:px-[5px] h-[250px] lg:h-[280px] mb-2 duration-200 cursor-pointer hover:scale-95 "
            onClick={() => navigate(`/ad_info/${id}`)}
        >
            <img
                className="w-full h-2/3 lg:h-3/5 object-cover"
                src={image}
                alt={name}
                style={{
                    borderTopRightRadius: '0.75rem',
                    borderTopLeftRadius: '0.75rem',
                }}
            />
            <div className="py-1 h-1/3 lg:h-2/5 flex flex-col justify-between">
                <div>
                    <div className="flex flex-row justify-between text-md">
                        {/* <p className="text-green-dark truncate text-[14px] lg:text-md font-bold">
                            {seller}
                        </p> */}
                    </div>
                    <h1 className="text-[15px] text-black-main lg:text-md capitalize line-clamp-3">
                        {name}
                    </h1>

                    {/* <p className="text-black-main text-[14px]  line-clamp-1 lowercase">{description}</p> */}
                </div>
                <p className="text-black-main text-[18px] font-bold mb-2">Ksh: {price}</p>
                {/* <button className="bg-primary-orange w-full rounded-[15px] duration-300 hover:bg-secondary-orange hover:scale-105 text-white text-bold">
                    Inquire
                </button> */}
            </div>
        </div>
    );
}

export default Productcard;
