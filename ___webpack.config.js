const path = require('path');
// import path from 'path';

module.exports = {
	mode: 'development',
	entry: './src/frontend/index.js',
	output: {
		path: path.resolve(__dirname, 'assets/js'),
		filename: 'woo-lookblock-frontend.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			}
		]
	}
};