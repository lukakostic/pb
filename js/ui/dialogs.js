function showBoardBoardDialog() { }
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
