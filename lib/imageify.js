/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2016. All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var cuid = require('cuid'),
	fs = require('fs'),
	os = require('os'),
	path = require('path'),
	phantom = require('phantomjs').path,
	spawn = require('child_process').spawn;

function imageify(req, res) {
	'use strict';

	var tmp = os.tmpdir();
	var name = cuid();
	// The content is made up of the stylesheet references and the markup that was sent over
	var content = '<html><body>' + req.body.markup + '</body></html>';
	var htmlPath = path.join(tmp, name + '.html');
	var imagePath = path.join(tmp, name + '.png');

	fs.writeFile(htmlPath, content, function (err) {
		// Created the page that will be rendered by phantomjs
		if (err) {
			console.error('Failed to write the temporary page.');
			console.error(error);
			res.status(500).end();
		}

		// Spawn the phantomjs process
		var cp = spawn(phantom, ['screencap.js', htmlPath, imagePath], {stdio: 'inherit'});
		cp.on('error', function (error) {
			console.error('An error occurred running the screencapture process.');
			console.log(error);
		});

		cp.on('exit', function (exit) {
			if (exit) {
				console.error('The screencapture process exited with errors: ' + exit);
				res.status(500).end();
			}
			else {
				// When the process exits successfully, download the file, and clean up the temporary files
				res.download(imagePath, function () {
					fs.unlink(htmlPath);
					fs.unlink(imagePath);
				});
			}
		});
	});
}

module.exports = imageify;
