import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BookingService } from '../services/BookingService';
import { WagonSelector } from '../components/WagonSelector';
import { SeatMap } from '../components/SeatMap';
import { BookingForm } from '../components/BookingForm';
import styles from './Booking.module.css';

export const Booking = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  
  const [wagons, setWagons] = useState([]);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    BookingService.getWagonsByTrainId(trainId).then(data => {
      setWagons(data);
      if (data.length > 0) setSelectedWagon(data[0]);
    });
  }, [trainId]);

  const handleToggleSeat = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBookingSubmit = async (userData) => {
    const bookingData = {
      trainId,
      wagonId: selectedWagon.id,
      seats: selectedSeats,
      user: userData,
      totalPrice: selectedWagon.price * selectedSeats.length
    };

    try {
      await BookingService.createBooking(bookingData);
      toast.success('Квитки успішно заброньовано!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      toast.error('Помилка при бронюванні');
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>← Назад до рейсів</button>
      <h2>Бронювання квитків</h2>
      
      <WagonSelector 
        wagons={wagons} 
        selectedWagon={selectedWagon} 
        onSelectWagon={(wagon) => {
          setSelectedWagon(wagon);
          setSelectedSeats([]);
        }} 
      />

      <div className={styles.mainContent}>
        <SeatMap 
          wagon={selectedWagon} 
          selectedSeats={selectedSeats} 
          onToggleSeat={handleToggleSeat} 
        />
        
        <BookingForm 
          onSubmit={handleBookingSubmit} 
          selectedSeatsCount={selectedSeats.length} 
        />
      </div>
    </div>
  );
};