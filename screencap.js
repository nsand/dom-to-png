/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2016. All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var fs = require('fs');
var system = require('system');
var page = require('webpage').create();

page.settings.javascriptEnabled = false;
page.content = fs.read(system.args[1]);
page.onLoadFinished = function () {
	'use strict';
	/* global phantom */
	page.render(system.args[2]);
	phantom.exit();
};
