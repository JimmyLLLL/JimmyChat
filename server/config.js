const CONF = {
    /*serverHost: 'localhost',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
      // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1257811273',
    qcloudSecretId: 'AKIDjMsKbhRS7arwuhOrFTffT4Zt14wenXCk',
    qcloudSecretKey: 'jMo4FFctV0JQL6jpkffWO7gJo9JHdpyx',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000,
*/



    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx2815f8d47beeeef8',

    // 微信小程序 App Secret
    appSecret: 'f9de636ad8e1f38d2a9665e900edd037',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'wx2815f8d47beeeef8',
        //pass: 'Jmspeed13.',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
