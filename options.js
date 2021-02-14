const defaultVal = {
    "width": "1.25vh",
    "opacity": 0.04,
    "samples": 32,
    "delay": 0.001,
    "duration": 0.05,
    "tradeoff": true,
    "forcehide": true,
    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD+SURBVDhPjZK/CsIwEIdPoSD0Aewg/qEFKxQnB3G0rvoOOvt2Orp18wGs4iQOFSfBFhWHmF9oYou17QdHLke/u4SGDMNiHCobVeK4kxnDWop4Ahu7UyyZXZOhBFBGSgmgSPoRQJ6UKYB/0l8BZEm5wvP1/pFyBXC73VNSoQAul6uSSgngdDoLqQIhCI7xfyeKoifpek3k/MmINUVyQhg+mK4bbLXeiD3eGEddGKEE+TGKjjMUNRwjzpUgXiuOUa93KAyDCvatdos8b0vNZkPkKWDJzsmw7QFqbLfbs35/hPQ7QXZOYlom+f6Ber0uaZoWVznSzApMmS+WPJU1Rh8S/kJkI0gYqwAAAABJRU5ErkJggg=="
}

const inputOptions = [
    "width", 
    "opacity",
    "samples", 
    "delay", 
    "duration"
]

const checkOptions = [
    "tradeoff", 
    "forcehide"
]

const validationRule = {
    "opacity": ["float", "min_0", "max_1"],
    "samples": ["int", "min_0"],
    "delay": ["float", "min_0"],
    "duration": ["float", "min_0"],
    "img": ["img"]
}

const idName = {
    "width": "Cursor width",
    "opacity": "Opacity",
    "samples": "Samples",
    "delay": "Delay",
    "duration": "Duration",
    "tradeoff": "Hide real cursor",
    "forcehide": "Force hide real cursor",
    "img": "Cursor image"
}

function initInput(id, value) {
    $(`#${id}`).val(value);
}

function initCheck(id, value) {
    $(`#${id}`).prop("checked", value);
}

function initImg(value) {
    $("#preview").attr("src", value);
}

function initValues() {
    chrome.storage.sync.get((pref) => {
        for (let i = 0; i < inputOptions.length; i++) {
            let id = inputOptions[i];
            initInput(id, pref[id]);
        }
        for (let i = 0; i < checkOptions.length; i++) {
            let id = checkOptions[i];
            initCheck(id, pref[id]);
        }
        initImg(pref["img"]);
    });
}

function resetInput(id) {
    $(`#${id}`).val(defaultVal[id]);
}

function resetCheckBox(id) {
    $(`#${id}`).prop("checked", defaultVal[id]);
}

const reader = new FileReader();
reader.addEventListener("load", function () {
    $("#preview").attr("src", reader.result);
}, false);
function setImg(id) {
    let file = document.getElementById(id).files[0];
    if (file) {
        reader.readAsDataURL(file);
    }
}
function resetImg(id) {
    document.getElementById(id).value = null;
    $("#preview").attr("src", defaultVal[id]);
}

function validate(id, data) {
    let modData = data;
    let rules = validationRule[id];
    if (!rules) { return data; }
    for (let i = 0; i < rules.length; i++) {
        let [ruleName, ruleProp] = rules[i].split("_", 2);
        switch(ruleName) {
            case "img":
                if (!data.startsWith("data:image/")) {
                    alert(`${idName[id]} must be an image`);
                    return null;
                }
                break;
            case "float":
                modData = parseFloat(data);
                if (isNaN(modData)) {
                    alert(`${idName[id]} must be a float`);
                    return null;
                }
                break;
            case "int":
                modData = parseInt(data);
                if (isNaN(modData)) {
                    alert(`${idName[id]} must be an integer`);
                    return null;
                }
                break;
            case "max":
                if (modData > parseFloat(ruleProp)){
                    alert(`${idName[id]} is too large`);
                    return null;
                }
                break;
            case "min":
                if (modData < parseFloat(ruleProp)){
                    alert(`${idName[id]} is too small`);
                    return null;
                }
                break;
        }
    }
    return modData;
}

function save() {
    let pref = {};
    for (let i = 0; i < inputOptions.length; i++) {
        let id = inputOptions[i];
        let data = validate(id, $(`#${id}`).val());
        if (data == null) {
            return;
        }
        else {
            pref[id] = data;
        }
    }
    for (let i = 0; i < checkOptions.length; i++) {
        let id = checkOptions[i];
        let data = $(`#${id}`).prop("checked");
        pref[id] = data;
    }
    let data = validate("img", $("img").attr("src"));
    if (data == null) {
        return;
    }
    else {
        pref["img"] = data;
    }
    
    chrome.storage.sync.set(pref, ()=> {
        let error = chrome.runtime.lastError?.message;
        alert(error ? error : "Saved Successfully");
    });
}

function initEventListener() {
    for (let i = 0; i < inputOptions.length; i++) {
        let id = inputOptions[i];
        $(`#${id}_button`).on("click", ()=>resetInput(id))
    }
    for (let i = 0; i < checkOptions.length; i++) {
        let id = checkOptions[i];
        $(`#${id}_button`).on("click", ()=>resetCheckBox(id))
    }
    $("#img").on("change", ()=>setImg("img"));
    $("#img_button").on("click", ()=>resetImg("img"));
    $("#save_button").on("click", ()=>save());
}

function init() {
    initEventListener();
    initValues();
}

window.onload = init;