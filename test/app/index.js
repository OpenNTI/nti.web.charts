import React from 'react';
import ReactDOM from 'react-dom';

import 'nti-style-common/all.scss';
import 'nti-web-commons/lib/index.css';

import {NumericValue} from '../../src';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};


class TestKitchenSink extends React.Component {
	render () {
		return (
			<NumericValue label="Learners Online Now" value={10} key="foo" />
		);
	}
}

ReactDOM.render(
	React.createElement(TestKitchenSink, {}),
	document.getElementById('content')
);
