import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <div>
        <NavLink to="/new-meal" className="btn btn-primary">
          Add new meal
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
