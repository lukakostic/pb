function autoUI_function() {
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
function fixNewListUI() {
    let newlist = EbyId('newlist');
    newlist.parentNode.appendChild(newlist);
}
function fixAlbumUI() {
    let columnWidth = 310;
    html.boardAlbum.style.setProperty('width', ((columnWidth * html.boardAlbum.childElementCount) + 10 + 8).toString() + 'px');
}
function fixListUI(listEl = null) {
    if (listEl != null) {
        let newPanel = EbyClass('newPanel', listEl)[0];
        newPanel.parentNode.appendChild(newPanel);
    }
    else {
        let album = this.fixAlbumUI();
        let lists = EbyClass('list', album);
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].id == "")
                this.fixListUI(lists[i]);
        }
    }
}
