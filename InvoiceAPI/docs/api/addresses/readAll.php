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

    $addresses = getAddresses($conn);
    if(empty($addresses)) {
        http_response_code(200);
        echo json_encode('No addresses available!');
    } else {
        http_response_code(200);
        echo json_encode($addresses);
    }

    function getAddresses($conn) {
        $sql = "SELECT * FROM address";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

?>