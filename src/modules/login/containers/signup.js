import {render} from 'react-dom';
import {compose} from 'react-komposer';

import component from '../components/signup';

const composer = (props, onData) => {

	let componentData = {
	};

	onData(null, componentData);
};

export default compose(composer)(component);
