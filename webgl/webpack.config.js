const path = require('path');
module.exports = {
	mode: 'development',
	module:{
		rules:[
			{
				test: /\.glsl$/,
				use: 'raw-loader'
			},
			{
				test: /\.ts$/,
				use: 'ts-loader'
			}
		]
	},
	resolve:{
		extensions:[".ts",".js"]
	},
	entry: './app/index.ts',
	output:{
		filename:'bundle.js',
		path: path.resolve(__dirname,'dist'),
	}
}