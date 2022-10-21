# 提款代付查询 (尚未开放 无法使用)

### Endpoint

```
GET https://mg6956.com/api/withdrawalquery
```

### Request Parameters

| URL Parameters        |Desc                                     |Required |
| --------------------- | --------------------------              |-------  |
| systemOrderNumber     | 系统订单号 (与商户订单号至少传入一个)      |         |
| merchantOrderNumber   | 商户订单号 (与系统订单号至少传入一个)      |         |
| merchantNumber        | 商户编号                                 | *       |
| paymentMethod         | 代付类型    1=银行卡转账                  | *       |
| sign                  | 签名认证                                 | *       |

::: tip 
系统订单号与商户订单号至少传入一个
:::

### Request Sample

```
https://aac27.com/api/withdrawalquery?systemOrderNumber=19120314514474593458&merchantOrderNumber=B19120314514126661195&merchantNumber=10001&paymentMethod=1&sign=3A4B004088274603B592C8F9A82008AD
```

### Response

请求成功
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


请求失败

```json
Status Code: 404 Not Found

{
    "code": "E00",
    "message": "商户参数错误",
    "data": null
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

### 签名方法

1. 参数列表中，除去 sign 参数外，其他所有参数都要参与签名。 
2. 参与签名的参数顺序按照首字母从小到大（a 到 z）的顺序排列， 如果遇到相同首字母则按第二个字母
3. 从小到大的顺序排列，以此类推。如果参数值为空则不参与签名，merchantKey参数追加到所有参数最后。 4、 签名以 MD5 32位大写加密。