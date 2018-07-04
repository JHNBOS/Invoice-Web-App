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
    
    $debtor = (string)$request["debtor_ssn"];
    $postal_code = (string)$request["address_postal"];
    $number = (string)$request["address_number"];

    if(isset($_POST)) {
        $lives_at = insertAddress($debtor, $postal_code, $number, $conn);
        if(empty($lives_at)) {
            http_response_code(404);
            echo json_encode('Invalid Data!');
        } else {
            http_response_code(200);
            echo json_encode($lives_at);
        }
    }

    function checkIfExists($debtor, $postal_code, $number, $conn) {
        $sql = "SELECT * FROM lives_at WHERE debtor_ssn = {$debtor} AND address_postal = '{$postal_code}' AND address_number = {$number}";
        
        $data = array();
        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data = $rows;
        }
        return $data;
    }

    function removeLink($debtor, $conn) {
        $sql = "DELETE FROM lives_at WHERE debtor_ssn = {$debtor}";
        
        $data = array();
        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data = $rows;
        }
        return $data;
    }

    function insertAddress($debtor, $postal_code, $number, $conn) {
        $exists = checkIfExists($debtor, $postal_code, $number, $conn);

        if(!empty($exists)) {
            removeLink($debtor, $conn);
        }
        
        $sql = "INSERT INTO lives_at(debtor_ssn, address_number, address_postal) VALUES('{$debtor}', '{$number}', '{$postal_code}');";
        
        $data = array();
        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data = $rows;
        }
        return $data;
    }

?>