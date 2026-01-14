export const installations = [
    {
      id: 1,
      name: 'Установка измерительная',
      quantityOptions: [
        { label: 1, price: 14000000 },
        { label: 4, price: 15000000 },
        { label: 6, price: 16000000 },
        { label: 8, price: 18000000 },
        { label: 10, price: 19000000 },
        { label: 12, price: 20000000 },
        { label: 14, price: 21000000 }
      ],
      heatingOptions: [
        { label: '40', price: 0 },
        { label: '63', price: 500000 }
      ],
      volumeOptions: [
        { label: 'До 400', price: 561324 },
        { label: 'До 800', price: 1100000 },
        { label: 'До 1500', price: 1300000 }
      ],
      densityOptions: [
        { label: 'Одностороннее', price: 0 },
        { label: 'Двустороннее', price: 0 }
      ],      
      max_gasOptions: [
        { label: 'Не требуется', price: 0 },
        { label: 'До 40 000', price: 0 },
        { label: 'Свыше 40 000 до 80 000', price: 0 },
        { label: 'Свыше 80 000 до 150 000', price: 0 },
        { label: 'Свыше 150 000 до 300 000', price: 0 },
        { label: 'Свыше 300 000 до 500 000', price: 0 }
      ],
      max_gas_1Options: [
        { label: 'Не требуется', price: 0 },
        { label: 'До 500 000', price: 0 },
        { label: 'Свыше 500 000 до 1 500 000', price: 0 }
      ],
      // pressureOptions: [
      //   { label: '5х3,1', price: 1700000 },
      //   { label: '5,5х3,1', price: 1850000 },
      //   { label: '6х3,1', price: 2000000 },
      //   { label: '6,5х3,1', price: 2150000 },
      //   { label: '7х3,1', price: 2300000 },
      //   { label: '7,5х3,1', price: 2450000 },
      //   { label: '8х3,1', price: 2600000 },
      //   { label: '8,5х3,1', price: 2750000 },
      //   { label: '9х3,1', price: 2900000 },
      //   { label: '9,5х3,1', price: 3050000 },
      //   { label: '10х3,1', price: 3200000 },
      //   { label: '10,5х3,1', price: 3350000 },
      //   { label: '11х3,1', price: 3500000 },
      //   { label: '11,5х3,1', price: 3650000 },
      //   { label: '12х3,1', price: 3800000 },
      //   { label: '12,5х3,1', price: 3950000 }
      // ],
      // pressure1Options: [
      //   { label: 'Не требуется', price: 0 },
      //   { label: '3х3,1', price: 465000 },
      //   { label: '4х3,1', price: 620000 },
      //   { label: '6х3,1', price: 930000 }
      // ],
      pollutionOptions: [
        { label: 'Без влагомера', price: 0 },
        { label: 'Влагомер микроволновый', price: 300000 },
        { label: 'Влагомер оптический', price: 800000 },
        { label: 'Влагомер диэлькометрический', price: 300000 },
        { label: 'Влагомер комбинированный (диэлькометрический + оптический)', price: 800000 }
      ],
      vagometer1Options: [
        { label: 'Не требуется', price: 0 },
        { label: 'Расходомер на линию жидкости ЭМИС-МАСС', price: 296000 },
        { label: 'Счетчик расходомер ЭРВИП ', price: 120000 },
        { label: 'Расходомер на линию жидкости Micro Motion ', price: 2000000 },
        { label: 'Многофазный расходомер', price: 15000000 }
      ],
      vagometerOptions: [
        { label: 'Не требуется', price: 0 },
        { label: 'Счетчик расходомер ЭРВИП ', price: 120000 },
        { label: 'Счетчик расходомер вихревой СВГ.М', price: 290000 }
      ],      
      vagometer2Options: [
        { label: 'Не требуется', price: 0 },
        { label: 'Счетчик расходомер ЭРВИП ', price: 120000 },       
        { label: 'ТОР50 (Дублирующий счетчик жидкости) ', price: 35000 }
      ],      
      closetOptions: [
        { label: 'Шкаф управления', price: 350000 },
        { label: 'Шкаф силовой', price: 120000 },
        { label: 'Шкаф пожарной сигнализации', price: 90000 }
      ],
      fittingsOptions: [
        { label: 'Задвижки клиновые', price: 0 },
        { label: 'Задвижки дисковые', price: 0 }
      ]
    }
  ];