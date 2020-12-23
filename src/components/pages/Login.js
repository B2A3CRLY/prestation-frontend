import auth from '../../services/authService';
import { Redirect } from 'react-router-dom';
import Form from '../common/form';
import joi from 'joi-browser';
import React from 'react';
import './Login.css';


class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {}
	};
	schema = {
		username: joi.string().required().label('Username'),
		password: joi.string().required().label('Password')
	};
	
	doSubmit = async () => {
		try {
			const { data } = this.state;
			
				await auth.login(data.username, data.password);
				window.location = '/';
				window.location.reload(false);
			
			
		} catch (error) {
			if (error.response && error.response.status === 400) {
				const errors = { ...this.state.errors };
				alert('username ou password incorrect!')
				errors.non_field_errors = error.response.data;
				this.setState({ errors });
				console.log('Error: ', errors);
			}
		}
	};

	render() {
		console.log('token:', auth.getCurrentUser())
		if (auth.getCurrentUser()) return <Redirect to="/"/>;
		return (
			<div className = "towards-top">
				<div className="row">
					<div className="col-md-3"></div>
					<div className="card mt-4 col-md-6">
						<h2>Login page</h2>
						<form onSubmit={this.handleSubmit}>
							
							<span className="input-group-addon"><i className="fa fa-user fa-fw mb-2"></i></span>
							{this.renderInput('username','Username','text','form-control','Enter your usename')}
						    <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
							{this.renderInput('password', 'Password', 'password', 'form-control', 'Enter your password')}
							 {this.renderButton('Login')}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginForm;
