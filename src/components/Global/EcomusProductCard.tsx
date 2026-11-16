import { FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export type CatalogProduct = Record<string, unknown>;

const readImage = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
        const image = value as Record<string, unknown>;
        return String(image.image_url || image.url || image.path || '');
    }
    return '';
};

export const productId = (product: CatalogProduct): string =>
    String(product.id || product.producttid || product.product_id || '');

export const productName = (product: CatalogProduct): string =>
    String(product.name || product.productname || 'Product');

export const productImages = (product: CatalogProduct): string[] => {
    const gallery = Array.isArray(product.images)
        ? product.images
        : Array.isArray(product.productimages)
          ? product.productimages
          : [];
    const images = gallery.map(readImage).filter(Boolean);
    const main = readImage(product.main_image_url || product.mainimage_url || product.mainimage);
    return main && !images.includes(main) ? [main, ...images] : images;
};

export const productPrice = (product: CatalogProduct): number =>
    Number(product.price ?? product.productprice ?? 0);

export const productDiscount = (product: CatalogProduct): number =>
    Number(product.discount ?? 0);

const EcomusProductCard = ({ product }: { product: CatalogProduct }) => {
    const id = productId(product);
    const name = productName(product);
    const images = productImages(product);
    const price = productPrice(product);
    const discount = productDiscount(product);
    const finalPrice = price * (1 - discount / 100);
    const isUnavailable = product.is_active === false || Boolean((product.vendor as CatalogProduct | undefined)?.is_deactivated_vendor_only);

    return (
        <Link to={`/product/${id}`} className="group block min-w-0" aria-label={`View ${name}`}>
            <article className={`relative ${isUnavailable ? 'opacity-60' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#f3f3f0]">
                    {images[0] ? (
                        <img
                            src={images[0]}
                            alt={name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.12em] text-gray-400">
                            No image
                        </div>
                    )}

                    {discount > 0 && (
                        <span className="absolute left-3 top-3 rounded-full bg-gray-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                            -{discount}%
                        </span>
                    )}
                    {Boolean(product.is_promoted) && (
                        <span className="absolute bottom-3 left-3 rounded-full bg-[#ebe9d8] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#455230]">
                            Promoted
                        </span>
                    )}
                    <button
                        type="button"
                        aria-label={`Save ${name}`}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-900 opacity-0 shadow-sm transition group-hover:opacity-100"
                        onClick={(event) => event.preventDefault()}
                    >
                        <FavoriteBorder fontSize="small" />
                    </button>
                    {isUnavailable && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-gray-900">
                                Unavailable
                            </span>
                        </div>
                    )}
                </div>

                <div className="px-1 pt-3">
                    <p className="truncate text-[13px] font-medium text-gray-900">{name}</p>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-950">KES {finalPrice.toLocaleString()}</span>
                        {discount > 0 && (
                            <span className="text-xs text-gray-400 line-through">KES {price.toLocaleString()}</span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default EcomusProductCard;
