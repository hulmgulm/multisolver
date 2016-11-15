'use strict';

var GulpConfig = (function () {
	function gulpConfig() {
		// Paths
		this.pathSource		= './src/';
		this.pathDest		= './build/';
		this.pathAssets		= 'assets/';
		this.pathApp		= 'app/';
		this.pathImages 	= this.pathAssets + 'img/';

		this.pathLibraryTypeScriptDefinitions = './typings/globals/**/*.ts';
	}
	return gulpConfig;
})();

module.exports = GulpConfig;