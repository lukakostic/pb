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
        this.buildSelf();
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
    render() {
        super.render();
    }
}
class ListView extends HolderView {
    constructor(_id = "", _parentEl = null) {
        super(_id, _parentEl);
    }
    render() {
        super.render();
    }
}
class TileView {
    constructor(_id = "", _parentEl = null) {
        this.id = _id;
        this.parentEl = _parentEl;
        this.htmlEl = null;
        this.tileType = pb.boards[_id].type;
    }
    buildSelf() {
        if (this.htmlEl == null) {
            this.htmlEl = html.textBrdTemplate.cloneNode(true);
            this.parentEl.appendChild(this.htmlEl);
        }
    }
    render() {
        this.buildSelf();
    }
    renderById(_id) {
        if (this.id == _id)
            return this.render();
    }
}
