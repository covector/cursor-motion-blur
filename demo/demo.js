function initValuesLocal() {
    for (let i = 0; i < inputOptions.length; i++) {
        let id = inputOptions[i];
        initInput(id, defaultVal[id] );
    }
    for (let i = 0; i < checkOptions.length; i++) {
        let id = checkOptions[i];
        initCheck(id, defaultVal[id]);
    }
    initImg(defaultVal["img"]);

}

function initLocal() {
    initEventListener();
    initValuesLocal();
    updateArea();
    setBG();
}

window.onload = initLocal;