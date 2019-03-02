import React from 'react';
import classnames from 'classnames/bind';

import {PieChart} from '../../../src';

import styles from './View.css';
import Controls from './Controls';

const cx = classnames.bind(styles);

const SERIES = [
	{
		value: 12,
		label: 'Item 1'
	},
	{
		value: 13,
		label: 'Item 2'
	},
	{
		value: 15,
		label: 'Item 3'
	}
];

export default class PieChartTest extends React.Component {

	state = {values: SERIES}

	onChange = values => this.setState({values})

	render () {
		const {values} = this.state;

		return (
			<div className={cx('pie-chart-test')}>
				<Controls onChange={this.onChange} values={values} />
				<PieChart series={values} />
			</div>
		);
	}
}