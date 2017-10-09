<?php
//echo json_encode("players model class");
//exit;
$path = $_SERVER['DOCUMENT_ROOT'] . '/servidor/project/';
define('SITE_ROOT', $path);
require(SITE_ROOT . "modules/players/model/BLL/players_bll.class.singleton.php");

class players_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = players_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_product($arrArgument) {
        return $this->bll->create_product_BLL($arrArgument);
    }

    public function obtain_countries($url){
        return $this->bll->obtain_countries_BLL($url);
    }

    public function obtain_provinces(){
        return $this->bll->obtain_provinces_BLL();
    }

    public Function obtain_cities($arrArgument){
        return $this->bll->obtain_cities_BLL($arrArgument);
    }

}
