import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { formatTitle } from '../hooks/usePageTitle';

/**
 * Default tab title for each route. Pages with their own data (product, promotion,
 * shop) refine it with usePageTitle() once the name has loaded.
 * Order matters: the first matching pattern wins.
 */
const ROUTE_TITLES: Array<[pattern: string, title: string]> = [
    ['/', 'Home'],
    ['/marketplace', 'Marketplace'],
    ['/products', 'Search'],
    ['/search/products', 'Search'],
    ['/product/:id', 'Product'],
    ['/product_info/:id', 'Product'],
    ['/ad_info/:id', 'Product'],
    ['/seller/store/:id', 'Seller store'],
    ['/shop/:id', 'Shop'],
    ['/checkout', 'Checkout'],
    ['/orders/:id', 'Order tracking'],
    ['/chat', 'Chat'],
    ['/messages', 'Messages'],
    ['/notifications', 'Notifications'],
    ['/login', 'Log in'],
    ['/register', 'Sign up'],
    ['/reset_password_request', 'Reset password'],
    ['/reset_password', 'Reset password'],
    ['/confirm_code', 'Confirm code'],
    ['/pricing', 'Pricing'],
    ['/pricing-new', 'Pricing'],
    ['/free', 'Free plan'],
    ['/basic', 'Basic plan'],
    ['/standard', 'Standard plan'],
    ['/premium', 'Premium plan'],
    ['/Dashboard', 'Dashboard'],
    ['/dashboard-new', 'Dashboard'],
    ['/profile', 'Profile'],
    ['/profile/myads', 'My products'],
    ['/profile/pending', 'Pending products'],
    ['/profile/inquiries', 'Inquiries'],
    ['/profile/declined', 'Declined products'],
    ['/profile/closed', 'Closed products'],
    ['/profile/drafts', 'Drafts'],
    ['/new-ad', 'Post a product'],
    ['/top_ads', 'Top products'],
    ['/sponsored_ads', 'Promoted products'],
    ['/all_ads', 'All products'],
    ['/contact', 'Contact'],
    ['/services', 'Services'],
    ['/eleli/faq', 'FAQ'],
    ['/terms_and_conditions', 'Terms and conditions'],
    ['/privacy-policy', 'Privacy policy'],
];

export const titleForPath = (pathname: string, search = ''): string | null => {
    const match = ROUTE_TITLES.find(([pattern]) => matchPath({ path: pattern, caseSensitive: false, end: true }, pathname));
    if (!match) return null;

    const [pattern, title] = match;
    if (pattern === '/products') {
        const keyword = new URLSearchParams(search).get('keyword')?.trim();
        if (keyword) return `Search: ${keyword}`;
    }
    return title;
};

const RouteTitle = () => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        document.title = formatTitle(titleForPath(pathname, search));
    }, [pathname, search]);

    return null;
};

export default RouteTitle;
