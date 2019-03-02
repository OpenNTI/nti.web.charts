import React from 'react';
import ReactDOM from 'react-dom';

import Test from './pie-chart';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};


ReactDOM.render(
	React.createElement(Test, {}),
	document.getElementById('content')
);
