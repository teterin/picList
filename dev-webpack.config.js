var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {

    entry: {
        app: "./Scripts/app.js"
    },
    output: {
        path: __dirname + '/build',
        filename: "[name].js",
        publicPath: ""
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html'           
        }),
         new ExtractTextPlugin("[name].css")
    ],
    module: {
        noParse: [
          __dirname + "/Scripts/vendor/knockout-3.3.0.js"
        ],
        loaders: [
         
          { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
        
           {
               test: /\.js$/,
               loader: "source-map-loader"
           }
        ]
    }, devtool: "#source-map"

}