import { useSelector } from 'react-redux';
import Popular from '../components/landing/popular';
import Filters from '../constants/Filters';

const AdsPage = () => {
    const Ads = useSelector((state: any) => state.AllAds.SearchResults);
    console.log(`Hello view my ads`, Ads);

    return (
        <div className="flex parent ">
            <Filters />
            <div className="flex-1 mx-auto  my-body p-5">
                {Ads?.length > 0 ? (
                    <Popular Ads={Ads} />
                ) : (
                    <p className="text-center">Sorry 0 results found</p>
                )}
            </div>
        </div>
    );
};

export default AdsPage;
