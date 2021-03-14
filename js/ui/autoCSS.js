let AUTOUI_DISABLE = true;
function autoUI_function() {
    if (AUTOUI_DISABLE)
        return;
    document.body.style.setProperty("width", "100vw");
    if (window.innerWidth > 1250)
        html.listAlbum.style.width = '1250px';
    else
        html.listAlbum.style.width = '100%';
    if (pb != null) {
        let brdName = pb.boards[board].name;
        if (brdName == "")
            brdName = "PBoard";
        else
            brdName += " - PBoard";
        document.title = brdName;
    }
}
function expandInputAll() {
    let expandoInputs = EbyClass('expandInput');
    for (let i = 0; i < expandoInputs.length; i++)
        expandInput(expandoInputs[i]);
}
function expandInput(el) {
    el.style.height = '1px';
    el.style.height = (1 + el.scrollHeight) + 'px';
    el.parentNode.style.height = el.style.height;
}
function fixNewListUI() { }
function fixAlbumUI() { }
function fixListUI() { }
