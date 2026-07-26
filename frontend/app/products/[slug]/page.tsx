import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/catalog';
import { SITE_NAME, absoluteUrl, productJsonLd } from '@/lib/seo';
import ProductDetailClient from './ProductDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const description =
    product.description ||
    `${product.name} — ${product.material} jewellery from ${SITE_NAME}. Hallmarked and certified.`;
  const image = absoluteUrl(product.primary_image);
  const canonical = `/products/${product.slug}`;

  return {
    title: product.name,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      title: product.name,
      description,
      url: canonical,
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: [image],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
