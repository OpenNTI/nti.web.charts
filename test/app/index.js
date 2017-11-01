import React from 'react';
import ReactDOM from 'react-dom';

import 'nti-style-common/all.scss';
import 'nti-web-commons/lib/index.css';

import {NumericValue} from '../../src';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};


class TestKitchenSink extends React.Component {

	state = {}

	constructor (props) {
		super(props);
		this.state = {
			fieldValue: 0,
			cmpValue: 0
		};
	}

	handleChange = (event) => {
		this.setState({fieldValue: parseInt(event.target.value, 10)});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({cmpValue: parseInt(this.state.fieldValue, 10)});
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Value:
						<input type="text" value={this.state.username} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Update" />
				</form>
				<NumericValue label="Learners Online Now" value={this.state.cmpValue} key="foo" />
			</div>
		);
	}
}

ReactDOM.render(
	React.createElement(TestKitchenSink, {}),
	document.getElementById('content')
);
