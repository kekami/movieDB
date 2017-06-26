import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Search from './Search';
import styles from '../../styles/NavBar.scss';

import {
  unsetClient,
} from '../../actions/client';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }

    this.logout = this.logout.bind(this);
    this.showHamburger = this.showHamburger.bind(this);
  }

  logout() {
    this.props.logout();
  }

  showHamburger() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { currentUser } = this.props;

    return (
      <nav className={styles.navbar}>
        <div>
          <Link to="/">
            <h1>MovieDB</h1>
          </Link>

          <div className={styles["navbar__hamburgerContainer"]}>
            {
              this.state.isOpen ?
                <button onClick={this.showHamburger} className={styles.navbar__cross}>&#735;</button>
                :
                <button onClick={this.showHamburger} className={styles.navbar__hamburger}>&#9776;</button>
            }

            {
              this.state.isOpen && (Object.keys(currentUser).length === 0) ?
                <div className={styles["navbar__hamburger-menu"]}>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                  </ul>
                </div>
                :
                this.state.isOpen ? 
                  <div className={styles["navbar__hamburger-menu"]}>
                    <ul>
                      <li><Link to="#">Currently logged in as {currentUser.firstName}</Link></li>
                      <li><Link to="/favorites">Favorites</Link></li>
                      <li><Link to="#" onClick={this.logout}>Logout</Link></li>
                    </ul>
                  </div>
                :
                  null
            }
          </div>
        </div>

        <div className={styles.navbar__categories}>
          <ul>
            <li>
              <NavLink to="/movies/popular" activeClassName={styles["navbar__category--selected"]}>Popular</NavLink>
            </li>
            <li>
              <NavLink to="/movies/toprated" activeClassName={styles["navbar__category--selected"]}>Top Rated</NavLink>
            </li>
            <li>
              <NavLink to="/movies/upcoming" activeClassName={styles["navbar__category--selected"]}>Upcoming</NavLink>
            </li>
          </ul>
        </div>

        <div className={styles["navbar__items"]}>
          <div className={styles.brandSearch}>
            <Search />
          </div>

          {
            (Object.keys(currentUser).length === 0) ?
              <div className={styles["navbar__menu"]}>
                <ul>
                  <li><Link to="/signup">Sign Up</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </ul>
              </div>
              :
              <div className={styles["navbar__menu"]}>
                <ul>
                  <li><Link to="#">{currentUser.firstName}</Link></li>
                  <li><Link to="/favorites">Favorites</Link></li>
                  <li><Link to="#" onClick={this.logout}>Logout</Link></li>
                </ul>
              </div>
          }
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.client,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(unsetClient()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

NavBar.propTypes = {
  logout: PropTypes.func,
  currentUser: PropTypes.object,
};
