import type { APIRoute } from 'astro';
import { equipmentCatalog, partsCatalog, parseCatalogPrice } from '../../components/content/shop/catalog';
import { getCartKey } from '../../components/utils/cartStorage';

export const GET: APIRoute = () => {
  const catalog = Object.fromEntries([...equipmentCatalog, ...partsCatalog].map(({ product }) => {
    if (!/^\d+(?:[.,]\d{1,2})?$/.test(product.price.replace(/\s/g, ''))) throw new Error(`Некорректная цена: ${product.title}`);
    const priceMinor = Math.round(parseCatalogPrice(product.price) * 100);
    if (!Number.isSafeInteger(priceMinor) || priceMinor < 0) throw new Error(`Некорректная цена: ${product.title}`);
    return [getCartKey(product), { title: product.title, priceMinor }];
  }));
  return new Response(JSON.stringify(catalog), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
