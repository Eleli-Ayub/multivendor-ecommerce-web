import React, { useEffect, useState } from 'react';
import { FavoriteBorder, LocalShippingOutlined, PersonOutline, SecurityOutlined, Star } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../Redux/slices/productsSlice';
import { AppDispatch, RootState } from '../Redux/store';
import { wishlistAPI, reviewsAPI } from '../api/api';
import { toast } from 'react-toastify';
import usePageTitle from '../hooks/usePageTitle';
import EcomusProductCard, { CatalogProduct, productImages, productName, productPrice } from '../components/Global/EcomusProductCard';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { currentProduct, isLoading } = useSelector((state: RootState) => state.products);
    const { userToken } = useSelector((state: RootState) => state.auth);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        if (id) dispatch(fetchSingleProduct(id));
    }, [id, dispatch]);

    const product = (currentProduct?.product as CatalogProduct | undefined) || null;
    usePageTitle(product ? productName(product) : undefined);

    if (isLoading) {
        return <div className="flex min-h-[70vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-gray-950" /></div>;
    }

    if (!currentProduct || !product) {
        return <div className="mx-auto max-w-7xl px-4 py-24 text-center text-sm text-gray-500">Product not found.</div>;
    }

    const images = productImages(product);
    const mainImage = selectedImage || images[0] || '';
    const vendor = (product.vendor as CatalogProduct | null) || null;
    const price = productPrice(product);
    const discount = Number(product.discount || 0);
    const finalPrice = price * (1 - discount / 100);
    const averageRating = Number(currentProduct.avg_rating || 0);
    const relatedProducts = (currentProduct.related_products as CatalogProduct[]) || [];
    const description = String(product.description || product.productdescription || 'A product selected from our marketplace.');
    const quantity = Number(product.quantity || 0);

    const handleAddToWishlist = async () => {
        if (!userToken) {
            toast.error('Please login to add to wishlist');
            return;
        }
        try {
            await wishlistAPI.addProduct(id!);
            toast.success('Added to wishlist');
        } catch {
            toast.error('Failed to add to wishlist');
        }
    };

    const handleSubmitReview = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!userToken) {
            toast.error('Please login to submit a review');
            return;
        }
        try {
            await reviewsAPI.create({
                vendor_id: String(product.vendor_id || vendor?.id || ''),
                product_id: id,
                rating: reviewData.rating,
                comment: reviewData.comment,
            });
            toast.success('Review submitted');
            setShowReviewForm(false);
            setReviewData({ rating: 5, comment: '' });
        } catch (error: unknown) {
            const response = error as { response?: { data?: { message?: string } } };
            toast.error(response.response?.data?.message || 'Failed to submit a review');
        }
    };

    return (
        <main className="min-h-screen bg-white text-gray-900">
            <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 lg:px-12">
                <div className="mb-8 flex items-center gap-2 text-xs text-gray-500"><Link to="/" className="hover:text-gray-950">Home</Link><span>/</span><Link to="/products" className="hover:text-gray-950">Products</Link><span>/</span><span className="truncate text-gray-900">{productName(product)}</span></div>

                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-16">
                    <section>
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f3f0]">
                            {mainImage ? <img src={mainImage} alt={productName(product)} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-gray-400">No image</div>}
                            {discount > 0 && <span className="absolute left-5 top-5 rounded-full bg-gray-950 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white">-{discount}%</span>}
                        </div>
                        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                            {images.map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setSelectedImage(image)} className={`h-20 w-16 shrink-0 overflow-hidden border-2 ${mainImage === image ? 'border-gray-950' : 'border-transparent'}`}><img src={image} alt={`${productName(product)} ${index + 1}`} className="h-full w-full object-cover" /></button>)}
                        </div>
                    </section>

                    <section className="lg:pt-3">
                        <div className="flex items-start justify-between gap-4">
                            <div><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#637545]">Product details</p><h1 className="text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">{productName(product)}</h1></div>
                            <button type="button" onClick={handleAddToWishlist} aria-label="Add to wishlist" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 transition hover:border-gray-950"><FavoriteBorder /></button>
                        </div>

                        <div className="mt-5 flex items-center gap-3 border-b border-gray-200 pb-5">
                            <span className="flex items-center gap-1 text-sm text-[#b58d35]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} fontSize="small" className={star <= Math.round(averageRating) ? 'text-[#b58d35]' : 'text-gray-300'} />)}</span>
                            <span className="text-xs text-gray-500">{averageRating.toFixed(1)} · Customer reviews</span>
                        </div>

                        <div className="mt-6 flex items-baseline gap-3"><span className="text-3xl font-semibold tracking-[-0.03em]">KES {finalPrice.toLocaleString()}</span>{discount > 0 && <span className="text-sm text-gray-400 line-through">KES {price.toLocaleString()}</span>}</div>
                        <p className="mt-5 text-sm leading-7 text-gray-600">{description}</p>

                        <div className="mt-6 grid grid-cols-2 gap-3 border-y border-gray-200 py-5 text-xs text-gray-600"><div><span className="block text-[10px] uppercase tracking-[0.12em] text-gray-400">Availability</span><strong className="mt-1 block font-medium text-gray-900">{quantity > 0 ? `${quantity} in stock` : 'Contact seller'}</strong></div><div><span className="block text-[10px] uppercase tracking-[0.12em] text-gray-400">Category</span><strong className="mt-1 block font-medium capitalize text-gray-900">{String(product.category || 'Marketplace')}</strong></div></div>

                        <Link to={`/checkout?product_id=${id}&vendor_id=${product.vendor_id || vendor?.id || ''}`} className="mt-7 flex w-full items-center justify-center bg-[#455230] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#334024]">Buy now</Link>

                        {vendor && <div className="mt-7 border border-gray-200 p-5"><div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebe9d8] text-[#455230]"><PersonOutline /></div><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">Sold by</p><Link to={`/seller/store/${vendor.id}`} className="mt-1 block truncate text-sm font-semibold hover:underline">{String(vendor.shop_name || vendor.name || 'Seller shop')}</Link><p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">{String(vendor.shop_description || 'Discover more products from this seller.')}</p></div></div><button type="button" onClick={async () => { if (!userToken) { toast.error('Please login to bookmark this shop'); return; } await wishlistAPI.addVendor(String(vendor.id)); toast.success('Shop bookmarked'); }} className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-gray-600 underline underline-offset-4 hover:text-gray-950">Bookmark shop</button></div>}

                        <div className="mt-6 grid gap-3 text-xs text-gray-600 sm:grid-cols-2"><div className="flex gap-3"><LocalShippingOutlined className="text-gray-900" fontSize="small" /><span><strong className="block text-gray-900">Delivery available</strong>Confirm options at checkout.</span></div><div className="flex gap-3"><SecurityOutlined className="text-gray-900" fontSize="small" /><span><strong className="block text-gray-900">Secure purchase</strong>Buy with confidence from our marketplace.</span></div></div>
                    </section>
                </div>

                <section className="mt-16 border-t border-gray-200 pt-8">
                    <div className="flex items-center justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">Share your experience</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Reviews</h2></div>{userToken && <button type="button" onClick={() => setShowReviewForm((open) => !open)} className="border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] hover:border-gray-950">{showReviewForm ? 'Close' : 'Write review'}</button>}</div>
                    {showReviewForm && <form onSubmit={handleSubmitReview} className="mt-6 max-w-xl border border-gray-200 p-5"><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]">Rating</label><select value={reviewData.rating} onChange={(event) => setReviewData({ ...reviewData, rating: Number(event.target.value) })} className="mb-4 w-full border border-gray-300 px-3 py-3 text-sm"><option value={5}>5 Stars</option><option value={4}>4 Stars</option><option value={3}>3 Stars</option><option value={2}>2 Stars</option><option value={1}>1 Star</option></select><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]">Comment</label><textarea required value={reviewData.comment} onChange={(event) => setReviewData({ ...reviewData, comment: event.target.value })} className="min-h-28 w-full border border-gray-300 px-3 py-3 text-sm outline-none focus:border-gray-950" placeholder="Tell us about this product" /><button type="submit" className="mt-4 bg-gray-950 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white">Submit review</button></form>}
                </section>

                {relatedProducts.length > 0 && <section className="mt-16 border-t border-gray-200 pt-8"><div className="mb-7 flex items-end justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">Keep exploring</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">You may also like</h2></div><Link to="/products" className="text-xs font-semibold uppercase tracking-[0.1em] underline underline-offset-4">Shop all</Link></div><div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">{relatedProducts.slice(0, 10).map((related, index) => <EcomusProductCard key={String(related.id || related.producttid || index)} product={related} />)}</div></section>}
            </div>
        </main>
    );
};

export default ProductDetailPage;
