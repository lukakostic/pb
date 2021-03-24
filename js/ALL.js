function htmlLoaded() {
    _Header_.init();
    _DialogManager_.init();
    _Navigation_.init();
    storage.OnStorageLoad(StorageType.None);
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
    pb.boards[""] = new Board(BoardType.List, "", [], {}, "");
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
function openBoard(id, view) {
    if (pb.boards[id].type == BoardType.Text) {
        openTextBoard(id, view);
        return;
    }
    set_board(id);
}
function generateView(_id, _parent, _index) {
    let type = pb.boards[_id].type;
    if (_parent == null) {
        if (type == BoardType.List)
            return new ListView(_id, _parent, _index);
        if (type == BoardType.Text)
            throw "Trying to open text fullscreen";
        return new AlbumView(_id, _parent, _index);
    }
    if (viewMode == ViewMode.Board) {
        if (type == BoardType.List && _parent == mainView)
            return new ListView(_id, _parent, _index);
        return new TileView(_id, _parent, _index);
    }
    else if (viewMode == ViewMode.List) {
        return new TileView(_id, _parent, _index);
    }
    return null;
}
function openOptionsDialog(id, view) {
    dialogManager.openDialog('optionsDialog', id, view);
}
function openTextBoard(id, view) {
    dialogManager.openDialog('textEditor', id, view);
}
function moveBoards(fromId, fromIndex, toId, toIndex, length = 1) {
    let boards = pb.boards[fromId].content.splice(fromIndex, length);
    pb.boards[toId].content.splice(toIndex, 0, ...boards);
    boardsUpdated([fromId, toId], true);
}
function boardsUpdated(boards, structural, save = 1) {
    if (structural)
        pageOpened();
    else {
        for (let i = 0; i < boards.length; i++)
            mainView.renderById(boards[i]);
    }
    if (save == 1)
        sync.saveAll();
    else if (save == 2)
        sync.save.dirty = true;
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

const boardHistory = {
    history: [],
    last() {
        return this.history.slice(-1)[0];
    },
    add(boardIdOrUrl) {
        let bId = boardFromUrl(boardIdOrUrl);
        if (bId != this.last())
            this.history.push(bId);
    },
    prev() {
        this.history.pop();
        if (this.history.length <= 0)
            return "";
        return this.history.pop();
    }
};

const css = {
    styleElement: EbyId('style'),
    css: function (cssRule, attribute, value) {
        if (cssRule === undefined)
            return this._css;
        cssRule = cssRule.replace(' ', '');
        if (attribute === undefined)
            return this._css[cssRule];
        if (value === undefined) {
            this.built_css._dirty_ = true;
            this.built_css[cssRule]._dirty_ = true;
            this._css[cssRule] = attribute;
        }
        else {
            attribute = attribute.replace(' ', '');
            value = value.replace(' ', '');
            this.built_css._dirty_ = true;
            this.built_css[cssRule]._dirty_ = true;
            this._css[cssRule][attribute] = value;
        }
    },
};

const dragging = {
    dragOld: null, dragNew: null, dragItem: null,
    oldDragIndex: -1, newDragIndex: -1,
    dragStartTime: -999,
};
function makeBoardsDraggable() {
    let draggableLists = $('.draggableList');
    if (draggableLists.length !== 0)
        (draggableLists).sortable({
            items: '.draggable',
            start: (event, drag) => {
                log('drag start');
                dragging.dragItem = drag.item;
                dragging.oldDragIndex = elementIndex(dragging.dragItem[0]);
                dragging.dragNew = dragging.dragOld = drag.item.parent();
                dragging.dragStartTime = (new Date()).getTime();
            },
            stop: (event, drag) => {
                log('drag stop');
                setTimeout(() => {
                    dragging.newDragIndex = elementIndex(dragging.dragItem[0]);
                    moveBoards(dataId(dragging.dragOld[0]), dragging.oldDragIndex - 1, dataId(dragging.dragNew[0]), dragging.newDragIndex - 1);
                    let clickItem = null;
                    if (((new Date()).getTime() - dragging.dragStartTime) < 200 && dragging.newDragIndex == dragging.oldDragIndex) {
                        clickItem = dragging.dragItem.find('div');
                    }
                    else
                        sync.saveAll();
                    dragging.dragItem = null;
                    if (clickItem != null)
                        clickItem.click();
                }, 50);
            },
            change: (event, drag) => {
                log('drag change');
                if (drag.sender)
                    dragging.dragNew = drag.placeholder.parent();
            },
            connectWith: ".draggableList"
        }).disableSelection();
}
function makeListsDraggable() {
    let draggableAlbums = $('.draggableAlbum');
    if (draggableAlbums.length !== 0)
        (draggableAlbums).sortable({
            items: '.draggableList',
            start: (event, drag) => {
                log('drag list start');
                dragging.dragItem = drag.item;
                dragging.oldDragIndex = elementIndex(dragging.dragItem[0]);
                dragging.dragStartTime = (new Date()).getTime();
            },
            stop: (event, drag) => {
                log('drag list stop');
                setTimeout(() => {
                    dragging.newDragIndex = elementIndex(dragging.dragItem[0]);
                    moveBoards(board, dragging.oldDragIndex, board, dragging.newDragIndex);
                    dragging.dragItem = null;
                    sync.saveAll();
                }, 50);
            },
            change: (event, ui) => {
                log('drag list change');
            }
        }).disableSelection();
}

let EXTENSIONS_DISABLED = true;
const extensions = {
    listeners: {
        newPage: [],
        pre_newPage: [],
        saveAll: [],
        pre_saveAll: [],
        loadAll: [],
        pre_loadAll: [],
        draw: [],
        buildPBoard: [],
        loadPBoard: [],
        loadCached: [],
    },
    invoke(listener = "") {
        if (EXTENSIONS_DISABLED)
            return;
        log('Invoking listener:', listener);
        for (let i = 0; i < this.listeners[listener].length; i++)
            if (this.listeners[listener])
                this.listeners[listener][i]();
        this.listeners[listener] = [];
    },
    execute() {
        if (EXTENSIONS_DISABLED)
            return;
        log('extensions.execute()');
        let exts = brdAttrOrDef(board, 'extensions', []);
        for (let i = 0; i < exts.length; i++) {
            if (exts[i].on) {
                log('executing extension ' + exts[i].id);
                eval(pb.extensions[exts[i].id].code);
            }
        }
    }
};

let header = null;
class _Header_ {
    constructor() {
        this.header = EbyId('header');
        (this.headerTitle = EbyId('headerTitle'))
            .oninput = this.headerTitle_oninput.bind(this);
        (this.headerDescription = EbyId('headerDescription'))
            .oninput = this.headerDescription_oninput.bind(this);
        this.headerFold = EbyId('headerFold');
        (this.headerExpand = EbyId('headerExpand'))
            .onclick = this.headerExpand_onclick.bind(this);
        (this.homeBtn = EbyId('homeBtn')).onclick = this.goHome.bind(this);
        (this.upBtn = EbyId('upBtn')).onclick = this.goUp.bind(this);
        (this.saveBtn = EbyId('saveBtn')).onclick = () => { sync.saveAll(); };
        (this.loadBtn = EbyId('loadBtn')).onclick = () => { sync.loadAll(); };
        (this.saveDownloadBtn = EbyId('saveDownloadBtn')).onclick = () => {
            function saveBlobFile(name, type, data) {
                if (data !== null && navigator.msSaveBlob)
                    return navigator.msSaveBlob(new Blob([data], { type: type }), name);
                let a = document.createElement('a');
                a.style.display = "none";
                let url = window.URL.createObjectURL(new Blob([data], { type: type }));
                a.setAttribute("href", url);
                a.setAttribute("download", name);
                document.body.append(a);
                a[0].click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
            let text = buildPBoard();
            let dateTag = (new Date()).toISOString().replace('T', ' ').substring(2, 16);
            let filename = "PBoard " + dateTag + ".txt";
            saveBlobFile(filename, "data:attachment/text", text);
        };
        (this.loadDownloadBtn = EbyId('loadDownloadBtn')).onclick = () => {
            let contents = prompt("Paste JSON pboard data:");
            loadPBoard(contents, false);
        };
    }
    static init() { if (header == null)
        header = new _Header_(); }
    goLogin() {
        set_url(siteUrl + "login/");
    }
    goHome() {
        set_board("");
    }
    goUp() {
        set_board(boardHistory.prev());
    }
    loadHeaderData() {
        if (mainView == null) {
            this.headerTitleSetText(null);
            this.headerDescriptionSetText(null);
            return;
        }
        this.headerTitleSetText(pb.boards[mainView.id].name);
        if (pb.boards[mainView.id].type == BoardType.Board)
            this.headerDescriptionSetText(pb.boards[mainView.id].attributes['description']);
        else
            this.headerDescriptionSetText(null);
    }
    headerTitleSetText(txt) {
        this.headerTitle.disabled = (typeof txt === 'string') ? false : true;
        this.headerTitle.value = (typeof txt === 'string') ? txt : "";
    }
    headerDescriptionSetText(txt) {
        this.headerDescription.disabled = (typeof txt === 'string') ? false : true;
        this.headerDescription.value = (typeof txt === 'string') ? txt : "";
        this.headerDescAutoHeight(this.headerDescription);
    }
    headerTitle_oninput() {
        if (mainView == null)
            return;
        pb.boards[mainView.id].name = this.headerTitle.value;
        boardsUpdated([mainView.id], false, 2);
    }
    headerDescription_oninput() {
        this.headerDescriptionSetText(this.headerDescription.value);
        if (mainView == null)
            return;
        if (pb.boards[mainView.id].type == BoardType.Board) {
            pb.boards[mainView.id].attributes['description'] = this.headerDescription.value;
            boardsUpdated([mainView.id], false, 2);
        }
    }
    headerExpand_onclick() {
        this.headerFold.classList.toggle('hidden');
    }
    headerDescAutoHeight(textarea) {
        textarea.style.height = '1px';
        let height = (5 + textarea.scrollHeight);
        textarea.style.removeProperty('height');
        let maxHeight = window.innerHeight * 0.8 - 40;
        if (height > maxHeight)
            height = maxHeight;
        textarea.parentNode.style.minHeight = height + 'px';
    }
}

let navigation = null;
class _Navigation_ {
    constructor() {
        this.selectedView = null;
        this.selectedViewId = null;
        document.addEventListener('focus', this.onfocus.bind(this), true);
        document.body.addEventListener('keydown', this.onkeydown.bind(this), true);
    }
    static init() { if (navigation == null)
        navigation = new _Navigation_(); }
    onkeydown(event) {
        let ctrl = event.ctrlKey;
        let shift = event.shiftKey;
        let inInput = false;
        let inDialog = false;
        let esc = false;
        if (event.keyCode === 27 || event.key === "Escape" || event.key === "Esc")
            esc = true;
        switch (event.target.tagName) {
            case 'TEXTAREA':
            case 'INPUT':
                inInput = true;
        }
        if (dialogManager.dialogBack.classList.contains('hidden') == false)
            inDialog = true;
        let jumpList = function (indx) {
            let dots = mainView.htmlEl.querySelectorAll('[data-name="list-header"]>.dot');
            this.focus(dots[indx]);
        }.bind(this);
        if (esc) {
            if (inDialog)
                dialogManager.closeDialog(!shift, true);
            else {
                if (shift)
                    header.upBtn.click();
                else
                    header.homeBtn.click();
            }
        }
        if (!inInput && !inDialog) {
            switch (event.key) {
                case '`':
                    if (ctrl)
                        navigation.focus(header.headerExpand);
                    break;
                case '~':
                    event.preventDefault();
                    if (shift)
                        if (pb.boards[mainView.id].type == BoardType.List)
                            navigation.focus(mainView.htmlEl.getElementsByClassName('dot')[1]);
                        else
                            navigation.focus(mainView.htmlEl.getElementsByClassName('dot')[0]);
                    break;
                case 'q':
                case 'Q':
                    if (document.activeElement.classList.contains('dot')) {
                        event.preventDefault();
                        document.activeElement.dispatchEvent(new CustomEvent('openEvent'));
                    }
                    else {
                        event.preventDefault();
                        document.activeElement.click();
                    }
                    break;
                case 'a':
                case 'A':
                    if (shift) {
                        event.preventDefault();
                        if (pb.boards[mainView.id].type == BoardType.List)
                            this.focusDefault();
                        else {
                            jumpList(0);
                        }
                    }
                    break;
                case 'd':
                case 'D':
                    if (shift) {
                        event.preventDefault();
                        if (pb.boards[mainView.id].type == BoardType.List)
                            this.focusDefault();
                        else {
                            jumpList(0);
                        }
                    }
                    break;
            }
        }
    }
    onfocus() {
        let element = document.activeElement;
        switch (element) {
            case document.body:
            case document.documentElement:
            case html.tabStart:
            case html.tabEnd:
                this.focusDefault();
                return;
        }
        let dataTab = element.getAttribute('data-tab');
        if (dataTab !== null) {
            this.focus(EbyName(dataTab, element.parentNode));
            return;
        }
        this.highlightFocus();
    }
    focusDefault() {
        this.focus(header.headerExpand);
    }
    highlightFocus(element = null) {
        if (element === null)
            element = document.activeElement;
        this.moveHighlight('highlighted-input', element);
    }
    focus(element) {
        if (element == null)
            return this.focusDefault();
        element.focus();
        this.highlightFocus(element);
    }
    focusView(view) {
        if (view.discarded == false && view.parent != null)
            this.focus(view.htmlEl.getElementsByClassName('dot')[0]);
        else
            this.focusDefault();
    }
    moveHighlight(id, target) {
        let og = document.querySelector('[data-highlightId="' + id + '"]');
        if (og)
            og.removeAttribute('data-highlightId');
        if (target)
            target.setAttribute('data-highlightId', id);
    }
}

function newText(parentId, name = null) {
    if (name == null)
        name = "";
    let brd = new Board(BoardType.Text, name, "");
    pb.boards[brd.id] = brd;
    pb.boards[parentId].content.push(brd.id);
    boardsUpdated([parentId, brd.id], true);
    return brd.id;
}
function newBoard(parentId, name = null) {
    if (name == null)
        name = "Board";
    let brd = new Board(BoardType.Board, name, [], { description: '' });
    pb.boards[brd.id] = brd;
    pb.boards[parentId].content.push(brd.id);
    boardsUpdated([parentId, brd.id], true);
    return brd.id;
}
function newList(parentId, name = null) {
    if (name == null)
        name = "List";
    let brd = new Board(BoardType.List, name, []);
    pb.boards[brd.id] = brd;
    pb.boards[parentId].content.push(brd.id);
    boardsUpdated([parentId, brd.id], true);
    return brd.id;
}
function newReference(parentId, id = null) {
    if (id == null) {
        id = window.prompt("Write/Paste id of board to reference:");
        if (id == null)
            return null;
        if (pb.boards[id] == null) {
            alert("ID doesn't exist :(");
            return null;
        }
    }
    pb.boards[parentId].content.push(id);
    boardsUpdated([parentId, id], true);
    return id;
}

let SAVING_DISASBLED = true;
let SAVE_FILENAME = 'pboard.pb';
let sync = null;
class _Sync_ {
    constructor() {
        this.fileName = SAVE_FILENAME;
        this.lastSyncTime = -1;
        this.syncedOnline = false;
        this.syncSkips = 0;
        this.syncSkipsTimes = 5;
        this.save = {
            dirty: false,
            interval: null,
        };
        this.load = {
            interval: null,
        };
    }
    static init() { if (sync == null)
        sync = new _Sync_(); }
    start(autoSave = true, autoLoad = true) {
        if (autoSave && pb.preferences['autoSaveInterval'] != '0')
            this.save.interval = setInterval(() => {
                if (sync.save.dirty == false)
                    return;
                sync.save.dirty = false;
                log('sync save');
                sync.saveAll();
            }, pb.preferences['autoSaveInterval'] * 1000);
        if (autoLoad && pb.preferences['autoLoadInterval'] != '0')
            this.load.interval = setInterval(() => {
                if (document.hasFocus()) {
                    sync.syncSkips = sync.syncSkips - 1;
                }
                else
                    sync.syncSkips = 0;
                if (sync.syncSkips <= 0) {
                    sync.syncSkips = sync.syncSkipsTimes;
                    sync.loadAll();
                }
            }, pb.preferences['autoLoadInterval'] * 1000);
    }
    setSyncTime() {
        this.lastSyncTime = (new Date()).getTime();
    }
    flashLoadingIndicator() {
        startLoadingIndicator();
        setTimeout(() => {
            stopLoadingIndicator();
        }, 2000);
    }
    loadCachedContent() {
        return false;
        let contents = window.localStorage.getItem('cached');
        if (contents == null || contents == undefined)
            return false;
        if (loadPBoard(contents))
            logw('loading from cache');
        else
            logw('not loading from cache');
        extensions.invoke('loadCached');
        return true;
    }
    saveCachedContent(contents) {
        window.localStorage.setItem('cached', contents);
    }
    saveAll(callback = null) {
        if (SAVING_DISASBLED)
            return;
        try {
            extensions.invoke('pre_saveAll');
            sync.setSyncTime();
            let contents = buildPBoard();
            log('saveAll ', contents);
            if (sync.syncedOnline == false)
                return console.warn('Wont save: Not once synced with online. Wait or refresh.');
            startSavingIndicator();
            sync.saveCachedContent(contents);
            storage.fileUpload({ name: sync.fileName, body: contents }, () => {
                if (callback != null)
                    callback();
                stopSavingIndicator();
                extensions.invoke('saveAll');
                sync.save.dirty = false;
            });
        }
        catch (e) {
            alog(e);
        }
    }
    loadAll(callback = null) {
        try {
            extensions.invoke('pre_loadAll');
            storage.fileDownload(sync.fileName, (contents) => {
                sync.syncedOnline = true;
                if (contents != null && contents != '') {
                    log('loading contents ', contents);
                    loadPBoard(contents);
                    extensions.invoke('loadAll');
                }
                else {
                    logw('loaded null, resetting');
                    resetData();
                }
                if (callback)
                    callback(contents);
            });
        }
        catch (e) {
            alog(e);
        }
    }
}

function pageOpened() {
    logt("pageOpened()");
    extensions.invoke('pre_newPage');
    if (mainView != null)
        mainView = mainView.update(board, 0);
    if (mainView == null)
        mainView = generateView(board, null, 0);
    setMainView(mainView);
    mainView.render();
    extensions.invoke('newPage');
    extensions.execute();
}
function loadBackground(el, id) {
    el.style.backgroundImage = "url('" + brdAttr(id, 'background') + "')";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundSize = "cover";
}
function textareaAutoSize(el) {
    el.style.height = '1px';
    el.style.height = (1 + el.scrollHeight) + 'px';
}
function startSavingIndicator() {
    html.savingIndicator.style.display = 'block';
}
function stopSavingIndicator() {
    html.savingIndicator.style.display = 'none';
}
function startLoadingIndicator() {
    html.loadingIndicator.style.display = 'block';
}
function stopLoadingIndicator() {
    html.loadingIndicator.style.display = 'none';
}

function updateSaveFile(saveFile) {
    function copyNewProperties(from, to) {
        let fields = Object.keys(from);
        for (let i = 0; i < fields.length; i++) {
            if ((fields[i] in to) == false)
                to[fields[i]] = from[fields[i]];
        }
        return to;
    }
    log('updating ', saveFile);
    if (saveFile['pb'] != undefined && saveFile.pb['version'] == currentVersion)
        return saveFile;
    if (saveFile['version'] == 1) {
        delete saveFile.preferences['manualSaveLoad'];
        let pref = copyNewProperties(new PBoard().preferences, saveFile.preferences);
        saveFile.preferences = pref;
        saveFile.version = 2;
        return updateSaveFile(saveFile);
    }
    if (saveFile['version'] == 2) {
        let pref = copyNewProperties(new PBoard().preferences, saveFile.preferences);
        saveFile.preferences = pref;
        saveFile.version = 3;
        let newSaveFile = {
            syncTime: 0,
            pb: saveFile
        };
        return updateSaveFile(newSaveFile);
    }
    if (saveFile['project'] != null && saveFile.project['version'] == 3) {
        Object.defineProperty(saveFile, 'pb', Object.getOwnPropertyDescriptor(saveFile, 'project'));
        delete saveFile['project'];
        saveFile.pb.version = 3.1;
        return updateSaveFile(saveFile);
    }
    if (saveFile['pb'] != null && saveFile.pb['version'] == 3.1) {
        for (let i in saveFile.pb.boards)
            delete saveFile.pb.boards[i].attributes['references'];
        saveFile.pb.boards[''].attributes = {};
        saveFile.pb.version = 4;
        return updateSaveFile(saveFile);
    }
    return null;
}

const ViewMode = {
    List: 0,
    Board: 1,
    toString(val) {
        for (let k in this)
            if (this[k] == val)
                return k;
        return null;
    }
};
const ViewMode2 = {
    None: 0,
    Notes: 1,
    Grid: 2,
    toString(val) {
        for (let k in this)
            if (this[k] == val)
                return k;
        return null;
    }
};
let mainView = null;
let viewMode = ViewMode.List;
let viewMode2 = ViewMode2.None;
function setMainView(v) {
    mainView = v;
    if (pb.boards[mainView.id].type == BoardType.List)
        setViewMode(ViewMode.List, 0);
    else
        setViewMode(ViewMode.Board, 0);
    let brdName = pb.boards[board].name;
    document.title = brdName ? brdName + " - PBoard" : "PBoard";
    header.loadHeaderData();
}
function setViewMode(vm1, vm2) {
    viewMode = vm1;
    html.main.setAttribute('data-viewMode', ViewMode.toString(vm1));
    viewMode2 = vm2;
    html.main.setAttribute('data-viewMode2', ViewMode.toString(vm2));
}

let unregisteredDialogs = {};
let dialogManager = null;
class _DialogManager_ {
    constructor() {
        this.boardID = null;
        this.boardView = null;
        this.dialogs = {};
        (this.dialogBack = EbyId('dialogBack'))
            .addEventListener('click', this.dialogBack_onclick.bind(this), false);
        this.registerDialogs();
    }
    static init() { if (dialogManager == null)
        dialogManager = new _DialogManager_(); }
    registerDialogs() {
        for (let d in unregisteredDialogs) {
            this.addDialog(d, unregisteredDialogs[d]);
            this.dialogs[d].init();
        }
    }
    dialogBack_onclick(event) {
        if (event.target == this.dialogBack)
            dialogManager.closeDialog(true, true);
    }
    addDialog(name, dialog) {
        this.dialogs[name] = dialog;
    }
    openDialog(dialog, boardId, boardView) {
        this.dialogBack.classList.toggle('hidden', false);
        this.boardID = boardId;
        this.boardView = boardView;
        this.dialogs[dialog].open();
    }
    closeDialog(backClicked, all) {
        if (all)
            for (let k in this.dialogs)
                if (this.dialogs[k].isOpen)
                    this.dialogs[k].close(backClicked ? null : false);
        this.dialogBack.classList.toggle('hidden', true);
        if (all == false) {
            if (this.boardView != null)
                navigation.focusView(this.boardView);
            else
                navigation.focusDefault();
        }
        this.boardID = null;
        this.boardView = null;
    }
}

unregisteredDialogs['optionsDialog'] = {
    isOpen: false,
    dialog: null,
    init() {
        this.isOpen = false;
        this.dialog = EbyId('dialog_optionsDialog');
        EbyName('remove', this.dialog).onclick = this.remove_onclick.bind(this);
        EbyName('delete', this.dialog).onclick = this.delete_onclick.bind(this);
        EbyName('copy', this.dialog).onclick = this.copy_onclick.bind(this);
        EbyName('references', this.dialog).onclick = this.references_onclick.bind(this);
        EbyName('extras', this.dialog).onclick = this.extras_onclick.bind(this);
    },
    open() {
        this.isOpen = true;
        this.dialog.classList.toggle('hidden', false);
        navigation.focus(EbyName('remove', this.dialog));
    },
    close() {
        this.dialog.classList.toggle('hidden', true);
        this.isOpen = false;
        dialogManager.closeDialog(false, false);
    },
    remove_onclick() {
        let refCount = Board.countReferences(dialogManager.boardID);
        if (refCount <= 1 && confirm('This is the last reference to this board, really remove it? (Will delete the board)') == false)
            return;
        if (pb.boards[board].type == BoardType.Board) {
            pb.boards[board].content.splice(dialogManager.boardView.index - 1, 1);
        }
        else if (pb.boards[board].type == BoardType.List) {
            pb.boards[board].content.splice(dialogManager.boardView.index, 1);
        }
        if (refCount <= 1)
            Board.deleteBoardById(dialogManager.boardID);
        boardsUpdated([dialogManager.boardID], true);
        this.close();
    },
    delete_onclick() {
        if (confirm('Really delete this board, all references to it and its content (content will be removed, not deleted)?') == false)
            return;
        Board.deleteBoardById(dialogManager.boardID);
        boardsUpdated([dialogManager.boardID], true);
        this.close();
    },
    copy_onclick() {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", dialogManager.boardID);
        this.close();
    },
    references_onclick() {
        let brdID = dialogManager.boardID;
        let brdView = dialogManager.boardView;
        this.close();
    },
    extras_onclick() {
    }
};

unregisteredDialogs['textEditor'] = {
    isOpen: false,
    dialog: null,
    textTitle: null,
    textText: null,
    init() {
        this.isOpen = false;
        this.dialog = EbyId('dialog_textEditor');
        this.textTitle = EbyName('textTitle', this.dialog);
        this.textText = EbyName('textText', this.dialog);
        this.textTitle.oninput = textareaAutoSize.bind(null, this.textTitle);
        EbyName('closeBtn', this.dialog).onclick = this.closeNoSave.bind(this);
        EbyName('fullscreenBtn', this.dialog).onclick = this.fullscreen.bind(this);
    },
    open() {
        this.isOpen = true;
        this.dialog.classList.toggle('hidden', false);
        this.fullscreen(false);
        this.textTitle.value = pb.boards[dialogManager.boardID].name;
        this.textText.value = pb.boards[dialogManager.boardID].content;
        textareaAutoSize(this.textTitle);
        if (this.textTitle.value == "") {
            this.textTitle.select();
        }
        else {
            this.textText.select();
            this.textText.setSelectionRange(0, 0);
        }
        navigation.focus(this.textTitle);
    },
    close(save = false) {
        if (save === null)
            save = true;
        if (save) {
            pb.boards[dialogManager.boardID].name = this.textTitle.value;
            pb.boards[dialogManager.boardID].content = this.textText.value;
            boardsUpdated([dialogManager.boardID], false);
        }
        this.dialog.classList.toggle('hidden', true);
        this.isOpen = false;
        dialogManager.closeDialog(false, false);
    },
    closeNoSave(force = false) {
        let go = confirm("Exit without saving?");
        if (go == false)
            return;
        this.close(false);
    },
    fullscreen(force = null) {
        if (force === false || this.dialog.style.maxWidth != "") {
            this.dialog.style.maxWidth = "";
            this.dialog.style.maxHeight = "";
        }
        else {
            this.dialog.style.maxWidth = "100%";
            this.dialog.style.maxHeight = "100%";
        }
    },
};

const StorageType = {
    None: 0,
    Drive: 1
};
let storage = null;
class _Storage_ {
    constructor(storageType) {
        this.type = storageType;
        _Sync_.init();
    }
    static init(storageType) { if (storage == null)
        storage = new _Storage_(storageType); }
    OnStorageLoad(_storageType) {
        if (this.type != _storageType)
            return;
        board = boardFromUrl();
        logw('Storage loaded, initial reset or load');
        if (this.type == StorageType.None)
            return resetData();
        if (sync.loadCachedContent() == false)
            resetData();
        else
            pageOpened();
        sync.loadAll();
        sync.start(true, false);
    }
    fileIdByName(name, callback) {
        if (this.type == StorageType.Drive)
            return drive_storage.fileIdByName(name, callback);
    }
    fileUpload(file, callback = null) {
        if (this.type == StorageType.Drive)
            return drive_storage.fileUpload(file, callback);
    }
    fileDownload(name, callback) {
        if (this.type == StorageType.Drive)
            return drive_storage.fileDownload(name, callback);
    }
    fileDelete(name, callback = null) {
        if (this.type == StorageType.Drive)
            return drive_storage.fileDelete(name, callback);
    }
}

const driveAPI_Creds = {
    apiKey: 'AIzaSyDXQ9Z_V5TSX-yepF3DYKVjTIWVwpwuoXU',
    clientId: '644898318398-d8rbskiha2obkrrdfjf99qcg773n789i.apps.googleusercontent.com',
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file'
};
const drive_storage = {
    loaded: false,
    OnStorageLoad() {
        function updateDriveSigninStatus(isSignedIn) {
            if (isSignedIn == false)
                return header.goLogin();
            this.loaded = true;
            storage.OnStorageLoad(StorageType.Drive);
        }
        gapi.load('client:auth2', () => {
            gapi.client.init(driveAPI_Creds)
                .then(() => {
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateDriveSigninStatus);
                updateDriveSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            }, (error) => {
                alog(error);
                header.goLogin();
            });
        });
    },
    fileIdByName(name, callback) {
        gapi.client.drive.files.list({
            'pageSize': 1,
            fields: "files(id)",
            q: "name='" + name + "'"
        })
            .then((response) => {
            let files = response.result.files;
            if (files != null && files.length > 0)
                callback(files[0].id);
            else
                callback(null);
        })
            .catch((err) => { loge(err, 'fileIdByName err '); callback(null); });
    },
    fileUpload(file, callback = null) {
        if (file.mimeType == null)
            file.mimeType = 'text/plain';
        this.fileIdByName(file.name, (fileId) => {
            if (fileId == null) {
                let fileBlob = new Blob([file.body], { type: 'text/plain' });
                let metadata = {
                    'name': file.name,
                    'mimeType': file.mimeType
                };
                let accessToken = gapi.auth.getToken().access_token;
                let form = new FormData();
                form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                form.append('file', fileBlob);
                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                xhr.responseType = 'json';
                xhr.onload = () => {
                    if (callback)
                        callback(xhr.response);
                };
                xhr.send(form);
            }
            else {
                let fileBlob = new Blob([file.body]);
                let accessToken = gapi.auth.getToken().access_token;
                let xhr = new XMLHttpRequest();
                xhr.open('PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + fileId);
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                xhr.responseType = 'json';
                xhr.onload = () => {
                    if (callback)
                        callback(xhr.response);
                };
                xhr.send(fileBlob);
            }
        });
    },
    fileDownload(name, callback) {
        this.fileIdByName(name, (fileId) => {
            if (fileId != null) {
                logw('get fileId is :', fileId);
                gapi.client.drive.files.get({
                    'fileId': fileId,
                    'alt': 'media'
                })
                    .then((response, rawData) => {
                    callback(response.body);
                })
                    .catch((fail) => {
                    loge('fail', fail);
                    callback(null);
                });
            }
            else {
                logw('get fileId is NULL');
                callback(null);
            }
        });
    },
    fileDelete(name, callback = null) {
        this.fileIdByName(name, (fileId) => {
            if (fileId != null) {
                gapi.client.drive.files.delete({
                    'fileId': fileId
                })
                    .then((response) => {
                    log(response, 'fileDelete log');
                })
                    .catch((err) => { loge(err, 'fileDelete err '); if (callback !== null)
                    callback(null); });
            }
        });
    },
};
