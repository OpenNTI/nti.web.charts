import React from 'react';
import PropTypes from 'prop-types';

export default class Controls extends React.Component {
	static propTypes = {
		values: PropTypes.arrayOf({
			value: PropTypes.number,
			label: PropTypes.string
		}),
		onChange: PropTypes.func
	}

	onChange = ({target: {name, value}}) => {
		const {values, onChange} = this.props;
		const item = values.find(({label}) => name === label);
		item.value = parseInt(value, 10);
		onChange(values);
	}

	addItem = () => {
		const {values, onChange} = this.props;
		values.push({
			label: `Item ${values.length + 1}`,
			value: 50
		});
		onChange(values);
	}

	render () {
		const {values} = this.props;

		return (
			<div>
				{values.map(({value, label}, i) => (
					<div key={i}>
						<div>{label}</div>
						<input type="range" name={label} value={value} min={1} max={100} onChange={this.onChange}/>
					</div>
				))}
				<button onClick={this.addItem}>Add Item</button>
			</div>
		);
	}
}