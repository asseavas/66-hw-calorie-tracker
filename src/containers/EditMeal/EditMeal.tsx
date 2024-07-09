import { useCallback, useEffect, useState } from 'react';
import MealForm from '../../components/MealForm/MealForm';
import { ApiMeal } from '../../types';
import axiosApi from '../../axiosApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditMeal = () => {
  const [meal, setMeal] = useState<ApiMeal | null>(null);
  const { id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOneMeal = useCallback(async () => {
    const { data: meal } = await axiosApi.get<ApiMeal | null>(
      `/meals/${id}.json`,
    );
    setMeal(meal);
  }, [id]);

  const updateMeal = async (meal: ApiMeal) => {
    try {
      setIsUpdating(true);
      await axiosApi.put(`/meals/${id}.json`, meal);
      toast.success('Meal updated!');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    void fetchOneMeal();
  }, [fetchOneMeal]);

  return (
    <div className="row mt-2">
      <div className="col">
        {meal && (
          <MealForm
            onSubmit={updateMeal}
            existingMeal={meal}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default EditMeal;
