"use strict";
//////////////////////////////////////////////Finders:
/////html id selectors
function EbyId(id) {
    return document.getElementById(id);
}
function templateFChild(id) {
    let el = EbyId(id);
    if (el["content"] != undefined) //is template
        return el.content.firstElementChild;
    return null;
}
/////data-name selectors
function EbyName(name, element) {
    return element.querySelector('[data-name="' + name + '"]');
}
function EbyNameAll(name, element = document) {
    return element.querySelectorAll('[data-name="' + name + '"]');
}
//Get/Set Board id (data-id) from html element
/*
function dataId(el) :string{
    return el.getAttribute('data-id');
}
function set_dataId(el, id :string) :void{
    el.setAttribute('data-id',id);
}


function atr(el :HTMLElement,atr :string,atrVal :string|undefined = undefined) :void|string{
    if(atrVal === undefined)
         return el.setAttribute(atr,atrVal);
    else
         return el.getAttribute(atr);
}
function atr_dataId(el,id :string|null = null) :string{
    return atr(el,'data-id',id);
}
*/
/* (el, 'touchstart mousedown', fn, bubble)*/
/*
function listenEvents(element :HTMLElement, eventNames :string, fn :Function, bubble :boolean = true){
    eventNames.split(' ').forEach(
         e=>element.addEventListener(e,<any>fn,bubble)
    );
}
*/
/*
function elementIndex(node :Element) :number{
    let index = 0;
    while(node = node.previousElementSibling)
         index++;
    return index;
}

function findWithAttr(array :any[], attr:string, value:any) {
    for(let i = 0; i < array.length; i += 1)
         if(array[i][attr] === value)
              return i;
    return -1;
}
*/

"use strict";
/********************************************
Logger allows you to log without polluting the browser console.log
It only shows you logs (ouptuts to console.log) when you ask it to.
It also allows you to:
~group logs
~color them (info, warning, error)
~indent them or prepend characters (to differentiate log groups)

this way you can log things relating to UI drawing, Storage,
or any other section of code you might want to log.
Then you can show just that part.

It should also allow to automatically log every function called..
*********************************************/
/*
const LOG_GROUP :{[index:string]:any} = { //groups, each has the log function for group (see below)
    Any: [' '], //Default info
    Other: ['&'],

    Boards: ['$'],
    Drawing: ['#'],
    Storage: ['_'],
};


//Main object/function:
function ___log(logGroup :any, ...args :any[]){ //long name easy to differentiate in code

}
//Log with Any group
let log =(...args :any[])=> LOG_GROUP.Any.log(...args);
//Log with Other group
let log_ =(...args :any[])=> LOG_GROUP.Other.log(...args);

//Add log function to every LOG_Group so i can call group.log instead of passing group all the time
for(let g in LOG_GROUP){
    LOG_GROUP[g].log = function(...args :any[]){
        ___log(this as any,...args);
    }.bind(LOG_GROUP[g]);
}

//Entry factory
log.factory = function(...messages:any[]) :any {
    return {
        messages : messages,
    };
}
log.entries = [] as any[];

//Show logs
log.Show = function(){

}


//Shorter log functions:
//log into any
function ___log_(...args:any[]){

}
*/ 

"use strict";
const dbg = function () {
    for (let i = 0; i < arguments.length; i++)
        if (arguments[i] instanceof Error)
            alert(arguments[i]);
    console.trace();
    return Function.prototype.bind.call(console.debug, console);
    //let context = "My Descriptive Logger Prefix:";
    //return Function.prototype.bind.call(console.log, console, context);
}();
const s_dbg = function () {
    for (let i = 0; i < arguments.length; i++)
        if (arguments[i] instanceof Error)
            alert(arguments[i]);
    return Function.prototype.bind.call(console.groupCollapsed, console);
    //let context = "My Descriptive Logger Prefix:";
    //return Function.prototype.bind.call(console.log, console, context);
}();
const e_dbg = function () {
    for (let i = 0; i < arguments.length; i++)
        if (arguments[i] instanceof Error)
            alert(arguments[i]);
    return Function.prototype.bind.call(console.groupEnd, console);
    //let context = "My Descriptive Logger Prefix:";
    //return Function.prototype.bind.call(console.log, console, context);
}();
/*
//Debug logs, only used for debug and not actual messages.
let LOG_DISABLED = false;
let LOGW_DISABLED = false;
let LOGE_DISABLED = false;

//console log
const log = function(){
    if(LOG_DISABLED) return function(){};
    for(let i = 0; i < arguments.length; i++)
        if(arguments[i] instanceof Error)
            alert(arguments[i]);

    return Function.prototype.bind.call(console.log, console);
    //let context = "My Descriptive Logger Prefix:";
    //return Function.prototype.bind.call(console.log, console, context);
}();
//log traced
const logt = function(){
    if(LOG_DISABLED) return function(){};
    for(let i = 0; i < arguments.length; i++)
        if(arguments[i] instanceof Error)
            alert(arguments[i]);
    return Function.prototype.bind.call(console.trace, console);
    //let context = "My Descriptive Logger Prefix:";
    //return Function.prototype.bind.call(console.log, console, context);
}();
//console log warning
const logw = function(){
    if(LOGW_DISABLED)return function(){}
    return Function.prototype.bind.call(console.warn, console);
    //let context = "My Descriptive Logger Prefix:";
    //return Function.prototype.bind.call(console.log, console, context);
}();
//console log error
const loge = function(){
    if(LOGE_DISABLED)return function(){}
    return Function.prototype.bind.call(console.error, console);
    //let context = "My Descriptive Logger Prefix:";
    //return Function.prototype.bind.call(console.log, console, context);
}();
//alert log
const alog = function(){
    //if(LOG_DISABLED)return function(){}
    return Function.prototype.bind.call(console.log, console);
    //let context = "My Descriptive Logger Prefix:";
    //return Function.prototype.bind.call(console.log, console, context);
}();
//modal log
const mlog = function(){
    //if(LOG_DISABLED)return function(){}
    return Function.prototype.bind.call(console.log, console);
    //let context = "My Descriptive Logger Prefix:";
    //return Function.prototype.bind.call(console.log, console, context);
}();
*/ 

"use strict";
//enum value to enum key
function enumToStr(obj, val) {
    for (let k in obj)
        if (obj[k] == val)
            return k;
    return null;
}
//return number hash of string
function hash(str) {
    let hash = 0;
    let char = 0;
    if (str.length == 0)
        return hash;
    for (let i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
///////////////////////////////////////////////////////////////////////////////////// Cookies {
/*
declare let Cookies: any; //3rd party in external


//Cookie functions. format: "_=<cookie object JSON>"
function getMainCookie(){
        let cookieObj = Cookies.get('_'); //URI encoded json unnamed object string
        if(cookieObj == null || cookieObj == undefined || cookieObj == "") cookieObj = {};
        else cookieObj = JSON.parse(decodeURI(cookieObj)); //since string isnt null
        //log('getMainCookie cookieObj',cookieObj)
        return cookieObj;
}
function setMainCookie(cookieObj :any){
        //log('setMainCookie cookieObj',cookieObj)
        Cookies.set('_',encodeURI(JSON.stringify(cookieObj)));
        //log('doc.cookie after setting main',document.cookie)
}


function getCookie(name :string){
        //log('getCookie[',name,']')
        return getMainCookie()[name];
}
function setCookie(name :string,value :any){
        //log('setCookie[',name,']:',value)
        let cookieObj = getMainCookie();
        cookieObj[name] = value;
        setMainCookie(cookieObj);
}
    
    */
///////////////////////////////////////////////////////////////////////////////////// Cookies }

"use strict";
function waitCall(f) {
    waitCall.list.push(f);
}
waitCall.list = [];
waitCall.Invoke = () => {
    waitCall.list.forEach(f => f());
    waitCall.list = [];
};

"use strict";
//Static html elements, lazy initialization (only when requested)
const html = {
    _e: {},
    _(id, template = false) {
        let v = this._e[id];
        return v ? v : this._e[id] = (template ? templateFChild(id) : EbyId(id));
    },
    //Elements:
    get main() { return this._('main'); },
    get albumTemplate() { return this._('album-template', true); },
    get list2Template() { return this._('list-template', true); },
    get tileTemplate() { return this._('tile-template', true); },
    get tabStart() { return this._('tabStart'); },
    get tabEnd() { return this._('tabEnd'); },
    get loadingIndicator() { return this._('loadingIndicator'); },
    get savingIndicator() { return this._('savingIndicator'); },
    get extrasDialog() { return this._('extrasDialog'); },
    get extrasTitle() { return this._('extrasTitle'); },
    get extrasContent() { return this._('extrasContent'); },
    get extrasBack() { return this._('extrasBack'); },
};

"use strict";
const BoardType = {
    Text: 1,
    Board: 2,
    List: 3,
};
class PBoard {
    constructor(name = "", version = -1, attributes = {}) {
        this.name = name;
        this.version = version;
        this.boards = {};
        this.extensions = {};
        this.tags = {};
        this.attributes = attributes;
        this.preferences = {
            'autoSaveInterval': 10,
            'autoLoadInterval': 20
        };
    }
}
class Board {
    constructor(type, name, content, attributes = {}, id = null) {
        if (id === null)
            id = Board.makeId(8);
        this.id = id;
        this.type = type;
        this.name = name;
        this.content = content;
        this.tags = {};
        this.attributes = attributes;
    }
    static clone(brd) {
        return new Board(brd.type, brd.name, brd.content, brd.attributes);
    }
    static idFromUrl(url) {
        let boardId = "";
        //get id from url
        if (url.includes('?b=')) {
            for (let i = url.indexOf('?b=') + 3; i < url.length && url[i] != '?'; i++)
                boardId += url[i];
        }
        return boardId;
    }
    static makeId(maxLength) {
        let id = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        //find unique id
        while (true) {
            id = "";
            //let length = Math.floor(Math.random() * maxLength) + 1;
            let length = maxLength;
            //generate rand chars and append
            for (let i = 0; i < length; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));
            if (pb.boards[id] == null)
                break;
        }
        return id;
    }
    //delete board by id, and dereference its children. Children get deleted if at 0 references.
    static deleteBoardById(id) {
        if (id == "")
            return;
        delete pb.boards[id];
        //go thru every board and remove the id from contents
        let ids = Object.keys(pb.boards);
        for (let i = 0; i < ids.length; i++) {
            if (pb.boards[ids[i]].type == BoardType.Text)
                continue;
            let ind = pb.boards[ids[i]].content.indexOf(id);
            while (ind != -1) {
                pb.boards[ids[i]].content.splice(ind, 1);
                ind = pb.boards[ids[i]].content.indexOf(id);
            }
        }
        ////////////TODO:
        //Now need to remove island boards
    }
    static countReferences(id) {
        let refs = 0;
        for (let i in pb.boards)
            if (i != id && Array.isArray(pb.boards[i].content))
                for (let k = 0; k < pb.boards[i].content.length; k++)
                    if (id == pb.boards[i].content[k])
                        refs++;
        return refs;
    }
}

"use strict";
class Tag {
    constructor(name = "", id = null) {
        if (id === null)
            id = Board.makeId(16);
        this.id = id;
        this.name = name;
        this.parentTags = [];
    }
    static makeId(maxLength) {
        let id = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        //find unique id
        while (true) {
            id = "";
            //let length = Math.floor(Math.random() * maxLength) + 1;
            let length = maxLength;
            //generate rand chars and append
            for (let i = 0; i < length; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));
            if (pb.tags[id] == null)
                break;
        }
        return id;
    }
    static findTagByName(name) {
        let k = Object.keys(pb.tags);
        for (let j = 0; j < k.length; j++) {
            if (pb.tags[k[j]].name == name)
                return k[j];
        }
        return null;
    }
    static AllUpstreamParents(tagChild /*id*/, oldLst = {}) {
        let lst = oldLst;
        for (let i = 0; i < pb.tags[tagChild].parentTags.length; i++) {
            if (lst[pb.tags[tagChild].parentTags[i]] == null) { //////////////////////////////////////////////////// Should it say != null ??????????????????
                let k = Object.keys(Tag.AllUpstreamParents(pb.tags[tagChild].parentTags[i], lst));
                for (let j = 0; j < k.length; j++) {
                    lst[k[j]] = 1;
                }
            }
            lst[pb.tags[tagChild].parentTags[i]] = 1;
        }
        return lst;
    }
}

"use strict";
let pb = null; //currently open PBoard
let board = ""; //currently open board (id)
window.addEventListener('error', (error) => alert("!!ERROR!!\n\n" + error.message));
//Enforce single instance of pboard across tabs? How to sync them? How to sync across 2 open-at-same-time devices?
/*
let singleInstanceHash = null;

setInterval(()=>{
  //singleInstanceCheck()////////////
},500);

function singleInstanceCheck(){
  //Check if only one instance of pboard is open
  if(singleInstanceHash != null){
    let c = getCookie('singleInstanceHash');
    if( c != singleInstanceHash)
      alert('Multiple instances of pboard open, close or the save can get corrupted or data lost. ['+c+']!=['+singleInstanceHash+']');
  }
  singleInstanceHash = Math.random();
  setCookie('singleInstanceHash', singleInstanceHash);
}
*/
function moveBoards(fromId, fromIndex, toId, toIndex, length = 1, updateBoards = true) {
    let boards = pb.boards[fromId].content.splice(fromIndex, length);
    pb.boards[toId].content.splice(toIndex, 0, ...boards);
    if (updateBoards)
        boardsUpdated(UpdateSaveType.SaveNow);
}
//~~~~~~~~~~~~~~~~~~~~~~~~~ Board attribute ops {
//Setters:
//Set attribute of board by id
function set_brdAttr(id, attr, val) {
    pb.boards[id].attributes[attr] = val;
}
//Set attribute of board by id, if it already doesnt have it
function set_brdAttrIfNull(id, attr, val) {
    if ((attr in pb.boards[id].attributes) == false) {
        set_brdAttr(id, attr, val);
        return true;
    }
    return false;
}
//Getters:
//Get attribute of board by id
function brdAttr(id, attr) {
    return pb.boards[id].attributes[attr];
}
//Get attribute of board by id, or if it doesnt exist return val
function brdAttrOrDef(id, attr, val) {
    if (attr in pb.boards[id].attributes)
        return brdAttr(id, attr);
    return val;
}
//Delete attribute:
function delBrdAttr(id, attr) {
    delete pb.boards[id].attributes[attr];
}
//~~~~~~~~~~~~~~~~~~~~~~~~~ Board attribute ops }
//set currently open board, push to history
function set_board(id) {
    dbg("set_board('%s')", id);
    board = id;
    boardHistory.add(id);
    window.location.hash = id;
    draw();
    navigation.focus(header.headerTitle, true);
}
//Load from either saveFile or JSON format
function loadSaveFile(saveFile, checkTime = true) {
    if (typeof saveFile === 'string')
        saveFile = JSON.parse(saveFile);
    console.debug('loadSaveFile', saveFile);
    extensions.invoke('loadSaveFile');
    saveFile = updateSaveFile(saveFile);
    if (saveFile === null)
        return false; //outdated
    if (checkTime && sync.lastSyncTime != null && sync.lastSyncTime >= saveFile.syncTime) //old, we have newer
        return false;
    sync.flashLoadingIndicator();
    sync.lastSyncTime = saveFile.syncTime;
    pb = saveFile.pb;
    draw();
    return true;
}
function resetPB() {
    console.debug("resetPB()");
    pb = new PBoard("", currentVersion);
    pb.boards[""] = new Board(BoardType.List, "", [], {}, ""); //main board
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
function openBoard(id, view) {
    //console.log("board of id: " + id + " clicked");
    //// For textual open textDialog by id (you just pass id to open it! )
    if (pb.boards[id].type == BoardType.Text) {
        openTextBoard(id, view);
        return;
    }
    /// For board open it full window
    /// For list open it full window
    set_board(id);
}
const UpdateSaveType = {
    DontSave: 0,
    SaveNow: 1,
    AutoSave: 2
};
//if boards == null, redraw from root. If not null then draw only those
function boardsUpdated(save, boardToRedraw = null) {
    if (pb.boards[board] == null)
        set_board(""); //in case board we were viewing got deleted
    if (boardToRedraw !== null)
        mainView.renderById(boardToRedraw);
    else
        mainView.render();
    //save == 0 = dont save
    if (save == UpdateSaveType.SaveNow)
        sync.saveAll(); // save now
    else if (save == UpdateSaveType.AutoSave)
        sync.setDirty(); //auto save
}
//~~~~~~~~~~~~~~~~~~~~~~~~~ URL ops {
//set_board on url change
window.addEventListener('hashchange', () => {
    if (boardFromUrl() != board) //if not already open
        set_board(boardFromUrl());
});
function urlFromBoard(boardId) {
    return siteUrl + "#" + boardId;
}
function boardFromUrl(_url = null) {
    if (_url === null)
        _url = window.location.href;
    return _url.replace(siteUrl, '').replace('#', '');
}
//~~~~~~~~~~~~~~~~~~~~~~~~~ URL ops }
function openOptionsDialog(id, view) {
    dialogManager.openDialog('optionsDialog', id, view);
}
function openTextBoard(id, view) {
    dialogManager.openDialog('textEditor', id, view);
}

"use strict";
const boardHistory = {
    history: [],
    //get last
    last() {
        if (this.history.length == 0)
            return null;
        return this.history[this.history.length - 1];
    },
    //add board to history, skip if already last
    add(boardId) {
        console.log('bh add ("' + boardId + '")', this.history);
        if (boardId !== this.last())
            this.history.push(boardId);
    },
    //pop previous in history (pops current)
    prev() {
        console.log('bh prev', this.history);
        this.history.pop(); //pop current
        set_board((this.history.length > 0) ? this.history.pop() //pop and get before current
            : "");
    }
};

"use strict";
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
        //EbyId('convertBtn').onclick = ConvertBoard;
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
                a.click();
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
            loadSaveFile(contents, false);
        };
    }
    static init() { if (header == null)
        header = new _Header_(); }
    goLogin() {
        window.location.href = siteUrl.replace(/\/*$/, "") + "/login/";
    }
    goHome() {
        set_board("");
    }
    goUp() {
        boardHistory.prev();
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
        boardsUpdated(UpdateSaveType.AutoSave, mainView.id);
    }
    headerDescription_oninput() {
        this.headerDescriptionSetText(this.headerDescription.value);
        if (mainView == null)
            return;
        if (pb.boards[mainView.id].type == BoardType.Board) {
            pb.boards[mainView.id].attributes['description'] = this.headerDescription.value;
            boardsUpdated(UpdateSaveType.AutoSave, mainView.id);
        }
    }
    headerExpand_onclick() {
        this.headerFold.classList.toggle('hidden');
    }
    //Set height based on text in textbox
    headerDescAutoHeight(textarea) {
        textarea.style.height = '1px';
        let height = (5 + textarea.scrollHeight);
        textarea.style.removeProperty('height'); //we actually want flex so no height
        let maxHeight = window.innerHeight * 0.8 - 40; //-40 for approximate header height
        if (height > maxHeight)
            height = maxHeight; //limit max
        textarea.parentNode.style.minHeight = height + 'px';
    }
}

"use strict";
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
        let jumpList = (indx) => {
            let dots = mainView.htmlEl.querySelectorAll('[data-name="list-header"]>.dot');
            this.focus(dots[indx]);
        };
        if (esc) {
            if (inDialog)
                dialogManager.closeDialog(!shift, true); //if shift held, dont save
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
                case '~': // ` + shift
                    event.preventDefault(); //if we focus on text
                    if (shift) //jump to first List or tile
                        if (pb.boards[mainView.id].type == BoardType.List)
                            navigation.focus(mainView.htmlEl.getElementsByClassName('dot')[1]); //skip list dot
                        else
                            navigation.focus(mainView.htmlEl.getElementsByClassName('dot')[0]); //first dot
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
                case 'A': //Jump previous list
                    if (shift) {
                        event.preventDefault(); //if we focus on text
                        if (pb.boards[mainView.id].type == BoardType.List)
                            this.focusDefault();
                        else {
                            jumpList(0);
                        }
                    }
                    break;
                case 'd':
                case 'D': //Jump next list
                    if (shift) {
                        event.preventDefault(); //if we focus on text
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
    focusDefault(click = false) {
        this.focus(header.headerExpand, click);
    }
    highlightFocus(element = null) {
        if (element === null)
            element = document.activeElement;
        this.moveHighlight('highlighted-input', element);
    }
    focus(element, click = false) {
        if (element == null)
            return this.focusDefault();
        if (click)
            element.click();
        element.focus();
        this.highlightFocus(element);
    }
    focusView(view) {
        if (view.discarded == false && view.parent != null) //if not discarded or main
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

"use strict";
function newText(parentId, name = null) {
    if (name == null)
        name = "";
    let brd = new Board(BoardType.Text, name, "");
    pb.boards[brd.id] = brd;
    pb.boards[parentId].content.push(brd.id);
    boardsUpdated(UpdateSaveType.SaveNow);
    return brd.id;
}
function newBoard(parentId, name = null) {
    if (name == null)
        name = ""; //name="Board";
    let brd = new Board(BoardType.Board, name, [], { description: '' });
    pb.boards[brd.id] = brd;
    pb.boards[parentId].content.push(brd.id); //Add to parent list
    boardsUpdated(UpdateSaveType.SaveNow);
    return brd.id;
}
function newList(parentId, name = null) {
    if (name == null)
        name = ""; //name="List";
    let brd = new Board(BoardType.List, name, []);
    pb.boards[brd.id] = brd;
    pb.boards[parentId].content.push(brd.id);
    boardsUpdated(UpdateSaveType.SaveNow);
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
        //if(pb.boards[id].type == BoardType.List){alert("Cant embed lists into boards."); return null;}
    }
    pb.boards[parentId].content.push(id);
    boardsUpdated(UpdateSaveType.SaveNow);
    return id;
}

"use strict";
function updateSaveFile(saveFile) {
    function copyNewProperties(from, to) {
        let fields = Object.keys(from);
        for (let i = 0; i < fields.length; i++) {
            if ((fields[i] in to) == false)
                to[fields[i]] = from[fields[i]];
        }
        return to;
    }
    dbg("updating %o", saveFile);
    if (saveFile['version'] == 1) {
        delete saveFile.preferences['manualSaveLoad'];
        let pref = copyNewProperties(new PBoard().preferences, saveFile.preferences);
        saveFile.preferences = pref;
        saveFile.version = 2;
    }
    //saveFile.version>=3
    if (saveFile['version'] == 2) {
        let pref = copyNewProperties(new PBoard().preferences, saveFile.preferences);
        saveFile.preferences = pref;
        saveFile.version = 3;
        saveFile = {
            syncTime: 0,
            pb: saveFile
        };
    }
    if (saveFile['project'] != null && saveFile.project['version'] == 3) {
        Object.defineProperty(saveFile, 'pb', Object.getOwnPropertyDescriptor(saveFile, 'project'));
        delete saveFile['project'];
        saveFile.pb.version = 3.1;
    }
    if (saveFile['pb'] != null && saveFile.pb['version'] == 3.1) {
        ///////////TODO delete all 'refence' objects from board attributes
        for (let i in saveFile.pb.boards)
            delete saveFile.pb.boards[i].attributes['references'];
        saveFile.pb.boards[''].attributes = {};
        saveFile.pb.version = 4;
    }
    if (saveFile['pb'] != undefined && saveFile.pb['version'] == currentVersion)
        return saveFile;
    return null; //failed to update
}

"use strict";
class View {
    constructor(_id = "", _parent, _index) {
        this.discarded = false;
        this.id = _id;
        this.parent = _parent;
        this.index = _index;
        this.htmlEl = null;
    }
    destructor() {
        if (this.discarded)
            return null;
        this.clearHTML();
        for (let p in this)
            this[p] = undefined; //discard all properties. /////////?? Does it work in extended class or only deletes these properties?
        this.discarded = true;
        return null;
    }
    buildHTML() { } /* Create all html stuff needed to render MYSELF (not children too). Step before render. */
    clearHTML() {
        if (this.htmlEl != null)
            this.htmlEl.remove();
        //this.htmlEl.parentNode.removeChild(this.htmlEl);
        //this.htmlEl.outerHTML = ""; ///////////////////
        this.htmlEl = null;
    }
    attachToParent() {
        /////Add to main, holderElement or to parent html ///?? htmlEl is never used, should always be holderElement
        if (this.parent != null) {
            if (this.parent.holderElement != undefined)
                this.parent.holderElement.appendChild(this.htmlEl);
            else
                this.parent.htmlEl.appendChild(this.htmlEl); //?? never used, always holderElement..
        }
        else
            html.main.appendChild(this.htmlEl);
        ///////
    }
    update(_id, _index = null) {
        let changed = false;
        if (this.id != _id)
            changed = true;
        if (pb.boards[this.id] == null || (changed && pb.boards[_id].type != pb.boards[this.id].type))
            return this.destructor(); //Incompatible type
        this.id = _id;
        if (_index !== null)
            this.index = _index;
        if (changed)
            this.clearHTML(); //invalidated
        return this;
    }
    render() { } /* Render yourself and call render on children (if any) */
    renderById(_id) {
        if (this.id == _id)
            return this.render();
    } /* Element gets called to render. If not current element, call render on children (if any) */
}

"use strict";
class ViewTree extends View {
    constructor(_id = "", _parent, _index) {
        super(_id, _parent, _index);
        this.holderElement = null;
        this.elements = [];
        if (this.parent == null)
            setMainView(this);
    }
    destructor() {
        if (this.discarded)
            return null;
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].clearHTML();
            this.elements[i].destructor();
        }
        this.elements = undefined;
        return super.destructor();
    }
    buildHTML() {
        /* Abstract, but here you should check first if your element has all the html stuff it needs. create yourself. */
        //this.holderElement.innerHTML = ""; //Clear children.       here
        //clear if more than needed, add if needed
        this.elementsToLength();
        for (let i = 0; i < this.elements.length; i++)
            this.elements[i].clearHTML(); //Since we cleared  above ^
    }
    clearHTML() {
        if (this.elements !== undefined) { //not getting discarded
            for (let i = 0; i < this.elements.length; i++)
                this.elements[i].clearHTML();
        }
        super.clearHTML();
    }
    update(_id, _index = null) {
        let notSameId = (this.id != _id);
        if (super.update(_id, _index) == null)
            return null;
        if (notSameId)
            this.elementsToLength();
        return this;
    }
    render() {
        //this.buildHTML(); /* No, abstract extender needs to call this in its own buildHTML */
        if (this.parent == null)
            setMainView(this); //to render title into tab name
        for (let i = 0; i < this.elements.length; i++)
            this.elements[i].render();
    }
    renderById(_id) {
        super.renderById(_id);
        for (let i = 0; i < this.elements.length; i++)
            this.elements[i].renderById(_id);
    }
    elementsToLength() {
        let length = pb.boards[this.id].content.length; //desired length
        let len = this.elements.length; //curent length
        let dif = length - len; //if length>len then positive
        if (dif > 0) { //add more
            for (let i = 0; i < dif; i++)
                this.elements.push(null); //will fill in update below
        }
        else if (dif < 0) { //remove
            for (let i = 0; i < -dif; i++) {
                this.elements[this.elements.length - 1].destructor(); //properly dispose
                this.elements.pop(); //remove
            }
        }
        //update/create all:
        for (let i = 0; i < this.elements.length; i++) {
            let makeNew = (this.elements[i] === null);
            if (makeNew == false && this.elements[i].update(pb.boards[this.id].content[i], i) == null)
                makeNew = true;
            if (makeNew)
                this.elements[i] = generateView(pb.boards[this.id].content[i], this, i);
        }
    }
}

"use strict";
class AlbumView extends ViewTree {
    constructor(_id = "", _parent, _index) {
        super(_id, _parent, _index);
    }
    buildHTML() {
        if (this.htmlEl == null) {
            this.htmlEl = html.albumTemplate.cloneNode(true);
            this.attachToParent();
            this.holderElement = EbyName('album-holder', this.htmlEl);
            this.adder = EbyName('album-adder', this.htmlEl);
            this.adder.onkeypress = this.adder_onkeypress.bind(this);
        }
        this.htmlEl.setAttribute('data-id', this.id);
        super.buildHTML(); //Build children
    }
    render() {
        this.buildHTML();
        super.render(); //render children
    }
    adder_onkeypress(event) {
        if (event.key !== 'Enter')
            return;
        newList(this.id, this.adder.value);
        this.adder.value = "";
    }
}

"use strict";
class ListView extends ViewTree {
    constructor(_id = "", _parent, _index) {
        super(_id, _parent, _index);
    }
    buildHTML() {
        if (this.htmlEl == null) {
            this.htmlEl = html.list2Template.cloneNode(true);
            this.attachToParent();
            this.holderElement = EbyName('list-holder', this.htmlEl);
            this.header = EbyName('list-header', this.htmlEl);
            this.title = EbyName('list-title', this.htmlEl);
            this.title.onkeyup = this.title_onkeyup.bind(this);
            this.title.onblur = this.title_onblur.bind(this);
            (this.optionsBtn = EbyName('list-optionsBtn', this.htmlEl)).onclick = this.optionsBtn_onclick.bind(this);
            this.adder = EbyName('list-adder', this.htmlEl);
            (this.adderText = EbyName('list-adder-text', this.htmlEl)).onclick = this.adderText_onclick.bind(this);
            (this.adderBoard = EbyName('list-adder-board', this.htmlEl)).onclick = this.adderBoard_onclick.bind(this);
            (this.adderList = EbyName('list-adder-list', this.htmlEl)).onclick = this.adderList_onclick.bind(this);
            (this.adderReference = EbyName('list-adder-reference', this.htmlEl)).onclick = this.adderReference_onclick.bind(this);
        }
        this.htmlEl.setAttribute('data-id', this.id);
        super.buildHTML(); //build children
    }
    render() {
        this.buildHTML();
        if (this.parent == null)
            this.header.classList.add('hidden');
        this.title.value = pb.boards[this.id].name;
        super.render(); //render children
    }
    title_onkeyup(event) {
        //if(event.key !== 'Enter') return;
        pb.boards[this.id].name = this.title.value;
        boardsUpdated(UpdateSaveType.AutoSave, this.id);
    }
    title_onblur(event) {
        this.title.value = pb.boards[this.id].name;
    }
    optionsBtn_onclick(event) {
        openOptionsDialog(this.id, this);
    }
    adderText_onclick(event) {
        let id = newText(this.id, null);
        openBoard(id, this); //auto open
    }
    adderBoard_onclick(event) {
        /*
        let name = window.prompt("Board name?: ");
      if(name == "" || name == null)return;
        */ let name = null;
        let id = newBoard(this.id, name);
        openBoard(id, this); //auto open
    }
    adderList_onclick(event) {
        /*
      let name = window.prompt("List name?: ");
      if(name == "" || name == null)return;
      */ let name = null;
        let id = newList(this.id, name);
        openBoard(id, this); //auto open
    }
    adderReference_onclick(event) {
        newReference(this.id, null);
    }
}

"use strict";
class TileView extends View {
    constructor(_id = "", _parent, _index) {
        super(_id, _parent, _index);
        this.optionsBtn = null;
        this.text = null;
        this.textIcon = null;
    }
    buildHTML() {
        if (this.htmlEl == null) {
            this.htmlEl = html.tileTemplate.cloneNode(true);
            this.attachToParent();
            this.optionsBtn = EbyName('tile-optionsBtn', this.htmlEl);
            this.optionsBtn.onclick = this.optionsBtn_onclick.bind(this);
            this.text = EbyName('tile-text', this.htmlEl);
            this.text.onclick = this.text_onclick.bind(this);
            this.textIcon = EbyName('tile-textIcon', this.htmlEl);
            this.optionsBtn.addEventListener('openEvent', this.openEvent.bind(this), false); //for keyboard navigation
        }
        this.htmlEl.setAttribute('data-id', this.id);
    }
    render() {
        this.buildHTML();
        let titleText = pb.boards[this.id].name;
        if (titleText.trim() == '')
            titleText = "\xa0"; //non breaking space
        this.text.childNodes[1].nodeValue = titleText; /////////////// HIGHLY DEPENDENT ON HTML, even newlines affect. Test in browser if it fails.
        //this.text.innerText = pb.boards[this.id].content; //Text
        //To display text, check type.
        this.htmlEl.setAttribute('data-type', enumToStr(BoardType, pb.boards[this.id].type));
        loadBackground(this.htmlEl, this.id);
        if (pb.boards[this.id].type == BoardType.Text && pb.boards[this.id].content.length > 0)
            this.textIcon.classList.remove('d-none');
        else
            this.textIcon.classList.add('d-none');
    }
    optionsBtn_onclick(event) {
        openOptionsDialog(this.id, this);
    }
    text_onclick(event) {
        //open tile. Since tile can be any type we better call special function:
        this.openEvent();
    }
    openEvent() {
        openBoard(this.id, this);
    }
}

"use strict";
const css = {
    styleElement: EbyId('style'),
};

"use strict";
/* generate required type based on board type */
function generateView(_id, _parent, _index) {
    //log('GenerateView ' + _id, _parent);
    let type = pb.boards[_id].type;
    if (_parent == null) { ////////// Main View
        if (type == BoardType.List)
            return new ListView(_id, _parent, _index);
        if (type == BoardType.Text)
            throw "Trying to open text fullscreen";
        return new AlbumView(_id, _parent, _index);
    }
    //////////////// Not Main view
    if (viewMode == ViewMode.Board) {
        /////////////////////TODO maybe i should remove the second check, it looks cool to have lists in lists..
        if (type == BoardType.List && _parent == mainView)
            return new ListView(_id, _parent, _index);
        return new TileView(_id, _parent, _index);
    }
    else if (viewMode == ViewMode.List) {
        return new TileView(_id, _parent, _index);
    }
    return null;
}

"use strict";
function draw() {
    dbg("draw()");
    extensions.invoke('pre_newPage');
    //destructor above sets mainView to null
    if (mainView != null)
        mainView = mainView.update(board, 0); //sets to null if cant
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
    //  el.parentNode.style.height = el.style.height;
}
////Indicator UIs
function startDirtyIndicator() {
    html.savingIndicator.style.display = 'block';
    html.savingIndicator.style.opacity = '0.3';
    html.savingIndicator.style.borderStyle = 'dotted';
}
function startSavingIndicator() {
    html.savingIndicator.style.opacity = '1';
    html.savingIndicator.style.borderStyle = 'none';
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

"use strict";
const ViewMode = {
    List: 0,
    Board: 1,
};
const ViewMode2 = {
    None: 0,
    Notes: 1,
    Grid: 2,
};
let mainView = null; //current main, top level view
let viewMode = ViewMode.List;
let viewMode2 = ViewMode2.None;
function setMainView(v) {
    mainView = v;
    if (pb.boards[mainView.id].type == BoardType.List)
        setViewMode(ViewMode.List, 0);
    else
        setViewMode(ViewMode.Board, 0);
    //Make tab title same as board name
    let brdName = pb.boards[board].name;
    document.title = brdName ? brdName + " - PBoard" : "PBoard";
    header.loadHeaderData();
}
function setViewMode(vm1, vm2) {
    viewMode = vm1;
    html.main.setAttribute('data-viewMode', enumToStr(ViewMode, vm1));
    viewMode2 = vm2;
    html.main.setAttribute('data-viewMode2', enumToStr(ViewMode2, vm2));
}

"use strict";

"use strict";
//dialogs add themselves here, then dialogManager takes them. Should be a static property of _DialogManager_ but js is shit
let unregisteredDialogs = {};
let dialogManager = null;
class _DialogManager_ {
    constructor() {
        this.boardID = null; //Id of currently open board in some dialog
        this.boardView = null;
        this.dialogs = {}; //Dialog objects add themselves here as properties
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
        if (event.target == this.dialogBack) //if no bubbling
            dialogManager.closeDialog(true, true); //backClicked =true
    }
    addDialog(name, dialog) {
        this.dialogs[name] = dialog;
    }
    openDialog(dialog, boardId, boardView) {
        //this.closeDialog(false, true); //close and reset all first
        this.dialogBack.classList.toggle('hidden', false);
        this.boardID = boardId;
        this.boardView = boardView;
        this.dialogs[dialog].open();
    }
    //close all
    closeDialog(backClicked, all) {
        if (all)
            for (let k in this.dialogs)
                if (this.dialogs[k].isOpen)
                    this.dialogs[k].close(backClicked ? null : false);
        this.dialogBack.classList.toggle('hidden', true);
        /*
        Close gets called twice (backclick, then dialog.close)
        if dialog edited boards, the board element will be changed (page draw)
        so if we focus now, it will still get changed in page draw :(
        */
        if (all == false) { //if all == false we are closing from dialog.close, so its the FIRST closing (backClick is second). So we still have our boardView
            if (this.boardView != null)
                navigation.focusView(this.boardView);
            else
                navigation.focusDefault(); //reset
        }
        this.boardID = null;
        this.boardView = null;
    }
}

"use strict";
//~!! See end of file below class, dialog gets added to unregisteredDialogs !!~//
class _dialog_optionsDialog_ {
    constructor() {
        this.isOpen = false;
        this.dialog = null;
    }
    init() {
        this.isOpen = false;
        this.dialog = EbyId('dialog_optionsDialog');
        EbyName('remove', this.dialog).onclick = this.remove_onclick.bind(this);
        EbyName('delete', this.dialog).onclick = this.delete_onclick.bind(this);
        EbyName('copy', this.dialog).onclick = this.copy_onclick.bind(this);
        EbyName('references', this.dialog).onclick = this.references_onclick.bind(this);
        EbyName('extras', this.dialog).onclick = this.extras_onclick.bind(this);
    }
    open() {
        this.isOpen = true;
        this.dialog.classList.toggle('hidden', false);
        navigation.focus(EbyName('remove', this.dialog));
    }
    //save == null when autoclose
    close() {
        this.dialog.classList.toggle('hidden', true);
        this.isOpen = false;
        dialogManager.closeDialog(false, false);
    }
    remove_onclick(event) {
        let refCount = Board.countReferences(dialogManager.boardID);
        if (refCount <= 1 && confirm('This is the last reference to this board, really remove it? (Will delete the board)') == false)
            return;
        if (pb.boards[board].type == BoardType.Board) {
            pb.boards[board].content.splice(dialogManager.boardView.index - 1, 1); //////?????/////TODO test it out, not sure about index
        }
        else if (pb.boards[board].type == BoardType.List) {
            pb.boards[board].content.splice(dialogManager.boardView.index, 1); //////?????/////TODO test it out, not sure about index
        }
        if (refCount <= 1) //is now 0
            Board.deleteBoardById(dialogManager.boardID);
        boardsUpdated(UpdateSaveType.SaveNow);
        this.close();
    }
    delete_onclick(event) {
        if (confirm('Really delete this board, all references to it and its content (content will be removed, not deleted)?') == false)
            return;
        Board.deleteBoardById(dialogManager.boardID);
        boardsUpdated(UpdateSaveType.SaveNow);
        this.close();
    }
    copy_onclick(event) {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", dialogManager.boardID);
        this.close();
    }
    references_onclick(event) {
        let brdID = dialogManager.boardID;
        let brdView = dialogManager.boardView;
        this.close();
        /* //////////////////////TODO implement this
        
        if(brdAttr(dialogManager.boardID,'references') == 1) return alert('This is the only reference');
      
        let listReferences = [];
      
        //go thru every board get references
        let ids = Object.keys(pb.boards);
      
        for(let i = 0; i < ids.length; i++)
          if(pb.boards[ids[i]].type == BoardType.List)
            if(pb.boards[ids[i]].content.includes(dialogManager.boardID))
              listReferences.push(ids[i]);
            
        
      
        let boardReferences = {};
      
        //go thru each board, see if it includes any of the listReferences
        for(let i = 0; i < ids.length; i++)
          if(pb.boards[ids[i]].type == BoardType.Board)
            for(let j = 0; j < listReferences.length; j++)
              if(pb.boards[ids[i]].content.includes(listReferences[j]))
                boardReferences[ids[i]] = null; //just some value
      
      
      
        let btnTemplate = templateFChild('referencesDialogBtn');
        let list = EbyId('referencesDialogList');
      
        //clear previous buttons
        while (list.firstChild)
          list.removeChild(list.firstChild)
        
      
        let modal = $('#referencesDialog')
        let brds = Object.keys(boardReferences)
      
        for(let i = 0; i < brds.length; i++){
          let el = btnTemplate.cloneNode(true)
          //modal[0].appendChild(el);
      
          list.appendChild(el)
      
          set_dataId(el, brds[i])
      
          if(brds[i] == "")
            $(el).text('Main Board')
          else
            $(el).text('List(s) on Board ' + brds[i])
        }
      
        set_dataId(modal[0], brd);
        (<JQuery<any> &{modal:any}> modal).modal('show');
        */
    }
    extras_onclick() {
        //showExtras();////////////////////////////////////TODO/////////////////////////////////////////
    }
}
unregisteredDialogs['optionsDialog'] = new _dialog_optionsDialog_();

"use strict";
//~!! See end of file below class, dialog gets added to unregisteredDialogs !!~//
class _dialog_textEditor_ {
    constructor() {
        this.isOpen = false;
        this.dialog = null;
        this.textTitle = null;
        this.textText = null;
    }
    init() {
        this.isOpen = false;
        this.dialog = EbyId('dialog_textEditor');
        this.textTitle = EbyName('textTitle', this.dialog);
        this.textText = EbyName('textText', this.dialog);
        this.textTitle.oninput = textareaAutoSize.bind(null, this.textTitle);
        EbyName('closeBtn', this.dialog).onclick = this.closeNoSave.bind(this, false);
        EbyName('fullscreenBtn', this.dialog).onclick = this.fullscreen.bind(this, null);
    }
    open() {
        this.isOpen = true;
        this.dialog.classList.toggle('hidden', false);
        this.fullscreen(false); ////////////TODO add options?
        this.textTitle.value = pb.boards[dialogManager.boardID].name;
        this.textText.value = pb.boards[dialogManager.boardID].content;
        textareaAutoSize(this.textTitle);
        if (this.textTitle.value == "") {
            this.textTitle.select(); //auto select title
        }
        else {
            this.textText.select(); //auto select text
            this.textText.setSelectionRange(0, 0); //sel start
        }
        navigation.focus(this.textTitle, true);
    }
    //save == null when autoclose
    close(save = false) {
        if (save === null)
            save = true; //either back clicked or specifically called to true
        if (save) {
            pb.boards[dialogManager.boardID].name = this.textTitle.value;
            pb.boards[dialogManager.boardID].content = this.textText.value;
            boardsUpdated(UpdateSaveType.SaveNow, dialogManager.boardID);
        }
        this.dialog.classList.toggle('hidden', true);
        this.isOpen = false;
        dialogManager.closeDialog(false, false);
    }
    closeNoSave(force = false) {
        let go = force;
        if (go == false)
            go = confirm("Exit without saving?");
        if (go == false)
            return;
        this.close(false);
    }
    fullscreen(force = null) {
        if (force === false || this.dialog.style.maxWidth != "") {
            this.dialog.style.maxWidth = "";
            this.dialog.style.maxHeight = "";
        }
        else {
            this.dialog.style.maxWidth = "100%";
            this.dialog.style.maxHeight = "100%";
        }
    }
}
unregisteredDialogs['textEditor'] = new _dialog_textEditor_();

"use strict";
class Extension {
    constructor(name = "", description = "", code = "", id = null) {
        if (id === null)
            id = Extension.makeId(16);
        this.id = id;
        this.name = name;
        this.description = description;
        this.code = code;
    }
    static makeId(maxLength) {
        let id = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        //find unique id
        while (true) {
            id = "";
            //let length = Math.floor(Math.random() * maxLength) + 1;
            let length = maxLength;
            //generate rand chars and append
            for (let i = 0; i < length; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));
            if (pb.extensions[id] == null)
                break;
        }
        return id;
    }
    static findExtensionByName(name) {
        let k = Object.keys(pb.extensions);
        for (let j = 0; j < k.length; j++)
            if (pb.extensions[k[j]].name == name)
                return k[j];
        return null;
    }
}

"use strict";
let EXTENSIONS_DISABLED = true; ////////////TODO load from preferences
const extensions = {
    //arrays of callbacks that get called when event invoked
    listeners: ///////////TODO change from holding Array<Function> to holding Array<{string:Function}>? So you can subscribe and unsubscribe too!
    {
        newPage: [],
        pre_newPage: [],
        saveAll: [],
        pre_saveAll: [],
        loadAll: [],
        pre_loadAll: [],
        draw: [],
        buildPBoard: [],
        loadSaveFile: [],
        loadCached: [],
    },
    invoke(listener = "") {
        if (EXTENSIONS_DISABLED)
            return;
        dbg('Invoking listener:', listener);
        for (let i = 0; i < this.listeners[listener].length; i++)
            if (this.listeners[listener])
                this.listeners[listener][i]();
        this.listeners[listener] = [];
    },
    execute() {
        if (EXTENSIONS_DISABLED)
            return;
        dbg('extensions.execute()');
        let exts = brdAttrOrDef(board, 'extensions', []);
        for (let i = 0; i < exts.length; i++) {
            if (exts[i].on) {
                dbg('executing extension ' + exts[i].id);
                eval(pb.extensions[exts[i].id].code);
            }
        }
    }
};

"use strict";
const StorageType = {
    // 0 is local, none, cache ? Idk
    None: 0,
    ElectronLocal: 1,
    Drive: 2,
};

"use strict";
let storage = null;
class _Storage_ {
    constructor(storageType) {
        this.type = storageType;
        _Sync_.init(); //so both are initialized
    }
    static init(storageType) { if (storage == null)
        storage = new _Storage_(storageType); }
    OnStorageLoad(_storageType) {
        if (this.type != _storageType)
            return;
        board = boardFromUrl();
        dbg('Storage loaded, initial reset or load');
        if (this.type == StorageType.None) // Since we just loaded None type
            return resetPB();
        if (sync.loadCachedContent() == false) //load from cache or reset
            resetPB();
        else
            draw(); //draw cache opened
        sync.loadAll(); //sync with cloud
        sync.start(true, false); // dont want to auto load
    }
    //file: name, body
    fileUpload(file, callback = null) {
        if (this.type == StorageType.Drive)
            return storage_gDrive.fileUpload(file, callback);
        if (this.type == StorageType.ElectronLocal)
            return storage_electronLocal.fileUpload(file, callback);
        throw new Error('NO STORAGE?!?!??!');
    }
    //If downloaded, pass contents. Else pass null to callback
    fileDownload(callback) {
        if (this.type == StorageType.Drive)
            return storage_gDrive.fileDownload(callback);
        if (this.type == StorageType.ElectronLocal)
            return storage_electronLocal.fileDownload(callback);
        throw new Error('NO STORAGE?!?!??!');
    }
}

"use strict";
let SAVING_DISASBLED = false;
let CACHE_DISABLED = true;
let SAVE_FILENAME = 'pboard.pb';
let sync = null;
class _Sync_ {
    constructor() {
        this.fileName = SAVE_FILENAME;
        this.lastSyncTime = -1; //if older than cloud one, load the cloud version
        this.syncedOnline = false; //synced from online (non cache) at least once
        this.syncSkips = 0; //if not in focus, see the load interval
        this.syncSkipsTimes = 5; //how many times to skip if not in focus
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
                dbg('sync save');
                sync.saveAll();
            }, pb.preferences['autoSaveInterval'] * 1000);
        if (autoLoad && pb.preferences['autoLoadInterval'] != '0')
            this.load.interval = setInterval(() => {
                //let checksum = hash(buildPBoard())
                //dont do if not in focus, save bandwith
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
    //loads pb from cookies, if it exists, else returns false
    loadCachedContent() {
        if (CACHE_DISABLED)
            return false; ////////////////////////TODO add option to disable cache? allow? idk.
        let contents = window.localStorage.getItem('cached');
        if (contents == null || contents == undefined)
            return false;
        if (loadSaveFile(contents))
            dbg('loading from cache');
        else
            dbg('not loading from cache');
        extensions.invoke('loadCached');
        return true;
    }
    saveCachedContent(contents) {
        if (CACHE_DISABLED)
            return;
        window.localStorage.setItem('cached', contents);
        //setCookie('cached', contents)
    }
    setDirty() {
        this.save.dirty = true;
        startDirtyIndicator();
    }
    saveAll(callback = null) {
        if (SAVING_DISASBLED)
            return;
        try {
            extensions.invoke('pre_saveAll');
            this.setSyncTime();
            let saveFile = buildPBoard();
            dbg('saveAll');
            if (this.syncedOnline == false)
                return console.warn('Wont save: Not once synced with online. Wait or refresh.');
            startSavingIndicator();
            this.saveCachedContent(saveFile);
            storage.fileUpload(saveFile, () => {
                if (callback != null)
                    callback();
                stopSavingIndicator();
                extensions.invoke('saveAll');
                sync.save.dirty = false;
            });
        }
        catch (e) {
            throw e;
        }
    }
    loadAll(callback = null) {
        try {
            extensions.invoke('pre_loadAll');
            startLoadingIndicator();
            storage.fileDownload((contents) => {
                stopLoadingIndicator();
                this.syncedOnline = true;
                if (contents != null && contents != '') {
                    dbg('loadAll');
                    loadSaveFile(contents);
                    extensions.invoke('loadAll');
                }
                else {
                    dbg('loaded null, resetting');
                    resetPB();
                }
                if (callback)
                    callback(contents);
                //stopLoadingIndicator()
            });
        }
        catch (e) {
            throw e;
        }
    }
}

"use strict";
const storage_electronLocal = {
    ipcRenderer: null,
    OnStorageLoad() {
        if (typeof require === 'undefined')
            return;
        const { ipcRenderer } = require('electron');
        this.ipcRenderer = ipcRenderer;
        storage.OnStorageLoad(StorageType.ElectronLocal);
    },
    fileUpload(contents, callback = null) {
        this.ipcRenderer.sendSync('synchronous-message', { cmd: 'save', data: contents });
        setTimeout(() => {
            if (callback)
                callback();
        }, 400); //So save icon stays a bit
    },
    fileDownload(callback) {
        let contents = this.ipcRenderer.sendSync('synchronous-message', { cmd: 'load' });
        if (callback)
            callback(contents);
    },
};
waitCall(storage_electronLocal.OnStorageLoad.bind(storage_electronLocal)); //Since local but we wait for other js

"use strict";
const driveAPI_Creds = {
    apiKey: 'AIzaSyDXQ9Z_V5TSX-yepF3DYKVjTIWVwpwuoXU',
    clientId: '644898318398-d8rbskiha2obkrrdfjf99qcg773n789i.apps.googleusercontent.com',
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file' //space separated
};
const storage_gDrive = {
    loaded: false,
    //Init drive api and listen for signIn changes
    OnStorageLoad() {
        let updateDriveSigninStatus = (isSignedIn) => {
            if (isSignedIn == false)
                return header.goLogin();
            this.loaded = true;
            storage.OnStorageLoad(StorageType.Drive);
        };
        gapi.load('client:auth2', () => {
            gapi.client.init(driveAPI_Creds)
                .then(() => {
                //Listen for sign in changes and call updateSigninStatus, as well as call the initial one
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateDriveSigninStatus);
                updateDriveSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            }, (error) => {
                throw error;
                header.goLogin(); //error initing drive, probably not logged in
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
            .catch((err) => { throw err; callback(null); });
    },
    //file: name, body
    fileUpload(contents, callback = null) {
        let file = { name: sync.fileName, body: contents, mimeType: 'text/plain' };
        this.fileIdByName(file.name, (fileId) => {
            if (fileId == null) { //doesnt exist yet. Save it.
                let fileBlob = new Blob([file.body], { type: 'text/plain' });
                let metadata = {
                    'name': file.name,
                    'mimeType': file.mimeType // mimeType at Google Drive
                };
                let accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
                let form = new FormData();
                form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                form.append('file', fileBlob);
                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                xhr.responseType = 'json';
                xhr.onload = () => {
                    //log(xhr.response); // Retrieve uploaded file ID.
                    if (callback)
                        callback(xhr.response);
                };
                xhr.send(form);
            }
            else { //Already exists, update it.
                let fileBlob = new Blob([file.body]);
                /*
                let metadata = {
                   'name': file.name, // Filename at Google Drive
                   'mimeType': file.mimeType // mimeType at Google Drive
                };
                */
                let accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
                let xhr = new XMLHttpRequest();
                xhr.open('PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + fileId);
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                xhr.responseType = 'json';
                xhr.onload = () => {
                    //log(xhr.response); // Retrieve uploaded file ID.
                    if (callback)
                        callback(xhr.response);
                };
                xhr.send(fileBlob);
            }
        });
    },
    //If downloaded, pass contents. Else pass null to callback
    fileDownload(callback) {
        this.fileIdByName(sync.fileName, (fileId) => {
            if (fileId != null) {
                dbg('get fileId is :', fileId);
                gapi.client.drive.files.get({
                    'fileId': fileId,
                    'alt': 'media'
                })
                    .then((response, rawData) => {
                    callback(response.body); //result: false, body: ''
                })
                    .catch((fail) => {
                    dbg('fail', fail);
                    callback(null);
                });
            }
            else {
                dbg('get fileId is NULL');
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
                    dbg(response, 'fileDelete log');
                })
                    .catch((err) => { dbg(err, 'fileDelete err '); if (callback !== null)
                    callback(null); });
            }
        });
    },
};
