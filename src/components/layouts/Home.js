import React from 'react';
import NavBar from '../containers/NavBar';
import SideMenu from '../presentation/SideMenu';
import Main from '../containers/Main';
import styles from '../../styles/Home.scss';

const Home = () => (
  <div>
    <NavBar />
    <div className={styles.home}>
      <SideMenu />
      <Main />
    </div>
  </div>
);

export default Home;
