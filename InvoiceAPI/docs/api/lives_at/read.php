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

    if(!empty($_GET['postal']) || !empty($_GET['number'])) {
        $postal_code = $_GET['postal'];
        $number = $_GET['number'];

        $lives_at = getLivesAt($number, $postal_code, $conn);

        if(empty($lives_at)) {
            http_response_code(404);
            echo json_encode('Not Found');
        } else {
            http_response_code(200);
            echo json_encode($lives_at);
        }
    } else if(!empty($_GET['id'])) {
        $id = $_GET['id'];
        $lives_at = getLivesAtBySSN($id, $conn);

        if(empty($lives_at)) {
            http_response_code(404);
            echo json_encode('Not Found');
        } else {
            http_response_code(200);
            echo json_encode($lives_at);
        }
    } else {
        http_response_code(400);
        echo json_encode('Bad Request');
    }

    function getLivesAt($number, $postal_code, $conn) {
        $sql = "SELECT * FROM lives_at WHERE address_postal_code = '{$postal_code}' AND address_number = {$number}";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

    function getLivesAtBySSN($id, $conn) {
        $sql = "SELECT * FROM lives_at WHERE debtor_ssn = {$id}";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

?>