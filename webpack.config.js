var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');

console.info('Building for API_URL: ', process.env.API_URL);

var config = {
	entry: ['babel-polyfill', APP_DIR + '/app.js'],
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module : {
		loaders : [
			{
				test : /\.jsx?/,
				include : APP_DIR,
				loader : 'babel'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(css|scss|sass)$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file?name=fonts/[name].[ext]'
			},
			{
				test: /\.(jpg|jpeg|png|gif)$/,
				loader: 'file?name=images/[name].[ext]'
			},
			{
				test: /\.(index.html)$/,
				loader: 'file?name=[name].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	node: {
		net: "empty",
		fs: "empty"
	},
	plugins: [
		new ExtractTextPlugin("styles.css"),
		new webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
			"window.jQuery": "jquery",
			jQuery:"jquery",
			"window.Tether": 'tether',
			tether: 'tether',
			Tether: 'tether',
			'React': 'react'
		}),
		new webpack.DefinePlugin({
			'process.env.API_URL': JSON.stringify(process.env.API_URL),
		}),
	]
};

module.exports = config;
