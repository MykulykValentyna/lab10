import styles from './WagonSelector.module.css';

export const WagonSelector = ({ wagons, selectedWagon, onSelectWagon }) => {
  return (
    <div className={styles.selectorContainer}>
      <h3 className={styles.title}>Оберіть вагон:</h3>
      <div className={styles.wagonList}>
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            className={`${styles.wagonBtn} ${selectedWagon?.id === wagon.id ? styles.active : ''}`}
            onClick={() => onSelectWagon(wagon)}
          >
            {wagon.name} ({wagon.type}) - {wagon.price} грн
          </button>
        ))}
      </div>
    </div>
  );
};