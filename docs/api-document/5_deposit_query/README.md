# 下单查询 

### Endpoint

```
GET https://mg6956.com/api/depositquery
```

### Request Parameters

| URL Parameters        | Desc                                    |Required |
| --------------------- | --------------------------              |-------  |
| systemOrderNumber     | 系统订单号 (与商户订单号至少传入一个)     |         |
| merchantOrderNumber   | 商户订单号 (与系统订单号至少传入一个)     |         |
| merchantNumber        | 商户编号                                 | *       |
| paymentMethod         | 1=四方支付, 2=印度扫码, 7=銀行卡          | *      |
| sign                  | 签名认证                                 | *       |

::: tip 
系统订单号与商户订单号至少传入一个
:::

### 签名方法

1. 参数列表中，除去 sign 参数外，其他所有参数都要参与签名。 
2. 参与签名的参数顺序按照首字母从小到大（a 到 z）的顺序排列， 如果遇到相同首字母则按第二个字母
3. 从小到大的顺序排列，以此类推。如果参数值为空则不参与签名，merchantKey参数追加到所有参数最后。 4、 签名以 MD5 32位大写加密。

### 參與簽名範例
参与签名的参数有：merchantNumber、merchantOrderNumber、systemOrderNumber、paymentMethod、merchantKey
```
merchantNumber=19999&merchantOrderNumber=tOrder202210170001&paymentMethod=2&merchantKey=128B3002766A60A8E84FAF1559123456
```

以 MD5 Hash 后转大写结果：
6C376246210819AFC146B8ECE58C9A39

將 MD5 Hash 放入 sign 內，使用 GET 進行查詢：
### Request Sample
```
http://104.208.75.189:59833/api/depositquery?merchantNumber=19999&merchantOrderNumber=tOrder202210170001&paymentMethod=2&&sign=6C376246210819AFC146B8ECE58C9A39
```

### Response Sample

请求成功，已完成，回调成功的单
```json
Status Code: 200 OK
{
    "code": "S00",
    "message": "获取成功",
    "data": {
        "systemOrderNumber": "22101507193002094039",
        "merchantOrderNumber": "tOrder202210170001",
        "status": 1,
        "callbackNoticeStatus": 1,
        "requestedAmount": 440.0,
        "actualAmount": 440.0,
        "createdAt": "2022-10-15T07:19:30.1171782+05:30",
        "completedAt": "2022-10-15T07:31:55.9744644+05:30"
    }
}
```

请求成功，逾期，超时未付款的单
```json
Status Code: 200 OK
{
    "code": "S00",
    "message": "获取成功",
    "data": {
        "systemOrderNumber": "22101507534006448107",
        "merchantOrderNumber": "E2F57FFDBC914417E5C47020A88692C3",
        "status": 0,
        "callbackNoticeStatus": 0,
        "requestedAmount": 100.0,
        "actualAmount": 0.0,
        "createdAt": "2022-10-15T07:53:40.5986122+05:30",
        "completedAt": "2022-10-15T08:08:52.8934278+05:30"
    }
}
```

请求成功，下单尚未支付
```json
Status Code: 200 OK
{
    "code": "S00",
    "message": "获取成功",
    "data": {
        "systemOrderNumber": "19120314514474593458",
        "merchantOrderNumber": "B19120314514126661195",
        "status": 2,
        "callbackNoticeStatus": 0,
        "requestedAmount": 300.0,
        "actualAmount": 0.0,
        "createdAt": "2019-12-03T14:51:44.2076529+08:00",
        "completedAt": "0001-01-01T08:00:00+08:00"
    }
}
```




请求失败:参数错误 / 签名错误
```json
Status Code: 404 Not Found
{
    "code": "E00",
    "message": "商户参数错误",
    "data": null
}

签名错误
{
    "code":"E00",
    "message":"签名错误，请检查参数顺序或KEY是否正确",
    "data":null
}
```

### Response Parameters

| Parameters            | Type                                    | Desc                                                 |
| --------------------- | --------------------------              | -----------------------------------                  |
| code                  | string                                  | 状态码，S00：查询成功，E00：查询失败                    |
| message               | string                                  | 返回消息说明                                          |
| data                  | object                                  | 数据对象                                              |
| status                | int                                     | 订单状态,-1 未知，0=支付失败，1=支付成功，2=进行中       |
| callbackNoticeStatus  | int                                     | 回调通知状态,0=未回调，1=回调成功，2=回调失败            |
| requestedAmount       | string                                  | 提交金额                                              |
| actualAmount          | string                                  | 实际到账金额                                          |
| createdAt             | string                                  | 订单创建日期                                          |
| completedAt           | string                                  | 订单完结日期                                          |

