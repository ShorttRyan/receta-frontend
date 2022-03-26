import React from 'react'
import { Recipe } from '@prisma/client'
import styles from './RecipeCard.module.scss'
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi'
import { toDate, toTime } from '../../utils/Client'

export interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({ recipe }) => {
  const {
    title,
    ingredients,
    instructions,
    notes,
    isPrivate,
    isDraft,
    authorUsername,
    publishedAt,
    authorName,
    authorId,
    timeToComplete,
  } = recipe
  return (
    <div className={styles.card_container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.card_info}>
        <div className={styles.author}>
          <FiUser className={styles.icons} />
          <div className={styles.label}>{authorName}</div>
        </div>
        <div className={styles.time_stamp}>
          <FiCalendar className={styles.icons} />
          <div className={styles.label}>{toDate(publishedAt)}</div>
        </div>
        <div className={styles.time_stamp}>
          <FiClock className={styles.icons} />
          <div className={styles.label}>{toTime(timeToComplete)}</div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
