var socket = io();

function setContent(s) {
    $("#content").html(s)
}

function get(route, info, action, dataType) {
    $.ajax({
        type: "GET",
        url: route + info,
        dataType: dataType,
        success: (msg) => {
            window.history.pushState("", "", route + info);
            action(msg);
        },
        error: (jgXHR, textStatus, errorThrown) => {
            console.log("Error: " + textStatus + " " + errorThrown);
        }
    });
}

function getPage(page) {
    get('/view/', page, setContent, "text");
}

function goTo(page) {
    location.href = page;
}

/*
window.onload = function () {
    getPage('home');
};*/