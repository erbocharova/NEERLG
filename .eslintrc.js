module.exports = {
	root: true,
	parserOptions: { 
		ecmaVersion: 6,
		sourceType: 'module'
	},
	env: {
		es6: true,
		browser: true,
		node: true
	},
	extends: [
		'eslint:recommended'
	],
	languageOptions: {

		globals: {...globals.browser, ...globals.node}

	},
	parser: "babel-eslint",
	rules: {}
}
