import { useState } from 'react';
import styles from './BookingForm.module.css';

export const BookingForm = ({ onSubmit, selectedSeatsCount }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Будь ласка, заповніть всі поля!');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Ваші дані:</h3>
      <input 
        type="text" placeholder="ПІБ" required className={styles.input}
        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
      />
      <input 
        type="tel" placeholder="Телефон" required className={styles.input}
        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
      />
      <input 
        type="email" placeholder="Email" required className={styles.input}
        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
      />
      <button 
        type="submit" 
        className={styles.submitBtn} 
        disabled={selectedSeatsCount === 0}
      >
        Забронювати ({selectedSeatsCount} місць)
      </button>
    </form>
  );
};