import {Link} from 'react-router'
import Colorpicker from '../../settings/components/colorpicker';

require('../styles/form.scss');

class SectionForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			displayColorPicker: false,
			color: '',
		}
	}

	colorPickerHandleChange(color) {
		this.setState({color});
	}

	getColorPickerUI() {
		return (
			<Colorpicker color={this.state.color}
						 onColorChange={this.colorPickerHandleChange.bind(this)} />
		);
	}

	handleFieldChange(key, event) {
		let newState = this.state || {};
		newState[key] = event.target.value;

		this.setState(newState);
	}

	handleSubmit(e) {
		this.props.onSubmit({
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			color: this.state.color
		});
	}

	getTitleUI() {
		if(this.props.role == 'login') {
			return (<h2>Willkommen zurück!</h2>);
		} else {
			return (<h2>Jetzt loslegen!</h2>);
		}
	}

	getFieldsUI() {
		if(this.props.role == 'login') {
			return (
				<div>
					<input type="text" className="form-control form-control-lg" placeholder="Benutzername" onChange={this.handleFieldChange.bind(this, 'username')} />
					<input type="password" className="form-control form-control-lg" placeholder="Passwort" onChange={this.handleFieldChange.bind(this, 'password')} />
				</div>
			);
		} else {
			return (
				<div>
					<input type="text" className="form-control form-control-lg" placeholder="Benutzername" onChange={this.handleFieldChange.bind(this, 'username')} />
					{this.getColorPickerUI()}
					<input type="text" className="form-control form-control-lg" placeholder="E-Mail-Adresse" onChange={this.handleFieldChange.bind(this, 'email')} />
					<input type="password" className="form-control form-control-lg" placeholder="Passwort" onChange={this.handleFieldChange.bind(this, 'password')} />
				</div>
			);
		}
	}

	getButtonUI() {
		return (
			<button className="btn btn-primary btn-uppercase btn-block btn-lg" onClick={this.handleSubmit.bind(this)}>
				{(this.props.role == 'login') ? 'Einloggen' : 'Registrieren'}
			</button>
		);
	}

	getToggleRoleUI() {
		if(this.props.role == 'login') {
			return (<p>Neu bei Project Secure? <Link to="/signup/">Jetzt loslegen!</Link></p>);
		} else {
			return (<p>Du bist schon registriert? <Link to="/login/">Einloggen</Link></p>);
		}
	}




	render() {
		return (
			<section className="section-form">
				<div className="container">
					<div className="row">
						<div className="col-md-12 text-center">
							<div className="form-group">
								{this.getTitleUI()}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4 offset-md-4">
							<div className="form-group">
								{this.getFieldsUI()}
								{this.getButtonUI()}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 text-center">
							<div className="form-group">
								{this.getToggleRoleUI()}
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default SectionForm;
