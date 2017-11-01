export const UPLOAD_SIZE_LIMIT = 1000000; // 1MB Limit

export const buildFileContentNode = (jid) => {
    return 'snippets/' + jid + '/content';
}

export const buildFileMetaNode = (jid) => {
    return 'snippets/' + jid + '/metadata';
}

export const printFileSize = (size) => {
    // MB
    if(size >= 1000000) {
        return (size / 1000000).toFixed(2) + "MB";
    }

    // kB
    if(size >= 1000) {
        return (size / 1000).toFixed(2) + "kB";
    }

    return "1kB"; // Minimum size to report
}
    