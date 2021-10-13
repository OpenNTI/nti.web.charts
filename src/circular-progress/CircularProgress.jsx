import './CircularProgress.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class CircularProgress extends React.Component {
	static propTypes = {
		/**
		 * Optional stroke color.
		 *
		 * @type {string}
		 */
		strokeColor: PropTypes.string,

		/**
		 * The Value to chart.
		 *
		 * @type {number} Default: 90
		 */
		value: PropTypes.number.isRequired,

		/**
		 * Width of the graph
		 *
		 * @type {number} Default: 200
		 */
		width: PropTypes.number,

		/**
		 * Height of the graph
		 *
		 * @type {number} Default: 200
		 */
		height: PropTypes.number,

		/**
		 * If specified, will fill the rest of the circle with this color
		 *
		 * @type {string} Default: undefined
		 */
		deficitFillColor: PropTypes.string,

		/**
		 * Is in completion state (show checkmark rather than 100%)
		 *
		 * @type {bool} Default: undefined
		 */
		isComplete: PropTypes.bool,

		/**
		 * Toggles visibility of numeric label
		 *
		 * @type {bool} Default: true
		 */
		showValue: PropTypes.bool,

		/**
		 * Toggles visibility of % symbol
		 *
		 * @type {bool} Default: false
		 */
		showPercentSymbol: PropTypes.bool,
	};

	static defaultProps = {
		value: 0,
		strokeColor: '#3fb34f',
		deficitFillColor: '#eee',
		width: 200,
		height: 200,
		showValue: true,
		showPercentSymbol: false,
	};

	render() {
		const {
			value,
			strokeColor,
			deficitFillColor,
			showValue,
			showPercentSymbol,
			isComplete,
		} = this.props;

		const calculatedWidth = parseInt(this.props.width, 10);
		const calculatedHeight = parseInt(this.props.height, 10);

		if (isComplete) {
			const fontSize = calculatedWidth / 1.5;

			let completedStyle = {
				width: calculatedWidth,
				height: calculatedWidth,
				borderRadius: calculatedWidth,
			};

			let checkStyle = {
				fontSize,
				width: calculatedWidth,
				top: calculatedHeight / 10,
			};

			return (
				<div className="circular-progress progress-complete-container">
					<div style={completedStyle} className="progress-completed">
						<div style={checkStyle} className="check">
							<i className="icon-check" />
						</div>
					</div>
				</div>
			);
		}

		const fontSize = calculatedWidth / 3;
		const top = calculatedHeight / 4;

		let valueStyle = {
			fontSize,
			width: calculatedWidth,
			top,
		};

		let percentStyle = {
			fontSize: fontSize / 2,
		};

		const className = cx('circular-progress', {
			'no-progress': value === 0,
		});

		return (
			<div className={className}>
				<svg
					width={this.props.width}
					height={this.props.height}
					viewBox="0 0 36 36"
				>
					<path
						d="M18 2.0845
					a 15.9155 15.9155 0 0 1 0 31.831
					a 15.9155 15.9155 0 0 1 0 -31.831"
						fill="none"
						stroke={deficitFillColor}
						strokeWidth="2"
						strokeDasharray="100, 100"
					/>
					<path
						d="M18 2.0845
					a 15.9155 15.9155 0 0 1 0 31.831
					a 15.9155 15.9155 0 0 1 0 -31.831"
						fill="none"
						stroke={strokeColor}
						strokeWidth="2"
						strokeDasharray={`${value}, 100`}
					/>
				</svg>
				{showValue && (
					<div className="value" style={valueStyle}>
						<span className="number">{value}</span>
						{showPercentSymbol && (
							<span className="percent" style={percentStyle}>
								%
							</span>
						)}
					</div>
				)}
			</div>
		);
	}
}
