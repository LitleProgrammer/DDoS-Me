// CPU load: simulate CPU for `ms` milliseconds
function simulateCpuLoad(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        Math.sqrt(Math.random() * 1000); // waste CPU
    }
}

// Disk load: write a temp file of `kb` kilobytes
function simulateDiskLoad(kb) {
    const fs = require('fs');
    const path = require('path');

    const data = 'x'.repeat(kb * 1024);
    const filePath = path.join(__dirname, `temp-${Math.random()}.txt`);

    fs.writeFileSync(filePath, data);
    fs.unlinkSync(filePath);
}

// Memory load: allocate an array with `mb` megabytes
function simulateMemoryLoad(mb) {
    const bytes = mb * 1024 * 1024;
    const count = Math.floor(bytes / 8); // 8 bytes per string element estimate
    const temp = new Array(count).fill('MEMLOAD');
    return temp.length; // to avoid optimization
}

module.exports = { simulateCpuLoad, simulateDiskLoad, simulateMemoryLoad };