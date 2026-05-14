import { useState, useEffect } from 'react'
import { TrainList } from '../components/TrainList'
import styles from './Home.module.css'

export const Home = () => {
  const [trains, setTrains] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/trains')
      .then(res => res.json())
      .then(data => setTrains(data))
  }, [])

  const filteredTrains = trains.filter(train => 
    train.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
    train.number.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Розклад рейсів</h2>
      
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          className={styles.searchInput}
          placeholder="Куди плануєте подорож? Введіть маршрут або номер..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TrainList trains={filteredTrains} />
    </div>
  )
}