import ProductInfo from '../components/SingleProduct/Detail';
import Related from '../components/SingleProduct/Related';

const AdInfo = () => {
    return (
        <div className=" w-[100vw] overflow-x-hidden">
            <ProductInfo />
            <Related />
        </div>
    );
};

export default AdInfo;
