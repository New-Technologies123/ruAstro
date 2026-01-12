
/* ===== ТИПЫ ===== */
export interface ProductParam {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  nds: string;
  inStock: boolean;
  shipmentTime: string;
  deliveryTime: string;
  image: string;

  params: ProductParam[];
}

/* ===== ДАННЫЕ ===== */
export const products: Product[] = [
  {
    id: 1,
    title: 'Корпус верхний НТ.202.000.002.0',
    description: '',
    category: 'Клапан магниторегулируемый',
    price: '12 500',
    nds: 'без НДС',
    inStock: true,
    shipmentTime: '3–5 рабочих дней',
    deliveryTime: '60–90 дней',
    image: '/src/images/shop/1.png',

    params: [
      { label: 'Шифр', value: 'НТ.202.000.002.0' },
      { label: 'Материал', value: 'Полиамид' },
    ],
  },
  {
    id: 2,
    title: 'Шток НТ.200.000.003.0',
    description: '',
    category: 'Клапан магниторегулируемый',
    price: '7 120',
    nds: 'без НДС',
    inStock: false,
    shipmentTime: '10–14 рабочих дней',
    deliveryTime: '60–90 день',
    image: '/src/images/shop/2.png',

    params: [
      { label: 'Шифр', value: 'НТ.200.000.003.0' },
      { label: 'Материал', value: 'Полиамид' },
    ],
  },
  {
    id: 3,
    title: 'Втулка немагнитная НТ.200.000.004.0',
    description: '',
    category: 'Клапан магниторегулируемый',
    price: '2 600',
    nds: 'без НДС',
    inStock: false,
    shipmentTime: '10–14 рабочих дней',
    deliveryTime: '60–90 день',
    image: '/src/images/shop/3.png',

    params: [
      { label: 'Шифр', value: 'НТ.200.000.004.0' },
      { label: 'Материал', value: 'Полиамид' },
    ],
  },
  {
    id: 4,
    title: 'Шайба магнитная НТ.200.000.006.0',
    description: '',
    category: 'Клапан магниторегулируемый',
    price: '16 730',
    nds: 'без НДС',
    inStock: true,
    shipmentTime: '10–14 рабочих дней',
    deliveryTime: '60–90 день',
    image: '/src/images/shop/4.png',

    params: [
      { label: 'Шифр', value: 'НТ.200.000.006.0' },
      { label: 'Материал', value: 'Полиамид' },
    ],
  },
  {
    id: 5,
    title: 'Шайба пружины опорная НТ.200.000.007.0',
    description: '',
    category: 'Клапан магниторегулируемый',
    price: '2 580',
    nds: 'без НДС',
    inStock: true,
    shipmentTime: '10–14 рабочих дней',
    deliveryTime: '60–90 день',
    image: '/src/images/shop/5.png',

    params: [
      { label: 'Шифр', value: 'НТ.200.000.007.0' },
      { label: 'Материал', value: 'Полиамид' },
    ],
  },
];
