// docs/.vuepress/config.js
module.exports = {
  title: '🥭Mango',
  description: 'Just payments',
  head: [],
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: 'Mango 对接文档介绍', link: '/api-document/' },
      // { text: '开发规范', link: '/standard/'},
      // { text: '百度', link: 'http://www.baidu.com' }
    ],
    sidebar: {
      '/api-document': [
        {
          title: '对接接口',
          collapsable: false,
          children: [
            ['/api-document/1_deposit/','下单接口_方式一'],
            ['/api-document/2_deposit/','下单接口_方式二'],
            ['/api-document/3_callback/','支付平台回调商户接口说明'],
            ['/api-document/4_withdrawal/', '提款代付'],
            ['/api-document/5_deposit_query/', '下单查询 (尚未开放 无法使用)'],
            ['/api-document/6_withdrawal_query/', '提款查询 (尚未开放 无法使用)'],
          ]
        },
        {
          title: 'SIGN 签名说明',
          collapsable: false,
          children: [
            ['/api-document/7_sign/orderSign.md', '下单 sign 签名规则'],
            ['/api-document/7_sign/callBackSign.md', '回调接口 sign 签名规则']
          ]
        },
        {
          title: '代码算法帮助类',
          collapsable: false,
          children: [
            ['/api-document/8_hash_help/cSharp.md', 'sign 签名算法（C#）版本'],
            ['/api-document/8_hash_help/java.md', 'sign 签名算法（Java）版本'],
            ['/api-document/8_hash_help/php.md', 'sign 签名算法（PHP）版本'],
          ]
        },
        {
          title: '其他说明',
          collapsable: false,
          children: [
            ['/api-document/4_withdrawal/bankList.md', '提款银行列表'],
          ]
        }
      ],
      '/standard': [
        { 
          title: '前端开发规范',
          collapsable: false,
          children: [
            '/standard/js/',
            '/standard/vue/',
            '/standard/eslint/'
          ]
        }
      ]
    }
  }
}
