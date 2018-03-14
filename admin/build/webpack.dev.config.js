/**
 * Created by li on 2018/1/31 17:26.
 */
const {join} = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.base.config')

const config = webpackMerge(baseConfig,{
    output:{
        publicPath:"/"
    },
    module:{
        rules:[
            {
                test : /\.js$/,
                loader:'babel-loader',
                include : join(__dirname , '../src')
            },
            {
                test : /\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    devtool:'#cheap-module-eval-source-map',
    devServer:{
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        hot:true,
        open:false,
        progress:false,
        // openPage:'public/',
        historyApiFallback:true,
        proxy:{
            '/api': {
                target: 'http://localhost:3333/api',
                pathRewrite: {'^/api' : '/'},
                changeOrigin: true,
                secure:true
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
})

module.exports = config