import basic from "../assets/basic.jpg";
import standard from "../assets/standard.avif";
import premium from "../assets/premium.jpg";

export const sliderContent = [
  // Uncomment and customize as needed
  // {
  //   title: 'Freemium Kshs: 0',
  //   features: [
  //     '✔ Get up to 20 free products per month',
  //     '🗙 Priority products per week',
  //     '🗙 Priority products per month',
  //     '🗙 Promoted products per month',
  //   ],
  //   button: '/free',
  //   image: freemium,
  //   price: 0
  // },
  {
    title: 'Basic Kshs: 0',
    features: [
      '✔ Get up to 20 free products per month',
      '🗙 Top Products',
      '🗙 Suggested Products',
      '🗙 Store',
      '🗙 Verified Seller',
      '🗙 Trending Products',
    ],
    button: '/basic',
    image: basic,
    price: 0
  },
  {
    title: 'Standard Ksh: 3000',
    features: [
      '✔ Get up to 150 products per month',
      '✔ Top Products',
      '✔ Suggested Products',
      '🗙 Store',
      '🗙 Verified Seller',
      '🗙 Trending Products',
    ],
    button: '/standard',
    image: standard,
    price: 3500
  },
  {
    title: 'Premium Ksh: 7000',
    features: [
      '✔ Get unlimited products per month',
      '✔ Top Products',
      '✔ Suggested Products',
      '✔ Store',
      '✔ Verified Seller',
      '✔ Trending Products',
    ],
    button: '/premium',
    image: premium,
    price: 4500
  },
];
