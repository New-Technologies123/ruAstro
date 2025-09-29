import { Layout } from '../../layout/Layout';
import { Card } from '../../ui/card/Card';
import { useState } from 'react';
import { LayoutBack } from '../../layout/LayoutBack';
import { Repair } from './Repair';
import { Metering } from './Metering';
import { Service } from './Service';
import { Dewaxing } from './Dewaxing';
import serves_12 from '../../../images/services/serves_12.png';
import serves_3 from '../../../images/services/serves_3.png';
import serves_4 from '../../../images/services/serves_4.webp';
import serves_5 from '../../../images/services/serves_5.webp';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

type TServices = 'repair' | 'metering' | 'service' | 'dewaxing';

export const Services = () => {
  const { t } = useTranslation('services');

  const cardTitle: Record<TServices, string> = {
    repair: t('АГЗУ'),
    metering: t('Замер'),
    service: t('Обслуживание'),
    dewaxing: t('Депарафинизация'),
  };

  const [typeLayoutBackOpen, setTypeLayoutBackOpen] = useState<TServices | null>(null);

  useEffect(() => {
    setTypeLayoutBackOpen(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const typeFromQuery = queryParams.get('type');
        return typeFromQuery ? (typeFromQuery as TServices) : null;
    });
  }, []);

  const onBack = () => {
    setTypeLayoutBackOpen(null);

    const newUrl = `${window.location.origin}${window.location.pathname}`;
    window.history.pushState({}, '', newUrl);
  };

  const onClickCard = (typeService: TServices) => {
    setTypeLayoutBackOpen(typeService);

    const newUrl = `${window.location.origin}${window.location.pathname}?type=${typeService}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <>
      {typeLayoutBackOpen === null && (
        <Layout title="Сервисные услуги" description="Текст о сервисных услугах">
          <>
            <Card
              imgSrc={serves_12.src}
              title={cardTitle.repair}
              onClick={() => {
                onClickCard('repair');
              }}
            />
            <Card
              imgSrc={serves_3.src}
              title={cardTitle.metering}
              onClick={() => {
                onClickCard('metering');
              }}
            />
            <Card
              imgSrc={serves_4.src}
              title={cardTitle.service}
              onClick={() => {
                onClickCard('service');
              }}
            />
            <Card
              imgSrc={serves_5.src}
              title={cardTitle.dewaxing}
              onClick={() => {
                onClickCard('dewaxing');
              }}
            />
          </>
        </Layout>
      )}
      {typeLayoutBackOpen === 'repair' && (
        <LayoutBack onBack={onBack} title={cardTitle.repair}>
          <Repair />
        </LayoutBack>
      )}
      {typeLayoutBackOpen === 'metering' && (
        <LayoutBack onBack={onBack} title={cardTitle.metering}>
          <Metering />
        </LayoutBack>
      )}
      {typeLayoutBackOpen === 'service' && (
        <LayoutBack onBack={onBack} title={cardTitle.service}>
          <Service />
        </LayoutBack>
      )}
      {typeLayoutBackOpen === 'dewaxing' && (
        <LayoutBack onBack={onBack} title={cardTitle.dewaxing}>
          <Dewaxing />
        </LayoutBack>
      )}
    </>
  );
};
