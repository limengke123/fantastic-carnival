/**
 * Created by li on 2018/1/31 17:25.
 */
const { join } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        app: join(__dirname, '../src/main.js')
    },
    output: {
        filename: "js/[name].js",
        path: join(__dirname, '../dist'),
        publicPath: "/public/"
    },
    resolve: {
        extensions: ['.js', '.vue', '.jsx']
    },
    module: {
        rules :[
            {
                test : /\.js$/,
                loader:'babel-loader',
                include : join(__dirname , '../src')
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:10000,
                    //这里的file-loader 对__dirname有影响，所以不能直接__dirname 深坑
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
            inject:true,
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            }
        })
    ]
}