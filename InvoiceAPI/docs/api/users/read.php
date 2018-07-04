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
        $user = getUserByEmail($email, $conn);

        if(empty($user)) {
            http_response_code(404);
            echo json_encode('Not Found');
        } else {
            http_response_code(200);
            echo json_encode($user);
        }
    } else if(!empty($_GET['id'])) {
        $id = $_GET['id'];
        $user = getUserById($id, $conn);

        if(empty($user)) {
            http_response_code(404);
            echo json_encode('Not Found');
        } else {
            http_response_code(200);
            echo json_encode($user);
        }
    } else {
        http_response_code(400);
        echo json_encode('Bad Request');
    }

    function getUserByEmail($email, $conn) {
        $sql = "SELECT * FROM user WHERE email = '{$email}'";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

    function getUserById($id, $conn) {
        $sql = "SELECT * FROM user WHERE user_id = {$id}";
        $data = array();

        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data[] = $rows;
        }
        return $data;
    }

?>