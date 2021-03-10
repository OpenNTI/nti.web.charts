import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { VisibilityMonitor } from '@nti/lib-dom';

const CANCELED = Symbol('canceled');

UpdateWithFrequency.propTypes = {
	children: PropTypes.node,
	frequency: PropTypes.number,
	selectData: PropTypes.func.isRequired,
};

export default function UpdateWithFrequency({
	children,
	frequency,
	selectData,
}) {
	const timer = useRef();
	const taskRun = useRef(null);
	const [data, setData] = useState();

	const load = useCallback(async () => {
		const activeTask = {};
		const gate = taskRun;
		if (gate.current) {
			return;
		}
		let newData = null;
		try {
			gate.current = activeTask;
			// console.log('load');
			newData = await selectData();
		} catch (e) {
			newData = { error: e };
		} finally {
			if (gate.current === activeTask) {
				gate.current = null;
				setData(newData);
			}
		}
	}, [selectData]);

	const stopTimer = useCallback(() => {
		clearTimeout(timer.current);
		timer.current = null;
		// console.log('stop');
	}, []);

	const startTimer = useCallback(() => {
		stopTimer();
		// console.log('start');
		timer.current = setTimeout(() => load().then(startTimer), frequency);
	}, [frequency, load]);

	useEffect(() => {
		load();
		startTimer();

		const change = visible => (visible ? startTimer() : stopTimer());
		VisibilityMonitor.addChangeListener(change);

		return () => {
			// console.log('cleanup');
			taskRun.current = CANCELED;
			VisibilityMonitor.removeChangeListener(change);
		};
	}, [load, startTimer, stopTimer]);

	return React.cloneElement(React.Children.only(children), { ...data });
}
