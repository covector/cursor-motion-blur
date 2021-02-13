const samples = 30;
const delay = 1/750;
const opacity = "8%";
const width = "32px";

function initContainer() {
    let con = $(document.createElement("div"));
    con.attr("id", "cursors-container");
    $("body").append(con);
}

function initCursors() {
    let cursorURL = chrome.runtime.getURL("cursor.cur");
    for (let i = 0; i < samples; i++) {
        let cursor = $(document.createElement("img"));
        cursor.attr({
            "src": cursorURL,
        });
        cursor.css({
            opacity, 
            width
        });
        cursor.addClass("cursor");
        $("#cursors-container").append(cursor);
    }
}

function updateCursors(e) {
    $(".cursor").each(function(ind) {
        gsap.to($(this), {duration: 0.05, delay: ind * delay, x: e.clientX, y: e.clientY});
    });
}

function tradeOff(bool) {
    if (bool) {
        $(".cursor").first().css("opacity", "1");
        $("html").css("cursor", "none");
    }
    else {
        $(".cursor").first().css("opacity", opacity);
        $("html").css("cursor", "auto");
    }
}

function init() {
    initContainer();
    initCursors();
    tradeOff(true);
    $(window).on("mousemove", updateCursors);
}

window.onload = init;