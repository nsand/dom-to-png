# dom-to-png
Middleware for converting DOM to a downloaded PNG

Set up your express server to handle a POST, using a urlencoded body parser

```javascript
var bodyParser = require('body-parser'),
  domToPng = require('dom-to-png'),
  express = require('express');

var server = express();
server.post('/image', bodyParser.urlencoded({extended: true, limit: '1mb'}), domToPng);

server.listen(3001, function () {
	console.log('Started');
});

```

Issue a POST to the endpoint that was created above, where the formdata includes a field for `markup`, which has the DOM that you would like to download as an image.

The browser should initiate a download of that image.

```html
<form method="POST" name="downloadImage" action="/image" enctype="application/x-www-form-urlencoded">
 <button onclick="downloadImage.submit()">Download</button>
 <input type="hidden" value="<div>Hello</div>" name="markup">
</form>
```
