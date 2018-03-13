
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.base.config')

const config = webpackMerge(baseConfig,{
    output:{
        publicPath:'/'
    },
    devtool:"#cheap-module-eval-source-map",
    devServer:{
        port:8001,
        host:"0.0.0.0",
        overlay:{
            errors:true
        },
        hot:true,
        open:false,
        progress:false,
        historyApiFallback:true,
        proxy:{
            '/api':{
                target:"http://localhost:3333/api",
                pathRewrite:{
                    '^/api':'/'
                },
                changeOrigin:true,
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