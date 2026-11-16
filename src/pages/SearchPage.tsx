import React, { useEffect, useState } from 'react';
import { Tune } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { productsAPI, categoriesAPI, brandsAPI, locationsAPI } from '../api/api';
import EcomusProductCard, { CatalogProduct } from '../components/Global/EcomusProductCard';

type Option = Record<string, unknown>;

const optionId = (option: Option) => String(option.id || option.categoryid || option.brandid || '');
const optionName = (option: Option) => String(option.name || option.category_name || option.categoryname || option.brandname || option.region_name || '');

const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<CatalogProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [categories, setCategories] = useState<Option[]>([]);
    const [brands, setBrands] = useState<Option[]>([]);
    const [locations, setLocations] = useState<Option[]>([]);
    const [page, setPage] = useState(1);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const limit = 20;

    const filters = {
        keyword: searchParams.get('keyword') || '',
        category_id: searchParams.get('category_id') || '',
        subcategory_id: searchParams.get('subcategory_id') || '',
        brand_id: searchParams.get('brand_id') || '',
        location_id: searchParams.get('location_id') || '',
        min_price: searchParams.get('min_price') || '',
        max_price: searchParams.get('max_price') || '',
        sort: searchParams.get('sort') || 'newest',
    };

    useEffect(() => {
        Promise.all([categoriesAPI.getAll(), brandsAPI.getAll(), locationsAPI.getAll()])
            .then(([categoryResponse, brandResponse, locationResponse]) => {
                setCategories(categoryResponse.data.data || []);
                setBrands(brandResponse.data.data || []);
                setLocations(locationResponse.data.data || []);
            })
            .catch(() => undefined);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params: Record<string, string | number> = { page, limit };
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) params[key] = value;
                });
                const response = await productsAPI.filter(params);
                setProducts((response.data.data as CatalogProduct[]) || []);
                setTotal(response.data.total || 0);
            } catch {
                setProducts([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        // The URL is the source of truth for this view's filters.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, page]);

    const updateFilter = (key: string, value: string) => {
        const nextParams = new URLSearchParams(searchParams.toString());
        if (value) nextParams.set(key, value);
        else nextParams.delete(key);
        setSearchParams(nextParams);
        setPage(1);
    };

    const clearFilters = () => {
        setSearchParams(new URLSearchParams());
        setPage(1);
    };

    const filtersPanel = (
        <div className="space-y-5">
            <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">Search</label>
                <input
                    type="search"
                    value={filters.keyword}
                    onChange={(event) => updateFilter('keyword', event.target.value)}
                    placeholder="What are you looking for?"
                    className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm outline-none focus:border-gray-950 focus:ring-0"
                />
            </div>

            {[
                ['category_id', 'Category', categories],
                ['brand_id', 'Brand', brands],
                ['location_id', 'Location', locations],
            ].map(([key, label, options]) => (
                <div key={key as string}>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label as string}</label>
                    <select
                        value={filters[key as keyof typeof filters]}
                        onChange={(event) => updateFilter(key as string, event.target.value)}
                        className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm outline-none focus:border-gray-950 focus:ring-0"
                    >
                        <option value="">All {label as string}s</option>
                        {(options as Option[]).map((option) => (
                            <option key={optionId(option)} value={optionId(option)}>{optionName(option)}</option>
                        ))}
                    </select>
                </div>
            ))}

            <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">Price range · KES</label>
                <div className="flex gap-3">
                    <input value={filters.min_price} onChange={(event) => updateFilter('min_price', event.target.value)} type="number" placeholder="Min" className="w-1/2 border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm outline-none focus:border-gray-950 focus:ring-0" />
                    <input value={filters.max_price} onChange={(event) => updateFilter('max_price', event.target.value)} type="number" placeholder="Max" className="w-1/2 border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm outline-none focus:border-gray-950 focus:ring-0" />
                </div>
            </div>

            <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">Sort by</label>
                <select value={filters.sort} onChange={(event) => updateFilter('sort', event.target.value)} className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm outline-none focus:border-gray-950 focus:ring-0">
                    <option value="newest">Newest</option>
                    <option value="most_viewed">Most viewed</option>
                    <option value="price_low">Price: low to high</option>
                    <option value="price_high">Price: high to low</option>
                </select>
            </div>

            <button type="button" onClick={clearFilters} className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 underline underline-offset-4 hover:text-gray-950">
                Clear all filters
            </button>
        </div>
    );

    return (
        <main className="min-h-screen bg-white text-gray-900">
            <section className="bg-[#f2f1e5] px-4 py-12 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-[1440px]">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#637545]">Marketplace</p>
                    <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-[#303828] sm:text-5xl">Shop products made for your everyday.</h1>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600">Explore products from trusted sellers, filter by what matters, and find your next favorite.</p>
                </div>
            </section>

            <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12">
                <button type="button" onClick={() => setFiltersOpen((open) => !open)} className="mb-6 inline-flex items-center gap-2 border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] md:hidden">
                    <Tune fontSize="small" /> {filtersOpen ? 'Hide filters' : 'Show filters'}
                </button>

                <div className="grid gap-10 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
                    <aside className={`${filtersOpen ? 'block' : 'hidden'} md:block`}>
                        <div className="md:sticky md:top-28">
                            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                                <h2 className="text-sm font-semibold uppercase tracking-[0.12em]">Filter products</h2>
                            </div>
                            {filtersPanel}
                        </div>
                    </aside>

                    <section>
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-5">
                            <div>
                                <p className="text-xs uppercase tracking-[0.12em] text-gray-500">{total} products</p>
                                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">{filters.keyword ? `Results for “${filters.keyword}”` : 'All products'}</h2>
                            </div>
                            <span className="text-xs text-gray-500">Page {page}</span>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                                {Array.from({ length: 8 }).map((_, index) => <div key={index} className="aspect-[4/5] animate-pulse bg-gray-100" />)}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="border border-dashed border-gray-300 px-6 py-20 text-center text-sm text-gray-500">No products found. Try adjusting your filters.</div>
                        ) : (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
                                {products.map((product) => <EcomusProductCard key={String(product.id || product.producttid)} product={product} />)}
                            </div>
                        )}

                        <div className="mt-10 flex items-center justify-center gap-3">
                            <button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] disabled:cursor-not-allowed disabled:opacity-30">Previous</button>
                            <button type="button" disabled={products.length < limit} onClick={() => setPage((current) => current + 1)} className="bg-gray-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:cursor-not-allowed disabled:opacity-30">Next</button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default SearchPage;
