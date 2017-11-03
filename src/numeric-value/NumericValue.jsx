import React from 'react';
import PropTypes from 'prop-types';
import {LocalStorage} from 'nti-web-storage';

const KEY_PREFIX = '_nti_numeric_value_';

function calculateChange (oldValue, newValue) {
	if ( newValue === oldValue ) {
		return undefined;
	}

	if ( oldValue === undefined || oldValue === 0 ) {
		return 100;
	}

	return Math.round(( (newValue - oldValue) / oldValue ) * 100);
}

export default class NumericValue extends React.Component {

	state = {
		change: 0
	}

	static propTypes = {
		label: PropTypes.string.isRequired,
		value: PropTypes.number,
		storageKey: PropTypes.string
	}

	constructor (props) {
		super(props);

		const key = this.storageKey();
		if ( key ) {
			const oldValue = parseInt(LocalStorage.getItem(key), 10);
			LocalStorage.setItem(key, props.value);

			this.state = {
				change: calculateChange(oldValue, props.value)
			};
		}
	}

	storageKey () {
		const {storageKey} = this.props;
		if (!storageKey) {
			return undefined;
		}
		return KEY_PREFIX + storageKey;
	}

	maybeUpdateChange (oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}

		const key = this.storageKey();
		if (key && oldValue !== undefined) {
			LocalStorage.setItem(key, newValue);
		}

		const change = calculateChange(oldValue, newValue);
		if (change !== undefined) {
			this.setState({change: change});
		}
	}

	componentWillReceiveProps (newProps) {
		const newValue = newProps.value;
		const oldValue = this.props.value;

		this.maybeUpdateChange(oldValue, newValue);
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

