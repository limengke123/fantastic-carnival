/**
 * Created by li on 2018/2/1 17:12.
 */
const webpackMerge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.config')

//打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = webpackMerge(baseConfig,{
    entry:{
        //这个地方很奇怪，虽然把vue 和simplemde放到cdn里面去了，这里去掉vue simplemde反而报错 还是要加上
        vendor:["vue",'vue-router','vuex','axios','lodash',"simplemde","highlight.js"],
    },
    output:{
        filename:'js/[name].[chunkhash:8].js',
        chunkFilename:'chunk/[name].[chunkhash:8].js',
        path: path.join(__dirname, '../../server/static/adminDist'),
        publicPath:'./adminDist/',
    },
    module:{
        rules:[
            {
                test : /\.js$/,
                loader:'babel-loader',
                include : path.join(__dirname , '../src'),
                options:{
                    plugins:['syntax-dynamic-import']
                }
            },
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
        new webpack.optimize.ModuleConcatenationPlugin(),
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
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            output:{
                comments:false,
            },
            sourceMap:true
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions:{
                safe:true
            }
        }),
        //打包分析
        new BundleAnalyzerPlugin()
    ],
    externals: {
        "Vue":"vue",
        //"simplemde":"simplemde",
        //"highlight":"highlight.js"
    }
})

module.exports = config