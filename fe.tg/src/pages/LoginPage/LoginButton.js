import React from 'react';
import './LoginPage.scss';
import SigninForm from './SigninForm';
import RegisterForm from './RegisterForm';

class LoginButton extends React.Component {
  constructor() {
    super();
    this.state = {
      loginClicked: true,
    };
  }

  changeToSignin = () => {
    this.setState({
      loginClicked: true,
    });
  };

  changeToRegister = () => {
    this.setState({
      loginClicked: false,
    });
  };

  render() {
    const { loginClicked } = this.state;

    return (
      <div className="form">
        <div className="form__button">
          <button
            type="button"
            className={loginClicked ? 'current' : null}
            onClick={this.changeToSignin}
          >
            Sign In
          </button>
          <button
            type="button"
            className={loginClicked ? null : 'current'}
            onClick={this.changeToRegister}
          >
            Register
          </button>
        </div>
        <div className="form__input">{(loginClicked && <SigninForm />) || <RegisterForm />}</div>
      </div>
    );
  }
}

export default LoginButton;
