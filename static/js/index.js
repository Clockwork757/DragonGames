var socket = io();

function setContent(s) {
    $("#content").html(s)
}

function setError(s) {
    $("#error").html(s)
}

function get(route, action = console.log, dataType = 'text') {
    $.ajax({
        type: "GET",
        url: route,
        dataType: dataType,
        success: (msg) => {
            window.history.pushState("", "", route);
            action(msg)
        },
        error: (jgXHR, textStatus, errorThrown) => {
            console.log("Error: " + textStatus + " " + errorThrown);
        }
    });
}

function post(route, data, action = console.log, dataType = 'text') {
    $.ajax({
        type: "POST",
        url: route,
        dataType: dataType,
        data: data,
        success: (msg, x, y) => {
            action(JSON.parse(msg));
        },
        error: (jgXHR, textStatus, errorThrown) => {
            console.log("Error: " + textStatus + " " + errorThrown);
        }
    });
}

function getPage(page) {
    get('/view/' + page, setContent);
}

function goTo(page) {
    if (page) {
        console.log("going to: " + page)
        location.href = page;
    }
}

function logout() {
    get('/logout', )
}
