/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
		
	var paths = {
		// paths serve as alias
		'npm:': 'lib/'
	};
	
	// map tells the System loader where to look for things
	var map = {
		// our app is within the app folder
		'app'       					: 'app',
		'translate' 					: 'app/translate',
		'@angular'  					: 'lib/@angular',
		'angular2-in-memory-web-api'	: 'lib/angular2-in-memory-web-api',
		'rxjs'							: 'lib/rxjs'
	};

	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'rxjs' : {
			defaultExtension: 'js'
		},
		'angular2-in-memory-web-api': {
			defaultExtension: 'js'
		},
	};

	var ngPackageNames = [
		'common',
		'forms',
		'compiler',
		'core',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'router',
		'router-deprecated',
		'upgrade',
	];

	// Individual files (~300 requests):
	function packIndex(pkgName) {
		packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
	}
	// Bundled (~40 requests):
	function packUmd(pkgName) {
		packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.min.js', defaultExtension: 'js' };
	}
	// Most environments should use UMD; some (Karma) need the individual index files
	var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
	// Add package entries for angular packages
	ngPackageNames.forEach(setPackageConfig);

	var config = {
		paths: paths,
		map: map,
		packages: packages
	};

	System.config(config);
		
})(this);
