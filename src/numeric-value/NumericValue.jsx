import './NumericValue.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { LocalStorage } from '@nti/web-storage';

const KEY_PREFIX = '_nti_numeric_value_';

function calculateChange(oldValue, newValue) {
	if (newValue === oldValue || oldValue === undefined) {
		return undefined;
	}

	if (oldValue === 0) {
		return 100;
	}

	return Math.round(((newValue - oldValue) / oldValue) * 100);
}

export default class NumericValue extends React.Component {
	state = {};

	static propTypes = {
		label: PropTypes.string.isRequired,
		value: PropTypes.number,
		error: PropTypes.node,
		storageKey: PropTypes.string,
		classes: PropTypes.shape({
			container: PropTypes.string,
			label: PropTypes.string,
			value: PropTypes.string,
			change: PropTypes.string,
		}),
	};

	constructor(props) {
		super(props);

		const key = this.storageKey();
		if (key) {
			const oldValue = parseInt(LocalStorage.getItem(key), 10);
			LocalStorage.setItem(key, props.value);

			this.state = {
				change: calculateChange(oldValue, props.value),
			};
		}
	}

	storageKey() {
		const { storageKey } = this.props;
		if (!storageKey) {
			return undefined;
		}
		return KEY_PREFIX + storageKey;
	}

	maybeUpdateChange(oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}

		const key = this.storageKey();
		if (key && oldValue !== undefined) {
			LocalStorage.setItem(key, newValue);
		}

		const change = calculateChange(oldValue, newValue);
		if (change !== undefined) {
			this.setState({ change: change });
		}
	}

	componentDidUpdate(oldProps) {
		const oldValue = oldProps.value;
		const newValue = this.props.value;

		this.maybeUpdateChange(oldValue, newValue);
	}

	render() {
		const { label, value, error, classes } = this.props;
		const rawChange = this.state.change || 0;

		let change = Math.abs(rawChange);
		let changeClass = 'change';
		if (rawChange > 0) {
			changeClass += ' positive';
		} else if (rawChange < 0) {
			changeClass += ' negative';
		}

		return (
			<div className={cx('numeric-value', classes?.container)}>
				<div className={cx('label', classes?.label)}>{label}</div>
				<div className={cx('value', classes?.value)}>
					{error || value}
				</div>
				{this.state.change && (
					<div className={cx(changeClass, classes?.change)}>
						{change}%
					</div>
				)}
			</div>
		);
	}
}
