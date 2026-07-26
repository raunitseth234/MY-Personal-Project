export const img = (id: string, w = 900, q = 75) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const brand = {
  name: 'Rajesh Jewellers',
  nameHindi: 'राजेश ज्वेलर्स',
  firm: 'Shree Vishwanath Prasad Seth',
  unitLine: 'Rajesh Jewellers',
  phone: '+91 7408630705',
  address: 'Nakash, Kachahari Road, Olandganj, Jaunpur - 222001, Uttar Pradesh, India',
  hours: 'Open all days, 10:30 AM to 8:30 PM',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=25.7463506,82.6842421',
};

export const announcements = [
  'Visit our exclusive store — Rajesh Jewellers',
  'Trusted since generations — Shree Vishwanath Prasad Seth',
  'BIS Hallmarked 916 Gold | Certified Diamonds',
];

export const searchPhrases = [
  'Gold Jewellery, Diamond Earrings...',
  'Gold Necklace...',
  'Diamond Ring...',
  'Bridal Sets...',
  'Mangalsutra...',
  'Silver Murti...',
];

export const heroSlides = [
  {
    src: img('photo-1601121141461-9d6647bca1ed', 1600),
    alt: 'Traditional Indian gold necklace set with rubies',
  },
  {
    src: img('photo-1610030469983-98e550d6193c', 1600),
    alt: 'Bride in silk saree wearing traditional jewellery',
  },
  {
    src: img('photo-1616837874254-8d5aaa63e273', 1600),
    alt: 'Elegant gold chain worn with evening wear',
  },
];

export const navCategories = [
  { label: 'All Jewellery', icon: 'Sparkles' },
  { label: 'Gold', icon: 'Coins' },
  { label: 'Diamond', icon: 'Gem' },
  { label: 'Earrings', icon: 'Droplet' },
  { label: 'Rings', icon: 'CircleDot' },
  { label: 'Bangles', icon: 'Circle' },
  { label: 'Chain', icon: 'Link2' },
  { label: 'Mangalsutra', icon: 'Heart' },
  { label: 'Gifting', icon: 'Gift' },
  { label: 'More', icon: 'MoreHorizontal' },
] as const;

export const trustBadges = [
  {
    icon: 'ShieldCheck',
    title: 'BIS Hallmarked 916 Gold',
  },
  {
    icon: 'BadgeCheck',
    title: 'Certified & Graded Diamonds',
  },
  {
    icon: 'RefreshCw',
    title: 'Easy Old Gold Exchange',
  },
  {
    icon: 'Percent',
    title: 'Transparent Making Charges',
  },
] as const;

export const categoryCircles = [
  { label: 'Rings', image: img('photo-1603561591411-07134e71a2a9', 400) },
  { label: 'Earrings', image: img('photo-1617038220319-276d3cfab638', 400) },
  { label: 'Chain', image: img('photo-1616837874254-8d5aaa63e273', 400) },
  { label: 'Bangles', image: img('photo-1611591437281-460bfbe1220a', 400) },
  { label: 'Stud', image: img('photo-1588444650733-d0767b753fc8', 400) },
  { label: 'Pendants', image: img('photo-1635767798638-3e25273a8236', 400) },
];

export const worldMoments = [
  {
    title: 'The Bridal Edit',
    tag: 'Wedding',
    image: img('photo-1610030469983-98e550d6193c', 800),
  },
  {
    title: 'Everyday Elegance',
    tag: 'Daily Wear',
    image: img('photo-1601821765780-754fa98637c1', 800),
  },
  {
    title: 'Festive Heirlooms',
    tag: 'Festive',
    image: img('photo-1610030469668-8e9f641aaf27', 800),
  },
  {
    title: 'Golden Hour',
    tag: 'Occasion',
    image: img('photo-1615886753866-79396abc446e', 800),
  },
];

export const categoryGrid = [
  { label: 'Murti', image: img('photo-1610375461246-83df859d849d', 600) },
  { label: 'Solitaires', image: img('photo-1605100804763-247f67b3557e', 600) },
  { label: 'Gifting', image: img('photo-1584302179602-e4c3d3fd629d', 600) },
  { label: 'Chain', image: img('photo-1602173574767-37ac01994b2a', 600) },
  { label: 'Mangalsutra', image: img('photo-1610694955371-d4a3e0ce4b52', 600) },
  { label: "Men's Jewelry", image: img('photo-1622398925373-3f91b1e275f5', 600) },
  { label: 'Bangles', image: img('photo-1573408301185-9146fe634ad0', 600) },
  { label: 'Stud', image: img('photo-1630019852942-f89202989a59', 600) },
];

export const editorialImage = img('photo-1599643478518-a784e5dc4c8f', 1600);

export const collections = [
  {
    title: 'Bangles Collection',
    blurb: 'Kadas and bangles crafted for hands that carry tradition.',
    image: img('photo-1611591437281-460bfbe1220a', 900),
  },
  {
    title: 'Earrings Collection',
    blurb: 'From subtle studs to statement chandbalis.',
    image: img('photo-1535632066927-ab7c9ab60908', 900),
  },
  {
    title: 'Maangtika Collection',
    blurb: 'Regal centrepieces for the bride of today.',
    image: img('photo-1601121141461-9d6647bca1ed', 900),
  },
  {
    title: 'Pendant Set Collection',
    blurb: 'Delicate sets that pair with every drape.',
    image: img('photo-1515562141207-7a88fb7ce338', 900),
  },
];

export const categoryBanners = [
  {
    label: 'EARRINGS',
    tagline: 'Timeless & Trending',
    image: img('photo-1611652022419-a9419f74343d', 1000),
  },
  {
    label: 'PENDANTS',
    tagline: 'Graceful Every Day',
    image: img('photo-1611085583191-a3b181a88401', 1000),
  },
];

export const stats = [
  { value: 50, suffix: '+', label: 'Years of Trust' },
  { value: 10000, suffix: '+', label: 'Happy Customers' },
  { value: 100, suffix: '%', label: 'Hallmarked Jewellery' },
];

export const testimonials = [
  {
    quote:
      'My daughter’s entire bridal set came from Rajesh Jewellers. The craftsmanship, the honesty in pricing, everything felt like family.',
    name: 'Meera Agarwal',
    city: 'Varanasi',
  },
  {
    quote:
      'Three generations of our family have bought gold only from Shree Vishwanath Prasad Seth. That trust is worth more than gold itself.',
    name: 'Rohit Khanna',
    city: 'Lucknow',
  },
  {
    quote:
      'The mangalsutra I picked was hallmarked, beautifully finished, and the staff patiently showed me over thirty designs.',
    name: 'Ananya Srivastava',
    city: 'Kanpur',
  },
  {
    quote:
      'Bought diamond studs for my wife’s birthday. Certified stones, transparent billing, and a gift wrap that made the moment special.',
    name: 'Saurabh Jaiswal',
    city: 'Prayagraj',
  },
];

export const drawerCategories = [
  'Rings',
  'Earrings',
  'Chain',
  'Bangles',
  'Stud',
  'Pendants',
  'Mangalsutra',
  'Solitaires',
  "Men's Jewelry",
  'Murti',
  'Gifting',
];

export const drawerAccountLinks = [
  'My Account',
  'My Orders',
  'Wishlist',
  'Locate Our Store',
  'Download Our App',
];

export const quickLinks = [
  'Our Collections',
  'About Us',
  'Store Locator',
  "Today's Gold Rate",
  'Custom Orders',
  'Contact Us',
];
