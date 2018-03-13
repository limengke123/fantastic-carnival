
const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./webpack.pro.config')

const spinner = ora('client is building now!!!')

spinner.start()

rm(path.join(__dirname,'../../server/static/clientDist'),err=>{
    if(err) throw err
    webpack(config,(err,stats)=> {
        spinner.stop()
        if(err) throw err
        process.stdout.write(stats.toString({
            colors:true,
            modules:false,
            children:false,
            chunks:false,
            progress:false,
            chunkModules:false
        }) + '\n\n')

        if(stats.hasErrors()){
            process.stdout.write(chalk.red('build failed \n'))
            process.exit(1)
        }

        process.stdout.write(chalk.cyan('build complete \n'))
    })
})