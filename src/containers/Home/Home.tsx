import { NavLink, useLocation } from 'react-router-dom';
import Meals from '../../components/Meals/Meals';
import axiosApi from '../../axiosApi';
import { useCallback, useEffect, useState } from 'react';
import { ApiMeals, Meal } from '../../types';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const location = useLocation();

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const { data: meals } = await axiosApi.get<ApiMeals | null>(
        '/meals.json',
      );

      if (!meals) {
        setMeals([]);
        setTotalCalories(0);
      } else {
        const newMeals = Object.keys(meals).map((id) => ({
          ...meals[id],
          id,
        }));

        setMeals(newMeals);

        const calories = newMeals.reduce((sum, meal) => sum + meal.calories, 0);
        setTotalCalories(calories);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMeal = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await axiosApi.delete(`/meals/${id}.json`);
        setLoading(true);
        await fetchMeals();
        toast.success('Meal deleted!');
        setLoading(false);
      }
    } catch (e) {
      toast.error('Could not delete this meal!');
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchMeals();
    }
  }, [fetchMeals, location]);

  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <div className="d-flex gap-5 align-items-center">
        <p>
          Total calories: <strong>{totalCalories} kcal</strong>
        </p>
        <NavLink to="/new-meal" className="btn btn-primary d-flex ms-auto">
          Add new meal
        </NavLink>
      </div>
      <div className="w-75">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '300px' }}
          >
            <Spinner />
          </div>
        ) : (
          <Meals meals={meals} deleteMeal={deleteMeal} isLoading={loading} />
        )}
      </div>
    </div>
  );
};

export default Home;
