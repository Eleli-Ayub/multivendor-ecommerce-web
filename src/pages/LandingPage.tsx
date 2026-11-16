import React, { useEffect } from 'react';
import { ArrowForward, East } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLanding } from '../Redux/slices/productsSlice';
import { AppDispatch, RootState } from '../Redux/store';
import EcomusProductCard, { CatalogProduct } from '../components/Global/EcomusProductCard';

const categoryColors = ['bg-[#ebe9d8]', 'bg-[#dfe7d5]', 'bg-[#e9e4dc]', 'bg-[#d9e0e2]', 'bg-[#ece8df]', 'bg-[#dce4d0]'];

const LandingPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { landingData, isLoading } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchLanding());
    }, [dispatch]);

    const promoted = (landingData?.promoted_products as CatalogProduct[]) || [];
    const highlighted = (landingData?.highlighted_products as CatalogProduct[]) || [];
    const random = (landingData?.random_products as CatalogProduct[]) || [];
    const categories = (landingData?.categories as CatalogProduct[]) || [];
    const promotedVendors = (landingData?.promoted_vendors as CatalogProduct[]) || [];

    if (isLoading) {
        return <div className="flex min-h-[70vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-gray-950" /></div>;
    }

    return (
        <main className="min-h-screen bg-white text-gray-900">
            <section className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-8 lg:px-12">
                <div className="relative overflow-hidden rounded-sm bg-[#ebe9d8] px-6 py-16 sm:px-12 sm:py-24 lg:px-20 lg:py-32">
                    <div className="relative z-10 max-w-xl">
                        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#637545]">The marketplace edit</p>
                        <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.05em] text-[#38442c] sm:text-6xl">Find good things. Sell what matters.</h1>
                        <p className="mt-6 max-w-md text-sm leading-6 text-gray-600">A considered marketplace for products from independent sellers and growing businesses.</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/products" className="inline-flex items-center gap-2 bg-[#455230] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#334024]">Shop products <ArrowForward fontSize="small" /></Link>
                            <Link to="/services" className="inline-flex items-center gap-2 border border-[#455230]/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#455230] transition hover:bg-white/60">Our story</Link>
                        </div>
                    </div>
                    <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[36px] border-white/40 sm:h-[30rem] sm:w-[30rem] sm:border-[52px]" />
                    <div className="absolute -bottom-28 right-20 h-56 w-56 rounded-full bg-[#637545]/20 sm:h-80 sm:w-80" />
                </div>
            </section>

            {categories.length > 0 && (
                <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-12">
                    <div className="mb-7 flex items-end justify-between gap-4">
                        <div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">Explore the edit</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Shop by category</h2></div>
                        <Link to="/products" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-600 hover:text-gray-950 sm:flex">View all <East fontSize="small" /></Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                        {categories.slice(0, 6).map((category, index) => {
                            const id = String(category.id || category.categoryid || '');
                            const name = String(category.name || category.category_name || category.categoryname || 'Category');
                            return (
                                <Link key={id || name} to={`/products?category_id=${id}`} className={`group flex min-h-36 flex-col justify-between p-4 ${categoryColors[index % categoryColors.length]} transition hover:-translate-y-1`}>
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-sm font-semibold text-[#455230]">{name.charAt(0).toUpperCase()}</span>
                                    <span><span className="block text-sm font-semibold capitalize text-[#303828]">{name}</span><span className="mt-1 block text-xs text-gray-500">{String(category.product_count || 0)} products</span></span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {promoted.length > 0 && <ProductSection eyebrow="Curated for you" title="Featured products" products={promoted} />}
            {highlighted.length > 0 && <ProductSection eyebrow="Worth a closer look" title="Highlighted products" products={highlighted} />}

            {promotedVendors.length > 0 && (
                <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-12">
                    <div className="mb-7 flex items-end justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">Independent businesses</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Meet the shops</h2></div></div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {promotedVendors.slice(0, 3).map((vendor) => (
                            <Link key={String(vendor.id)} to={`/seller/store/${vendor.id}`} className="group flex items-center justify-between border border-gray-200 p-5 transition hover:border-gray-950">
                                <div><p className="text-base font-semibold">{String(vendor.shop_name || vendor.name || 'Seller shop')}</p><p className="mt-1 line-clamp-1 text-sm text-gray-500">{String(vendor.shop_description || 'Explore this seller’s products')}</p></div><East className="transition group-hover:translate-x-1" fontSize="small" />
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {random.length > 0 && <ProductSection eyebrow="Keep exploring" title="Discover products" products={random} />}
        </main>
    );
};

const ProductSection = ({ eyebrow, title, products }: { eyebrow: string; title: string; products: CatalogProduct[] }) => (
    <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{eyebrow}</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{title}</h2></div><Link to="/products" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-600 hover:text-gray-950 sm:flex">Shop all <East fontSize="small" /></Link></div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{products.slice(0, 10).map((product, index) => <EcomusProductCard key={String(product.id || product.producttid || index)} product={product} />)}</div>
    </section>
);

export default LandingPage;
