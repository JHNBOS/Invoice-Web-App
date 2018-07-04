<?php
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Headers: *'); 

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

        deleteLocatedAt($number, $postal_code, $conn);
    } if(!empty($_GET['id'])) {
        $id = $_GET['id'];
        deleteLocatedAtNumber($id, $conn);
    } else {
        echo json_encode('Bad Request');
    }

    function deleteLocatedAt($number, $postal_code, $conn) {
        $sql = "DELETE FROM located_at WHERE address_postal ='{$postal_code}' AND address_number = {$number}";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

    function deleteLocatedAtByNumber($number, $conn) {
        $sql = "DELETE FROM located_at WHERE debtor_ssn = {$ssn}";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

?>