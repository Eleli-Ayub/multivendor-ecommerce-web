import React, { useState, useEffect } from 'react';
import { axiosService } from '../Redux/helpers/axios';
import { fetchCategories } from '../Redux/hooks/categories.actions';
import { useDispatch, useSelector } from 'react-redux';
import { SearchingProduct } from '../Redux/slices/AdsSlice';
import { AppDispatch } from '../Redux/store';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [category, setCategory] = useState<string>('all');
    const [, setSubcategory] = useState<string>('all');
    const [categories, setCategories] = useState<any[]>([]);
    const [, setSubcategories] = useState<any[]>([]);
    const [, setIsLoading] = useState<boolean>(false);
    const { open } = useSelector((state: any) => state.opener);
    const [searchParam, setSearchParam] = useState<string>('');

    const Ads = useSelector((state: any) => state.AllAds.Ads);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

        if (selectedCategory === 'all') {
            // Handle the case when "all" is selected, clear subcategories.
            setSubcategory('all');
            setSubcategories([]);
        } else {
            // Fetch subcategories based on the selected category
            setIsLoading(true);
            axiosService
                .get(`/subcategories/getsubcategories/${selectedCategory}`)
                .then((response) => {
                    const subcategories = response.data.Data;
                    setSubcategories(subcategories);
                    setSubcategory('all');
                })
                .catch((error) => {
                    console.error('Error fetching subcategories:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    useEffect(() => {
        // Fetch categories when the component mounts
        setIsLoading(true);
        fetchCategories()
            .then((response) => {
                setCategories(response.data.Data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleSearch = () => {
        console.log('Search button clicked');
        dispatch(SearchingProduct(searchParam));
        navigate('/search/products');
        console.log(searchParam);
    };

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // Prevents the form from submitting and triggering a full-page reload
                    handleSearch();
                }}
                className=" hidden h-[auto] md:flex items-center w-screen my-4 px-40 bg-[white] mb-2"
            >
                <select
                    id="categorySelect"
                    value={category}
                    onChange={handleCategoryChange}
                    className="p-5 border border-r-0 rounded w-[200px] bg-white outline-none rounded-l-[20px]"
                >
                    <option value="all">Search by category</option>
                    {categories.map((category) => (
                        <option key={category.categoryid} value={category.categoryname}>
                            {category.categoryname}
                        </option>
                    ))}
                </select>

                <div className="relative w-[70%] border border-l-0 px-10 py-1">
                    <input
                        type="text"
                        placeholder="search for anything"
                        className="px-10    "
                        value={searchParam}
                        onChange={(e) => setSearchParam(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-primary-orange text-white rounded hover:bg-secondary-orange transition-colors delay-300 w-[250px] outline-none shadow-custom py-5 rounded-r-[20px]"
                >
                    Search [{Ads?.length}Ads]
                </button>
            </form>

            {/* for smaller devices */}

            {open && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevents the form from submitting and triggering a full-page reload
                        handleSearch();
                    }}
                    className=" search h-[60px] flex items-center w-screen my-4 px-1"
                >
                    <select
                        id="categorySelect"
                        value={category}
                        onChange={handleCategoryChange}
                        className="p-5 border border-r-0 rounded w-[30%]  bg-white outline-none rounded-l-[20px]"
                    >
                        <option value="all">All</option>
                        {categories.map((category) => (
                            <option key={category.categoryid} value={category.categoryname}>
                                {category.categoryname}
                            </option>
                        ))}
                    </select>

                    <div className="relative  border border-l-0 py-1 h-[100%]">
                        <input
                            type="text"
                            placeholder="search for anything"
                            className="p-5 h-100%"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-primary-orange text-white rounded hover:bg-secondary-orange transition-colors delay-300 outline-none shadow-custom rounded-r-[20px] p-[1.2rem]"
                    >
                        Search
                    </button>
                </form>
            )}
        </>
    );
};

export default SearchBar;
