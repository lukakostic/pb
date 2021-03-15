let siteUrl = "https://lukakostic.github.io/pb/";
if (url().includes("file:///")) {
    window.location.hash = "";
    siteUrl = url();
}
let pb = null;
let board = "";
let currentVersion = 3.1;
console.log(currentVersion, " : ", 'Dialogs');
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
function set_board(id) {
    log("set_board('" + id + "')");
    board = id;
    boardHistory.add(id);
    window.location.hash = id;
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
    pageOpened();
    return true;
}
function set_brdAttr(id, attr, val) {
    pb.boards[id].attributes[attr] = val;
}
function set_brdAttrIfNull(id, attr, val) {
    if ((attr in pb.boards[id].attributes) == false) {
        set_brdAttr(id, attr, val);
        return true;
    }
    return false;
}
function brdAttr(id, attr) {
    return pb.boards[id].attributes[attr];
}
function brdAttrOrDef(id, attr, val) {
    if (attr in pb.boards[id].attributes)
        return brdAttr(id, attr);
    return val;
}
function delBrdAttr(id, attr) {
    delete pb.boards[id].attributes[attr];
}
