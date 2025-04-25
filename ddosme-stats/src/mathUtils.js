function bytesToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2); // returns string like "12.34"
}

function bytesToGB(bytes) {
    return (bytes / (1024 ** 3)).toFixed(2); // returns string like "1.23"
}

export { bytesToMB, bytesToGB };