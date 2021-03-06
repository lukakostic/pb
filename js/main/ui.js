let ui = {
    drags: {
        dragOld: null, dragNew: null, dragItem: null, oldDragIndex: null, newDragIndex: null,
        dragStartTime: -999,
    },
    autoUI: null,
    htmlLoaded: function () {
        this.autoUI = setInterval(() => {
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
    },
    pageOpened: function () {
        log("pageOpened()");
        extensions.invoke('pre_newPage');
        this.draw();
        extensions.invoke('newPage');
        extensions.execute();
    },
    clearBoards: function (lst = null) {
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
    },
    clearLists: function () {
        log('clearLists()');
        let lists = EbyClass('list');
        for (let j = lists.length - 1; j > -1; j--)
            if (lists[j].id == "")
                $(lists[j]).remove();
    },
    draw: function () {
        log('draw()');
        if (pb.boards[board].type == BoardType.Board)
            this.drawBoardAlbum();
        else if (pb.boards[board].type == BoardType.List)
            this.drawListAlbum();
        this.loadBoardBackgroundImage();
        this.makeDraggable();
        setTimeout(() => { ui.expandInputAll(); }, 200);
        setTimeout(() => { ui.expandInputAll(); }, 1000);
    },
    drawBoardAlbum: function () {
        log('drawBoardAlbum()');
        html.listAlbum.classList.add('d-none');
        html.boardAlbum.classList.remove('d-none');
        this.clearLists();
        html.boardTitle.value = pb.boards[board].name;
        html.boardDescription.value = brdAttr(board, 'description');
        for (let l = 0; l < pb.boards[board].content.length; l++) {
            let listEl = html.listTemplate.cloneNode(true);
            html.boardAlbum.appendChild(listEl);
            this.loadList(listEl, pb.boards[board].content[l]);
        }
        $(html.boardTitle).select();
        this.fixAlbumUI();
        this.fixNewListUI();
    },
    drawListAlbum: function () {
        log('drawListAlbum()');
        html.boardAlbum.classList.add('d-none');
        html.listAlbum.classList.remove('d-none');
        this.clearBoards(html.mainList);
        html.boardTitle.value = pb.boards[board].name;
        html.boardDescription.value = brdAttr(board, 'description');
        this.loadList(html.mainList, board);
        this.fixListUI(html.mainList);
    },
    loadTextBoard: function (textBoardEl, brd) {
        log('loadTextBoard(', textBoardEl, "'" + JSON.stringify(brd) + "'", ')');
        if (typeof brd === 'string' || brd instanceof String)
            brd = pb.boards[brd];
        set_dataId(textBoardEl, brd.id);
        $(EbyClass('textBtn', textBoardEl)[0]).contents()[1].nodeValue = brd.name;
        if (brd.content.length > 0)
            EbyClass('descriptionIcon', textBoardEl)[0].classList.remove('d-none');
        else
            EbyClass('descriptionIcon', textBoardEl)[0].classList.add('d-none');
        this.loadBackground(textBoardEl, brd.id);
    },
    loadBackground: function (brdEl, id) {
        brdEl.style.backgroundImage = "url('" + brdAttr(id, 'background') + "')";
        brdEl.style.repeatMode = "no-repeat";
        brdEl.style.backgroundSize = "cover";
    },
    loadBoardBoard: function (boardBoardEl, brd) {
        log('loadBoardBoard(', boardBoardEl, "'" + JSON.stringify(brd) + "'", ')');
        if (typeof brd === 'string' || brd instanceof String)
            brd = pb.boards[brd];
        set_dataId(boardBoardEl, brd.id);
        $(EbyClass('textBtn', boardBoardEl)[0]).contents()[0].nodeValue = brd.name;
        this.loadBackground(boardBoardEl, brd.id);
    },
    loadList: function (listEl, brd) {
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
                this.loadTextBoard(el, brd2);
            }
            else if (brd2.type == BoardType.Board) {
                let el = html.boardBrdTemplate.cloneNode(true);
                listEl.appendChild(el);
                this.loadBoardBoard(el, brd2);
            }
        }
        this.fixListUI(listEl);
    },
    loadBoardBackgroundImage: function () {
        let brdEl = EbyId('main');
        brdEl.style.backgroundImage = "url('" + brdAttr(board, 'background') + "')";
        brdEl.style.backgroundRepeat = "no-repeat";
        brdEl.style.backgroundSize = "cover";
    },
    loadAllBoardsByDataId: function (brdId) {
        let boardEls = EbyClass('board');
        for (let i = 0; i < boardEls.length; i++) {
            if (dataId(boardEls[i]) == brdId) {
                if (pb.boards[brdId].type == BoardType.Text)
                    this.loadTextBoard(boardEls[i], brdId);
                else if (pb.boards[brdId].type == BoardType.Board)
                    this.loadBoardBoard(boardEls[i], brdId);
            }
        }
    },
};
