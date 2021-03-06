ui.fixNewListUI = function () {
    let newlist = EbyId('newlist');
    newlist.parentNode.appendChild(newlist);
};
ui.fixAlbumUI = function () {
    let album = EbyId('boardAlbum');
    let columnWidth = 310;
    if (album) {
        album.style.setProperty('width', ((columnWidth * album.childElementCount) + 10 + 8).toString() + 'px');
        return album;
    }
    return null;
};
ui.fixListUI = function (listEl = null) {
    log(listEl, "LIST ELEMENT fixListUI: ");
    if (listEl != null) {
        let newPanel = EbyClass('newPanel', listEl)[0];
        newPanel.parentNode.appendChild(newPanel);
    }
    else {
        let album = this.fixAlbumUI();
        let lists = EbyClass('list', album)[0];
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].id == "")
                this.fixListUI(lists[i]);
        }
    }
};
ui.startSavingIndicator = function () {
    html.savingIndicator.style.display = 'block';
};
ui.stopSavingIndicator = function () {
    html.savingIndicator.style.display = 'none';
};
ui.startLoadingIndicator = function () {
    html.loadingIndicator.style.display = 'block';
};
ui.stopLoadingIndicator = function () {
    html.loadingIndicator.style.display = 'none';
};
ui.expandInputAll = function () {
    let expandoInputs = EbyClass('expandInput');
    for (let i = 0; i < expandoInputs.length; i++)
        this.expandInput(expandoInputs[i]);
};
ui.expandInput = function (el) {
    el.style.height = '1px';
    el.style.height = (1 + el.scrollHeight) + 'px';
    el.parentNode.style.height = el.style.height;
};
ui.makeDraggable = function () {
    let draggableLists = $('.draggableList');
    if (draggableLists.length !== 0)
        draggableLists.sortable({
            items: '.draggable',
            start: (event, drag) => {
                log('drag start');
                ui.drags.dragItem = drag.item;
                ui.drags.oldDragIndex = elementIndex(ui.drags.dragItem[0]);
                ui.drags.dragNew = ui.drags.dragOld = drag.item.parent();
                ui.drags.dragStartTime = (new Date()).getTime();
            },
            stop: (event, drag) => {
                log('drag stop');
                setTimeout(() => {
                    ui.drags.newDragIndex = elementIndex(ui.drags.dragItem[0]);
                    pb.boards[dataId(ui.drags.dragOld[0])].content.splice(ui.drags.oldDragIndex - 1, 1);
                    pb.boards[dataId(ui.drags.dragNew[0])].content.splice(ui.drags.newDragIndex - 1, 0, dataId(ui.drags.dragItem[0]));
                    let clickItem = null;
                    if (((new Date()).getTime() - ui.drags.dragStartTime) < 200 && ui.drags.newDragIndex == ui.drags.oldDragIndex) {
                        clickItem = ui.drags.dragItem.find('div');
                    }
                    else
                        sync.saveAll();
                    ui.drags.dragItem = null;
                    if (clickItem != null)
                        clickItem.click();
                }, 50);
            },
            change: (event, drag) => {
                log('drag change');
                if (drag.sender)
                    ui.drags.dragNew = drag.placeholder.parent();
                ui.fixListUI(ui.drags.dragNew[0]);
            },
            connectWith: ".draggableList"
        }).disableSelection();
    let draggableAlbums = $('.draggableAlbum');
    if (draggableAlbums.length !== 0)
        draggableAlbums.sortable({
            items: '.draggableList',
            start: (event, drag) => {
                log('drag list start');
                ui.drags.dragItem = drag.item;
                ui.drags.oldDragIndex = elementIndex(ui.drags.dragItem[0]);
                ui.drags.dragStartTime = (new Date()).getTime();
            },
            stop: (event, drag) => {
                log('drag list stop');
                setTimeout(() => {
                    ui.drags.newDragIndex = elementIndex(ui.drags.dragItem[0]);
                    pb.boards[board].content.splice(ui.drags.oldDragIndex, 1);
                    pb.boards[board].content.splice(ui.drags.newDragIndex, 0, dataId(ui.drags.dragItem[0]));
                    ui.drags.dragItem = null;
                    sync.saveAll();
                }, 50);
            },
            change: (event, ui) => {
                log('drag list change');
            }
        }).disableSelection();
};
