// Project settings

let project = 'react-console';

// Build system

let FailPlugin = require('webpack-fail-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
	context: __dirname,
	entry: './src/example.tsx',
	output: {
		path: __dirname + '/dist',
		filename: project + '.example.js',
		library: "Example",
		libraryTarget: "var",
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
			{
				test: /\.s?css$/,
				loader: ExtractTextPlugin.extract("css-loader?sourceMap!sass-loader?sourceMap"),
			},
		],
		preLoaders: [
			{
				test: /\.(css|js)$/,
				loader: "source-map-loader",
			}
		],
	},
	devtool: 'source-map',
	plugins: [
		new webpack.NormalModuleReplacementPlugin(/debug/, __dirname + '/src/support/noop.js'),
		FailPlugin,
		new ExtractTextPlugin(project + '.example.css'),
	],
};
