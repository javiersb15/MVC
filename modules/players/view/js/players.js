//Crear un plugin
jQuery.fn.fill_or_clean = function () {
    this.each(function () {
        //if ($("#name").val() == "") {
        if ($("#name").val() == "") {
            $("#name").val("Introduce name");
            $("#name").focus(function () {
                if ($("#name").val() == "Introduce name") {
                    $("#name").val('');
                }
            });
        }
        $("#name").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#name").val() == "") {
                $("#name").val("Introduce name");
            }
        });

        if ($("#last_name").val() == "") {
            $("#last_name").val("Introduce last name");
            $("#last_name").focus(function () {
                if ($("#last_name").val() == "Introduce last name") {
                    $("#last_name").val('');
                }
            });
        }
        $("#last_name").blur(function () {
            if ($("#last_name").val() == "") {
                $("#last_name").val("Introduce last name");
            }
        });
        if ($("#birth_date").val()== "") {
            $("#birth_date").val("Introduce date of birth");
            $("#birth_date").focus(function () {
                if ($("#birth_date").val() == "Introduce date of birth") {
                    $("#birth_date").val('');
                }
            });
        }
        $("#birth_date").blur(function () {
            if ($("#birth_date").val() == "") {
                $("#birth_date").val("Introduce date of birth");
            }
        });
        if ($("#height").val() == "") {
            $("#height").val( "Introduce height");
            $("#height").focus(function () {
                if ($("#height").val() == "Introduce height") {
                    $("#height").val( "");
                }
            });
        }
        $("#height").blur(function () {
            if ($("#height").val() == "") {
                $("#height").val( "Introduce height");
            }
        });
        if ($("#weight").val() == "") {
            $("#weight").val( "Introduce weight");
            $("#weight").focus(function () {
                if ($("#weight").val() == "Introduce weight") {
                    $("#weight").val( "");
                }
            });
        }
        $("#weight").blur(function () {
            if ($("#weight").val() == "") {
                $("#weight").val( "Introduce weight");
            }
        });
        if ($("#user").val() == "") {
            $("#user").val( "Introduce user");
            $("#user").focus(function () {
                if ($("#user").val() == "Introduce user") {
                    $("#user").val( "");
                }
            });
        }
        $("#user").blur(function () {
            if ($("#user").val() == "") {
                $("#user").val( "Introduce user");
            }
        });
        if ($("#pass").val() == "") {
            $("#pass").val( "password");
            $("#pass").focus(function () {
                if ($("#pass").val() == "password") {
                    $("#pass").val( "");
                }
            });
        }
        $("#pass").blur(function () {
            if ($("#pass").val() == "") {
                $("#pass").val( "password");
            }
        });
        if ($("#email").val() == "") {
            $("#email").val( "Introduce email");
            $("#email").focus(function () {
                if ($("#email").val() == "Introduce email") {
                    $("#email").val( "");
                }
            });
        }
        $("#email").blur(function () {
            if ($("#email").val() == "") {
                $("#email").val( "Introduce email");
            }
        });
    });//each
    return this;
};//function

//Solution to : "Uncaught Error: Dropzone already attached."
Dropzone.autoDiscover = false;
$(document).ready(function () {

    //Datepicker///////////////////////////
    $("#birth_date").datepicker({
        dateFormat: 'mm/dd/yy',
        defaultDate: '05/05/1999',
        changeMonth: true,
        changeYear: true,
        yearRange: '-110:-16'
    });
    //Valida players /////////////////////////
    $('#submit_players').click(function () {
        validate_players();
    });

    //Control de seguridad para evitar que al volver atrás de la pantalla results a create, no nos imprima los datos
    $.get("/servidor/project/modules/players/controller/controller_players.class.php?load_data=true",
            function (response) {
                //alert(response.players);
                if (response.players === "") {
                    $("#name").val('');
                    $("#last_name").val('');
                    $("#birth_date").val('');
                    $("#height").val('');
                    $("#weight").val('');
                    $("#user").val('');
                    $("#pass").val('');
                    $("#email").val('');
                    $("#team").val('Select team');
                    $('#country').val('Select country');
                    $('#province').val('Select province');
                    $('#city').val('Select city');
                    var inputElements = document.getElementsByClassName('messageCheckbox');
                    for (var i = 0; i < inputElements.length; i++) {
                        if (inputElements[i].checked) {
                            inputElements[i].checked = false;
                        }
                    }
                    //siempre que creemos un plugin debemos llamarlo, sino no funcionará
    $(this).fill_or_clean();
                } else {
                    $("#name").val( response.players.name);
                    $("#last_name").val( response.players.last_name);
                    $("#birth_date").val( response.players.birth_date);
                    $("#height").val( response.players.height);
                    $("#weight").val( response.players.weight);
                    $("#user").val( response.players.user);
                    $("#pass").val( response.players.pass);
                    $("#email").val( response.players.email);
                    $("#team").val( response.players.team);
                    $('#country').val(response.players.country);
                    $('#province').val(response.players.province);
                    $('#city').val(response.players.city);
                    var position = response.players.hobbies;
                    var inputElements = document.getElementsByClassName('messageCheckbox');
                    for (var i = 0; i < position.length; i++) {
                        for (var j = 0; j < inputElements.length; j++) {
                            if(position[i] ===inputElements[j] )
                                inputElements[j].checked = true;
                        }
                    }
                }
            }, "json");

    //Dropzone function //////////////////////////////////
    $("#dropzone").dropzone({
        url: "/servidor/project/modules/players/controller/controller_players.class.php?upload=true",
        addRemoveLinks: true,
        maxFileSize: 1000,
        dictResponseError: "Ha ocurrido un error en el server",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.rar,application/pdf,.psd',
        init: function () {
            this.on("success", function (file, response) {
                //alert(response);
                $("#progress").show();
                $("#bar").width('100%');
                $("#percent").html('100%');
                $('.msg').text('').removeClass('msg_error');
                $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({'right': '300px'}, 300);
            });
        },
        complete: function (file) {
            //if(file.status == "success"){
            //alert("El archivo se ha subido correctamente: " + file.name);
            //}
        },
        error: function (file) {
            //alert("Error subiendo el archivo " + file.name);
        },
        removedfile: function (file, serverFileName) {
            var name = file.name;
            $.ajax({
                type: "POST",
                url: "/servidor/project/modules/players/controller/controller_players.class.php?delete=true",
                data: "filename=" + name,
                success: function (data) {
                    $("#progress").hide();
                    $('.msg').text('').removeClass('msg_ok');
                    $('.msg').text('').removeClass('msg_error');
                    $("#e_avatar").html("");

                    var json = JSON.parse(data);
                    if (json.res === true) {
                        var element;
                        if ((element = file.previewElement) != null) {
                            element.parentNode.removeChild(file.previewElement);
                            //alert("Imagen eliminada: " + name);
                        } else {
                            false;
                        }
                    } else { //json.res == false, elimino la imagen también
                        var element;
                        if ((element = file.previewElement) != null) {
                            element.parentNode.removeChild(file.previewElement);
                        } else {
                            false;
                        }
                    }
                }
            });
        }
    });

    //Utilizamos las expresiones regulares para las funciones de  fadeout
    var email_reg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var date_reg = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    var height_reg = /^[0-9]+([,][0-9]+)?$/;
    var weight_reg = /^[0-9]+([,][0-9]+)?$/;
    var pass_reg = /^[0-9a-zA-Z]{6,32}$/;
    var string_reg = /^([A-Za-z]{2,30})[ ]([A-Za-z]{2,30})$/;
    var usr_reg = /^[0-9a-zA-Z]{2,20}$/;

    //realizamos funciones para que sea más práctico nuestro formulario
    $("#name, #last_name").keyup(function () {
        if ($(this).val() != "" && string_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#user").keyup(function () {
        if ($(this).val() != "" && usr_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#pass").keyup(function () {
        if ($(this).val() != "" && pass_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#birth_date").keyup(function () {
        if ($(this).val() != "" && date_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#height").keyup(function () {
        if ($(this).val() != "" && height_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#weight").keyup(function () {
        if ($(this).val() != "" && weight_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#email").keyup(function () {
        if ($(this).val() != "" && email_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
});

//Dependent combos //////////////////////////////////
load_countries_v1();

$("#province").empty();
$("#province").append('<option value="" selected="selected">Select province</option>');
$("#province").prop('disabled', true);
$("#city").empty();
$("#city").append('<option value="" selected="selected">Select city</option>');
$("#city").prop('disabled', true);

$("#country").change(function() {
var country = $(this).val();
var province = $("#province");
var city = $("#city");

if(country !== 'ES'){
       province.prop('disabled', true);
       city.prop('disabled', true);
       $("#province").empty();
     $("#city").empty();
}else{
       province.prop('disabled', false);
       city.prop('disabled', false);
       load_provinces_v1();
}//fi else
});

$("#province").change(function() {
var prov = $(this).val();
if(prov > 0){
  load_cities_v1(prov);
}else{
  $("#city").prop('disabled', false);
}
});

function validate_players() {
    var result = true;

    var name = document.getElementById('name').value;
    var last_name = document.getElementById('last_name').value;
    var birth_date = document.getElementById('birth_date').value;
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    var team = document.getElementById('team').value;
    var province = document.getElementById('province').value;
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    var email = document.getElementById('email').value;
    var position = [];
    var inputElements = document.getElementsByClassName('messageCheckbox');
    var j = 0;
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            position[j] = inputElements[i].value;
            j++;
        }
    }

    //Utilizamos las expresiones regulares para la validación de errores JS
    var email_reg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var date_reg = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    var height_reg = /^[0-9]+([,][0-9]+)?([ ][a-z])$/;
    var weight_reg = /^[0-9]+([,][0-9]+)?([ ][a-z])$/;
    var pass_reg = /^[0-9a-zA-Z]{6,32}$/;
    var string_reg = /^[A-Za-z]{2,30}$/;
    var usr_reg = /^[0-9a-zA-Z]{2,20}$/;

    $(".error").remove();

    if ($("#name").val() == "" || $("#name").val() == "Introduce name") {
        $("#name").focus().after("<span class='error'>Introduce name</span>");
        result = false;
        return false;
    } else if (!string_reg.test($("#name").val())) {
        $("#name").focus().after("<span class='error'>Name must be 2 to 30 letters</span>");
        result = false;
        return false;
    }

    else if ($("#last_name").val() == "" || $("#last_name").val() == "Introduce last name") {
        $("#last_name").focus().after("<span class='error'>Introduce last name</span>");
        result = false;
        return false;
    } else if (!string_reg.test($("#last_name").val())) {
        $("#last_name").focus().after("<span class='error'>Last name must be 2 to 30 letters</span>");
        result = false;
        return false;
    }

    else if ($("#birth_date").val() == "" || $("#birth_date").val() == "Introduce date of birth") {
        $("#birth_date").focus().after("<span class='error'>Introduce date of birth</span>");
        result = false;
        return false;
    } else if (!date_reg.test($("#birth_date").val())) {
        $("#birth_date").focus().after("<span class='error'>error format date (mm/dd/yyyy)</span>");
        result = false;
        return false;
    }

    if ($("#height").val() == "" || $("#height").val() == "Introduce height") {
        $("#height").focus().after("<span class='error'>Introduce height</span>");
        result = false;
        return false;
    } else if (!height_reg.test($("#height").val())) {
        $("#height").focus().after("<span class='error'>Height don't have  symbols js.</span>");
        result = false;
        return false;
    }

    if ($("#weight").val() == "" || $("#weight").val() == "Introduce weight") {
        $("#weight").focus().after("<span class='error'>Introduce weight</span>");
        result = false;
        return false;
    } else if (!height_reg.test($("#weight").val())) {
        $("#weight").focus().after("<span class='error'>Weight don't have  symbols js.</span>");
        result = false;
        return false;
    }

    if ($("#user").val() == "" || $("#user").val() == "Introduce user") {
        $("#user").focus().after("<span class='error'>Introduce user</span>");
        result = false;
        return false;
    } else if (!usr_reg.test($("#user").val())) {
        $("#user").focus().after("<span class='error'>User be 2 to 20 characters.</span>");
        result = false;
        return false;
    }

    if ($("#pass").val() == "" || $("#pass").val() == "password") {
        $("#pass").focus().after("<span class='error'>Introduce pass</span>");
        result = false;
        return false;
    } else if (!pass_reg.test($("#pass").val())) {
        $("#pass").focus().after("<span class='error'>Pass must be 6 to 10 characters.</span>");
        result = false;
        return false;
    }

    if ($("#email").val() == "" || $("#email").val() == "Introduce email") {
        $("#email").focus().after("<span class='error'>Introduce email</span>");
        result = false;
        return false;
    } else if (!email_reg.test($("#email").val())) {
        $("#email").focus().after("<span class='error'>Error format email (example@example.com).</span>");
        result = false;
        return false;
    }

    if ($("#province").val() === "" || $("#province").val() === "Select province") {
        $("#province").focus().after("<span class='error'>Select one province</span>");
        return false;
    }


    if (result) {

      if (province === null) {
          province = 'default_province';
      }else if (province.length === 0) {
          province = 'default_province';
      }else if (province === 'Select province') {
          return 'default_province';
      }

      if (city === null) {
          city = 'default_city';
      }else if (city.length === 0) {
          city = 'default_city';
      }else if (city === 'Select city') {
          return 'default_city';
      }

      //Si ha ido todo bien, se envian los datos al servidor

        var data = {"name": name, "last_name": last_name, "birth_date": birth_date, "height": height, "weight": weight, "team": team, "country": country, "province": province, "city": city, "user": user, "pass": pass,
            "email": email, "position": position};

        var data_players_JSON = JSON.stringify(data);

    $.post('/servidor/project/modules/players/controller/controller_players.class.php', {alta_players_json: data_players_JSON},
            function (response) {
                console.log(typeof(response));
                if (response.success) {
                    window.location.href = response.redirect;
                }
                console.log(response);
            }, "json")
                    .fail(function (xhr, textStatus, errorThrown) {
                        if (xhr.responseJSON === undefined || xhr.responseJSON === null)
                            xhr.responseJSON = JSON.parse(xhr.responseText);

                        if (xhr.status === 0) {
                            alert('Not connect: Verify Network.');
                        } else if (xhr.status === 404) {
                            alert('Requested page not found [404]');
                        } else if (xhr.status === 500) {
                            alert('Internal Server Error [500].');
                        } else if (textStatus === 'parsererror') {
                            alert('Requested JSON parse failed.');
                        } else if (textStatus === 'timeout') {
                            alert('Time out error.');
                        } else if (textStatus === 'abort') {
                            alert('Ajax request aborted.');
                        } else {
                            alert('Uncaught Error: ' + xhr.responseText);
                        }

                        if (xhr.responseJSON !== undefined && xhr.responseJSON !== null) {
                            if (xhr.responseJSON.error.name !== undefined && xhr.responseJSON.error.name !== null) {
                                $("#name").focus().after("<span class='error'>" + xhr.responseJSON.error.name + "</span>");
                            }
                            if (xhr.responseJSON.error.last_name !== undefined && xhr.responseJSON.error.last_name !== null) {
                                $("#last_name").focus().after("<span class='error'>" + xhr.responseJSON.error.last_name + "</span>");
                            }
                            if (xhr.responseJSON.error.birth_date !== undefined && xhr.responseJSON.error.birth_date !== null) {
                                $("#birth_date").focus().after("<span class='error'>" + xhr.responseJSON.error.birth_date + "</span>");
                            }
                            if (xhr.responseJSON.error.height !== undefined && xhr.responseJSON.error.height !== null) {
                                $("#height").focus().after("<span class='error'>" + xhr.responseJSON.error.height + "</span>");
                            }
                            if (xhr.responseJSON.error.weight !== undefined && xhr.responseJSON.error.weight !== null) {
                                $("#weight").focus().after("<span class='error'>" + xhr.responseJSON.error.weight + "</span>");
                            }
                            if (xhr.responseJSON.error.user !== undefined && xhr.responseJSON.error.user !== null) {
                                $("#user").focus().after("<span class='error'>" + xhr.responseJSON.error.user + "</span>");
                            }
                            if (xhr.responseJSON.error.pass !== undefined && xhr.responseJSON.error.pass !== null) {
                                $("#pass").focus().after("<span class='error'>" + xhr.responseJSON.error.pass + "</span>");
                            }
                            if (xhr.responseJSON.error.email !== undefined && xhr.responseJSON.error.email !== null) {
                                $("#email").focus().after("<span class='error'>" + xhr.responseJSON.error.email + "</span>");
                            }
                            if (xhr.responseJSON.error.team !== undefined && xhr.responseJSON.error.team !== null) {
                                $("#team").focus().after("<span class='error'>" + xhr.responseJSON.error.team + "</span>");
                            }
                            if (xhr.responseJSON.error.country !== undefined && xhr.responseJSON.error.country !== null) {
                                $("#error_country").focus().after("<span class='error'>" + xhr.responseJSON.error.country + "</span>");
                            }
                            if (xhr.responseJSON.error.province !== undefined && xhr.responseJSON.error.province !== null) {
                                $("#error_province").focus().after("<span class='error'>" + xhr.responseJSON.error.province + "</span>");
                            }
                            if (xhr.responseJSON.error.province !== undefined && xhr.responseJSON.error.province !== null) {
                                $("#error_province").focus().after("<span class='error'>" + xhr.responseJSON.error.province + "</span>");
                            }
                            if (xhr.responseJSON.error.city !== undefined && xhr.responseJSON.error.city !== null) {
                                $("#city").focus().after("<span class='error'>" + xhr.responseJSON.error.city + "</span>");
                            }
                            if (xhr.responseJSON.error_avatar !== undefined && xhr.responseJSON.error_avatar !== null) {
                                $("#dropzone").focus().after("<span class='error'>" + xhr.responseJSON.error_avatar + "</span>");
                            }

                            /*if (xhr.responseJSON.error_avatar !== undefined && xhr.responseJSON.error_avatar !== null) {
                            $("#avatar").focus().after("<span class='error'>" + xhr.responseJSON.error_avatar + "</span>");
                          }*/

                        }
                        if (!(xhr.responseJSON.success1)) {
                            $("#bar").width('0%');
                            $("#percent").html('0%');
                            $('.msg').text('').removeClass('msg_ok');
                            $('.msg').text('Error Upload image!!').addClass('msg_error').animate({'right': '300px'}, 300);
                        }
                    });

}
}
