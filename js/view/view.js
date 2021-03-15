const ViewMode = {
    List: 0,
    Board: 1
};
let mainView = null;
let viewMode = ViewMode.List;
function setMainView(v) {
    mainView = v;
    if (pb.boards[v.id].type == BoardType.List)
        viewMode = ViewMode.List;
    else
        viewMode = ViewMode.Board;
}
function clearMainView() {
    mainView = null;
    html.main.innerHTML = "";
    viewMode = ViewMode.List;
}
function generateView(_id, _parentEl) {
    let type = pb.boards[_id].type;
    if (_parentEl == html.main) {
        if (type == BoardType.List)
            return new ListView(_id, _parentEl);
        if (type == BoardType.Text)
            throw "Trying to open text fullscreen";
        return new AlbumView(_id, _parentEl);
    }
    else if (viewMode == ViewMode.Board) {
        if (type == BoardType.List)
            return new ListView(_id, _parentEl);
        return new TileView(_id, _parentEl);
    }
    else if (viewMode == ViewMode.List) {
        return new TileView(_id, _parentEl);
    }
    return null;
}
class HolderView {
    constructor(_id = "", _parentEl) {
        this.id = _id;
        this.parentEl = _parentEl;
        this.htmlEl = null;
        this.holderElement = null;
        this.elements = [];
        if (this.parentEl == html.main)
            setMainView(this);
    }
    generateElements() {
        if (pb.boards[this.id].type != BoardType.List && pb.boards[this.id].type != BoardType.PBoard)
            throw 'HolderView used for non holder type of board (PBoard | List)';
        this.elements.length = pb.boards[this.id].content.length;
        for (let i = 0; i < pb.boards[this.id].content.length; i++) {
            let brdId = pb.boards[this.id].content[i];
            if (this.elements[i] == undefined)
                this.elements[i] = generateView(pb.boards[this.id].content[i], this.holderElement);
            else
                this.elements[i].id = pb.boards[this.id].content[i];
        }
    }
    buildSelf() {
        this.generateElements();
    }
    render() {
        for (let i = 0; i < this.elements.length; i++)
            this.elements[i].render();
    }
    renderById(_id) {
        if (this.id == _id)
            return this.render();
        for (let i = 0; i < this.elements.length; i++)
            this.elements[i].renderById(_id);
    }
}
class AlbumView extends HolderView {
    constructor(_id = "", _parentEl) {
        super(_id, _parentEl);
    }
    buildSelf() {
        if (this.htmlEl != null && this.htmlEl.parentElement == null)
            this.htmlEl = null;
        if (this.htmlEl == null) {
            this.htmlEl = html.albumTemplate.cloneNode(true);
            this.parentEl.appendChild(this.htmlEl);
            this.holderElement = EbyName('album-holder', this.htmlEl);
            this.adder = EbyName('album-adder', this.htmlEl);
            this.adder.onkeypress = this.adder_onkeypress.bind(this);
        }
        this.htmlEl.setAttribute('data-id', this.id);
        this.holderElement.innerHTML = "";
        super.buildSelf();
    }
    render() {
        this.buildSelf();
        super.render();
    }
    adder_onkeypress(event) {
        if (event.key !== 'Enter')
            return;
        newList(this.id, this.adder.value);
        this.adder.value = "";
    }
}
class ListView extends HolderView {
    constructor(_id = "", _parentEl) {
        super(_id, _parentEl);
    }
    buildSelf() {
        if (this.htmlEl != null && this.htmlEl.parentElement == null)
            this.htmlEl = null;
        if (this.htmlEl == null) {
            this.htmlEl = html.list2Template.cloneNode(true);
            this.parentEl.appendChild(this.htmlEl);
            this.holderElement = EbyName('list-holder', this.htmlEl);
            this.header = EbyName('list-header', this.htmlEl);
            this.title = EbyName('list-title', this.htmlEl);
            this.title.onkeypress = this.title_onkeypress.bind(this);
            this.title.onblur = this.title_onblur.bind(this);
            this.optionsBtn = EbyName('list-optionsBtn', this.htmlEl);
            this.optionsBtn.onclick = this.optionsBtn_onclick.bind(this);
            this.adder = EbyName('list-adder', this.htmlEl);
            this.adderText = EbyName('list-adder-text', this.htmlEl);
            this.adderText.onclick = this.adderText_onclick.bind(this);
            this.adderBoard = EbyName('list-adder-board', this.htmlEl);
            this.adderBoard.onclick = this.adderBoard_onclick.bind(this);
            this.adderList = EbyName('list-adder-list', this.htmlEl);
            this.adderList.onclick = this.adderList_onclick.bind(this);
            this.adderReference = EbyName('list-adder-reference', this.htmlEl);
            this.adderReference.onclick = this.adderReference_onclick.bind(this);
        }
        this.htmlEl.setAttribute('data-id', this.id);
        this.holderElement.innerHTML = "";
        super.buildSelf();
    }
    render() {
        this.buildSelf();
        this.title.value = pb.boards[this.id].name;
        super.render();
    }
    title_onkeypress(event) {
        if (event.key !== 'Enter')
            return;
        pb.boards[this.id].name = this.title.value;
        mainView.render();
        sync.saveAll();
    }
    title_onblur(event) {
        this.title.value = pb.boards[this.id].name;
    }
    optionsBtn_onclick(event) {
    }
    adderText_onclick(event) {
        let id = newText(this.id, null);
        openBoard(id);
    }
    adderBoard_onclick(event) {
        let id = newBoard(this.id, null);
        openBoard(id);
    }
    adderList_onclick(event) {
        let name = window.prompt("List name?: ");
        if (name == "" || name == null)
            return;
        let id = newList(this.id, name);
        if (viewMode == ViewMode.List)
            openBoard(id);
    }
    adderReference_onclick(event) {
        newReference(this.id, null);
    }
}
class TileView {
    constructor(_id = "", _parentEl) {
        this.id = _id;
        this.parentEl = _parentEl;
        this.htmlEl = null;
        this.optionsBtn = null;
        this.text = null;
        this.textIcon = null;
    }
    buildSelf() {
        if (this.htmlEl != null && this.htmlEl.parentElement == null)
            this.htmlEl = null;
        if (this.htmlEl == null) {
            this.htmlEl = html.tileTemplate.cloneNode(true);
            this.parentEl.appendChild(this.htmlEl);
            this.optionsBtn = EbyName('tile-optionsBtn', this.htmlEl);
            this.optionsBtn.onclick = this.optionsBtn_onclick.bind(this);
            this.text = EbyName('tile-text', this.htmlEl);
            this.text.onclick = this.text_onclick.bind(this);
            this.textIcon = EbyName('tile-textIcon', this.htmlEl);
        }
        this.htmlEl.setAttribute('data-id', this.id);
    }
    render() {
        this.buildSelf();
        this.text.childNodes[2].nodeValue = pb.boards[this.id].name;
        this.htmlEl.setAttribute('data-type', BoardTypeName(pb.boards[this.id].type));
        loadBackground(this.htmlEl, this.id);
        if (pb.boards[this.id].type == BoardType.Text && pb.boards[this.id].content.length > 0)
            this.textIcon.classList.remove('d-none');
        else
            this.textIcon.classList.add('d-none');
    }
    renderById(_id) {
        if (this.id == _id)
            return this.render();
    }
    optionsBtn_onclick(event) {
    }
    text_onclick(event) {
        openBoard(this.id);
    }
}
function openBoard(id) {
    console.log("board of id: " + id + " clicked");
    if (pb.boards[id].type == BoardType.Text) {
        alert("Text!");
        return;
    }
    set_board(id);
}
