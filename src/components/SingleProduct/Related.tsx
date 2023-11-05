import Productcard from '../Global/RelatedCard';
import { products } from '../../data/sponsered';

const Related = () => {
    return (
        <div className="lg:p-5 ">
            <div className="bg-green-700 bg-opacity-10 pb-2 ">
                <div className="py-3  flex flex-row items-center justify-between px-5 md:justify-center">
                    <h1 className="text-stone-700">You May also like</h1>
                    <button className="underline rounded-lg px-2 text-sm py-1 text-slate-500">
                        see all
                    </button>
                </div>

                <div className="flex lg:px-5 gap-3 lg:gap-10 px-2 flex-wrap ">
                    {products.map((product) => (
                        <Productcard
                            key={product.name}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            seller={product.seller}
                            id={product.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Related;
