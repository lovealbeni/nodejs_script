const path = require('path');
module.exports = {
	mode: 'development',
	module:{
		rules:[
			{
				test: /\.glsl$/,
				use: 'raw-loader'
			}
		]
	},
	entry: './app/index.js',
	output:{
		filename:'bundle.js',
		path: path.resolve(__dirname,'dist'),
	}
}