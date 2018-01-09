/**
 * Created by li on 2018/1/9 17:38.
 */
require('babel-core/register')({
    'presets':[
        ['env',{
            'targets':{
                'node':'current'
            }
        }]
    ]
})
require('./index.js')