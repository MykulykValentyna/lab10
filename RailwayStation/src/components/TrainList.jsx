import { TrainCard } from './TrainCard'
import styles from './TrainList.module.css'

export const TrainList = ({ trains }) => {
  return (
    <div className={styles.list}>
      {trains.map(train => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  )
}