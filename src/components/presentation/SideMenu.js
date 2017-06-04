import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/SideMenu.scss';

const SideMenu = () => (
  <ul className={styles.sideMenu}>
    <li>
      <NavLink to="/movies/popular" activeClassName={styles.selected}>Popular</NavLink>
    </li>
    <li>
      <NavLink to="/movies/toprated" activeClassName={styles.selected}>Top Rated</NavLink>
    </li>
    <li>
      <NavLink to="/movies/upcoming" activeClassName={styles.selected}>Upcoming</NavLink>
    </li>
  </ul>
);

export default SideMenu;
