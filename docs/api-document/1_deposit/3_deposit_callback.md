# 代收回调_商户接口说明

### 简要描述：

🥭芒果 → 商户
- 支付回调接口，需要商户提供可访问的公网接口地址，在“商家支付接口中的 CallbackUrl 参数传给平台”。

### 接口请求方式：
- Method：POST
- Content-Type： application/json

### 商户接口响应结果要求说明

当群付平台回调商户接口，需要商户返回处理结果，处理成功请返回 “SUCCESS”，处理失败请返回“FAIL”，返回结果不区分字母大小写。若商户接口未返回任何内容或未满足条件的结果，支付平台都视为失败处理。失败后，平台会再重试3次，分别5分钟，10分钟，30分钟再次通知商户接口。直到重试3次后都未成功通知的订单，则不会再进行通知。特别说明：支付平台会重复发起回调通知，请商户对接该接口处理好相关验证，避免重复添加余额的问题。
sign 签名认证，请参考 “回调接口 sign 签名规则”

### 群付平台提交入参：

| 参数名                | 类型                               | 说明                                                  |
| --------------------- | --------------------------        |-------                                                |
| code                  | string                            |S00：支付成功，E00：支付未成功                           |
| message               | string                            |通知消息                                                |
| orderNumber           | string                            |平台交易流水编号                                         |
| merchantOrderNumber   | string                            |平台交易流水编号                                         |
| actualAmount          | string                            |到账金额                                                |
| paymentMethod         | string                            |支付收款类型：1=四方支付, 2=印度扫码, 7=銀行卡             |
| sign                  | string                            |签名认证，请参考“回调接口 sign 签名规则”                  |

### 返回示例 (Response Sample)

```json
{
    "code":"E00",
    "message":"支付失败",
    "orderNumber": "19061910205663580446",
    "merchantOrderNumber":"20190619102055364",
    "actualAmount":"0.00",
    "paymentMethod":1,
    "sign":"F9B55FA4229499C5BA179E4DCEED063D"
}
```

```json
{
    "code":"S00",
    "message":"支付成功",
    "orderNumber": "19061910205663580446",
    "merchantOrderNumber":"20190619102055364",
    "actualAmount":"888.00",
    "paymentMethod":1,
    "sign":"F9B55FA4229499C5BA179E4DCEED063D"
}
```

::: tip
说明：
当接口返回支付失败的时候，实际金额返回是：0.00
:::