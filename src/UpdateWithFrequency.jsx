import React from 'react';
import PropTypes from 'prop-types';

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

		const frequency = this.props.frequency;
		if (frequency) {
			this.timeoutId = setTimeout(this.timer, frequency);
		}
	}

	componentDidMount () {
		this.loadData();
	}

	componentWillUnmount () {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
	}

	timer = () => {
		this.loadData();
	}

	render () {
		const kids = React.Children.only(this.props.children);
		return (
			React.cloneElement(kids, {...this.state.data})
		);
	}
}
