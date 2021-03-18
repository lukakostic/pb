let AUTOUI_DISABLE = true;
function autoUI_function() {
    if (AUTOUI_DISABLE)
        return;
    if (pb != null) {
        let brdName = pb.boards[board].name;
        if (brdName == "")
            brdName = "PBoard";
        else
            brdName += " - PBoard";
        document.title = brdName;
    }
}
function expandInputAll(A, B, C, D, E, F, G) { }
function expandInput(A, B, C, D, E, F, G) { }
function textareaAutoSize(el) {
    el.style.height = '1px';
    el.style.height = (1 + el.scrollHeight) + 'px';
}
function fixNewListUI() { }
function fixAlbumUI() { }
function fixListUI() { }
