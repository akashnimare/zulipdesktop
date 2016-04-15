'use strict';
const path = require('path');
const fs = require('fs');
const app = require('app');
const BrowserWindow = require('browser-window');
const shell = require('shell');
const Menu = require('menu');
const appMenu = require('./menu');

require('electron-debug')();
require('crash-reporter').start();

let mainWindow;


function createMainWindow() {
	const win = new BrowserWindow({
		'title': app.getName(),
		'show': false,
		'width': 600,
		'height': 800,
		'icon': path.join(__dirname, 'media', 'Icon.png'),
		'min-width': 400,
		'min-height': 600,
		'transparent': true, 
		'frame': true,
		'resizable':true,
		'title':'Zulip',
		'title-bar-style': 'hidden-inset',
		'web-preferences': {
			// fails without this because of CommonJS script detection
			'node-integration': false,
			'preload': path.join(__dirname, 'browser.js'),
			'web-security': true, //set it false for testing
			'plugins': true
		}
	});
	win.setTitle("title");
	win.loadUrl('http://localhost:9991/login/?next=/');
	win.on('closed', app.quit);
	return win;
}

app.on('ready', () => {
	Menu.setApplicationMenu(appMenu);

	mainWindow = createMainWindow();

	const page = mainWindow.webContents;

	page.on('dom-ready', () => {
		mainWindow.show();
	});

	page.on('did-finish-load',() => {  
    mainWindow.setTitle("Zulip");
});


	page.on('did-fail-load',() => {  
 
    console.log("Failed to load");
});


	page.on('new-window', (e, url) => {
		e.preventDefault();
		shell.openExternal(url);
	});
});



 
