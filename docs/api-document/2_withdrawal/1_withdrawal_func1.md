# 提款代付 

::: tip
可请商务提出需要 API 测试集成范例，芒果支付提供 postman 的汇入档，缩短您的开发时间
:::

### Endpoint

```
POST https://mg4zz.com/api/withdrawal
```

### Parameters

| Header                |                                            |
| --------------------- | --------------------------                 |
| Content-Type          | **application/x-www-form-urlencoded**          |


| Body Parameters       | Desc                               | Required | Type |
| --------------------- | --------------------------         |-------  |-------  |
| callbackUrl           | 回调地址                            | *       | string |
| customerRequestedIp   | 会员 IP                             | *       | string |
| merchantNumber        | 商户编号                            | *       | string |
| merchantOrderNumber   | 商户订单号：商户唯一订单编号          | *       | string |
| withdrawalMethod      | 代付类型：1=银行卡转账               | *       | string |
| paymentPlatform       | 终端设备   1:PC 端，2:移动端         | *       | string |
| requestedAmount       | 金额：请求支付金额(元)               | *       | string |
| merchantKey           | 接口密钥                            |         | string |
| customerCardNumber    | 银行卡号                            | *       | string |
| customerName          | 银行卡姓名                          | *       | string |
| customerOpeningBank   | 支行名称                            | *       | string |
| customerBankType      | 银行：请参考提款银行列表              | *       | string |
| sign                  | 签名                                | *       | string |

### Response
下单成功返回结果
```json
Status Code: 200 OK

{
  "code": "S00",
  "message": "创建成功",
  "data": null
}
```
下单失败返回结果
```json
Status Code: 404 Not Found

{
  "code": "E00",
  "message": "无效商户名",
  "data": null
}
```