/* ===== ДАННЫЕ МЕНЮ ===== */
export const menuData = [
    {
        title: 'Продукция',
        url: '/products/',
        children: [
            {
                title: 'Автоматизированная замерная установка (АГЗУ)',
                url: '/products/accounting-system/',
                children: [
                {
                    title: 'АГЗУ «Спутник — массомер НТ.1» (стационарный)',
                    url: '/products/accounting-system/accountingSystem_1/',
                },
                {
                    title: 'АГЗУ «Спутник — массомер НТ.1» (мобильный)',
                    url: '/products/accounting-system/accountingSystem_2/',
                },
                ],
            },
            {
                title: 'Комплектующие для автоматизированной групповой замерной установки',
                url: '/products/accessories/',
                children: [
                    { title: 'Вихревой расходомер ЭРВИП', url: '/products/accessories/accessories_1/' },
                    { title: 'Устройство регулирования перепада давления (УРПД)', url: '/products/accessories/accessories_2/' },
                    { title: 'Переключатель скважин многоходовой (ПСМ)', url: '/products/accessories/accessories_3/' },
                    { title: 'Магниторегулируемый клапан (КМР)', url: '/products/accessories/accessories_4/' },
                    { title: 'Гидропривод (ГП)', url: '/products/accessories/accessories_5/' },
                    { title: 'Сепарационная ёмкость', url: '/products/accessories/accessories_6/' },
                ],
            },
            {
                title: 'Система учёта углеводородов и пластовой жидкости',
                url: '/products/measuring-system/',
                children: [
                    {
                        title: 'Система измерения количества и показателей качества нефти (СИКН)',
                        url: '/products/measuring-system/measuringSystem_1/',
                    },
                    {
                        title: 'Система измерения количества газа (СИКГ)',
                        url: '/products/measuring-system/measuringSystem_2/',
                    },
                    {
                        title: 'Система измерения количества воды (СИКВ)',
                        url: '/products/measuring-system/measuringSystem_3/',
                    },
                ],
            },
            {
                title: 'Системы подготовки нефти, газа и воды',
                url: '/products/preparation-systems/',
                children: [
                    {
                        title: 'Устройство запуска и приема внутритрубных средств очистки и диагностики УЗПЗ, УЗПП',
                        url: '/products/preparation-systems/preparationSystems_1/',
                    },
                    {
                        title: 'Блок гребенки (БГ)',
                        url: '/products/preparation-systems/preparationSystems_2/',
                    },
                    {
                        title: 'Устройство очистки колонны УОК-НКТ',
                        url: '/products/preparation-systems/preparationSystems_3/',
                    },
                    {
                        title: 'Установка дозирования химического реагента (БДР)',
                        url: '/products/preparation-systems/preparationSystems_4/',
                    },
                ],
            },
            {
                title: 'Насосные станции перекачки нефти, нефтепродуктов и воды',
                url: '/products/pumping-stations/',
                children: [
                    {
                        title: 'Блочная насосная станция внутренней и внешней перекачки нефти',
                        url: '/products/pumping-stations/pumpingStations_1/',
                    },
                    {
                        title: 'Блочная мультифазная насосная станция',
                        url: '/products/pumping-stations/pumpingStations_2/',
                    },
                ],
            },
        ],
    },
    {
        title: 'Сервисные услуги',
        url: '/services/',
        children: [
            { title: 'Обслуживание, капитальный ремонт и модернизация АГЗУ', url: '/services/?type=repair' },
            { title: 'Замер дебита нефтяных скважин с помощью мобильной замерной установки', url: '/services/?type=metering' },
            { title: 'Обслуживание устройства очистки колонны УОК-НКТ', url: '/services/?type=service' },
            { title: 'Услуги депарафинизации нефтяных скважин', url: '/services/?type=dewaxing' },
        ],
    },
];
