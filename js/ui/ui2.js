let drags = {
    dragOld: null, dragNew: null, dragItem: null,
    oldDragIndex: -1, newDragIndex: -1,
    dragStartTime: -999
};
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
function moveBoards(fromId, fromIndex, toId, toIndex, length = 1) {
    let boards = pb.boards[fromId].content.splice(fromIndex, length);
    pb.boards[toId].content.splice(toIndex, 0, ...boards);
    boardsUpdated([fromId, toId]);
}
function makeBoardsDraggable() {
    let draggableLists = $('.draggableList');
    if (draggableLists.length !== 0)
        draggableLists.sortable({
            items: '.draggable',
            start: (event, drag) => {
                log('drag start');
                drags.dragItem = drag.item;
                drags.oldDragIndex = elementIndex(drags.dragItem[0]);
                drags.dragNew = drags.dragOld = drag.item.parent();
                drags.dragStartTime = (new Date()).getTime();
            },
            stop: (event, drag) => {
                log('drag stop');
                setTimeout(() => {
                    drags.newDragIndex = elementIndex(drags.dragItem[0]);
                    moveBoards(dataId(drags.dragOld[0]), drags.oldDragIndex - 1, dataId(drags.dragNew[0]), drags.newDragIndex - 1);
                    let clickItem = null;
                    if (((new Date()).getTime() - drags.dragStartTime) < 200 && drags.newDragIndex == drags.oldDragIndex) {
                        clickItem = drags.dragItem.find('div');
                    }
                    else
                        sync.saveAll();
                    drags.dragItem = null;
                    if (clickItem != null)
                        clickItem.click();
                }, 50);
            },
            change: (event, drag) => {
                log('drag change');
                if (drag.sender)
                    drags.dragNew = drag.placeholder.parent();
                fixListUI(drags.dragNew[0]);
            },
            connectWith: ".draggableList"
        }).disableSelection();
}
function makeListsDraggable() {
    let draggableAlbums = $('.draggableAlbum');
    if (draggableAlbums.length !== 0)
        draggableAlbums.sortable({
            items: '.draggableList',
            start: (event, drag) => {
                log('drag list start');
                drags.dragItem = drag.item;
                drags.oldDragIndex = elementIndex(drags.dragItem[0]);
                drags.dragStartTime = (new Date()).getTime();
            },
            stop: (event, drag) => {
                log('drag list stop');
                setTimeout(() => {
                    drags.newDragIndex = elementIndex(drags.dragItem[0]);
                    moveBoards(board, drags.oldDragIndex, board, drags.newDragIndex);
                    drags.dragItem = null;
                    sync.saveAll();
                }, 50);
            },
            change: (event, ui) => {
                log('drag list change');
            }
        }).disableSelection();
}
