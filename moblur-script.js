let samples, delay, duration, opacity, width, tradeoff, forcehide, active, img;

function initConst () {
    return new Promise((res) => {
        chrome.storage.sync.get((pref) => {
            samples = pref.samples ?? 32;
            delay = pref.delay ?? 0.001;
            duration = pref.duration ?? 0.05;
            opacity = pref.opacity ?? 0.04;
            width = pref.width ?? "1.25vh";
            tradeoff = pref.tradeoff ?? true;
            forcehide = pref.forcehide ?? true;
            active = pref.active ?? false;
            img = pref.img ?? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD+SURBVDhPjZK/CsIwEIdPoSD0Aewg/qEFKxQnB3G0rvoOOvt2Orp18wGs4iQOFSfBFhWHmF9oYou17QdHLke/u4SGDMNiHCobVeK4kxnDWop4Ahu7UyyZXZOhBFBGSgmgSPoRQJ6UKYB/0l8BZEm5wvP1/pFyBXC73VNSoQAul6uSSgngdDoLqQIhCI7xfyeKoifpek3k/MmINUVyQhg+mK4bbLXeiD3eGEddGKEE+TGKjjMUNRwjzpUgXiuOUa93KAyDCvatdos8b0vNZkPkKWDJzsmw7QFqbLfbs35/hPQ7QXZOYlom+f6Ber0uaZoWVznSzApMmS+WPJU1Rh8S/kJkI0gYqwAAAABJRU5ErkJggg==";
            res();
        });
    });
}

function initContainer() {
    let con = $(document.createElement("div"));
    con.attr("id", "moblur-ext_cursors-container");
    $("body").append(con);
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
        $("#moblur-ext_cursors-container").append(cursor);
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
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    mouseMoved = true;
}

function initNoCursor() {
    if (tradeoff) {
        $(".moblur-ext_cursor").first().css("opacity", "1");
        if (forcehide) {
            $("*").addClass("moblur-ext_nocursor");
        }
        else {
            $("html").addClass("moblur-ext_nocursor");
        }
    }
}

async function init() {
    await initConst();
    if (active) {
        initContainer();
        initCursors();
        initNoCursor();
        $(window).on("mousemove", updateMousePos);
        window.requestAnimationFrame(updateCursors);
    }
}

init();