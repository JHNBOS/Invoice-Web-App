<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: *");

    include_once("../dbConnect.php");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST') {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
        }
        exit;
    }
    
    $postData = file_get_contents("php://input");
    $request = json_decode($postData, true);
    
    $business_number = (string)$request["business_number"];
    $email = (string)$request["email"];
    $company_name = (string)$request["company_name"];
    $bank_account = (string)$request["bank_account"];
    $phone = (string)$request["phone"];

    if(isset($_POST)) {
        $company = insertCompany($business_number, $email, $company_name, $bank_account, $phone, $conn);
        if(empty($company)) {
            http_response_code(404);
            echo json_encode('Invalid Data!');
        } else {
            http_response_code(200);
            echo json_encode($company);
        }
    }

    function insertCompany($business_number, $email, $company_name, $bank_account, $phone, $conn) {
        $sql = "INSERT INTO company(business_number, email, company_name, bank_account, phone) VALUES('{$business_number}', '{$email}', '{$company_name}', '{$bank_account}', '{$phone}');";
        
        $data = array();
        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data = $rows;
        }
        return $data;
    }

?>