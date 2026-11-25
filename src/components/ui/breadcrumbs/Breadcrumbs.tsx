import Styles from './breadcrumbs.module.scss';
import { House } from 'lucide-react';

type Page = { label: string; parent?: string };

const pages: Record<string, Page> = {
  '/home/': { label: 'Главная' },
  '/about/': { label: 'О компании' },
  '/contact/': { label: 'Контакты' },
  '/documents/': { label: 'Документы', parent: '/about/' },
  '/news/': { label: 'Новости', parent: '/about/' },
  '/careers/': { label: 'Карьера', parent: '/about/' },
  '/shop/': { label: 'Интернет-магазин' },
  '/procurement/': { label: 'Закупки' },
  '/products/': { label: 'Продукция' },
  '/products/accounting-system/': { label: 'АГЗУ' },
  '/products/accounting-system/stationary/': { label: 'Стационарная АГЗУ' },
  '/products/accounting-system/mobile/': { label: 'Мобильная АГЗУ' },
  '/products/accounting-system/calculator/': { label: 'Калькулятор' },
  '/products/accessories/': { label: 'Комплектующие АГЗУ' },
  '/products/accessories/ervip/': { label: 'ЭРВИП' },
  '/products/accessories/urpd/': { label: 'УРПД' },
  '/products/accessories/psm/': { label: 'ПСМ' },
  '/products/accessories/kmr/': { label: 'КМР' },
  '/products/accessories/gidroprivod/': { label: 'Гидропривод' },
  '/products/accessories/separation/': { label: 'Сепарационная ёмкость' },
  '/products/measuring-system/': { label: 'Измерительные системы' },
  '/products/measuring-system/gas/': { label: 'СИКГ' },
  '/products/measuring-system/oil/': { label: 'СИКН' },
  '/products/measuring-system/water/': { label: 'СИКВ' },
  '/products/preparation-systems/': { label: 'Системы подготовки' },
  '/products/preparation-systems/block/': { label: 'БГ' },
  '/products/preparation-systems/cleaning/': { label: 'УОК-НКТ' },
  '/products/preparation-systems/dosing/': { label: 'БДР' },
  '/products/preparation-systems/launch/': { label: 'УЗПЗ, УЗПП' },
  '/products/pumping-stations/': { label: 'Насосные станции' },
  '/products/pumping-stations/internal/': { label: 'Перекачка нефти' },
  '/products/pumping-stations/multiphase/': { label: 'Мультифазная станция' },
  '/services/': { label: 'Сервисные услуги' },
  '/services/repair/': { label: 'Ремонт АГЗУ' },
  '/services/metering/': { label: 'Замер дебита' },
  '/services/service/': { label: 'Обслуживание УОК-НКТ' },
  '/services/dewaxing/': { label: 'Депарафинизация' },
};

type Props = {
  path: string;
  current?: string;
  tone?: 'dark' | 'light';
};

export const Breadcrumbs = ({ path, current, tone = 'dark' }: Props) => {
  const items: { label: string; href: string }[] = [];
  let href = `/${path.split(/[?#]/)[0].split('/').filter(Boolean).join('/')}/`;

  while (pages[href]) {
    const page = pages[href];
    items.unshift({ label: page.label, href });
    if (href === '/home/') break;
    href = page.parent ?? href.replace(/[^/]+\/$/, '');
    if (href === '/') href = '/home/';
  }

  if (current) items.push({ label: current, href: '' });
  if (items.length < 2) return null;

  return (
    <nav className={`${Styles.breadcrumbs} ${tone === 'light' ? Styles.light : ''}`} aria-label="Хлебные крошки">
      <ol className={Styles.list}>
        {items.map((item, index) => (
          <li className={Styles.item} key={item.href || item.label}>
            {index > 0 && <span className={Styles.separator} aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span className={Styles.current} aria-current="page">{item.label}</span>
            ) : (
              <a
                className={`${Styles.link} ${index === 0 ? Styles.home : ''}`}
                href={item.href}
                aria-label={index === 0 ? item.label : undefined}
                title={index === 0 ? item.label : undefined}
              >
                {index === 0 ? <House size={16} strokeWidth={1.6} aria-hidden="true" /> : item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
