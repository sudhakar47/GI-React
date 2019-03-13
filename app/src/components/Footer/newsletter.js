import React from 'react';
import { Col, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { storeId, accessToken, newsletterAPI } from '../../../public/constants/constants';
import { validateEmptyObject, regexEmail } from '../../utils/validationManager'

class newsletter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  submitNewsLetter() {
    if (!validateEmptyObject(this.state.inputText) || !regexEmail.test(this.state.inputText)) {
      return;
    }

    let data = {
      'email_id': this.state.inputText,
    }
    axios.post(newsletterAPI, data, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
      const data = response.data;
      this.setState({inputText: ''})
      alert('Newsletter Subscription - ' + data.status);
    }).catch(error => {
      console.log('newsError---', error);
    });
  }

  handleInputChange(text) {
    this.setState({
      inputText: text.target.value,
    });
  }

  render() {
    const newsletterHtml = <Col md={12} sm={12}>
      <h3>{this.props.name.text}</h3>
      <ul className='newsletterList'>
        {
          this.props.name.children.map((newsletterDesc, index) => {
            return (
              <li key={index}>{newsletterDesc.text}</li>
            );
          })
        }
        <li>
          <Form inline>
            <FormControl onChange={this.handleInputChange.bind(this)} type='email' placeholder='Your email' className='borderRadius' value={this.state.inputText}/>
            <Button onClick={this.submitNewsLetter.bind(this)} type='button' className='btn-secondary'>Button</Button>
          </Form>
        </li>
      </ul>
    </Col>
    return (
      <>
        {newsletterHtml}

      </>
    );
  }
}

export default newsletter;