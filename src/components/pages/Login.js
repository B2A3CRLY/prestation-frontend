import auth from '../../services/authService';
import { Redirect } from 'react-router-dom';
import Hero from '../common/hero';
import Form from '../common/form';
import joi from 'joi-browser';
import React from 'react';
import { Notyf } from 'notyf';
import './Login.css';

const notyf = new Notyf({
    duration: 4000,
    position: {
        x: 'right',
        y:'top'
    },
    types: [
        {
            type: 'error',
            duration: '4000',
            dismissible:'true'
        },
        {
            type: 'success',
            duration: '10000',
            dismissible:'true'
        },
        {
            type: 'warning',
            duration: '4000',
            dismissible: 'true',
            background: 'orange',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'warning'
            }
        }
    ]
});
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
				notyf.error('username ou password incorrect!')
				errors.non_field_errors = error.response.data;
				this.setState({ errors });
				console.log('Error: ', errors);
			}
		}
	};

	render() {
		//console.log('token:', auth.getCurrentUser())
		if (auth.getCurrentUser()) return <Redirect to="/"/>;
		return (
			<Hero hero="defaultHeroDomestique">
				<div className = "towards-top">
					<div className="row">
						<div className="col-md-0"></div>
						<div className="card mt-4 col-md-12">
							<h3>Login page</h3>
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
			</Hero>
		);
	}
}

export default LoginForm;
