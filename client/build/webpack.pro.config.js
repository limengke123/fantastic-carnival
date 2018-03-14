
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const baseConfig = require('./webpack.base.config')

const config = webpackMerge(baseConfig,{
    entry:{
        vendor:['react','react-dom','react-router']
    },
    output:{
        filename:'js/[name].[chunkhash:8].js',
        chunkFilename:'js/[id].js',
        path:path.join(__dirname,'../../server/static/clientDist'),
        publicPath:'./clientDist/'
    },
    module:{
        rules:[
            {
                test:/\.styl/,
                use:ExtractPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        'css-loader',
                        {
                            loader:'postcss-loader',
                            options:{
                                sourceMap:true
                            }
                        },
                        'stylus-loader'
                    ]
                })
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        }),
        new ExtractPlugin('css/styles.[contentHash:8].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            },
            sourceMap:true,
            output:{
                comments:false
            }
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions:{
                safe:true
            }
        })
    ]
})

module.exports = config