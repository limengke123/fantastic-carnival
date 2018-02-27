/**
 * Created by li on 2018/2/1 17:12.
 */
const webpackMerge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.config')

const config = webpackMerge(baseConfig,{
    entry:{
        vendor:['vue'],
    },
    output:{
        filename:'js/[name].[chunkhash:8].js',
        chunkFilename:'js/[id].js',
        publicPath:'./'
    },
    module:{
        rules:[
            {
                test : /\.vue$/,
                loader:'vue-loader',
                options:{
                    extractCSS:true
                }
            },
            {
                test:/\.styl/,
                use: ExtractPlugin.extract({
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
            compress: {
                warnings: false
            },
            sourceMap:true
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions:{
                safe:true
            }
        })
    ]
})

module.exports = config