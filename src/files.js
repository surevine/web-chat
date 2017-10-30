export const printFileSize = (size) => {
    // MB
    if(size > 1000000) {
        return (size / 1000000).toFixed(2) + "MB";
    }

    // kB
    if(size > 1000) {
        return (size / 1000).toFixed(2) + "kB";
    }

    return "1kB"; // Minimum size to report
}
    