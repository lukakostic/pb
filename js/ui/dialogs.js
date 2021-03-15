function showBoardBoardDialog(event, id = null) {
    if (event.srcElement == null)
        event.srcElement = event.target;
    if (drags.dragItem != null && (event.srcElement == drags.dragItem[0] || event.srcElement.parentNode == drags.dragItem[0]))
        return;
    if (id == null)
        id = dataId(event.srcElement.parentNode);
    set_board(id);
}
function listTitleClicked(event) {
    if (event.srcElement == null)
        event.srcElement = event.target;
    let titleText = event.srcElement;
    $(titleText).focus();
    try {
        document.execCommand('selectAll', false, null);
    }
    catch (e) { }
    log('Title click');
}
function listTitleBlur(event) {
    if (event.srcElement == null)
        event.srcElement = event.target;
    let titleText = event.srcElement;
    log('Title blur');
}
