# 代收/提款 sign 签名规则

- 参数列表中，除去 sign 参数外，其他所有参数都要参与签名。
- 参与签名的参数顺序按照首字母从小到大（a 到 z）的顺序排列， 如果遇到相同首字母则按第二个字母从小到大的顺序排列，以此类推。如果参数值为空则不参与签名，merchantKey参数追加到所有参数最后。
- 签名结果用 MD5 32位大写加密。
- 商户密钥(merchantKey) ，请登录商户后台进行查看。


## 代收 sign 签名示例

範例參數
| Header                |                                            |
| --------------------- | --------------------------                 |
| Content-Type          | **application/x-www-form-urlencoded**      |

| Key                   | Value                              |
| --------------------- | --------------------------         |
| paymentMethod         | 2                                  | 
| merchantNumber        | 11527                              |
| merchantOrderNumber   | tmax20220728001                    |
| requestedAmount       | 201                                |
| callbackUrl           | https://www.google.com/callback    |
| sign                  | **待加密後將參數放入**              |
| customerRequestedIp   | 127.0.0.1                          |
| paymentPlatform       | 1                                  |
| createType            | 1                                  |

除去 sign 参数外，其他所有参数都要参与签名。 参与签名的参数顺序按照首字母从小到大（a 到 z）的顺序排列，在最後加上商户密钥 (merchantKey) 

```
callbackUrl=https://www.google.com/callback&customerRequestedIp=127.0.0.1&createType=1&merchantNumber=10001&merchantOrderNumber=tmax20220728001&paymentMethod=1&paymentPlatform=1&requestedAmount=100&merchantKey=**you merchantKey **
```

以 MD5 Hash 后转大写结果: 
```
47E34CBE9DF1468AB744B855B93C56F1
```

放入 sign 參數:
| Key                   | Value                              |
| --------------------- | --------------------------         |
| paymentMethod         | 2                                  | 
| merchantNumber        | 11527                              |
| merchantOrderNumber   | tmax20220728001                    |
| requestedAmount       | 201                                |
| callbackUrl           | https://www.google.com/callback    |
| sign                  | 47E34CBE9DF1468AB744B855B93C56F1   |
| customerRequestedIp   | 127.0.0.1                          |
| paymentPlatform       | 1                                  |
| createType            | 1                                  |




## 提款代付 sign 签名示例
範例參數
| Header                |                                            |
| --------------------- | --------------------------                 |
| Content-Type          | **application/x-www-form-urlencoded**      |  

| Key                   | Value                              |
| --------------------- | --------------------------         |
| callbackUrl           | http://www.google.com/callback     |
| customerRequestedIp   | 52.229.159.160                     |
| merchantNumber        | 10001                              |
| merchantOrderNumber   | B20220801001                       |
| withdrawalMethod      | 1                                  |
| paymentPlatform       | 1                                  |
| requestedAmount       | 1000                               |
| merchantKey           | 3E44A7EC8F2A7F5A5E48491EAE9795FB   |
| customerCardNumber    | 1231236046598712                   |
| customerName          | 黄小明                             |
| customerOpeningBank   | HDFC0009350                        |
| customerBankType      | Indian Bank                        |
| sign                  | **待加密後將參數放入**             |

除去 sign 参数外，其他所有参数都要参与签名。 参与签名的参数顺序按照首字母从小到大（a 到 z）的顺序排列，在最後加上商户密钥 (merchantKey) 

```
callbackUrl=https://www.google.com/callback&customerBankType=Indian Bank&customerCardNumber=1231236046598712&customerName=黄小明&customerOpeningBank=HDFC0009350&customerRequestedIp=127.0.0.1&merchantNumber=10001&merchantOrderNumber=B20220801001&paymentPlatform=1&requestedAmount=1000&withdrawalMethod=1&merchantKey=**you merchantKey **
```

以 MD5 Hash 后转大写结果: 
```
67B06EA2D308E17A9A339882A84C3E5C
```

放入 sign 參數:
| Key                   | Value                              |
| --------------------- | --------------------------         |
| callbackUrl           | http://www.google.com/callback     |
| customerRequestedIp   | 52.229.159.160                     |
| merchantNumber        | 10001                              |
| merchantOrderNumber   | B20220801001                       |
| withdrawalMethod      | 1                                  |
| paymentPlatform       | 1                                  |
| requestedAmount       | 1000                               |
| merchantKey           | 3E44A7EC8F2A7F5A5E48491EAE9795FB   |
| customerCardNumber    | 1231236046598712                   |
| customerName          | 黄小明                             |
| customerOpeningBank   | HDFC0009350                        |
| customerBankType      | Indian Bank                        |
| sign                  | 67B06EA2D308E17A9A339882A84C3E5C   |