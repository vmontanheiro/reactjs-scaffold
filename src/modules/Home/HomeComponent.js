import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/img/logo.svg';
import ExampleComponent from './ExampleComponent';
import Loading from '../ui/Loading';
import useLoading from '../hooks/useLoading';
import { ROUTE } from '../Routes/RoutesMapper';

const Home = ({ history }) => {
  const [color, setColor] = useState(``);
  const { updateLoading } = useLoading();

  const changeColor = useCallback(newColor => {
    setColor(newColor);
  }, []);

  useEffect(() => {
    // Did update
    console.log(`2 Im ${color}`);
  }, [color]);

  useEffect(() => {
    updateLoading(true);
    const timer = setTimeout(() => {
      updateLoading(false);
    }, 3000);
    return () => timer && clearTimeout(timer);
  }, [updateLoading]);

  return (
    <ExampleComponent className="App" color={color}>
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <button
          type="button"
          className="App-link"
          onClick={() => {
            changeColor(`green`);
          }}
        >
          Learn React
        </button>

        <button
          type="button"
          onClick={() => {
            history.push(ROUTE.DASHBOARD.PATH, { color });
          }}
        >
          Dashboard
        </button>
        <Loading />
      </>
    </ExampleComponent>
  );
};

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
