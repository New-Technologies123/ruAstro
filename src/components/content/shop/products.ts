/* Тип продукта */
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  inStock: boolean;
  shipmentTime: string;
  deliveryTime: string;
  image: string;
}

/* Данные каталога */
export const products: Product[] = [
  {
    id: 1,
    title: 'Блок подготовки газа',
    description: 'Используется для очистки и подготовки газа перед транспортировкой.',
    category: 'Газовое оборудование',
    price: 'По запросу',
    inStock: true,
    shipmentTime: '3–5 рабочих дней',
    deliveryTime: '7–10 дней',
    image: '/src/images/products/product_1.webp'
  },
  {
    id: 2,
    title: 'Сепаратор газожидкостный',
    description: 'Высокоэффективная система разделения газа и жидкости.',
    category: 'Сепарация',
    price: 'По запросу',
    inStock: false,
    shipmentTime: '10–14 рабочих дней',
    deliveryTime: '14–21 день',
    image: '/src/images/products/product_2.webp'
  },
  {
    id: 3,
    title: 'Сепаратор газожидкостный',
    description: 'Высокоэффективная система разделения газа и жидкости.',
    category: 'Сепарация',
    price: 'По запросу',
    inStock: false,
    shipmentTime: '10–14 рабочих дней',
    deliveryTime: '14–21 день',
    image: '/src/images/products/product_3.webp'
  },
  {
    id: 4,
    title: 'Сепаратор газожидкостный',
    description: 'Высокоэффективная система разделения газа и жидкости.',
    category: 'Сепарация',
    price: 'По запросу',
    inStock: false,
    shipmentTime: '10–14 рабочих дней',
    deliveryTime: '14–21 день',
    image: '/src/images/products/product_4.webp'
  },
  {
    id: 5,
    title: 'Сепаратор газожидкостный',
    description: 'Высокоэффективная система разделения газа и жидкости.',
    category: 'Сепарация',
    price: 'По запросу',
    inStock: false,
    shipmentTime: '10–14 рабочих дней',
    deliveryTime: '14–21 день',
    image: '/src/images/products/product_5.webp'
  }
];
