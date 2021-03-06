<?php
//echo json_encode("players_dao.class.singleton.php");
//exit;

class playerDAO {
    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_player_DAO($db, $arrArgument) {
<<<<<<< HEAD
        $name = $arrArgument['name'];
        $last_name = $arrArgument['last_name'];
        $birth_date = $arrArgument['birth_date'];
        $height = $arrArgument['height'];
        $weight = $arrArgument['weight'];
        $user = $arrArgument['user'];
        $pass = $arrArgument['pass'];
        $email = $arrArgument['email'];
        $team = $arrArgument['team'];
        $country = $arrArgument['country'];
        $province = $arrArgument['province'];
        $city = $arrArgument['city'];
        $position = $arrArgument['position'];
        $avatar = $arrArgument['avatar'];

        $Goalkeeper=0;
        $Defender=0;
        $Midfielder=0;
        $Forward=0;

        foreach ($position as $indice) {
            if ($indice === 'goalkeeper')
                $Goalkeeper = 1;
            if ($indice === 'defender')
                $Defender = 1;
            if ($indice === 'midfielder')
                $Midfielder = 1;
            if ($indice === 'forward')
                $Forward = 1;
        }

        $sql = "INSERT INTO players (name, last_name, birth_date, height,"
                . " weight, user, pass, email, team, country, province,"
                . " city, goalkeeper, defender, midfielder, forward, avatar) VALUES ('$name', '$last_name',"
                . " '$birth_date', '$height', '$weight', '$user', "
                . " '$pass', '$email', '$team', '$country', '$province',"
                . " '$city', '$goalkeeper', '$defender', '$midfielder', '$forward', '$avatar')";
=======
        $prodname = $arrArgument['prodname'];
        $prodref = $arrArgument['prodref'];
        $prodprice = $arrArgument['prodprice'];
        $date_reception = $arrArgument['date_reception'];
        $date_expiration = $arrArgument['date_expiration'];
        $category = $arrArgument['category'];
        $packaging = $arrArgument['packaging'];
        $country = $arrArgument['country'];
        $province = $arrArgument['province'];
        $city = $arrArgument['city'];
        $proddesc = $arrArgument['proddesc'];
        $prodpic = $arrArgument['prodpic'];

        $cat1=0;
        $cat2=0;
        $cat3=0;
        $cat4=0;

        foreach ($category as $indice) {
            if ($indice === 'cat1')
                $cat1 = 1;
            if ($indice === 'cat2')
                $cat2 = 1;
            if ($indice === 'cat3')
                $cat3 = 1;
            if ($indice === 'cat4')
                $cat4 = 1;
        }

        $sql = "INSERT INTO products (prodname, prodref, prodprice, date_reception,"
                . " date_expiration, cat1, cat2, cat3, cat4, packaging, country, province,"
                . " city, proddesc, prodpic) VALUES ('$prodname', '$prodref',"
                . " '$prodprice', '$date_reception', '$date_expiration', '$cat1', "
                . " '$cat2', '$cat3', '$cat4', '$packaging', '$country', '$province',"
                . " '$city', '$proddesc', '$prodpic')";
>>>>>>> origin/master

        return $db->ejecutar($sql);
    }

    public function obtain_countries_DAO($url){
          $ch = curl_init();
          curl_setopt ($ch, CURLOPT_URL, $url);
          curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
          $file_contents = curl_exec($ch);

          $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
          curl_close($ch);
          $accepted_response = array(200, 301, 302);
          if(!in_array($httpcode, $accepted_response)){
            return FALSE;
          }else{
            return ($file_contents) ? $file_contents : FALSE;
          }
    }

    public function obtain_provinces_DAO(){
          $json = array();
          $tmp = array();

<<<<<<< HEAD
          $provincias = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/servidor/project/resources/provinciasypoblaciones.xml');
=======
          $provincias = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/1_Backend/6_dependent_dropdowns/resources/provinciasypoblaciones.xml');
>>>>>>> origin/master
          $result = $provincias->xpath("/lista/provincia/nombre | /lista/provincia/@id");
          for ($i=0; $i<count($result); $i+=2) {
            $e=$i+1;
            $provincia=$result[$e];

            $tmp = array(
              'id' => (string) $result[$i], 'nombre' => (string) $provincia
            );
            array_push($json, $tmp);
          }
              return $json;

    }

    public function obtain_cities_DAO($arrArgument){
          $json = array();
          $tmp = array();

          $filter = (string)$arrArgument;
<<<<<<< HEAD
          $xml = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/servidor/project/resources/provinciasypoblaciones.xml');
=======
          $xml = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/1_Backend/6_dependent_dropdowns/resources/provinciasypoblaciones.xml');
>>>>>>> origin/master
          $result = $xml->xpath("/lista/provincia[@id='$filter']/localidades");

          for ($i=0; $i<count($result[0]); $i++) {
              $tmp = array(
                'poblacion' => (string) $result[0]->localidad[$i]
              );
              array_push($json, $tmp);
          }
          return $json;
    }
}//End productDAO
