<?php
/**
 * Created by PhpStorm.
 * User: FZS
 * Time: 2022/05/01 11:38
 */

        $url='http://ip.useragentinfo.com/json?ip='.$_SERVER["REMOTE_ADDR"].'';
        $ch=curl_init();
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_USERAGENT,$_SERVER['HTTP_USER_AGENT']);
        $resp=curl_exec($ch);        
        curl_close($ch);
        $resp=json_decode($resp,true);
        echo json_encode($resp,JSON_UNESCAPED_UNICODE);
       
 
