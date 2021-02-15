let samples, delay, duration, opacity, width, tradeoff, forcehide, img;

function setConst () {
    samples = parseInt($("#samples").val());
    delay = parseFloat($("#delay").val());
    duration = parseFloat($("#duration").val());
    opacity = parseFloat($("#opacity").val());
    width = $("#width").val();
    tradeoff = $("#tradeoff").prop("checked");
    forcehide = $("#forcehide").prop("checked");
    img = $("#preview").attr("src");
}

function initCursors() {
    for (let i = 0; i < samples; i++) {
        let cursor = $(document.createElement("img"));
        cursor.attr({
            "src": img,
        });
        cursor.css({
            opacity, 
            width
        });
        cursor.addClass("moblur-ext_cursor");
        $("#testing").append(cursor);
    }
}

let mouseMoved = false;
function updateCursors() {
    if (mouseMoved) {
        $(".moblur-ext_cursor").each(function(ind) {
            gsap.to($(this), {duration, delay: ind * delay, x: mousePos.x, y: mousePos.y});
        });
    }
    mouseMoved = false;
    window.requestAnimationFrame(updateCursors);
}

let mousePos = {x: 0, y: 0}
function updateMousePos(e) {
    let offset = $("#testing").offset();
    mousePos.x = e.pageX - offset.left;
    mousePos.y = e.pageY - offset.top;
    mouseMoved = true;
}

function initNoCursor() {
    if (tradeoff) {
        $(".moblur-ext_cursor").first().css("opacity", "1");
        $("#testing").addClass("moblur-ext_nocursor");
    }
    else {
        $(".moblur-ext_cursor").first().css("opacity", opacity);
        $("#testing").removeClass("moblur-ext_nocursor");
    }
    if (tradeoff && forcehide) {
        $("#invert").addClass("moblur-ext_nocursor");
    }
    else {
        $("#invert").removeClass("moblur-ext_nocursor");
    }
}

function resetArea() {
    $(".moblur-ext_cursor").remove();
}

function updateArea() {
    resetArea();
    setConst();
    initCursors();
    initNoCursor();
    $("#testing").off("mousemove").on("mousemove", updateMousePos);
    window.requestAnimationFrame(updateCursors);
}