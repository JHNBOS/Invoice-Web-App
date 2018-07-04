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
    
    $invoice_number = (string)$request["invoice_number"];
    $debtor = (string)$request["debtor_ssn"];
    $created_on = (string)$request["created_on"];
    $expired_on = (string)$request["expired_on"];
    $tax = (string)$request["tax"];
    $total = (string)$request["total"];
    $discount = (string)$request["discount"];
    $comment = (string)$request["comment"];

    if(isset($_POST)) {
        $invoice = updateInvoice($invoice_number, $debtor, $created_on, $expired_on, $tax, $total, $discount, $comment, $conn);
        if(empty($invoice)) {
            http_response_code(404);
            echo json_encode('Invalid Data!');
        } else {
            http_response_code(200);
            echo json_encode($invoice);
        }
    }

    function updateInvoice($invoice_number, $debtor, $created_on, $expired_on, $tax, $total, $discount, $comment, $conn) {
        $sql = "UPDATE invoice SET expired_on = '{$expired_on}', tax = '{$tax}', total = '{$total}', discount = '{$discount}', comment = '{$comment}' WHERE invoice_number = '{$invoice_number}';";
        
        $data = array();
        $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

        while( $rows = mysqli_fetch_assoc($resultset) ) {
            $data = $rows;
        }
        return $data;
    }

?>