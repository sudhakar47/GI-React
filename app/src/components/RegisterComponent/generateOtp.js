
import React from 'react';
import axios from 'axios';
import { generateOTPAPI, storeId, accessTokenAPI, registartionWithEmailAPI } from '../../../public/constants/constants';
import { Button, Form, FormGroup, Label, Modal, } from 'react-bootstrap';
import { validateEmptyObject, validateOTPDigit } from '../../utils/validationManager';
import '../../../public/styles/registerComponent/registerComponent.scss';


class GenerateOtp extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            loading: true,
            error: false,
            errorMessage: null,
            inputText: null,
        }
        console.log(this.props, '----');
    }

    proceedBtnPressed() {
        if (!validateEmptyObject(this.state.inputText)) {
            this.setState({
                error: true,
                errorMessage: 'Please enter OTP',
            });
            return;
        }

        if (!validateOTPDigit(this.state.inputText)) {
            this.setState({
                error: true,
                errorMessage: 'Pleaes enter 4 digit OTP',
            });
            return;
        }
        const nextComp = ''
        console.log(this.props.userdata, '--componentData--');
        //this.props.handlerPro(nextComp, null, this.props.userdata)
        let data = this.props.userdata;

        Object.assign(data, {'otp': String(this.state.inputText)});
        axios.post(accessTokenAPI, data, { 'headers': { 'store_id': storeId } }).then(token => {
            this.props.handleApi(registartionWithEmailAPI, data, token.data.data.access_token, 'registerWithEmail');
            
        }).catch(error => {
            const errorData = error.response.data;
            const errorMessage = errorData.error.error_message;
            alert(`Error - ${errorMessage}`);
        });
    }

    handleInputChange(text) {
        this.setState({
            inputText: text.target.value,
        });
    }

    resendOTP() {
        let data = {
            'user_id': this.props.userdata.user_id,
            'resend': 'true',
        }

        axios.post(accessTokenAPI, data, { 'headers': { 'store_id': storeId } }).then(token => {
            this.props.handleApi(generateOTPAPI, data, token.data.data.access_token, 'resendOtp');
            
        }).catch(error => {
            const errorData = error.response.data;
            const errorMessage = errorData.error.error_message;
            alert(`Error - ${errorMessage}`);
        });

    }

    backToComponent() {

    }


    render() {
        //this.setState()
        let errorItem;
        if (this.state.error) {
            errorItem = <p className='error-msg otperrorwidth'>{this.state.errorMessage}</p>
        }
        else {
            errorItem = null;
        }

        return (
            <div>
                <h3 className="heading">Enter One Time Password</h3>
                <Form>
                    <FormGroup>
                    <Button onClick={this.backToComponent.bind(this)} className='resend-otp'>Back</Button>
                        <p className='text otp-text'>Enter OTP sent to your mobile number</p>
                        <div className='form-div clearfix'>
                            <input onChange={this.handleInputChange.bind(this)} type="number" name="text" id="exampleEmail" className='form-control margin-none' placeholder="Enter OTP" />
                            {errorItem}
                            <Button onClick={this.resendOTP.bind(this)} className='resend-otp'>Resend OTP</Button>
                        </div>

                    </FormGroup>
                    <FormGroup>
                        <Button onClick={this.proceedBtnPressed.bind(this)} className='btn-block btn-bg'>Proceed</Button>
                    </FormGroup>

                </Form>
            </div >
        )
    }



}

export default GenerateOtp;