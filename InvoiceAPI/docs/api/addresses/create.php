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
    
    $street = (string)$request["street"];
    $number = (string)$request["number"];
    $suffix = (string)$request["suffix"];
    $postal_code = (string)$request["postal_code"];
    $city = (string)$request["city"];
    $country = (string)$request["country"];

    if(isset($_POST)) {
        $address = insertAddress($street, $number, $suffix, $postal_code, $city, $country, $conn);
        if(empty($address)) {
            http_response_code(404);
            echo json_encode('Invalid Data!');
        } else {
            http_response_code(200);
            echo json_encode($address);
        }
    }

    function checkIfExists($street, $number, $suffix, $postal_code, $city, $country, $conn) {
        $sql = "SELECT * FROM address WHERE street = '{$street}' AND number = {$number} AND suffix ='{$suffix}' AND postal_code = '{$postal_code}' AND city = '{$city}' AND country = '{$country}';";
        
        $data = array();
        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data = $rows;
        }
        return $data;
    }

    function insertAddress($street, $number, $suffix, $postal_code, $city, $country, $conn) {
        $exists = checkIfExists($street, $number, $suffix, $postal_code, $city, $country, $conn);

        if(empty($exists)) {
            $sql = "INSERT INTO address(street, number, suffix, postal_code, city, country) VALUES('{$street}', {$number}, '{$suffix}', '{$postal_code}', '{$city}', '{$country}');";
        
            $data = array();
            $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

            while( $rows = mysqli_fetch_assoc($resultset) ) {
                $data = $rows;
            }
            return $data;
        } else {
            return null;
        }
        
    }

?>