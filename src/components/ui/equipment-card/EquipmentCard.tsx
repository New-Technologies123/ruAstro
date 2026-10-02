import Styles from './EquipmentCard.module.scss';

export interface EquipmentCardItem {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  image: string;
  href: string;
  features?: readonly string[];
}

export const EquipmentCard = ({ item }: { item: EquipmentCardItem }) => (
  <article className={Styles.card}>
    <a className={Styles.cardLink} href={item.href}>
      <div className={Styles.cardImage}>
        <img src={item.image} alt={item.title} loading="lazy" />
        <span className={Styles.cardNumber}>{item.number}</span>
      </div>
      <div className={Styles.cardContent}>
        <span className={Styles.cardLabel}>{item.label}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.features && (
          <ul className={Styles.cardFeatures}>
            {item.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        )}
        <span className={Styles.cardAction}>
          Характеристики и документы <span aria-hidden="true">↗</span>
        </span>
      </div>
    </a>
  </article>
);
