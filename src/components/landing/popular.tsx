import Productcard from "../Global/PopularCard";
// import { ProductData } from '../../interface/common';z

const Popular = ({ Ads }: any) => {
  // const dispatch = useDispatch<AppDispatch>();

  function formatPriceWithCommas(price: any) {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return ""; // or any default value you prefer if price is undefined
  }

  return (
    <div className="px-4  w-full overflow-hidden bg-white shadow-lg ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 w-full py-4">
        {Ads?.map((product: any) => (
          <Productcard
            key={product.product_data?.producttid}
            image={product.product_data?.mainimage}
            name={product.product_data?.productname}
            price={formatPriceWithCommas(product?.product_data?.productprice)}
            // seller={product?.user_name}
            id={product?.product_data?.producttid}
            // description={product?.product_data?.productdescription}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
