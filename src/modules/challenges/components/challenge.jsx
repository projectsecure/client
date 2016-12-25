import LayoutBackend from '../../backend/containers/layout';

require('../styles/challenge.scss');

class Challenge extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			input: ''
		}
	}

	getSummaryUI({title, description, name}) {
		return (
			<div className="card">
				<div className="card-block">
					<h2 className="card-title">{title}</h2>
				</div>
				<div className="card-block with-border">
					<p className="card-text">{description}</p>
				</div>
			</div>
		);
	}

	getFinishUI() {
		let finishActionUI;
		if(this.props.challenge.status == 'COMPLETED') {
			finishActionUI = (
				<span className="note note-completed">Du hast diese Challenge bereits erfolgreich abgeschlossen.</span>
			);
		} else {
			finishActionUI = (
				<button className="btn btn-primary btn-block btn-uppercase"
						data-toggle="modal"
						data-target="#modal-finish"
						disabled={!this.props.allStepsCompleted}>Challenge abschließen</button>
			);
		}

		return (
			<div className="card">
				<div className="card-block">
					{finishActionUI}
				</div>
			</div>
		);
	}

	getFinishModalUI() {
		return (
			<div>
				<div className="modal fade" id="modal-finish">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">Super!</h4>
							</div>
							<div className="modal-body">
								<div className="container">
									<p>Du hast die Challenge erfolgreich abgeschlossen und erhälst folgendes Abzeichen:</p>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button"
										className="btn btn-primary btn-uppercase btn-block"
										data-dismiss="modal"
										onClick={this.props.onCompleted.bind(this)}>Zurück zum Dashboard</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	getStepTextUI(stepName, {title, text}) {
		return (
			<div>
				<div className="card-block card-step">
					<h3 className="card-title">{title}</h3>
					<p className="card-text">{text}</p>
				</div>
			</div>
		);
	}

	getStepButtonUI(stepName, {label, title, text}) {
		return (
			<div>
				<div className="card-block card-step">
					<h3 className="card-title">{title}</h3>
					<p className="card-text">{text}</p>
					<button className="btn btn-primary" onClick={this.props.actions.updateStep.bind(this, this.props.challenge.name, stepName, null)}>{label}</button>
				</div>
			</div>
		);
	}

	getStepInputUI(stepName, {button_title, input_title, placeholder, title, text, button, value, type = 'text'}) {

		const changeAction = (event) => {
			this.setState({
				input: event.target.value
			});
		};

		return (
			<div>
				<div className="card-block card-step">
					<h3 className="card-title">{title}</h3>
					<p className="card-text">{text}</p>
					<div className="form-group">
						<div className="col-xs-10 no-padding padding-right">
							<input
								className="form-control"
								type={type}
								onChange={changeAction.bind(this)}
								value={this.state.input}
								defaultValue={value}
								placeholder={input_title} />
						</div>
						<div className="col-xs-2 no-padding">
							<button
								className="btn btn-primary btn-block btn-uppercase"
								onClick={this.props.actions.updateStep.bind(this, this.props.challenge.name, stepName, {input: this.state.input})}>
								{button_title}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}


	getStepUI({name, type, options}) {
		let content;
		switch(type) {
			case 'TextStep':
				content = this.getStepTextUI.bind(this);
				break;

			case 'ButtonStep':
				content = this.getStepButtonUI.bind(this);
				break;

			case 'InputStep':
				content = this.getStepInputUI.bind(this);
				break;
		}

		if(content) {
			return (
				<div className="card">
					{content(name, options)}
				</div>
			)
		}
	}


	render() {
		return (
			<LayoutBackend className="route-challenge">
				<section className="section-challenge">
					<div className="container">
						<div className="row">
							<div className="col-md-8 offset-md-2">
								{this.getSummaryUI(this.props.challenge)}
								{this.props.steps.map((step, index) => {
									return (
										<div key={index}>
											{this.getStepUI(step)}
										</div>
									);
								})}
								{this.getFinishUI()}
							</div>
						</div>
					</div>
				</section>
				{this.getFinishModalUI()}
			</LayoutBackend>
		);
	}

}

export default Challenge;