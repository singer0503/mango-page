# 下单sign签名规则

- 参数列表中，除去 sign 参数外，其他所有参数都要参与签名。
- 参与签名的参数顺序按照首字母从小到大（a 到 z）的顺序排列， 如果遇到相同首字母则按第二个字母从小到大的顺序排列，以此类推。如果参数值为空则不参与签名，merchantKey参数追加到所有参数最后。
- 签名结果用 MD5 32位大写加密。
- 商户密钥(merchantKey) ，请登录商户后台进行查看。

### 示例：

```
callbackUrl=http://127.0.0.1:8080/callback&customerRequestedIp=1.1.1.1&merchantNumber=10001&merchantOrderNumber=DDBH132467890&paymentMethod=1&paymentPlatform=1&requestedAmount=100&merchantKey=1234567890
```

sign 加密结果: 42B277A4837A8AAD3953D9CB0909E730