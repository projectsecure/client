import {render} from 'react-dom';
import {compose} from 'react-komposer';
import {browserHistory} from 'react-router';

import userActions from '../actions/user';
import loginActions from '../actions/login';

import component from '../components/signup';
import actions from '../actions/signup';

const composer = (props, onData) => {
	userActions.checkAuth().then(() => {
		browserHistory.push('/dashboard/');
	}).catch(() => {
		let componentData = {
			actions,
			onSignup: (data) => {
				actions.signup(data).then(() => {
					loginActions.login({
						username: data.username,
						password: data.password
					}).then(() => {
						browserHistory.push('/dashboard/');
					});
				}).catch(({error, response}) => {
					componentData.error = {
						details: error,
						message: `Oh, es scheint so, als sei ein Fehler aufgetreten.`,
						fields: response.body
					};
					onData(null, componentData);
				});
			}
		};
		onData(null, componentData);
	});
};

export default compose(composer)(component);
