<?php
session_start();
//include  with absolute route
include ($_SERVER['DOCUMENT_ROOT'] . "/servidor/project/modules/players/utils/functions_players.inc.php");
include ($_SERVER['DOCUMENT_ROOT'] . "/servidor/project/utils/upload.php");

//////////////////////////////////////////////////////////////// upload
if ((isset($_GET["upload"])) && ($_GET["upload"] == true)) {
    $result_avatar = upload_files();
    $_SESSION['result_avatar'] = $result_avatar;
    //echo debug($_SESSION['result_avatar']); //se mostraría en alert(response); de dropzone.js
}

//////////////////////////////////////////////////////////////// alta_players_json
if ((isset($_POST['alta_players_json']))) {
    alta_players();
}

function alta_players() {
    $jsondata = array();
    $playersJSON = json_decode($_POST["alta_players_json"], true);
    $result = validate_players($playersJSON);

    if (empty($_SESSION['result_avatar'])) {
        $_SESSION['result_avatar'] = array('resultado' => true, 'error' => "", 'datos' => 'project/media/default-avatar.png');
    }
    $result_avatar = $_SESSION['result_avatar'];

    if (($result['resultado']) && ($result_avatar['resultado'])) {
        $arrArgument = array(
            'name' => ucfirst($result['datos']['name']),
            'last_name' => ucfirst($result['datos']['last_name']),
            'birth_date' => $result['datos']['birth_date'],
            'height' => $result['datos']['height'],
            'weight' => $result['datos']['weight'],
            'user' => $result['datos']['user'],
            'pass' => $result['datos']['pass'],
            'email' => $result['datos']['email'],
            'team' => strtoupper($result['datos']['team']),
            'position' => $result['datos']['position'],
            'avatar' => $result_avatar['datos']
        );

        $mensaje = "Players has been successfully registered";

        //redirigir a otra p�gina con los datos de $arrArgument y $mensaje
        $_SESSION['player'] = $arrArgument;
        $_SESSION['msje'] = $mensaje;
        $callback = "index.php?module=players&view=results_players";

        $jsondata["success"] = true;
        $jsondata["redirect"] = $callback;
        echo json_encode($jsondata);
        exit;
    } else {
        //$error = $result['error'];
        //$error_avatar = $result_avatar['error'];
        $jsondata["success"] = false;
        $jsondata["error"] = $result['error'];
        $jsondata["error_avatar"] = $result_avatar['error'];

        $jsondata["success1"] = false;
        if ($result_avatar['resultado']) {
            $jsondata["success1"] = true;
            $jsondata["img_avatar"] = $result_avatar['datos'];
        }
        header('HTTP/1.0 400 Bad error');
        echo json_encode($jsondata);
        //exit;
    }
}

//////////////////////////////////////////////////////////////// delete
if (isset($_GET["delete"]) && $_GET["delete"] == true) {
    $_SESSION['result_avatar'] = array();
    $result = remove_files();
    if ($result === true) {
        echo json_encode(array("res" => true));
    } else {
        echo json_encode(array("res" => false));
    }
}

//////////////////////////////////////////////////////////////// load
if (isset($_GET["load"]) && $_GET["load"] == true) {
    $jsondata = array();
    if (isset($_SESSION['player'])) {
        //echo debug($_SESSION['player']);
        $jsondata["player"] = $_SESSION['player'];
    }
    if (isset($_SESSION['msje'])) {
        //echo $_SESSION['msje'];
        $jsondata["msje"] = $_SESSION['msje'];
    }
    close_session();
    echo json_encode($jsondata);
    exit;
}

function close_session() {
    unset($_SESSION['player']);
    unset($_SESSION['msje']);
    $_SESSION = array(); // Destruye todas las variables de la sesión
    session_destroy(); // Destruye la sesión
}

/////////////////////////////////////////////////// load_data
if ((isset($_GET["load_data"])) && ($_GET["load_data"] == true)) {
    $jsondata = array();
    if (isset($_SESSION['player'])) {
        $jsondata["player"] = $_SESSION['player'];
        echo json_encode($jsondata);
        exit;
    } else {
        $jsondata["player"] = "";
        echo json_encode($jsondata);
        exit;
    }
}
