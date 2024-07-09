import React from 'react';
import { Meal } from '../../types';
import MealItem from './MealItem';

interface Props {
  meals: Meal[];
  deleteMeal: (id: string) => void;
  isLoading?: boolean;
}

const Meals: React.FC<Props> = ({ meals, deleteMeal, isLoading }) => {
  return (
    <div className="d-flex flex-column align-items-center gap-3 pt-4 mb-5">
      {meals
        .slice()
        .reverse()
        .map((meal) => (
          <MealItem
            key={meal.id}
            meal={meal}
            onDelete={() => deleteMeal(meal.id)}
            isLoading={isLoading}
          />
        ))}
    </div>
  );
};

export default Meals;
