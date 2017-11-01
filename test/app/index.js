import React from 'react';
import ReactDOM from 'react-dom';

import 'nti-style-common/all.scss';
import 'nti-web-commons/lib/index.css';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};


class TestKitchenSink extends React.Component {
	render () {
		return (
			<div>
				Charts
			</div>
		);
	}
}

ReactDOM.render(
	React.createElement(TestKitchenSink, {}),
	document.getElementById('content')
);
