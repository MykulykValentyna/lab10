import { useNavigate } from 'react-router-dom';
import styles from './TrainCard.module.css';

export const TrainCard = ({ train }) => {
  const navigate = useNavigate();
  const departureDate = new Date(train.departureTime);
  const formattedDate = departureDate.toLocaleDateString('uk-UA');
  const formattedTime = departureDate.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

  const handleBookingClick = () => {
    navigate(`/booking/${train.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.numberBadge}>{train.number}</span>
        <span className={styles.route}>{train.route}</span>
      </div>
      
      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Відправлення</span>
          <span className={styles.value}>{formattedDate} о {formattedTime}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Час у дорозі</span>
          <span className={styles.value}>{train.duration}</span>
        </div>
      </div>

      <button className={styles.actionBtn}>Вибрати місця</button>
    </div>
  )
}