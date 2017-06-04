import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Search from './Search';
import styles from '../../styles/NavBar.scss';

import {
  unsetClient,
} from '../../actions/client';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.logout();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <nav className={styles.navBar}>
        <div className={styles.brandSearch}>
          <Link className={styles.brand} to="/">MovieDB</Link>
          <Search />
        </div>

        {(Object.keys(currentUser).length === 0) ? (
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
          ) : (
            <ul>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/account/currentUser">{currentUser.firstName}</Link></li>
              <li><Link to="#" onClick={this.logout}>Logout</Link></li>
            </ul>
          )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

NavBar.propTypes = {
  logout: PropTypes.func,
  currentUser: PropTypes.object,
};
