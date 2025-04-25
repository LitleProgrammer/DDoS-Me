const fs = require('fs');
const os = require('os');
const pidusage = require('pidusage');

function getCpuLimit() {
    try {
        const quota = parseInt(fs.readFileSync('/sys/fs/cgroup/cpu/cpu.cfs_quota_us', 'utf8'));
        const period = parseInt(fs.readFileSync('/sys/fs/cgroup/cpu/cpu.cfs_period_us', 'utf8'));

        if (quota > 0 && period > 0) {
            return quota / period; // number of CPU cores allowed
        } else {
            return os.cpus().length; // unlimited, fallback to host CPU count
        }
    } catch (err) {
        return os.cpus().length; // fallback
    }
}

function getMemoryLimit() {
    try {
        const limitStr = fs.readFileSync('/sys/fs/cgroup/memory/memory.limit_in_bytes', 'utf8');
        const limit = parseInt(limitStr);
        const totalMem = os.totalmem();

        // If limit is greater than host memory, Docker didn't set a limit
        return limit > totalMem ? totalMem : limit;
    } catch (err) {
        return os.totalmem(); // fallback
    }
}

module.exports = { getCpuLimit, getMemoryLimit };