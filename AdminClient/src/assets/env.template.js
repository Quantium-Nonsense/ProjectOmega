(function (window) {
	window['env'] = window['env'] || {};
	
	// Enviroment variables
	window.env.company = "${GIT_COMPANY}";
	window.env.apiRoot = "${API_ROOT}";
})(this)
