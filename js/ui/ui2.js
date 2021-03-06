function fixNewListUI() {
    let newlist = EbyId('newlist');
    newlist.parentNode.appendChild(newlist);
}
function fixAlbumUI() {
    let album = EbyId('boardAlbum');
    let columnWidth = 310;
    if (album) {
        album.style.setProperty('width', ((columnWidth * album.childElementCount) + 10 + 8).toString() + 'px');
        return album;
    }
    return null;
}
function fixListUI(listEl = null) {
    if (listEl != null) {
        let newPanel = EbyClass('newPanel', listEl)[0];
        newPanel.parentNode.appendChild(newPanel);
    }
    else {
        let album = this.fixAlbumUI();
        let lists = EbyClass('list', album);
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].id == "")
                this.fixListUI(lists[i]);
        }
    }
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
function expandInputAll() {
    let expandoInputs = EbyClass('expandInput');
    for (let i = 0; i < expandoInputs.length; i++)
        this.expandInput(expandoInputs[i]);
}
function expandInput(el) {
    el.style.height = '1px';
    el.style.height = (1 + el.scrollHeight) + 'px';
    el.parentNode.style.height = el.style.height;
}
function makeDraggable() {
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
                    pb.boards[dataId(drags.dragOld[0])].content.splice(drags.oldDragIndex - 1, 1);
                    pb.boards[dataId(drags.dragNew[0])].content.splice(drags.newDragIndex - 1, 0, dataId(drags.dragItem[0]));
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
                    pb.boards[board].content.splice(drags.oldDragIndex, 1);
                    pb.boards[board].content.splice(drags.newDragIndex, 0, dataId(drags.dragItem[0]));
                    drags.dragItem = null;
                    sync.saveAll();
                }, 50);
            },
            change: (event, ui) => {
                log('drag list change');
            }
        }).disableSelection();
}
