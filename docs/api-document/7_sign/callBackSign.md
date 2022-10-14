# 回调接口 sign 签名规则

### 说明：
- 参数列表中，除去 sign 参数外，其他所有参数都要参与签名。
- 参与签名的参数顺序按照首字母从小到大（a 到 z）的顺序排列， 如果遇到相同首字母则按第二个字母从小到大的顺序排列，以此类推。如果参数值为空则不参与签名，merchantKey参数追加到所有参数最后。
- **签名以 MD5 32 位大写加密。**

### 代收回调接口 sign 签名示例：

您会收到回调的资料如下(此为示例，请以实际结果为主)

```json
{
    "code":"S00",
    "message":"success",
    "orderNumber":"22101408402035885627",
    "merchantOrderNumber":"E5838B8A8F9060FB60FCBD962F67DEDC",
    "actualAmount":"200.00",
    "paymentMethod":2,
    "sign":"2B3C944CA03D7977CA607365193AC864"
}
```

除去 sign 参数外，其他所有参数都要参与签名。
参与签名的参数顺序按照首字母从小到大（a 到 z）的顺序排列，商户密钥 (merchantKey) ,请登录商户后台查看。
```bash
actualAmount=200.00&code=S00&merchantOrderNumber=75ECC72BFAC4B45AD436A0E84380C6D1&message=success&orderNumber=22101416523765210292&paymentMethod=2&merchantKey=**you need change this merchantKey**
```

以 MD5 Hash 后转大写结果: 

```bash
2B3C944CA03D7977CA607365193AC864
```

与 sign 比对相符代表回传资料正确


### 代付回调接口 sign 签名示例：

其实跟代收参数很像，但是**代付的参数是 withdrawalMethod**，代收的参数是 paymentMethod

```json
{
    "code":"S00",
    "message":"success",
    "orderNumber":"22101416523765210292",
    "merchantOrderNumber":"75ECC72BFAC4B45AD436A0E84380C6D1",
    "actualAmount":"200.00",
    "withdrawalMethod":1,
    "sign":"40F68AB2756E6BF3A1EC40F368094A6E"
}
```

除去 sign 参数外，其他所有参数都要参与签名。
参与签名的参数顺序按照首字母从小到大（a 到 z）的顺序排列，商户密钥 (merchantKey) ,请登录商户后台查看。
**注意代付的参数是 withdrawalMethod**

```bash
actualAmount=200.00&code=S00&merchantOrderNumber=75ECC72BFAC4B45AD436A0E84380C6D1&message=success&orderNumber=22101416523765210292&paymentMethod=2&merchantKey=**you need change this merchantKey**
```


以 MD5 Hash 后转大写结果: 

```bash
40F68AB2756E6BF3A1EC40F368094A6E
```

与 sign 比对相符代表回传资料正确