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
    
    $company = (string)$request["company_number"];
    $postal_code = (string)$request["address_postal"];
    $number = (string)$request["address_number"];

    if(isset($_POST)) {
        $located_at = insertAddress($company, $postal_code, $number, $conn);
         if(empty($located_at)) {
            echo json_encode('Invalid Data!');
        } else {
            echo json_encode($located_at);
        }
    }

    function checkIfExists($company, $postal_code, $number, $conn) {
        $sql = "SELECT * FROM located_at WHERE company_number = {$company} AND address_postal = '{$postal_code}' AND address_number = {$number}";
        
        $data = array();
        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data = $rows;
        }
        return $data;
    }

    function removeLink($company, $conn) {
        $sql = "DELETE FROM located_at WHERE company_number = {$company}";
        
        $data = array();
        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data = $rows;
        }
        return $data;
    }

    function insertAddress($company, $postal_code, $number, $conn) {
        $exists = checkIfExists($company, $postal_code, $number, $conn);

        if(!empty($exists)) {
            removeLink($company, $conn);
        }
        
        $sql = "INSERT INTO located_at(company_number, address_number, address_postal) VALUES('{$company}', '{$number}', '{$postal_code}');";
        
        $data = array();
        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data = $rows;
        }
        return $data;
    }

?>