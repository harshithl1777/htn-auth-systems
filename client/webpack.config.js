const path = require('path');

module.exports = {
	mode: 'none',
	entry: './src/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
	},
	devServer: {
		static: path.join(__dirname, 'dist'),
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:5000',
				pathRewrite: { '^/api': '' },
				secure: false,
				changeOrigin: true,
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
};
