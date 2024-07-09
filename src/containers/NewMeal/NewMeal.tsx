import { useState } from 'react';
import axiosApi from '../../axiosApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MealForm from '../../components/MealForm/MealForm';
import { ApiMeal } from '../../types';

const NewMeal = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const createMeal = async (meal: ApiMeal) => {
    try {
      setIsCreating(true);
      await axiosApi.post('/meals.json', meal);
      navigate('/');
      toast.success(`New meal created`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <MealForm onSubmit={createMeal} isLoading={isCreating} />
      </div>
    </div>
  );
};

export default NewMeal;
