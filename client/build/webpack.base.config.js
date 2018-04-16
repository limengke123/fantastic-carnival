const {join} = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:{
        app:join(__dirname,'../src/index.js')
    },
    output:{
        filename:'js/[name].js',
        path:join(__dirname,'../dist'),
        publicPath: "/public/",
        chunkFilename: "chunk/[name].[chunkhash:8].js"
    },
    resolve:{
        extensions: ['.js','.jsx']
    },
    module: {
        rules: [
            {
                test:/\.(js)|(jsx)$/,
                loader:'babel-loader',
                include:join(__dirname,'../src')
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options: {
                    limit:10000,
                    name:'./dist/media/[name].[hash].[ext]'
                }
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:10000,
                    name:join(__dirname,'../dist','fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:join(__dirname,'../src/template.html'),
            filename:'index.html',
            inject:'true',
            favicon:join(__dirname,'../src/assets/img/new_favor.ico'),
            minify:{
                removeCommnets:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            }
        })
    ],
    externals: {
        //用外链 vendor 少了18kb 能少一点是一点 ，highlight.js不好用外链
        "react":"React",
    }
}