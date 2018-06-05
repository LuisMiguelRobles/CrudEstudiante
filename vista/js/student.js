let url = "http://localhost:5000/api/Student/";
let users = [];
let data;

$(function () {

    cargarDatos();

    $("#add").click(function () {
        agregar();
    });

    $("#editar").click(function () {
        editar($("#Id").val());
    });

    $("#btnBuscar").click(function () {
        obtenerPorCedula($("#buscar").val());
        $("#buscar").val("");
        $("#consulta").show();
    });

});

/**
 *Obtiene todos los registros de la base de datos
 */
function cargarDatos() {

    $.ajax({
        "url": url,
        "type": "GET",
        "data": {},
        "dataType": "JSON"

    }).done(function (data) {

        if (data) {
            users = data;
            renderizar(data);

        }

    }).fail(function (error) {
        console.log(error);

    }).always(function (status) {
        //console.log(status);

    });



}


function renderizar(data) {

    let html = "";

    html = `<table class="table table-bordered table-striped table-dark table-hover">
                <thead class="thead-dark">
                    <tr>
                        <td>Nombre</td>
                        <td>Apellido</td>
                        <td>Cedula</td>
                        <td>Opciones</td>
                    </tr>
                </thead>`;

    $.each(data, function (key, value) {
        html +=
            `<tr>
                <td>${value.nombre}</td>
                <td>${value.apellido}</td>
                <td>${value.cedula}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#modalEditar" onclick="modalEditar(${value.id})">Editar</button>
                    <button class="btn btn-danger delete" id="delete" onclick="eliminar(${value.id})">Eliminar</button>
                </td>
            </tr>`;
    });
    html += `</table>`;
    $("#render").html(html);

}
/**
 * Agregar un Nuevo estudiante mediante el metodo POST
 */
function agregar() {

    data = {
        nombre: $("#nombre").val(),
        apellido: $("#apellido").val(),
        cedula: $("#cedula").val()
    };

    $.ajax({
        "url": url,
        "type": "POST",
        "data": JSON.stringify(data),
        "contentType": "application/json;charset=utf-8",
        "dataType": "JSON"

    }).done(function (data) {
        cargarDatos();
    })


}


function eliminar(id) {
    $.ajax({
        "url": url + id,
        "type": "DELETE"

    }).done(function () {
        cargarDatos();
    });
}

function modalEditar(id) {


    for (let value of users) {
        if (value.id == id) {
            $("#Id").val(value.id);
            $("#nombreEditar").val(value.nombre);
            $("#apellidoEditar").val(value.apellido);
            $("#cedulaEditar").val(value.cedula);
        }
    }
}


function editar(id) {

    data = {
        id: id,
        nombre: $("#nombreEditar").val(),
        apellido: $("#apellidoEditar").val(),
        cedula: $("#cedulaEditar").val()
    }


    $.ajax({
        "url": url + id,
        "type": "PUT",
        "data": JSON.stringify(data),
        "contentType": "application/json;charset=utf-8",
        "dataType": "JSON",


    }).done(function (data) {

        cargarDatos();
    }).always(() => {
        console.log(data.id);
        console.log(data);
    });

}


function obtenerPorCedula(cedula) {

    $.ajax({

        "url": url + "cedula?=" + cedula,
        "type": "GET",
        "data": {},
        "dataType": "JSON"
    }).done(function (data) {

        let html;

        if (data) {
            html = `<table class="table table-bordered table-striped table-dark ">
            <thead class="thead-dark">
                <tr>
                    <td>Nombre</td>
                    <td>Apellido</td>
                    <td>Cedula</td>
                    <td>Opciones</td>
                </tr>
            </thead>`;


            html +=
                `<tr>
            <td>${data.nombre}</td>
            <td>${data.apellido}</td>
            <td>${data.cedula}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#modalEditar" onclick="modalEditar(${data.id})">Editar</button>
                <button class="btn btn-danger delete" id="delete" onclick="eliminar(${data.id})">Eliminar</button>
            </td>
        </tr>`;

            html += `</table><br><button class="btn btn-default" onclick="atras()">Atras</button>`;
            $("#render").hide();

            $("#consulta").html(html);




        }
        console.log(data);
    });
}

function atras() {
    $("#render").show();
    $("#consulta").hide();
}