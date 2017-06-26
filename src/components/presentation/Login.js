import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Messages from '../../notifications/Messages';
import Errors from '../../notifications/Errors';

import { loginRequest } from '../../actions/login';

import styles from '../../styles/Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.loginRequest(values);
  }

  render() {
    const {
      handleSubmit,
      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props;

    return (
      <div className={styles.login}>
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>LOGIN</h1>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="text"
            id="email"
            className="email"
            component="input"
          />
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            component="input"
          />
          <button action="submit">LOGIN</button>
          <div className="auth-messages">
            {!requesting && !!errors.length && (
              <Errors message="Failure to login due to:" errors={errors} />
            )}
            {!requesting && !!messages.length && (
              <Messages messages={messages} />
            )}
            {requesting && <div>Logging in...</div>}
            {!requesting && !successful && (
              <Link to="/signup">Need to Signup? Click Here »</Link>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch => ({
  loginRequest: values => dispatch(loginRequest(values)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(Login);

const formed = reduxForm({
  form: 'login',
})(connected);

export default formed;

Login.propTypes = {
  handleSubmit: PropTypes.func,
  loginRequest: PropTypes.func,
  login: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
  }),
};
