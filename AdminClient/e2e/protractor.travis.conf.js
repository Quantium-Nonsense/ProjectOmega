// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');
/**
 *
 * @type {import(Jasmine2ScreenShotReporter)}
 */
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

// Setup reporter
/**
 *yes
 * @type {import(Jasmine2ScreenShotReporter)}
 */
const reporter = new HtmlScreenshotReporter({
	dest: 'target/screenshots',
	filename: 'my-report.html',
	showSummary: true,
	showQuickLinks: true,
	inlineImages: true,
	captureOnlyFailedSpecs: false,
	reportOnlyFailedSpecs: false
});
/**
 * @type { import("protractor").Config }
 */
exports.config = {
	// Before any tests start we register reporter
	beforeLaunch: function () {
		process.on('uncaughtException', function () {
			reporter.jasmineDone();
			reporter.afterLaunch();
		});
		return new Promise(function (resolve) {
			reporter.beforeLaunch(resolve);
		});
	},
	// Close the report after all tests finish
	afterLaunch: function (exitCode) {
		return new Promise(function (resolve) {
			reporter.afterLaunch(resolve.bind(this, exitCode));
		});
	},
	allScriptsTimeout: 11000,
	specs: [
		'./src/**/*.e2e-spec.ts'
	],
	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
			args: ["--headless", "--disable-gpu", "--window-size=1920,1080"]
		}
	},
	directConnect: true,
	baseUrl: 'http://localhost:4200/',
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function () {
		}
	},
	onPrepare() {
		jasmine.getEnv().addReporter(reporter);
		require('ts-node').register({
			project: require('path').join(__dirname, './tsconfig.json')
		});
		jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
	}
};
