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
    
    $email = (string)$request["email"];
    $pass = (string)$request["password"];
    $first_name = (string)$request["first_name"];
    $last_name = (string)$request["last_name"];
    $profile_pic = (string)$request["profile_pic"];

    if(isset($_POST)) {
        $user = updateUser($email, $pass, $first_name, $last_name, $profile_pic, $conn);
        if(empty($user)) {
            http_response_code(404);
            echo json_encode('Invalid Data!');
        } else {
            http_response_code(200);
            echo json_encode($user);
        }
    }

    function updateUser($email, $pass, $first_name, $last_name, $profile_pic, $conn) {
        $sql = "UPDATE user SET password = '{$pass}', first_name = '{$first_name}', last_name = '{$last_name}', profile_pic = '{$profile_pic}' WHERE email = '{$email}'";
        
        $data = array();
        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data = $rows;
        }
        return $data;
    }

?>