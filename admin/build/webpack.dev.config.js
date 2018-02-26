/**
 * Created by li on 2018/1/31 17:26.
 */
// const {join} = require('path')
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
        progress:true,
        // openPage:'public/',
        historyApiFallback:true,
        proxy:{
            '/api': {
                target: 'https://cnodejs.org/api/v1',
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