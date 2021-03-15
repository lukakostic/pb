function newText() { }
function newBoard() { }
function newList(parentId, name) {
    let brd = new Board(BoardType.List, name, [], { references: 1 });
    pb.boards[brd.id] = brd;
    pb.boards[parentId].content.push(brd.id);
    mainView.render();
    sync.saveAll();
}
