let drags = {
    dragOld: null, dragNew: null, dragItem: null, oldDragIndex: null, newDragIndex: null,
    dragStartTime: -999,
};
let autoUI = -1;
function htmlLoaded() {
    if (autoUI == -1)
        autoUI = setInterval(() => {
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
        }, 100);
    html.find();
    EbyId('homeBtn').onclick = goHome;
    EbyId('upBtn').onclick = goUp;
    EbyId('saveBtn').onclick = () => { sync.saveAll(null, true); };
    EbyId('loadBtn').onclick = () => { sync.loadAll(); };
    EbyId('saveDownloadBtn').onclick = () => {
        let text = buildPBoard();
        let date = new Date();
        let dateTag = date.toISOString().replace('T', ' ').substring(2, 16);
        let filename = "PBoard " + dateTag + ".txt";
        function saveBlobFile(name, type, data) {
            if (data !== null && navigator.msSaveBlob)
                return navigator.msSaveBlob(new Blob([data], { type: type }), name);
            var a = $("<a style='display: none;'/>");
            var url = window.URL.createObjectURL(new Blob([data], { type: type }));
            a.attr("href", url);
            a.attr("download", name);
            $("body").append(a);
            a[0].click();
            window.URL.revokeObjectURL(url);
            a.remove();
        }
        saveBlobFile(filename, "data:attachment/text", text);
    };
}
function pageOpened() {
    log("pageOpened()");
    extensions.invoke('pre_newPage');
    draw();
    extensions.invoke('newPage');
    extensions.execute();
}
function clearBoards(lst = null) {
    log('clearBoards(', lst, ')');
    let lists = [lst];
    if (lst == null)
        lists = qSelAll('.list:not([id])');
    logw('lists', lists);
    for (let j = 0; j < lists.length; j++) {
        let boards = qSelAll('.board:not([id])', lists[j]);
        for (let i = boards.length - 1; i > -1; i--)
            $(boards[i]).remove();
    }
}
function clearLists() {
    log('clearLists()');
    let lists = EbyClass('list');
    for (let j = lists.length - 1; j > -1; j--)
        if (lists[j].id == "")
            $(lists[j]).remove();
}
function draw() {
    log('draw()');
    if (pb.boards[board].type == BoardType.Board)
        drawBoardAlbum();
    else if (pb.boards[board].type == BoardType.List)
        drawListAlbum();
    loadBoardBackgroundImage();
    makeDraggable();
    setTimeout(() => { expandInputAll(); }, 200);
    setTimeout(() => { expandInputAll(); }, 1000);
}
function drawBoardAlbum() {
    log('drawBoardAlbum()');
    html.listAlbum.classList.add('d-none');
    html.boardAlbum.classList.remove('d-none');
    clearLists();
    html.boardTitle.value = pb.boards[board].name;
    html.boardDescription.value = brdAttr(board, 'description');
    for (let l = 0; l < pb.boards[board].content.length; l++) {
        let listEl = html.listTemplate.cloneNode(true);
        html.boardAlbum.appendChild(listEl);
        loadList(listEl, pb.boards[board].content[l]);
    }
    $(html.boardTitle).select();
    fixAlbumUI();
    fixNewListUI();
}
function drawListAlbum() {
    log('drawListAlbum()');
    html.boardAlbum.classList.add('d-none');
    html.listAlbum.classList.remove('d-none');
    clearBoards(html.mainList);
    html.boardTitle.value = pb.boards[board].name;
    html.boardDescription.value = brdAttr(board, 'description');
    loadList(html.mainList, board);
    fixListUI(html.mainList);
}
function loadTextBoard(textBoardEl, brd) {
    log('loadTextBoard(', textBoardEl, "'" + JSON.stringify(brd) + "'", ')');
    if (typeof brd === 'string' || brd instanceof String)
        brd = pb.boards[brd];
    set_dataId(textBoardEl, brd.id);
    $(EbyClass('textBtn', textBoardEl)[0]).contents()[1].nodeValue = brd.name;
    if (brd.content.length > 0)
        EbyClass('descriptionIcon', textBoardEl)[0].classList.remove('d-none');
    else
        EbyClass('descriptionIcon', textBoardEl)[0].classList.add('d-none');
    loadBackground(textBoardEl, brd.id);
}
function loadBackground(brdEl, id) {
    brdEl.style.backgroundImage = "url('" + brdAttr(id, 'background') + "')";
    brdEl.style.repeatMode = "no-repeat";
    brdEl.style.backgroundSize = "cover";
}
function loadBoardBoard(boardBoardEl, brd) {
    log('loadBoardBoard(', boardBoardEl, "'" + JSON.stringify(brd) + "'", ')');
    if (typeof brd === 'string' || brd instanceof String)
        brd = pb.boards[brd];
    set_dataId(boardBoardEl, brd.id);
    $(EbyClass('textBtn', boardBoardEl)[0]).contents()[0].nodeValue = brd.name;
    loadBackground(boardBoardEl, brd.id);
}
function loadList(listEl, brd) {
    log('loadList(', listEl, "'" + JSON.stringify(brd) + "'", ')');
    if (typeof brd === 'string' || brd instanceof String)
        brd = pb.boards[brd];
    let titleText = (EbyClass('title-text', listEl)[0]);
    titleText.addEventListener('click', listTitleClicked, true);
    titleText.onblur = (event) => { listTitleBlur(event); };
    $(titleText).html(brd.name);
    set_dataId(listEl, brd.id);
    for (let i = 0; i < brd.content.length; i++) {
        let brd2 = pb.boards[brd.content[i]];
        if (brd2.type == BoardType.Text) {
            let el = html.textBrdTemplate.cloneNode(true);
            listEl.appendChild(el);
            loadTextBoard(el, brd2);
        }
        else if (brd2.type == BoardType.Board) {
            let el = html.boardBrdTemplate.cloneNode(true);
            listEl.appendChild(el);
            loadBoardBoard(el, brd2);
        }
    }
    fixListUI(listEl);
}
function loadBoardBackgroundImage() {
    let brdEl = EbyId('main');
    brdEl.style.backgroundImage = "url('" + brdAttr(board, 'background') + "')";
    brdEl.style.backgroundRepeat = "no-repeat";
    brdEl.style.backgroundSize = "cover";
}
function loadAllBoardsByDataId(brdId) {
    let boardEls = EbyClass('board');
    for (let i = 0; i < boardEls.length; i++) {
        if (dataId(boardEls[i]) == brdId) {
            if (pb.boards[brdId].type == BoardType.Text)
                loadTextBoard(boardEls[i], brdId);
            else if (pb.boards[brdId].type == BoardType.Board)
                loadBoardBoard(boardEls[i], brdId);
        }
    }
}
