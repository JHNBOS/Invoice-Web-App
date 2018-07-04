<?php
    header('Access-Control-Allow-Origin: *'); 
    
    include_once("../dbConnect.php");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST') {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
        }
        exit;
    }

    if(!empty($_GET['postal'])) {
        $postal_code = $_GET['postal'];
        $number = $_GET['number'];
        $address = getAddress($postal_code, $number, $conn);

        if(empty($address)) {
            http_response_code(404);
            echo json_encode('Not Found');
        } else {
            http_response_code(200);
            echo json_encode($address);
        }
    } else if(!empty($_GET['id'])) {
        $id = $_GET['id'];
        $address = getAddressBySSN($id, $conn);

        if(empty($address)) {
            http_response_code(404);
            echo json_encode('Not Found');
        } else {
            http_response_code(200);
            echo json_encode($address);
        }
    } else {
        http_response_code(400);
        echo json_encode('Bad Request');
    }

    function getAddress($postal_code, $number, $conn) {
        $sql = "SELECT * FROM address WHERE postal_code = '{$postal_code}' AND number = {$number}";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

?>