import Productcard from '../Global/PopularCard';

const Popular = ({ Ads }: any) => {
    function formatPriceWithCommas(price: any) {
        if (price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return '';
    }

    return (
        <div className="px-4 w-full overflow-hidden bg-white shadow-lg py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {Ads?.map((product: any) => (
                    <Productcard
                        key={product.product_data?.producttid}
                        image={product.product_data?.mainimage}
                        name={product.product_data?.productname}
                        price={formatPriceWithCommas(product?.product_data?.productprice)}
                        id={product?.product_data?.producttid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Popular;
