let LOG_DISABLED = true;
let LOGW_DISABLED = true;
let LOGE_DISABLED = false;
let log = function () {
    if (LOG_DISABLED)
        return function () { };
    for (let i = 0; i < arguments.length; i++)
        if (arguments[i] instanceof Error)
            alert(arguments[i]);
    return Function.prototype.bind.call(console.log, console);
}();
let logw = function () {
    if (LOGW_DISABLED)
        return function () { };
    return Function.prototype.bind.call(console.warn, console);
}();
let loge = function () {
    if (LOGE_DISABLED)
        return function () { };
    return Function.prototype.bind.call(console.error, console);
}();
let alog = function () {
    return Function.prototype.bind.call(console.log, console);
}();
let mlog = function () {
    return Function.prototype.bind.call(console.log, console);
}();
function getMainCookie() {
    let cookieObj = Cookies.get('_');
    if (cookieObj == null || cookieObj == undefined || cookieObj == "")
        cookieObj = {};
    else
        cookieObj = JSON.parse(decodeURI(cookieObj));
    return cookieObj;
}
function setMainCookie(cookieObj) {
    Cookies.set('_', encodeURI(JSON.stringify(cookieObj)));
}
function getCookie(name) {
    return getMainCookie()[name];
}
function setCookie(name, value) {
    let cookieObj = getMainCookie();
    cookieObj[name] = value;
    setMainCookie(cookieObj);
}
function urlFromBoard(boardId) {
    return siteUrl + "#" + boardId;
}
function boardFromUrl(url) {
    return url.replace(siteUrl, '').replace('#', '');
}
function hash(str) {
    let hash = 0;
    let char = 0;
    if (str.length == 0)
        return hash;
    for (let i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}
function qSel(query, element = document) {
    return element.querySelector(query);
}
function qSelAll(query, element = document) {
    return element.querySelectorAll(query);
}
function nulledGetAttribute(el, attr) {
    if (el.hasAttribute(attr))
        return el.getAttribute(attr);
    return null;
}
function EbyId(id) {
    return document.getElementById(id);
}
function EbyName(name, element) {
    return element.querySelector('[data-name="' + name + '"]');
}
function EbyNameAll(name, element = document) {
    return element.querySelectorAll('[data-name="' + name + '"]');
}
function templateFChild(id) {
    let el = EbyId(id);
    if (el["content"] != undefined)
        return el.content.firstElementChild;
    return null;
}
function elementIndex(node) {
    let index = 0;
    while (node = node.previousElementSibling)
        index++;
    return index;
}
function findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1)
        if (array[i][attr] === value)
            return i;
    return -1;
}
