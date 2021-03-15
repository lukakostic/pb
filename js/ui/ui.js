let autoUI = -1;
function htmlLoaded() {
    if (autoUI == -1)
        autoUI = setInterval(autoUI_function, 100);
    EbyId('homeBtn').onclick = goHome;
    EbyId('upBtn').onclick = goUp;
    EbyId('saveBtn').onclick = () => { sync.saveAll(null, true); };
    EbyId('loadBtn').onclick = () => { sync.loadAll(); };
    EbyId('saveDownloadBtn').onclick = () => {
        function saveBlobFile(name, type, data) {
            if (data !== null && navigator.msSaveBlob)
                return navigator.msSaveBlob(new Blob([data], { type: type }), name);
            let a = $("<a style='display: none;'/>");
            let url = window.URL.createObjectURL(new Blob([data], { type: type }));
            a.attr("href", url);
            a.attr("download", name);
            $("body").append(a);
            a[0].click();
            window.URL.revokeObjectURL(url);
            a.remove();
        }
        let text = buildPBoard();
        let dateTag = (new Date()).toISOString().replace('T', ' ').substring(2, 16);
        let filename = "PBoard " + dateTag + ".txt";
        saveBlobFile(filename, "data:attachment/text", text);
    };
}
function pageOpened() {
    log("pageOpened()");
    extensions.invoke('pre_newPage');
    html.main.innerHTML = "";
    setMainView(generateView(board, html.main));
    mainView.render();
    extensions.invoke('newPage');
    extensions.execute();
}
function clearBoards(no, nope, nopp, never) { }
function clearLists(no, nope, nopp, never) { }
function drawBoardAlbum(no, nope, nopp, never) { }
function drawListAlbum(no, nope, nopp, never) { }
function loadBackground(brdEl, id) {
    brdEl.style.backgroundImage = "url('" + brdAttr(id, 'background') + "')";
    brdEl.style.repeatMode = "no-repeat";
    brdEl.style.backgroundSize = "cover";
}
function loadList() { }
function loadBoardBackgroundImage() {
    let brdEl = html.main;
    brdEl.style.backgroundImage = "url('" + brdAttr(board, 'background') + "')";
    brdEl.style.backgroundRepeat = "no-repeat";
    brdEl.style.backgroundSize = "cover";
}
function loadAllBoardsByDataId() { }
