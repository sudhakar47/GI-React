import React from 'react';
import { Button, Modal, Form, Grid, Row, Col } from 'react-bootstrap';
import '../../../public/styles/registerComponent/registerComponent.scss';
import modalImage from '../../../public/images/impact.jpg';
import {facebookAppId, googleClientId} from '../../../public/constants/constants';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class Register extends React.Component {
  constructor() {
    super();

  }

  handleRegisterWithEmail() {
    this.props.componentData('registerWithEmail');
  }

  handleRegisterWithMobile() {
    this.props.componentData('registerWithMobileNum');
  }

  //Social Login Handlers
  responseFacebook = (response) => {
    console.log(response);
    this.setState({ fbData: response })
  }

  facebookOnClick() {
    console.log('Facebook Click');
  }

  responseGoogle = (response) => {
    console.log(response);
}

renderData() {
  console.log('abccd');
}

  render() {
    return (
      <Row>
        <Col xs={12} md={8} className='joinUsVerticalLine'>
          <div className='leftCol'>
            <Modal.Title className='joinUstitle'>Join us Now</Modal.Title>
            <div className='joinUsNow clearfix'>
              <div className='btn-wrapper'>

                <GoogleLogin className='button col-xs-12 col-md-6'
                  clientId={googleClientId}
                  buttonText='Sign in with Google'
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
                <FacebookLogin className='button col-xs-12 col-md-6'
                  appId={facebookAppId}
                  autoLoad={true}
                  fields="name,email,picture"
                  cssClass="my-facebook-button-class"
                  buttonText='Sign in with Facebook'
                  onClick={this.facebookOnClick}
                  callback={this.responseFacebook}
                />
              </div>
              <p className='col-md-12 col-xs-12'>- or -</p>
              <Button className='col-md-12 col-xs-12 registerBtn' ref='email' onClick={this.handleRegisterWithEmail.bind(this)}>Email</Button>
              <p className='col-md-12 col-xs-12'>- or -</p>
              <Button className='col-md-12 col-xs-12 registerBtn' ref='mobile' onClick={this.handleRegisterWithMobile.bind(this)}>Mobile</Button>
            </div>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className='rightCol'>
            <img src={modalImage} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Register;