# ds-mosaico-import

[![Build Status](https://travis-ci.org//ds-mosaico-import.png?branch=master)](https://travis-ci.org//ds-mosaico-import)



## Usage

### ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```js
import plugin from 'ds-mosaico-import';
```

### CommonJS use

Use `require` to load `ds-mosaico-import` and everything else
needed to create a template that uses `ds-mosaico-import`:

```js
var plugin = require("ds-mosaico-import");
```

## AMD use

Configure the `can` and `jquery` paths and the `ds-mosaico-import` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
		    	name: 'ds-mosaico-import',
		    	location: 'node_modules/ds-mosaico-import/dist/amd',
		    	main: 'lib/ds-mosaico-import'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

### Standalone use

Load the `global` version of the plugin:

```html
<script src='./node_modules/ds-mosaico-import/dist/global/ds-mosaico-import.js'></script>
```

## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```
