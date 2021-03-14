const StorageType = {
    None: 0,
    Drive: 1
};
let storage = {
    type: StorageType.None,
    StorageLoaded(_storageType) {
        if (this.type != _storageType)
            return;
        board = boardFromUrl(url());
        logw('Storage loaded, initial reset or load');
        if (this.type == StorageType.None)
            return resetData();
        if (sync.loadCachedContent() == false)
            resetData();
        else
            pageOpened();
        sync.loadAll();
        sync.start(false);
    },
    fileIdByName(name, callback) {
        if (this.type == StorageType.Drive)
            return drive_storage.fileIdByName(name, callback);
    },
    fileUpload(file, callback = null) {
        if (this.type == StorageType.Drive)
            return drive_storage.fileUpload(file, callback);
    },
    fileDownload(name, callback) {
        if (this.type == StorageType.Drive)
            return drive_storage.fileDownload(name, callback);
    },
    fileDelete(name, callback = null) {
        if (this.type == StorageType.Drive)
            return drive_storage.fileDelete(name, callback);
    }
};
