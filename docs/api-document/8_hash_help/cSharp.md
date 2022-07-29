# sign 签名算法（C#）版本

### 调用方式

```csharp
//组装参数用于签名
  SortedDictionary<string, string> dic = new SortedDictionary<string, string>();
  dic.Add("callbackUrl", txtcallbackUrl); 
  dic.Add("merchantNumber", txtmerchantCode);  
  dic.Add("merchantOrderNumber", parms.merchantOrderNumber);  
  dic.Add("paymentMethod", parms.paymentMethod);  
  dic.Add("paymentPlatform", parms.paymentPlatform);  
  dic.Add("requestedAmount", parms.requestedAmount);  
  dic.Add("customerRequestedIp", parms.customerRequestedIp); 
  string strSign = SignUtils.BuildSign(dic, txtKey);//获取签名
```

### sign 算法帮助类

```csharp
public class SignUtils {
    //编码格式
    private static string inputCharset = "utf-8";
    /// <summary>
    /// 签名字符串
    /// </summary>
    /// <param name="prestr">需要签名的字符串</param>
    /// <param name="key">密钥</param>
    /// <returns>签名结果</returns>
    public static string Sign(string prestr, string key)
    {
        StringBuilder sb = new StringBuilder(32);
        prestr = prestr + "&merchantKey=" + key;
        MD5 md5 = new MD5CryptoServiceProvider();
        byte[] t = md5.ComputeHash(Encoding.GetEncoding(inputCharset).GetBytes(prestr));
        for (int i = 0; i < t.Length; i++)
        {
            sb.Append(t[i].ToString("x").PadLeft(2, '0'));
        }
        return sb.ToString().ToUpper();
    }
    /// <summary>
    /// 验证签名
    /// </summary>
    /// <param name="prestr">需要签名的字符串</param>
    /// <param name="sign">签名结果</param>
    /// <param name="key">密钥</param>
    /// <returns>验证结果</returns>
    public static bool Verify(string prestr, string sign, string key)
    {
        string mysign = Sign(prestr, key);
        if (mysign == sign)
        {
            return true;
        }
        return false;
    }
    /// <summary>
    /// 生成请求时的签名
    /// </summary>
    /// <param name="sPara">请求给支付宝的参数数组</param>
    /// <param name="key"></param>
    /// <returns>签名结果</returns>
    public static string BuildSign(SortedDictionary<string, string> sPara, string key)
    {
        var dic = FilterPara(sPara);
        //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
        string prestr = CreateLinkString(dic);
        //把最终的字符串签名，获得签名结果
        var mysign = Sign(prestr, key);
        return mysign;
    }
    /// <summary>
    /// 把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
    /// </summary>
    /// <param name="dicArray">需要拼接的数组</param>
    /// <returns>拼接完成以后的字符串</returns>
    public static string CreateLinkString(Dictionary<string, string> dicArray)
    {
        StringBuilder prestr = new StringBuilder();
        foreach (KeyValuePair<string, string> temp in dicArray)
        {
            prestr.Append(temp.Key + "=" + temp.Value + "&");
        }
        //去掉最後一個&字符
        int nLen = prestr.Length;
        prestr.Remove(nLen - 1, 1);
        return prestr.ToString();
    }
    /// <summary>
    /// 把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串，并对参数值做urlencode
    /// </summary>
    /// <param name="dicArray">需要拼接的数组</param>
    /// <param name="code">字符编码</param>
    /// <returns>拼接完成以后的字符串</returns>
    public static string CreateLinkStringUrlencode(Dictionary<string, string> dicArray, Encoding code)
    {
        StringBuilder prestr = new StringBuilder();
        foreach (KeyValuePair<string, string> temp in dicArray)
        {
            prestr.Append(temp.Key + "=" + HttpUtility.UrlEncode(temp.Value, code) + "&");
        }
        //去掉最後一個&字符
        int nLen = prestr.Length;
        prestr.Remove(nLen - 1, 1);
        return prestr.ToString();
    }
    /// <summary>
    /// 除去数组中的空值和签名参数并以字母a到z的顺序排序
    /// </summary>
    /// <param name="dicArrayPre">过滤前的参数组</param>
    /// <returns>过滤后的参数组</returns>
    public static Dictionary<string, string> FilterPara(SortedDictionary<string, string> dicArrayPre)
    {
        Dictionary<string, string> dicArray = new Dictionary<string, string>();
        foreach (KeyValuePair<string, string> temp in dicArrayPre)
        {
            if (temp.Key.ToLower() != "sign" && !string.IsNullOrEmpty(temp.Value))
            {
                dicArray.Add(temp.Key, temp.Value);
            }
        }
        return dicArray;
    }
}
```

