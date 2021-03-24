const currentVersion = 4;
let siteUrl = "https://lukakostic.github.io/pb/";
if (window.location.protocol == "file:")
    siteUrl = window.location.protocol + "//" + window.location.pathname;
let pb = null;
let board = "";
window.addEventListener('error', function (event) {
    alert("!!ERROR!!\n\n" + event.message);
});
window.onhashchange = function () {
    if (boardFromUrl() != board)
        set_board(boardFromUrl());
};
