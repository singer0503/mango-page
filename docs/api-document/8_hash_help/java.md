# sign签名算法（Java）版本

### 调用方式

```Java
import java.util.HashMap;
import java.util.Map;
/**
 * To change this template use File | Settings | File Templates.
 */
public class SignTest {
    public static void main(String[] args) throws Exception{
        sign();
        callback();
    }
    public static void sign() throws Exception{
        Map<String, String> dic = new HashMap<String, String>();
        dic.put("callbackUrl", "http://127.0.0.1:8080/callback");
        dic.put("merchantNumber", "10001");
        dic.put("merchantOrderNumber", "DDBH132467890");
        dic.put("paymentMethod", "1");
        dic.put("paymentPlatform", "1");
        dic.put("requestedAmount", "100");
        dic.put("customerRequestedIp", "1.1.1.1");
        dic.put("merchantKey", "1234567890");
        String str = SignUtil.buildRequestMysign(dic,"1234567890");
        System.out.println(str);
    }
    //(actualAmount=500.00&code=S00&merchantOrderNumber=B19080915543241028330&message=支付成功&orderNumber=B19080915543241028330&paymentMethod=1&merchantKey=XXXX
    public static void callback() throws Exception{
        Map<String, String> dic = new HashMap<String, String>();
        dic.put("actualAmount", "500.00");
        dic.put("code", "S00");
        dic.put("merchantOrderNumber", "B19080915543241028330");
        dic.put("message", "支付成功");
        dic.put("orderNumber", "B19080915543241028330");
        dic.put("paymentMethod", "1");
        dic.put("merchantKey", "XXXX");
        String str = SignUtil.buildRequestMysign(dic,"XXXX");
        System.out.println(str);
    }
}
```

### sign 算法帮助类

```Java
import java.security.MessageDigest;
import java.util.*;
/**
 * @describe 签名公用类
 */
public class SignUtil {
    // 字符编码格式 目前支持 gbk 或 utf-8
    public static final String INPUT_CHARSET = "utf-8";
    // 签名方式 不需修改
    public static final String SIGN_TYPE_MD5 = "MD5";
    /**
     * 生成签名结果
     * 
     * @param sPara
     *            要签名的数组
     * @return 签名结果字符串
     */
    public static String buildRequestMysign(Map<String, String> sPara, String key) throws Exception{
        // 除去数组中的空值和签名参数
        Map<String, String> params = paraFilter(sPara);
        String preStr = createLinkString(params); // 把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
        preStr += "&merchantKey="+key;
        System.out.println(preStr);
        String signResult = getMD5(preStr , INPUT_CHARSET );
        return signResult.toUpperCase();
    }
    /**
     * 除去数组中的空值和签名参数
     * 
     * @param sArray
     *            签名参数组
     * @return 去掉空值与签名参数后的新签名参数组
     */
    public static Map<String, String> paraFilter(Map<String, String> sArray) {
        Map<String, String> result = new HashMap<String, String>();
        if (sArray == null || sArray.size() <= 0) {
            return result;
        }
        for (String key : sArray.keySet()) {
            String value = sArray.get(key);
            if (value == null || value.equals("") || key.equalsIgnoreCase("merchantKey")  || key.equalsIgnoreCase("sign") || key.equalsIgnoreCase("sign_type")) {
                continue;
            }
            result.put(key, value);
        }
        return result;
    }
    /**
     * 把数组所有元素排序，并按照“参数=参数值”的模式用“&”字符拼接成字符串
     * 
     * @param params
     *            需要排序并参与字符拼接的参数组
     * @return 拼接后字符串
     */
    public static String createLinkString(Map<String, String> params) {
        List<String> keys = new ArrayList<String>(params.keySet());
        Collections.sort(keys);
        String prestr = "";
        for (int i = 0; i < keys.size(); i++) {
            String key = keys.get(i);
            String value = params.get(key);
            if (i == keys.size() - 1) {// 拼接时，不包括最后一个&字符
                prestr = prestr + key + "=" + value;
            } else {
                prestr = prestr + key + "=" + value + "&";
            }
        }
        return prestr;
    }
    /**
     * @describe MD5加密
     */
    public static String getMD5(String str, String encoding) throws Exception {
        MessageDigest md = MessageDigest.getInstance(SIGN_TYPE_MD5);
        md.update(str.getBytes(encoding));
        byte[] result = md.digest();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < result.length; i++) {
            String val = Integer.toHexString(result[i] & 0xff);
            if (val.length() == 1) {
                val = 0 + val;
            }
            sb.append(val);
        }
        return sb.toString();
    }
}
```