function load_players() {
    var jqxhr = $.get("/servidor/project/modules/players/controller/controller_players.class.php?load=true", function (data) {
        var json = JSON.parse(data);
        console.log(json);
        pintar_players(json);
        //alert( "success" );
    }).done(function () {
        //alert( "second success" );
    }).fail(function () {
        //alert( "error" );
    }).always(function () {
        //alert( "finished" );
    });
    jqxhr.always(function () {
        //alert( "second finished" );
    });
}

$(document).ready(function () {
    load_players();
});

function pintar_players(data) {
    //alert(data.players.avatar);
    var content = document.getElementById("content");
    var div_player = document.createElement("div");
    var parrafo = document.createElement("p");

    var msje = document.createElement("div");
    msje.innerHTML = "msje = ";
    msje.innerHTML += data.msje;

    var name = document.createElement("div");
    name.innerHTML = "name = ";
    name.innerHTML += data.player.name;

    var last_name = document.createElement("div");
    last_name.innerHTML = "last_name = ";
    last_name.innerHTML += data.player.last_name;

    var date_birthday = document.createElement("div");
    date_birthday.innerHTML = "date_birthday = ";
    date_birthday.innerHTML += data.player.birth_date;

    var height = document.createElement("div");
    height.innerHTML = "height = ";
    height.innerHTML += data.player.height;

    var weight = document.createElement("div");
    weight.innerHTML = "weight = ";
    weight.innerHTML += data.player.weight;

    var user = document.createElement("div");
    user.innerHTML = "user = ";
    user.innerHTML += data.player.user;

    var pass = document.createElement("div");
    pass.innerHTML = "pass = ";
    pass.innerHTML += data.player.pass;

    var email = document.createElement("div");
    email.innerHTML = "email = ";
    email.innerHTML += data.player.email;

    var team = document.createElement("div");
    team.innerHTML = "team = ";
    team.innerHTML += data.player.team;

    var position = document.createElement("div");
    position.innerHTML = "position = ";
    for(var i =0;i < data.player.position.length;i++){
    position.innerHTML += " - "+data.player.position[i];
    }

    //arreglar ruta IMATGE!!!!!

    var cad = data.player.avatar;
    //console.log(cad);
    //var cad = cad.toLowerCase();
    var img = document.createElement("div");
    var html = '<img src="' + cad + '" height="75" width="75"> ';
    img.innerHTML = html;
    //alert(html);

    div_player.appendChild(parrafo);
    parrafo.appendChild(msje);
    parrafo.appendChild(name);
    parrafo.appendChild(last_name);
    parrafo.appendChild(date_birthday);
    parrafo.appendChild(height);
    parrafo.appendChild(weight);
    parrafo.appendChild(team);
    parrafo.appendChild(user);
    parrafo.appendChild(pass);
    parrafo.appendChild(email);
    parrafo.appendChild(position);
    content.appendChild(div_player);
    content.appendChild(img);
}
