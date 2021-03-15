function newText(parentId, name = null) {
    if (name == null)
        name = "Text";
    let brd = new Board(BoardType.Text, name, "", { references: 1 });
    pb.boards[brd.id] = brd;
    pb.boards[parentId].content.push(brd.id);
    mainView.render();
    sync.saveAll();
    return brd.id;
}
function newBoard(parentId, name = null) {
    if (name == null)
        name = "Board";
    let atr = { description: '', references: 1 };
    let brd = new Board(BoardType.Board, name, [], atr);
    pb.boards[brd.id] = brd;
    pb.boards[parentId].content.push(brd.id);
    mainView.render();
    sync.saveAll();
    return brd.id;
}
function newList(parentId, name = null) {
    if (name == null)
        name = "List";
    let brd = new Board(BoardType.List, name, [], { references: 1 });
    pb.boards[brd.id] = brd;
    pb.boards[parentId].content.push(brd.id);
    mainView.render();
    sync.saveAll();
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
    pb.boards[id].attributes['references']++;
    mainView.render();
    sync.saveAll();
    return id;
}
