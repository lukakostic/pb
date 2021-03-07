let siteUrl = "https://lukakostic.github.io/pb/";
let pb = null;
let board = "";
let currentVersion = 3.1;
window.onhashchange = function () {
    set_board(boardFromUrl(url()));
};
function url() {
    return window.location.href;
}
function set_url(value) {
    boardHistory.add(value);
    window.location.href = value;
}
function set_board(value) {
    log("set_board('" + value + "')");
    board = value;
    boardHistory.add(value);
    window.location.hash = value;
    pageOpened();
}
function resetData() {
    logw("resetData()");
    pb = new PBoard("", currentVersion);
    pb.boards[""] = new Board(BoardType.List, "", [], { references: 99999999999, main: true }, "");
    set_board("");
}
function buildPBoard() {
    extensions.invoke('buildPBoard');
    let saveFile = {
        syncTime: sync.lastSyncTime,
        pb: pb
    };
    return JSON.stringify(saveFile);
}
function loadPBoard(content, checkTime = true) {
    log('content:');
    logw(content);
    extensions.invoke('loadPBoard');
    let saveFile = updateSaveFile(JSON.parse(content));
    if (checkTime && sync.lastSyncTime != null && sync.lastSyncTime >= saveFile.syncTime)
        return false;
    sync.flashLoadingIndicator();
    sync.lastSyncTime = saveFile.syncTime;
    pb = saveFile.pb;
    draw();
    return true;
}
