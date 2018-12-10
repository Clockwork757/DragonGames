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
            action(msg);
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
        window.location = page;
    }
}

function logout() {
    get('/logout')
    localStorage.removeItem("username");
    goTo('/')
}
