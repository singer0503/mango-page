# sign 签名算法（PHP）版本

### 调用方式

```PHP
 <?php
    require_once('SignUtils.php');
    $su = new SignUtils();
    $su->SetCallbackUrl('签名');
    $su->SetMerchantNumber('2');
    $su->SetMerchantOrderNumber('3');
    $su->SetPaymentMethod('4');
    $su->SetPaymentPlatform('5');
    $su->SetRequestedAmount('6');
    $su->SetCustomerRequestedIp('7');
    echo '<h1>'.$su->BuildSign('Test').'</h1>';
?>
```

### sign 算法帮助类

```PHP
<?php
class SignUtils
{
    protected $values = array();
    public function SetCallbackUrl($inputValue)
    {
        $this->values['callbackUrl'] = $inputValue;
    }    
    public function SetMerchantNumber($inputValue)
    {
        $this->values['merchantNumber'] = $inputValue;
    }
    public function SetMerchantOrderNumber($inputValue)
    {
        $this->values['merchantOrderNumber'] = $inputValue;
    }
    public function SetPaymentMethod($inputValue)
    {
        $this->values['paymentMethod'] = $inputValue;
    }
    public function SetPaymentPlatform($inputValue)
    {
        $this->values['paymentPlatform'] = $inputValue;
    }
    public function SetRequestedAmount($inputValue)
    {
        $this->values['requestedAmount'] = $inputValue;
    }
    public function SetCustomerRequestedIp($inputValue)
    {
        $this->values['customerRequestedIp'] = $inputValue;
    }
    /// <summary>
    /// 签名字符串
    /// </summary>
    /// <param name="prestr">需要签名的字符串</param>
    /// <param name="key">密钥</param>
    /// <returns>签名结果</returns>
    public function Sign($prestr, $key)
    {
        $prestr .= "&merchantKey=".$key;
        $string = md5($prestr);
        return strtoupper($string);
    }
    /// <summary>
    /// 验证签名
    /// </summary>
    /// <param name="prestr">需要签名的字符串</param>
    /// <param name="sign">签名结果</param>
    /// <param name="key">密钥</param>
    /// <returns>验证结果</returns>
    public function Verify($prestr, $sign, $key)
    {
        $mysign = $this->Sign($prestr, $key);
        if ($mysign == $sign)
        {
            return true;
        }
        return false;
    }
    /// <summary>
    /// 生成请求时的签名
    /// </summary>
    /// <param name="key"></param>
    /// <returns>签名结果</returns>
    public function BuildSign($key)
    {
        //按字典序排序参数
        ksort($this->values);
        //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
        $prestr = $this->CreateLinkString();
        //把最终的字符串签名，获得签名结果
        $mysign = $this->Sign($prestr, $key);
        return $mysign;
    }
    /// <summary>
    /// 把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
    /// </summary>
    /// <returns>拼接完成以后的字符串</returns>
    public function CreateLinkString()
    {
        $prestr = "";
        foreach ($this->values as $k => $v)
        {
            $prestr .= $k . "=" . $v . "&";
            //if($k != "sign" && $v != "" && !is_array($v))
            //{
            //    $prestr .= $k . "=" . $v . "&";
            //}
        }        
        $prestr = trim($prestr, "&");
        return $prestr;
    }
    /// <summary>
    /// 把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串，并对参数值做urlencode
    /// </summary>
    /// <param name="code">字符编码</param>
    /// <returns>拼接完成以后的字符串</returns>
    public function CreateLinkStringUrlencode($code)
    {
        $prestr = "";
        foreach ($this->values as $k => $v)
        {            
            if($code == 'gb2312+')
            {
                //GB2312空格编码为+
                $prestr .= $k . "=" . urlencode($v) . "&";
                //解码函数urldecode();
            }
            else if($code == 'gb2312%20')
            {
                //GB2312空格编码为%20
                $prestr .= $k . "=" . rawurlencode($v) . "&";
                //解码函数rawurldecode();
            }
            else if($code == 'utf-8' || $code == 'utf8')
            {
                $prestr .= $k . "=" . urlencode(mb_convert_encoding($v, 'utf-8', 'gb2312')) . "&";
                //解码函数rawurlencode(mb_convert_encoding($v, 'utf-8', 'gb2312'))
            }
            else
            {
                $prestr .= $k . "=" . $v . "&";
            }
            //if($k != "sign" && $v != "" && !is_array($v))
            //{
            //    $prestr .= $k . "=" . $v . "&";
            //}
        }        
        $prestr = trim($prestr, "&");
        return $prestr;
    }
}
?>
```