import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useIdleTimer } from 'react-idle-timer';
import clsx from 'clsx';
import { makeStyles, Box } from '@material-ui/core';
import AuthContext from 'context/AuthContext';
import Modal from './Modal';
import API from 'apis/API';
import Storage from 'utils/Storage';

const ExpireTimer = () => {
	const authContext = useContext(AuthContext);
	const classes = useStyles();
	const [timer, setTimer] = useState(1200);
	const [timerMinutes, setTimerMinutes] = useState('00');
	const [timerSeconds, setTimerSeconds] = useState('00');
	const [timerIntervalId, setTimerIntervalId] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [sending, setSending] = useState(false);

	// idle time
	const [lastActive, setLastActive] = useState(+new Date());

	const handleOnActive = () => {
		if (sending) return;
		setSending(true);
		API.auth.refreshToken().then(res => {
			const token = res.data?.access_token;

			if (token) {
				Storage.set('access_token', token);
				setTimer(1200);
			}
			setSending(false);
		});
	};

	const handleOnIdle = () => {
		setTimer(1200);
	};

	const {
		getLastActiveTime,
	} = useIdleTimer({
		events: [
			'keydown',
			'DOMMouseScroll',
			'mousedown',
			'touchstart',
			'touchmove',
			'MSPointerDown',
			'MSPointerMove'
		],
		onActive: handleOnActive,
		onIdle: handleOnIdle,
	});

	useEffect(() => {
		let time = secondsToTime(timer);
		setTimerMinutes(time[0]);
		setTimerSeconds(time[1]);

		if (time[0] === 0 && time[1] === 59) {
			setOpenModal(true);
		}

		if (time[0] === 0 && time[1] === 1) {
			setOpenModal(false);
			toast.info('Twoja sesja wygasła!');
			authContext.logOut();
		}
	}, [timer]);

	useEffect(() => {
		toggleCountDown();

		setLastActive(getLastActiveTime());

		setInterval(() => {
			setLastActive(getLastActiveTime());
		}, 1000);
	}, []);

	useEffect(() => {
		handleOnActive();
	}, [lastActive]);


	const toggleCountDown = () => {
		// stopped mode
		// create accurate date timer with date
		const newIntervalId = setInterval(() => {
			setTimer(prevTime => {
				let newTime = Math.max(prevTime - 1, 0);
				let time = secondsToTime(newTime);
				setTimerMinutes(time[0]);
				setTimerSeconds(time[1]);
				return newTime;
			});
		}, 1000);
		setTimerIntervalId(newIntervalId);
	};

	// return minutes and seconds of seconds
	const secondsToTime = (seconds) => {
		return [Math.floor(seconds / 60), seconds % 60];
	};

	// zero paddings if < 10
	const formatDisplayTime = (time) => {
		return time < 10 ? `0${time}` : time;
	};

	const handleResetTimer = () => {
		if (timerIntervalId) {
			clearInterval(timerIntervalId);
		}
		setTimerIntervalId(null);
		setTimer(1200);

		// stopped mode
		// create accurate date timer with date
		const newIntervalId = setInterval(() => {
			setTimer(prevTime => {
				let newTime = Math.max(prevTime - 1, 0);
				let time = secondsToTime(newTime);
				setTimerMinutes(time[0]);
				setTimerSeconds(time[1]);
				return newTime;
			});
		}, 1000);
		setTimerIntervalId(newIntervalId);
	};

	return (
		<Box mr={2}>
			<Box className={clsx(classes.time, { [classes.danger]: (secondsToTime(timer)[0] <= 0) })}>
				{formatDisplayTime(timerMinutes)}:{formatDisplayTime(timerSeconds)}
			</Box>

			<Modal
				openModal={openModal}
				handleClose={() => setOpenModal(false)}
				handleOk={handleResetTimer}
				title={`Zotaniesz automatycznie wylogowany za XX (${Math.max(secondsToTime(timer)[1])})`}
				okText="Przedłuż sesję"
				cancelText="TAK"
			/>
		</Box>
	);
};

const useStyles = makeStyles(() => ({
	time: {
		fontSize: '1.5rem',
		fontFamily: 'sans-serif',
		fontWeight: 700,
		color: '#17253F'
	},
	danger: {
		color: 'red'
	}
}));

export default ExpireTimer;