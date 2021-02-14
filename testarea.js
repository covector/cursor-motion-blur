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

function updateCursors(e) {
    let offset = $("#testing").offset();
    $(".moblur-ext_cursor").each(function(ind) {
        gsap.to($(this), {duration, delay: ind * delay, x: e.pageX - offset.left, y: e.pageY - offset.top});
    });
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
    $("#testing").off("mousemove").on("mousemove", updateCursors);
}