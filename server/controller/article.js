/**
 * Created by li on 2018/1/8 17:32.
 */

const utils = require('../util/index')

const {
    __before,
    __after,
    main,
    BaseAop
} = require('../util/aop.js')

const {
    articles:ROUTER_NAME
} = require('../config').routerName

