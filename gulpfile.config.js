'use strict';

var GulpConfig = (function () {
	function gulpConfig() {
		// Flags
		this.clean			= true;
		this.lint			= true;
		this.copyLibs		= true;
		this.compressImages	= true;
		this.compressCSS	= true;
		this.compressHTML	= true;
		this.compressJS		= true;

		// Paths
		this.pathSource		= './src/';
		this.pathDest		= './build/';
		this.pathAssets		= 'assets/';
		this.pathApp		= 'app/';
		this.pathImages		= this.pathAssets + 'img/';

		this.pathLibraryTypeScriptDefinitions = './typings/globals/**/*.ts';
	}
	return gulpConfig;
})();

module.exports = GulpConfig;