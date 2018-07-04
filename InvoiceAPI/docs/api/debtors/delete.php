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

    if(!empty($_GET['email'])) {
        $email = $_GET['email'];
        deleteUserByEmail($email, $conn);
    } if(!empty($_GET['id'])) {
        $id = $_GET['id'];
        deleteUserById($id, $conn);
    } else {
        echo json_encode('Bad Request');
    }

    function deleteUserByEmail($email, $conn) {
        $sql = "DELETE FROM debtor WHERE email = '{$email}'";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

    function deleteUserById($id, $conn) {
    $sql = "DELETE FROM debtor WHERE ssn = {$id}";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

?>