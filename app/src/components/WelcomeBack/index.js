import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import WelcomeBackForm from '../WelcomeBackForm';

class WelcomeBack extends React.Component {
	constructor() {
		super();
	
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	
		this.state = {
			show: false,
		};
	}
  
	handleClose() {
	  	this.setState({ show: false });
	}
  
	handleShow() {
	  	this.setState({ show: true });
	}
  
	render() {
		return (
			<div>
				<Button variant='primary' onClick={this.handleShow}>
					Click Here
				</Button>
				<Modal className='welcomeBack' size='lg' animation={false} show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Welcome Back</Modal.Title>
					</Modal.Header>
					<WelcomeBackForm />
				</Modal>
			</div>
		);
	}
  }

export default WelcomeBack;
