import React from 'react';
import PropTypes from 'prop-types';

export default class NumericValue extends React.Component {

	state = {
		change: 0
	}

	static propTypes = {
		label: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		key: PropTypes.string
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

