import type { Product } from '../../products/types';
import { urpd1Products } from '../../products/urpd_1.products';
import { urpd2Products } from '../../products/urpd_2.products';
import { psm_1Products } from '../../products/psm_1.products';
import { psm_2Products } from '../../products/psm_2.products';
import { psm_3Products } from '../../products/psm_3.products';
import { psm_4Products } from '../../products/psm_4.products';
import { psm_5Products } from '../../products/psm_5.products';
import { psm_6Products } from '../../products/psm_6.products';
import { shop1Products } from '../../products/kmr_1.products';
import { shop2Products } from '../../products/kmr_2.products';
import { shop3Products } from '../../products/kmr_3.products';
import { shop4Products } from '../../products/kmr_4.products';
import { gudroProducts } from '../../products/gudro.products';

export type ShopType = 'shop_1' | 'shop_2' | 'shop_3' | 'shop_4' | 'shop_5';

export const categoryTitles: Record<ShopType, string> = {
  shop_1: 'Вихревой расходомер ЭРВИП',
  shop_2: 'Устройство регулирования перепада давления (УРПД)',
  shop_3: 'Переключатель скважин многоходовой (ПСМ)',
  shop_4: 'Магниторегулируемый клапан (КМР)',
  shop_5: 'Гидропривод (ГП)',
};

export const categoryShortTitles: Record<ShopType, string> = {
  shop_1: 'ЭРВИП',
  shop_2: 'УРПД',
  shop_3: 'ПСМ',
  shop_4: 'КМР',
  shop_5: 'ГП',
};

export const parseCatalogPrice = (price: string): number => {
  const value = Number(
    price
      .replace(/\s/g, '')
      .replace(',', '.')
      .replace(/[^\d.-]/g, ''),
  );
  return Number.isFinite(value) ? value : 0;
};

export type CatalogItem = {
  category: ShopType;
  product: Product;
  tem?: string;
  parentTitle?: string;
  compatibleModels?: CatalogItem[];
};

export const matchesCatalogSelection = (item: CatalogItem, selectedCategories: ShopType[], selectedModels: string[]): boolean => {
  const matchesCategory =
    selectedCategories.length === 0 ||
    selectedCategories.includes(item.category) ||
    Boolean(item.compatibleModels?.some((model) => selectedCategories.includes(model.category)));
  const matchesModel =
    selectedModels.length === 0 ||
    Boolean(
      (item.tem && selectedModels.includes(`${item.category}:${item.tem}`)) ||
        item.compatibleModels?.some((model) => selectedModels.includes(`${model.category}:${model.tem}`)),
    );
  return matchesCategory && matchesModel;
};

const equipmentDescriptions: Record<ShopType, string> = {
  shop_1: 'Промышленный прибор для измерения расхода жидкостей и газов в автоматизированных установках типа «Спутник».',
  shop_2: 'Работает в системе регулирования уровня и перепада давления АГЗУ «Спутник».',
  shop_3: 'Предназначен для ручной и автоматической установки скважин на замер в АГЗУ «Спутник».',
  shop_4: 'Регулирует расход жидкости в групповых замерных установках типа «Спутник».',
  shop_5: 'Создаёт гидравлическое давление в силовом цилиндре многоходового переключателя скважин ПСМ.',
};

const equipment = (
  category: ShopType,
  id: number,
  title: string,
  price: string,
  image: string,
  tem?: string,
  deliveryTime = 'по запросу',
): CatalogItem => ({
  category,
  tem,
  product: {
    id,
    title,
    description: equipmentDescriptions[category],
    price,
    nds: 'без НДС',
    deliveryTime,
    image,
  },
});

export const equipmentCatalog: CatalogItem[] = [
  equipment('shop_1', 9001, 'Расходомер-счетчик ЭРВИП.НТ', '250 000', '/images/shop/product_1.webp'),
  equipment(
    'shop_2',
    9011,
    'Устройство для регулирования перепада давления УРПД-1.1 НТ.511.000.000.0',
    '19 500',
    '/images/shop/product_2.webp',
    'urpd_1',
  ),
  equipment(
    'shop_2',
    9012,
    'Устройство для регулирования перепада давления УРПД-3.1 НТ.531.000.000.0',
    '34 500',
    '/images/shop/product_2.webp',
    'urpd_2',
  ),
  equipment(
    'shop_3',
    9021,
    'Переключатель скважин многоходовой ПСМНТ.001.000.000-02 (8скв) с наплавкой',
    '950 000',
    '/images/shop/product_3.webp',
    'psm_1',
  ),
  equipment(
    'shop_3',
    9022,
    'Переключатель скважин многоходовой ПСМНТ.001.000.000-02 (8скв) без наплавки',
    '900 000',
    '/images/shop/product_3.webp',
    'psm_2',
  ),
  equipment(
    'shop_3',
    9023,
    'Переключатель скважин многоходовой ПСМНТ.001.000.000-01 (на 10 скв) с наплавкой',
    '1 050 000',
    '/images/shop/product_3.webp',
    'psm_3',
  ),
  equipment(
    'shop_3',
    9024,
    'Переключатель скважин многоходовой ПСМНТ.001.000.000-01 (на 10 скв) без наплавки',
    '1 000 000',
    '/images/shop/product_3.webp',
    'psm_4',
  ),
  equipment(
    'shop_3',
    9025,
    'Переключатель скважин многоходовой ПСМНТ.001.000.000 (на 14 скв) с наплавкой',
    '1 150 000',
    '/images/shop/product_3.webp',
    'psm_5',
  ),
  equipment(
    'shop_3',
    9026,
    'Переключатель скважин многоходовой ПСМНТ.001.000.000 (на 14 скв) без наплавки',
    '1 100 000',
    '/images/shop/product_3.webp',
    'psm_6',
  ),
  equipment(
    'shop_4',
    9031,
    'Клапан магниторегулируемый КМР-2 Ж НТ.200.000.000.0',
    '98 600',
    '/images/shop/product_4.webp',
    'goods_1',
    '60–90 календарных дней',
  ),
  equipment(
    'shop_4',
    9032,
    'Клапан магниторегулируемый КМР-2 М НТ.201.000.000.0',
    '105 100',
    '/images/shop/product_4.webp',
    'goods_2',
    '60–90 календарных дней',
  ),
  equipment(
    'shop_4',
    9033,
    'Клапан магниторегулируемый КМР-3.1 Ех НТ.302.000.000.1',
    '105 300',
    '/images/shop/product_4.webp',
    'goods_3',
    '60–90 календарных дней',
  ),
  equipment(
    'shop_4',
    9034,
    'Клапан магниторегулируемый КМР-2 Г НТ.250.000.000.0',
    '135 135',
    '/images/shop/product_4.webp',
    'goods_4',
    '60–90 календарных дней',
  ),
  equipment('shop_5', 9041, 'Гидропривод ГП-НТ НТ.3.00.00.00.000', '88 500', '/images/shop/product_5.webp', 'gudro_1'),
];

const parts = (category: ShopType, tem: string, products: Product[]): CatalogItem[] =>
  products.map((product) => ({
    category,
    tem,
    product,
    parentTitle: equipmentCatalog.find((item) => item.category === category && item.tem === tem)?.product.title,
  }));

export const partsCatalog: CatalogItem[] = [
  ...parts('shop_2', 'urpd_1', urpd1Products),
  ...parts('shop_2', 'urpd_2', urpd2Products),
  ...parts('shop_3', 'psm_1', psm_1Products),
  ...parts('shop_3', 'psm_2', psm_2Products),
  ...parts('shop_3', 'psm_3', psm_3Products),
  ...parts('shop_3', 'psm_4', psm_4Products),
  ...parts('shop_3', 'psm_5', psm_5Products),
  ...parts('shop_3', 'psm_6', psm_6Products),
  ...parts('shop_4', 'goods_1', shop1Products),
  ...parts('shop_4', 'goods_2', shop2Products),
  ...parts('shop_4', 'goods_3', shop3Products),
  ...parts('shop_4', 'goods_4', shop4Products),
  ...parts('shop_5', 'gudro_1', gudroProducts),
];

// The source lists parts separately for each model. One product card keeps all
// of those model links, so selecting a model cannot lose a shared part.
export const uniquePartsCatalog: CatalogItem[] = Array.from(
  partsCatalog
    .reduce((grouped, item) => {
      const title = item.product.title.trim().replace(/\s+/g, ' ').toLocaleLowerCase('ru');
      const price = item.product.price.replace(/\s/g, '').replace(',', '.');
      const key = `${title}:${price}`;
      const existing = grouped.get(key);
      if (existing) {
        existing.compatibleModels?.push(item);
        if (!existing.product.image && item.product.image) existing.product = item.product;
      } else {
        grouped.set(key, { ...item, compatibleModels: [item] });
      }
      return grouped;
    }, new Map<string, CatalogItem>())
    .values(),
);
