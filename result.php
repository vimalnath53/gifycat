<?php
$inputVal = urlEncode($_GET['searchval']);
if($inputVal == 'view_trending') {
    //get trending GIF
    $search_url = "https://api.gfycat.com/v1/reactions/populated?tagName=trending";
} else  {
    $url = "https://api.gfycat.com/v1/gfycats/search?search_text=";
    $search_url = $url . $inputVal;
}

$access_token = getauth();

//curl -v -X GET https://api.gfycat.com/v1/gfycats/search?search_text=fun  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDYzOTY5NDQsImlzcyI6IjJfWDZsNkJ3Iiwicm9sZXMiOlsiQ29udGVudF9SZWFkZXIiXX0._nnUPpxmRlAHQfSy0UESwpKJQX0zSL86EdUIUa_mXvU"

//curl -v -XPOST -d '{"client_id":"2_X6l6Bw", "client_secret": "BlYnnbdGHTQIk-pjCNsvmf85sA6oEXEWFe0Dn9iRKSYRQuKeMn68Pa6GNOYJQ3e3", "grant_type": "client_credentials"}' https://api.gfycat.com/v1/oauth/token

$response = getGifData($search_url, $access_token); 
//echo '<pre>';
//$tem = json_decode($response);
//print_r($tem);exit;
echo $response;exit;  
 
function getGifData($search_url, $access_token){
    global $url;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$search_url);
    $authorization = "Authorization: Bearer $access_token";
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization ));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

function getauth(){
    $authUrl = "https://api.gfycat.com/v1/oauth/token";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $authUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"client_id\":\"2_X6l6Bw\", \"client_secret\": \"BlYnnbdGHTQIk-pjCNsvmf85sA6oEXEWFe0Dn9iRKSYRQuKeMn68Pa6GNOYJQ3e3\", \"grant_type\": \"client_credentials\"}");

    $headers = array();
    $headers[] = 'Content-Type: application/x-www-form-urlencoded';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $result = curl_exec($ch);
    if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);
    return json_decode($result)->access_token;
}

