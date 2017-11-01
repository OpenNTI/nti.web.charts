import React from 'react';
import PropTypes from 'prop-types';

function calculateChange(oldValue, newValue) {
	if ( newValue === oldValue ) {
		return undefined;
	}

	if ( oldValue === undefined || oldValue === 0 ) {
		return 100;
	}

	return ( (newValue - oldValue) / oldValue ) * 100;
}

export default class NumericValue extends React.Component {

	state = {
		change: 0
	}

	static propTypes = {
		label: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		key: PropTypes.string
	}

	componentWillReceiveProps (newProps) {
		const newValue = newProps.value;
		const oldValue = this.props.value;

		if (newValue !== oldValue) {
			const change = calculateChange(oldValue, newValue);
			if (change !== undefined){
				this.setState({change: Math.round(change)});
			}
		}
	}

	render () {
		const { label, value } = this.props;
		const rawChange = this.state.change || 0;

		let change = Math.abs(rawChange);
		let changeClass = 'change';
		if (rawChange > 0) {
			changeClass += ' positive';
		}
		else if (rawChange < 0) {
			changeClass += ' negative';
		}

		return (
			<div className="numeric-value">
				<div className="label">
					{label}
				</div>
				<div className="value">
					{value}
				</div>
				<div className={changeClass}>
					{change}%
				</div>
			</div>
		);
	}
}

