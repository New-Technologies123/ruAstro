export interface MenuItemType {
  title: string;
  url: string;
  pageType?: string;
  children?: MenuItemType[];
}

export const menuData: MenuItemType[] = [
  {
    title: 'Продукция',
    url: '/products/',
    pageType: 'products',

    children: [
      {
        title: 'АГЗУ',
        url: '/products/accounting-system/',

        children: [
          {
            title:
              'АГЗУ «Спутник — массомер НТ.1» · стационарный',
            url:
              '/products/accounting-system/stationary/',
          },
          {
            title:
              'АГЗУ «Спутник — массомер НТ.1» · мобильный',
            url:
              '/products/accounting-system/mobile/',
          },
        ],
      },

      {
        title: 'Комплектующие',
        url: '/products/accessories/',

        children: [
          {
            title: 'Вихревой расходомер ЭРВИП',
            url:
              '/products/accessories/ervip/',
          },
          {
            title:
              'Устройство регулирования перепада давления УРПД',
            url:
              '/products/accessories/urpd/',
          },
          {
            title:
              'Переключатель скважин многоходовой ПСМ',
            url:
              '/products/accessories/psm/',
          },
          {
            title:
              'Магниторегулируемый клапан КМР',
            url:
              '/products/accessories/kmr/',
          },
          {
            title: 'Гидропривод ГП',
            url:
              '/products/accessories/gidroprivod/',
          },
          {
            title: 'Сепарационная ёмкость',
            url:
              '/products/accessories/separation/',
          },
        ],
      },

      {
        title: 'Измерительные системы',
        url: '/products/measuring-system/',

        children: [
          {
            title: 'СИКН · учёт нефти',
            url:
              '/products/measuring-system/oil/',
          },
          {
            title: 'СИКГ · учёт газа',
            url:
              '/products/measuring-system/gas/',
          },
          {
            title: 'СИКВ · учёт воды',
            url:
              '/products/measuring-system/water/',
          },
        ],
      },

      {
        title: 'Подготовка нефти, газа и воды',
        url:
          '/products/preparation-systems/',

        children: [
          {
            title:
              'Устройства запуска и приёма средств очистки УЗПЗ, УЗПП',
            url:
              '/products/preparation-systems/launch/',
          },
          {
            title: 'Блок гребенки БГ',
            url:
              '/products/preparation-systems/block/',
          },
          {
            title: 'Устройство очистки колонны УОК-НКТ',
            url:
              '/products/preparation-systems/cleaning/',
          },
          {
            title:
              'Установка дозирования реагента БДР',
            url:
              '/products/preparation-systems/dosing/',
          },
        ],
      },

      {
        title: 'Насосные станции',
        url:
          '/products/pumping-stations/',

        children: [
          {
            title:
              'Блочная насосная станция внутренней и внешней перекачки',
            url:
              '/products/pumping-stations/internal/',
          },
          {
            title:
              'Блочная мультифазная насосная станция',
            url:
              '/products/pumping-stations/multiphase/',
          },
        ],
      },
    ],
  },

  {
    title: 'Сервисные услуги',
    url: '/services/',
    pageType: 'services',

    children: [
      {
        title:
          'Обслуживание, ремонт и модернизация АГЗУ',
        url: '/services/repair/',
      },
      {
        title:
          'Замер дебита нефтяных скважин',
        url: '/services/metering/',
      },
      {
        title:
          'Обслуживание устройства УОК-НКТ',
        url: '/services/service/',
      },
      {
        title:
          'Депарафинизация нефтяных скважин',
        url: '/services/dewaxing/',
      },
    ],
  },
];