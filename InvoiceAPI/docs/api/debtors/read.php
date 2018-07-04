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

    if(!empty($_GET['email'])) {
        $email = $_GET['email'];
        $debtor = getDebtorByEmail($email, $conn);

        if(empty($debtor)) {
            http_response_code(404);
            echo json_encode('Not Found');
        } else {
            http_response_code(200);
            echo json_encode($debtor);
        }
    } else if(!empty($_GET['id'])) {
        $id = $_GET['id'];
        $debtor = getDebtorBySSN($id, $conn);

        if(empty($debtor)) {
            http_response_code(404);
            echo json_encode('Not Found');
        } else {
            http_response_code(200);
            echo json_encode($debtor);
        }
    } else {
        http_response_code(400);
        echo json_encode('Bad Request');
    }

    function getDebtorByEmail($email, $conn) {
        $sql = "SELECT * FROM debtor WHERE email = '{$email}'";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }
    
    function getDebtorBySSN($ssn, $conn) {
        $sql = "SELECT * FROM debtor WHERE ssn = {$ssn}";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

?>