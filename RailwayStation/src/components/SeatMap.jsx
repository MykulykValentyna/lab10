import styles from './SeatMap.module.css';

export const SeatMap = ({ wagon, selectedSeats, onToggleSeat }) => {
  if (!wagon) return null;

  return (
    <div className={styles.seatMapContainer}>
      <h3 className={styles.title}>Схема місць:</h3>
      <div className={styles.grid}>
        {wagon.seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
          let seatClass = styles.seatFree;
          
          if (seat.isBooked) {
            seatClass = styles.seatBooked;
          } else if (isSelected) {
            seatClass = styles.seatSelected;
          }

          return (
            <button
              key={seat.id}
              disabled={seat.isBooked}
              className={`${styles.seat} ${seatClass}`}
              onClick={() => onToggleSeat(seat.id)}
            >
              {seat.number}
            </button>
          );
        })}
      </div>
    </div>
  );
};