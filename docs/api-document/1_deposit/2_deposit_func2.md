# 代收_方式一

### Endpoint

```
GET https://aac26.com/api/order/create
```

### Parameters

| Header                |                            |
| --------------------- | -------------------------- |
| Content-Type          | multipart/form-data        |


| Body Parameters       |Desc                                      | Required | Type |
| --------------------- | --------------------------               |-------  | -------   |
| paymentMethod         | 收款类型：1=四方支付, 2=印度扫码, 7=銀行卡  | *       | string |
| merchantNumber        | 商戶編號                                  | *       | string |
| merchantOrderNumber   | 商户订单号（商户唯一订单编号）              | *       | string |
| requestedAmount       | 请求支付金额(元)                          | *       | string |
| callbackUrl           | 回调接口地址                              | *       | string |
| sign                  | 签名（请参考商家支付接口sign说明）         | *       | string |
| customerRequestedIp   | 商户会员支付请求的IP地址                   | *       | string |
| paymentPlatform       | 1:PC端，2:移动端                          |         | string |
| createType            | 传入1或2，1=支付平台进行跳转（请使用form表单进行提交跳转），2=返回URL商户自己跳转，为了兼容老接口，该参数不需要进行sign签名加密      | *       | string |

### Response
下单成功返回结果
```json
Status Code: 200 OK

{
    "code": "S00",
    "message": "创建成功",
    "data": {
        "paymentUrl": "http://xxx.com/Payment/WeChat/xxxx"
    }
}
```
下单失败返回结果
```json
Status Code: 404 Not Found

{
    "code":"E00",
    "message":"无效商户名",
    "data":null
}
```

### Form 表单示例

```html
<form action="https://aac26.com/api/create" Method="GET">
    <input type="hidden" name="callbackUrl" value="http://test.callback.com/callback"/>
    <input type="hidden" name="customerRequestedIp" value="1.1.1.1"/>
    <input type="hidden" name="merchantNumber" value="10003"/>
    <input type="hidden" name="merchantOrderNumber" value="B19111819321409725964"/>
    <input type="hidden" name="paymentMethod" value="2"/>
    <input type="hidden" name="paymentPlatform" value="1"/>
    <input type="hidden" name="requestedAmount" value="100"/>
    <input type="hidden" name="sign" value="3CD49251A27E58CC3901A84474A6F126"/>
    <input type="hidden" name="createType" value="1"/>
    <input type="submit" value="提交">
</form>
```

::: tip
该接口最长响应时间最长30秒，请在请求时配置好接口超时时间。sgin参数加密规则请参看，签名规则说明。
:::