import React from 'react';

import {NumericValue, UpdateWithFrequency} from '../../../src';

export default class TestKitchenSink extends React.Component {

	state = {}

	constructor (props) {
		super(props);
		this.state = {
			fieldValue: 75,
			cmpValue: 75
		};
	}

	async randValue () {
		const value = Math.floor(Math.random() * (100) + 1);
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({value: value});
			}, 5000);
		});
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
				<NumericValue label="Learners Online Now" value={this.state.cmpValue} storageKey="testkey" />
				<UpdateWithFrequency frequency={3000} selectData={this.randValue}>
					<NumericValue label="Learners Online"/>
				</UpdateWithFrequency>
			</div>
		);
	}
}
