'use strict';
const ipc = require('ipc');
ipc.on('Reload', () => {
	//Reload
	document.querySelector('').click();
});

ipc.on('Preference', () => {
	//log-out
	document.querySelector('').click();
});

ipc.on('About', () => {
	// About
	document.querySelector('').click();
});

ipc.on('Exit', () => {
	//Exit
	document.querySelector('').click();
});

