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
    
    $items = (array)$request["items"];

    if(isset($_POST)) {
        $invoiceItems = insertInvoiceItems($items, $conn);
        if(empty($invoiceItems)) {
            http_response_code(404);
            echo json_encode('Invalid Data!');
        } else {
            http_response_code(200);
            echo json_encode($invoiceItems);
        }
    }

    function insertInvoiceItems($items, $conn) {
        $data = array();
        $i = 0;

        foreach ($items as $key => $value); {
            $i++;

            $name = (string)$key["name"];
            $desc = (string)$key["desc"];
            $price = (float)$key["price"];
            $tax = (int)$key["tax"];
            $discount = (int)$key["discount"];
            $invoice_number = (int)$key["invoice_number"];
            $quantity = (int)$key["quantity"];

            $sql = "INSERT INTO invoice_row(invoice_number, name, desc, price, tax, quantity, discount) VALUES('{$invoice_number}', '{$name}', '{$desc}', '{$price}', '{$tax}', '{$quantity}', '{$discount}');";
            $resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));

            while( $rows = mysqli_fetch_assoc($resultset) ) {
                $data[$i] = $rows;
            }
        }

        return $data;
    }

?>