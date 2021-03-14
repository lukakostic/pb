let view = null;
function setView(v) {
    view = v;
}
function clearView() {
    view = null;
    html.main.innerHTML = "";
}
function generateView(_id, _parentEl = null) {
    let type = pb.boards[_id].type;
    if (type == BoardType.Text || type == BoardType.Board) {
        return new TileView(_id, _parentEl);
    }
    if (type == BoardType.List) {
        return new ListView(_id, _parentEl);
    }
    if (type == BoardType.PBoard) {
        return new AlbumView(_id, _parentEl);
    }
    return null;
}
class HolderView {
    constructor(_id = "", _parentEl = null) {
        this.id = _id;
        this.parentEl = _parentEl;
        this.htmlEl = null;
        this.holderElement = null;
        this.elements = [];
    }
    generateElements() {
        if (pb.boards[this.id].type != BoardType.List || pb.boards[this.id].type != BoardType.PBoard)
            throw 'HolderView used for non holder type of board (PBoard | List)';
        this.elements.length = pb.boards[this.id].content.length;
        for (let i = 0; i < pb.boards[this.id].content.length; i++) {
            let brdId = pb.boards[this.id].content[i];
            if (this.elements[i] == undefined)
                this.elements[i] = generateView(pb.boards[this.id].content[i]);
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
    constructor(_id = "", _parentEl = null) {
        super(_id, _parentEl);
    }
    buildSelf() {
        if (this.htmlEl == null) {
            this.htmlEl = html.albumTemplate.cloneNode(true);
            this.parentEl.appendChild(this.htmlEl);
            this.holderElement = EbyName('album-holder', this.htmlEl);
            this.adder = EbyName('album-adder', this.htmlEl);
            this.adder.onkeypress = this.adder_onkeypress;
        }
        this.htmlEl.setAttribute('data-id', this.id);
        this.holderElement.innerHTML = "";
    }
    render() {
        this.buildSelf();
        super.render();
    }
    adder_onkeypress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            alert(this.adder.value);
        }
    }
}
class ListView extends HolderView {
    constructor(_id = "", _parentEl = null) {
        super(_id, _parentEl);
    }
    buildSelf() {
        super.buildSelf();
        if (this.htmlEl == null) {
            this.htmlEl = html.list2Template.cloneNode(true);
            this.parentEl.appendChild(this.htmlEl);
            this.holderElement = EbyName('list-holder', this.htmlEl);
            this.header = EbyName('list-header', this.htmlEl);
            this.title = EbyName('list-title', this.htmlEl);
            this.title.onkeypress = this.title_onkeypress;
            this.optionsBtn = EbyName('list-optionsBtn', this.htmlEl);
            this.optionsBtn.onclick = this.optionsBtn_onclick;
            this.adder = EbyName('list-adder', this.htmlEl);
            this.adderText = EbyName('list-adderText', this.htmlEl);
            this.adderText.onclick = this.adderText_onclick;
            this.adderBoard = EbyName('list-adderBoard', this.htmlEl);
            this.adderBoard.onclick = this.adderBoard_onclick;
            this.adderList = EbyName('list-adderList', this.htmlEl);
            this.adderList.onclick = this.adderList_onclick;
            this.adderReference = EbyName('list-adderReference', this.htmlEl);
            this.adderReference.onclick = this.adderReference_onclick;
        }
        this.htmlEl.setAttribute('data-id', this.id);
        this.holderElement.innerHTML = "";
    }
    render() {
        this.buildSelf();
        super.render();
    }
    title_onkeypress(event) {
        alert(this.id);
        alert(this.title.outerHTML);
    }
    optionsBtn_onclick(event) {
    }
    adderText_onclick(event) {
    }
    adderBoard_onclick(event) {
    }
    adderList_onclick(event) {
    }
    adderReference_onclick(event) {
    }
}
class TileView {
    constructor(_id = "", _parentEl = null) {
        this.id = _id;
        this.parentEl = _parentEl;
        this.htmlEl = null;
        this.tileType = pb.boards[_id].type;
        this.optionsBtn = null;
        this.text = null;
        this.textIcon = null;
    }
    buildSelf() {
        if (this.htmlEl == null) {
            this.htmlEl = html.tileTemplate.cloneNode(true);
            this.parentEl.appendChild(this.htmlEl);
            this.optionsBtn = EbyName('tile-optionsBtn', this.htmlEl);
            this.optionsBtn.onclick = this.optionsBtn_onclick;
            this.text = EbyName('tile-text', this.htmlEl);
            this.text.onclick = this.text_onclick;
            this.textIcon = EbyName('tile-textIcon', this.htmlEl);
        }
        this.htmlEl.setAttribute('data-id', this.id);
    }
    render() {
        this.buildSelf();
        $(this.text).contents()[1].nodeValue = pb.boards[this.id].name;
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
    }
}
