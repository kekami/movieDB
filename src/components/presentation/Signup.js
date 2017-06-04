import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Messages from '../../notifications/Messages';
import Errors from '../../notifications/Errors';

import {
  signupRequest,
} from '../../actions/signup';

import styles from '../../styles/Signup.scss';

class Signup extends Component {
  constructor() {
    super();

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.signupRequest(values);
  }

  render() {
    const {
      handleSubmit,
      signup: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props;

    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit(this.submit)}>
          <h1>Sign Up</h1>
          <label htmlFor="firstName">Firstname</label>
          <Field
            name="firstName"
            type="text"
            id="firstName"
            className="firstName"
            label="Firstname"
            component="input"
          />
          <label htmlFor="lastName">Lastname</label>
          <Field
            name="lastName"
            type="text"
            id="lastName"
            className="lastName"
            label="Lastname"
            component="input"
          />
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="text"
            id="email"
            className="email"
            label="Email"
            component="input"
          />
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            label="Password"
            component="input"
          />
          <button action="submit">SIGN UP</button>
          <div className={styles.message}>
            {!requesting && !!errors.length && (
              <Errors message="Failure to signup due to:" errors={errors} />
            )}
            {!requesting && !!messages.length && (
              <Messages messages={messages} />
            )}
            {!requesting && successful && (
              <div>
                Signup Successful! <Link to="/login">Click here to Login »</Link>
              </div>
            )}
            {!requesting && !successful && (
              <Link to="/login">Already a member? Login Here »</Link>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signup: state.signup,
});

const mapDispatchToProps = dispatch => ({
  signupRequest: values => dispatch(signupRequest(values)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(Signup);

const formed = reduxForm({
  form: 'signup',
})(connected);

export default formed;

Signup.propTypes = {
  signupRequest: PropTypes.func,
  handleSubmit: PropTypes.func,
  signup: PropTypes.shape({
    requesting: PropTypes.bool,
    successfull: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
  }),
};
