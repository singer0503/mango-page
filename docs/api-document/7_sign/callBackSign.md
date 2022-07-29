# 回调接口 sign 签名规则

### 说明：
- 参数列表中，除去 sign 参数外，其他所有参数都要参与签名。
- 参与签名的参数顺序按照首字母从小到大（a 到 z）的顺序排列， 如果遇到相同首字母则按第二个字母从小到大的顺序排列，以此类推。如果参数值为空则不参与签名，merchantKey参数追加到所有参数最后。
- **签名以 MD5 32 位大写加密。**

### 示例：
商户密钥 (merchantKey) ,请登录商户后台查看。
```
actualAmount=500.00&code=S00&merchantOrderNumber=B19080915543241028330&message=支付成功&orderNumber=B19080915543241028330&paymentMethod=1&merchantKey=1234567890)
```
sign 加密结果: 08292AFF6D3DDF835FC101340318CCCF