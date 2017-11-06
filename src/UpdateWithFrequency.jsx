import React from 'react';
import PropTypes from 'prop-types';
import {VisibilityMonitor} from 'nti-lib-dom';

export default class UpdateWithFrequency extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		frequency: PropTypes.number,
		selectData: PropTypes.func.isRequired
	}

	constructor (props) {
		super(props);
		this.state = {
			data: null
		};
	}

	async loadData () {
		const selectData = this.props.selectData;
		try {
			const data = await selectData();
			this.setState({data: data});
		}
		catch (e) {
			this.setState({data: {error: e}});
		}

		this.setTimer();
	}

	componentDidMount () {
		this.loadData();
		VisibilityMonitor.addChangeListener(this.visChangeHandler);
	}

	componentWillUnmount () {
		this.clearTimer();
		VisibilityMonitor.removeChangeListener(this.visChangeHandler);
	}

	setTimer () {
		this.clearTimer();

		const frequency = this.props.frequency;
		if (frequency) {
			this.timeoutId = setTimeout(this.timer, frequency);
		}
	}

	clearTimer () {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
	}

	timer = () => {
		this.loadData();
	}

	visChangeHandler = (visible) => {
		if (visible) {
			this.setTimer();
		}
		else {
			this.clearTimer();
		}
	}

	render () {
		const kids = React.Children.only(this.props.children);
		return (
			React.cloneElement(kids, {...this.state.data})
		);
	}
}
