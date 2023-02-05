const debug = process.env.NODE_ENV !== "production";
const path = require("path");
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
// const DeclarationBundlerPlugin = require('./declaration-bundler-webpack-plugin.fix')

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports={
    /** "mode"
     * the environment - development, production, none. tells webpack 
     * to use its built-in optimizations accordingly. default is production 
     */
    mode: "development", 
    /** "entry"
     * the entry point 
     */
    entry: ['webpack/hot/dev-server' , "./index.tsx"], 
    output: {
        /** "path"
         * the folder path of the output file 
         */
        path: path.resolve(__dirname, "build"),
        chunkFilename: '[name].js',
        /** "filename"
         * the name of the output file 
         */
        filename: debug ? "[name].js" : '[name].[contenthash].js',
    },
    /** "target"
     * setting "node" as target app (server side), and setting it as "web" is 
     * for browser (client side). Default is "web"
     */
    target: "web",
    devServer: {
        /** "port" 
         * port of dev server
        */
        port: "9500",
        /** "static" 
         * This property tells Webpack what static file it should serve
        */
        static: ["./build"],
        /** "open" 
         * opens the browser after server is successfully started
        */
        open: true,
        /** "hot"
         * enabling and disabling HMR. takes "true", "false" and "only". 
         * "only" is used if enable Hot Module Replacement without page 
         * refresh as a fallback in case of build failures
         */
        hot: true ,
        /** "liveReload"
         * disable live reload on the browser. "hot" must be set to false for this to work
        */
        liveReload: true,
        client: {
          overlay: {
            errors: true,
            warnings: false,
          },
        },
        compress: true,
    },
    resolve: {
        /** "extensions" 
         * If multiple files share the same name but have different extensions, webpack will 
         * resolve the one with the extension listed first in the array and skip the rest. 
         * This is what enables users to leave off the extension when importing
         */
        extensions: ['.js','.jsx','.json', '.ts', '.tsx'] 
    },
    module:{
        /** "rules"
         * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx' 
         * file inside of a require()/import statement, use the babel-loader to transform it before you 
         * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from 
         * being searched"
         */
        rules: [
            {
                test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
                exclude: /node_modules/, //folder to be excluded
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-react',
                      {
                        runtime: 'automatic',
                      },
                    ],
                  ],
                },
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: [/node_modules/],
                loader: 'ts-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: debug
                  ? [
                      {
                        loader: "style-loader"
                      },
                      {
                        loader: "css-loader"
                      },
                      {
                        loader: "sass-loader"
                      }
                    ]
                  : [
                      MiniCssExtractPlugin.loader,
                      "css-loader",
                      "sass-loader"
                    ]
              },
              {
                test: /\.(eot|ttf|woff|woff2|otf|svg)$/,
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      limit: 100000,
                      name: "./assets/fonts/[name].[ext]"
                      // publicPath: '../'
                    }
                  }
                ]
              },
              {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      outputPath: "assets/images/"
                    }
                  }
                ]
              }
        ]
    },
    devtool: debug ? 'source-map' : false,
    plugins: debug ? [
        // new CleanWebpackPlugin(),
        new CircularDependencyPlugin({
          // exclude detection of files based on a RegExp
          exclude: /a\.js|node_modules/,
          // add errors to webpack instead of warnings
          failOnError: true,
          // set the current working directory for displaying module paths
          cwd: process.cwd()
        }),
        new HtmlWebpackPlugin({
          template: "./public/index.html"
        })
      ] : [
        // define NODE_ENV to remove unnecessary code
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
        // new CleanWebpackPlugin(),
        // extract imported css into own file
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].css",
          chunkFilename: "[id].css"
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
          template: "./public/index.html"
          // minify: {
          //   collapseWhitespace: true,
          //   removeAttributeQuotes: false
          // }
        }),
        new CompressionPlugin({
          test: /\.(html|css|js|gif|svg|ico|woff|ttf|eot)$/,
          exclude: /(node_modules)/
        }),
        new BundleAnalyzerPlugin()
      ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ]
  }
}