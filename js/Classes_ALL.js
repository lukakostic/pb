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
        while (true) {
            id = "";
            let length = maxLength;
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

const BoardType = {
    Text: 1,
    Board: 2,
    List: 3,
    toString(val) {
        for (let k in this)
            if (this[k] == val)
                return k;
        return null;
    }
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
            'autoSaveInterval': 30,
            'autoLoadInterval': 5
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
        if (url.includes('?b=')) {
            for (let i = url.indexOf('?b=') + 3; i < url.length && url[i] != '?'; i++)
                boardId += url[i];
        }
        return boardId;
    }
    static makeId(maxLength) {
        let id = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        while (true) {
            id = "";
            let length = maxLength;
            for (let i = 0; i < length; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));
            if (pb.boards[id] == null)
                break;
        }
        return id;
    }
    static deleteBoardById(id) {
        if (id == "")
            return;
        delete pb.boards[id];
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
        while (true) {
            id = "";
            let length = maxLength;
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
    static AllUpstreamParents(tagChild, oldLst = {}) {
        let lst = oldLst;
        for (let i = 0; i < pb.tags[tagChild].parentTags.length; i++) {
            if (lst[pb.tags[tagChild].parentTags[i]] == null) {
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

class View {
    constructor(_id = "", _parent, _index) {
        this.discarded = false;
        this.id = _id;
        this.parent = _parent;
        this.index = _index;
        this.htmlEl = null;
    }
    destructor() {
        console.log('View destructor');
        if (this.discarded)
            return null;
        this.clearHTML();
        for (let p in this)
            this[p] = undefined;
        this.discarded = true;
        return null;
    }
    buildHTML() { }
    clearHTML() {
        if (this.htmlEl != null)
            this.htmlEl.outerHTML = "";
        this.htmlEl = null;
    }
    attachToParent() {
        if (this.parent != null) {
            if (this.parent.holderElement != undefined)
                this.parent.holderElement.appendChild(this.htmlEl);
            else
                this.parent.htmlEl.appendChild(this.htmlEl);
        }
        else
            html.main.appendChild(this.htmlEl);
    }
    update(_id, _index = null) {
        let changed = false;
        if (this.id != _id)
            changed = true;
        if (changed && pb.boards[_id].type != pb.boards[this.id].type)
            return this.destructor();
        this.id = _id;
        if (_index !== null)
            this.index = _index;
        if (changed)
            this.clearHTML();
        return this;
    }
    render() { }
    renderById(_id) {
        if (this.id == _id)
            return this.render();
    }
}

class ViewTree extends View {
    constructor(_id = "", _parent, _index) {
        super(_id, _parent, _index);
        this.holderElement = null;
        this.elements = [];
        if (this.parent == null)
            setMainView(this);
    }
    destructor() {
        console.log('ViewTree destructor');
        if (this.discarded)
            return null;
        console.log('discarded? ', this);
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].clearHTML();
            this.elements[i].destructor();
        }
        this.elements = undefined;
        return super.destructor();
    }
    buildHTML() {
        this.holderElement.innerHTML = "";
        this.elementsToLength();
        for (let i = 0; i < this.elements.length; i++)
            this.elements[i].clearHTML();
    }
    clearHTML() {
        if (this.elements !== undefined) {
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
        if (this.parent == null)
            setMainView(this);
        for (let i = 0; i < this.elements.length; i++)
            this.elements[i].render();
    }
    renderById(_id) {
        super.renderById(_id);
        for (let i = 0; i < this.elements.length; i++)
            this.elements[i].renderById(_id);
    }
    elementsToLength() {
        let length = pb.boards[this.id].content.length;
        let len = this.elements.length;
        let dif = length - len;
        if (dif > 0) {
            for (let i = 0; i < dif; i++)
                this.elements.push(null);
        }
        else if (dif < 0) {
            for (let i = 0; i < -dif; i++) {
                this.elements[this.elements.length - 1].destructor();
                this.elements.pop();
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            let makeNew = (this.elements[i] === null);
            if (makeNew == false && this.elements[i].update(pb.boards[this.id].content[i], i) == null)
                makeNew = true;
            if (makeNew)
                this.elements[i] = generateView(pb.boards[this.id].content[i], this, i);
        }
    }
}

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
        super.buildHTML();
    }
    render() {
        this.buildHTML();
        super.render();
    }
    adder_onkeypress(event) {
        if (event.key !== 'Enter')
            return;
        newList(this.id, this.adder.value);
        this.adder.value = "";
    }
}

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
            this.title.onkeypress = this.title_onkeypress.bind(this);
            this.title.onblur = this.title_onblur.bind(this);
            (this.optionsBtn = EbyName('list-optionsBtn', this.htmlEl)).onclick = this.optionsBtn_onclick.bind(this);
            this.adder = EbyName('list-adder', this.htmlEl);
            (this.adderText = EbyName('list-adder-text', this.htmlEl)).onclick = this.adderText_onclick.bind(this);
            (this.adderBoard = EbyName('list-adder-board', this.htmlEl)).onclick = this.adderBoard_onclick.bind(this);
            (this.adderList = EbyName('list-adder-list', this.htmlEl)).onclick = this.adderList_onclick.bind(this);
            (this.adderReference = EbyName('list-adder-reference', this.htmlEl)).onclick = this.adderReference_onclick.bind(this);
        }
        this.htmlEl.setAttribute('data-id', this.id);
        super.buildHTML();
    }
    render() {
        this.buildHTML();
        if (this.parent == null)
            this.header.classList.add('hidden');
        this.title.value = pb.boards[this.id].name;
        super.render();
    }
    title_onkeypress(event) {
        if (event.key !== 'Enter')
            return;
        pb.boards[this.id].name = this.title.value;
        boardsUpdated([this.id], false, 2);
    }
    title_onblur(event) {
        this.title.value = pb.boards[this.id].name;
    }
    optionsBtn_onclick(event) {
        openOptionsDialog(this.id, this);
    }
    adderText_onclick(event) {
        let id = newText(this.id, null);
        openBoard(id, this);
    }
    adderBoard_onclick(event) {
        let name = window.prompt("Board name?: ");
        if (name == "" || name == null)
            return;
        let id = newBoard(this.id, name);
        openBoard(id, this);
    }
    adderList_onclick(event) {
        let name = window.prompt("List name?: ");
        if (name == "" || name == null)
            return;
        let id = newList(this.id, name);
        openBoard(id, this);
    }
    adderReference_onclick(event) {
        newReference(this.id, null);
    }
}

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
            this.optionsBtn.addEventListener('openEvent', this.openEvent.bind(this), false);
        }
        this.htmlEl.setAttribute('data-id', this.id);
    }
    render() {
        this.buildHTML();
        let titleText = pb.boards[this.id].name;
        if (titleText.trim() == '')
            titleText = "\xa0";
        this.text.childNodes[1].nodeValue = titleText;
        this.htmlEl.setAttribute('data-type', BoardType.toString(pb.boards[this.id].type));
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
        this.openEvent();
    }
    openEvent() {
        openBoard(this.id, this);
    }
}
