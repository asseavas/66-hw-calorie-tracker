import React, { useState } from 'react';
import { ApiMeal, MealMutation } from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (meal: ApiMeal) => void;
  existingMeal?: ApiMeal;
  isLoading?: boolean;
}

const emptyState: MealMutation = {
  time: '',
  description: '',
  calories: '',
};

const MealForm: React.FC<Props> = ({
  onSubmit,
  existingMeal,
  isLoading = false,
}) => {
  const initialState: MealMutation = existingMeal
    ? { ...existingMeal, calories: existingMeal.calories.toString() }
    : emptyState;
  const [mealMutation, setMealMutation] = useState<MealMutation>(initialState);

  const changeMeal = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setMealMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...mealMutation,
      calories: parseFloat(mealMutation.calories),
    });
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="bg-light-subtle p-3 rounded-4 p-4 px-5"
    >
      <h4>{existingMeal ? 'Edit meal' : 'Add new meal'}</h4>
      <div className="form-group pt-3">
        <label htmlFor="time">Time</label>
        <select
          name="time"
          className="form-select bg-body-secondary border-0 rounded-3 p-2 mb-3 mt-2"
          aria-label="Default select example"
          required
          onChange={changeMeal}
          value={mealMutation.time}
        >
          <option value="" aria-required>
            Time
          </option>
          <option value="breakfast">Breakfast</option>
          <option value="snack">Snack</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>
      <div className="form-group pt-2">
        <label htmlFor="description">Meal description</label>
        <textarea
          name="description"
          id="description"
          required
          className="form-control mb-3 bg-body-secondary border-0 rounded-3 p-2 mt-2"
          onChange={changeMeal}
          value={mealMutation.description}
        />
      </div>
      <div className="form-group pt-2">
        <label htmlFor="calories">Calories</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            name="calories"
            id="calories"
            required
            min="1"
            className="form-control w-25 bg-body-secondary border-0 rounded-3 p-2 mt-2"
            onChange={changeMeal}
            value={mealMutation.calories}
          />
          <strong className="ms-4">kcal</strong>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-3 px-3 d-flex ms-auto"
        disabled={isLoading}
      >
        {isLoading && <ButtonSpinner />}
        {existingMeal ? 'Edit' : 'Save'}
      </button>
    </form>
  );
};

export default MealForm;
