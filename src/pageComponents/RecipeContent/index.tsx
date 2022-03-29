import React from 'react'
import { Recipe } from '@prisma/client'
import styles from './RecipeContent.module.scss'
import { FiAtSign, FiCalendar, FiTarget, FiUser } from 'react-icons/fi'
import { toDate } from '../../utils/Client'
import { Prisma } from '@prisma/client'
import { getUnit } from '../AddRecipe/AddRecipeForm/IngredientSection/IngredientRow/getUnit'

interface RecipeContentProps {
  recipe: Recipe
  isOwner: boolean
}

const RecipeContent: React.FunctionComponent<RecipeContentProps> = ({
  recipe,
  isOwner,
}) => {
  const { title, authorUsername, authorName, publishedAt } = recipe
  const ingredients = recipe?.ingredients as Prisma.JsonObject[]
  const instructions = recipe?.instructions as Prisma.JsonObject[]
  const notes = recipe?.notes as Prisma.JsonObject[]
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.user_info_wrapper}>
          <div className={styles.meta}>
            <div className={styles.icon_wrapper}>
              <FiUser className={styles.icon} />
            </div>
            <div className={styles.label}>{authorName}</div>
          </div>
          <div className={styles.meta}>
            <div className={styles.icon_wrapper}>
              <FiAtSign className={styles.icon} />
            </div>
            <div className={styles.label}>{authorUsername}</div>
          </div>
          <div className={styles.meta}>
            <div className={styles.icon_wrapper}>
              <FiCalendar className={styles.icon} />
            </div>
            <div className={styles.label}>{toDate(publishedAt)}</div>
          </div>
        </div>
      </div>
      <div className={styles.recipe_content}>
        {ingredients?.length > 0 && (
          <div className={styles.ingredient_section}>
            <div className={styles.section_title}>Ingredients</div>
            <div className={styles.ingredients_wrapper}>
              {ingredients.map((ingredient, index) => {
                const name = ingredient?.name as string
                const amount = ingredient?.amount as string
                const unit = ingredient?.unit as string
                const id = (ingredient?.id as string) || `${name} ${index}`
                return (
                  <div className={styles.ingredient} key={id || index}>
                    <div className={styles.ingredient_icon_wrapper}>
                      <FiTarget className={styles.icon} />
                    </div>
                    <div className={styles.ingredient_name}>
                      {amount} {getUnit(unit, amount)} {name}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {instructions?.length > 0 && (
          <div className={styles.ingredient_section}>
            <div className={styles.section_title}>Instructions</div>
            <div className={styles.instructions_wrapper}>
              {instructions.map((instruction, index) => {
                const content = instruction?.value as string
                const id = (instruction?.id as string) || `${content} ${index}`
                return (
                  <div className={styles.instruction} key={id || index}>
                    <div className={styles.number}>{index}.</div>
                    <div className={styles.content}>{content}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {notes?.length > 0 && (
          <div className={styles.ingredient_section}>
            <div className={styles.section_title}>Notes</div>
            <div className={styles.instructions_wrapper}>
              {notes.map((note, index) => {
                const content = note?.value as string
                const id = (note?.id as string) || `${content} ${index}`
                return (
                  <div
                    className={`${styles.instruction} ${styles.align}`}
                    key={id || index}
                  >
                    <div className={styles.icon}>
                      <FiTarget />
                    </div>
                    <div className={styles.content}>{content}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeContent
