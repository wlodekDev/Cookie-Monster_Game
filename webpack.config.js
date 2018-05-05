const path = require("path");

module.exports = {
    mode: 'production',
    entry: "./src/js/app.js",
    output: {  path: path.join(__dirname, "./dist/"), filename : 'out.js' },
    watch: true,
    devtool: "cheap-module-eval-source-map",
    module: {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'] }
            }
        ]
    }
};