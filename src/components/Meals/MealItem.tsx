import React from 'react';
import { Meal } from '../../types';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  meal: Meal;
  onDelete: VoidFunction;
  isLoading?: boolean;
}

const MealItem: React.FC<Props> = ({ meal, onDelete, isLoading }) => {
  return (
    <div className="card rounded-4 border-0 pt-3 pb-2 px-2 w-100">
      <div className="card-body">
        <p className="card-title fs-5 fw-bolder">{meal.time}</p>
        <p className="card-text mt-3">{meal.description}</p>
        <strong className="card-text mt-3">{meal.calories} kcal</strong>
        <div className="d-flex gap-3 ms-auto">
          <Link
            to={'/edit-meal/' + meal.id}
            className="btn btn-primary px-4 rounded-3 ms-auto"
          >
            Edit
          </Link>
          <button className="btn btn-danger px-4 rounded-3" onClick={onDelete}>
            {isLoading && <ButtonSpinner />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;
