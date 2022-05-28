const getDocPath = require('./getDocPath')
module.exports = {
    '/docs/': [
        getDocPath('《java基础》', true, '/docs/javaSE/'),
        getDocPath('《javaweb》', true, '/docs/javaweb/'),
        getDocPath('《mysql》', true, '/docs/mysql/'),
        getDocPath('《JVM》', true, '/docs/JVM/'),
        getDocPath('《Linux》', true, '/docs/computer/Linux/'),
        getDocPath('《操作系统》', true, '/docs/computer/OperatingSys/'),
        getDocPath('《计算机网络》', true, '/docs/computer/computerNet/'),
        getDocPath('《汇编》', true, '/docs/computer/ASAM/'),

    ],
    // '/document/css/': [
    //     getDocPath('css', true, '/document/css/'),
    // ],
}