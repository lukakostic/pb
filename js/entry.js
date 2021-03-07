function OnStorageLoad() {
    htmlLoaded();
    gapi.load('client:auth2', () => {
        gapi.client.init(driveAPI_Creds)
            .then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }, (error) => {
            alog(error);
            goLogin();
        });
    });
}
function updateSigninStatus(isSignedIn) {
    if (isSignedIn == false) {
        goLogin();
        return;
    }
    board = boardFromUrl(url());
    logw('initial reset or load');
    if (sync.loadCachedContent() == false)
        resetData();
    else
        pageOpened();
    sync.loadAll();
    sync.start(false);
}
