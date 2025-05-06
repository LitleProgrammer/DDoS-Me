const express = require('express');
const cors = require('cors');
const database = require('./database.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const pidusage = require('pidusage');
const os = require('os');
const { simulateCpuLoad, simulateDiskLoad, simulateMemoryLoad } = require('./simulateLoad.js');
const { getCpuLimit, getMemoryLimit } = require('./usageinfos.js');


const port = 3246;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true)
    },
    credentials: true
}));

const mongoUrl = process.env.MONGO_URI || "mongodb://ddosme_mongodb:27017/ddosMe"; // Fallback to default
database.connect(mongoUrl);

//docker run -d --network ddosnw --name ddosme_mongodb -v ddos_volume:/data/db -e MONGO_INIT_DATABASE=ddosMe -p 29046:27017 mongo:latest
app.post('/ddosme', (req, res) => {
    const cpuMs = Math.floor(Math.random() * 30);     // 0–200 ms CPU
    const diskKb = Math.floor(Math.random() * 500);    // 0–500 KB disk
    const memoryMb = Math.floor(Math.random() * 20);    // 0–5 MB RAM

    simulateCpuLoad(cpuMs);
    simulateDiskLoad(diskKb);
    simulateMemoryLoad(memoryMb);

    res.send("Done")
});

app.post('/attack', (req, res) => {
    const cpuMs = Math.floor(Math.random() * 150);     // 0–200 ms CPU
    const diskKb = Math.floor(Math.random() * 300);    // 0–500 KB disk
    const memoryMb = Math.floor(Math.random() * 14);    // 0–5 MB RAM

    simulateCpuLoad(cpuMs);
    simulateDiskLoad(diskKb);
    simulateMemoryLoad(memoryMb);

    res.send("Done")
});

app.post('/secret', (req, res) => {
    const cpuMs = Math.floor(Math.random() * 200);     // 0–200 ms CPU
    const diskKb = Math.floor(Math.random() * 500);    // 0–500 KB disk
    const memoryMb = Math.floor(Math.random() * 16);    // 0–5 MB RAM

    simulateCpuLoad(cpuMs);
    simulateDiskLoad(diskKb);
    simulateMemoryLoad(memoryMb);

    res.send("Done")
});

app.post('/login', (req, res) => {
    const cpuMs = Math.floor(Math.random() * 100);     // 0–200 ms CPU
    const diskKb = Math.floor(Math.random() * 700);    // 0–500 KB disk
    const memoryMb = Math.floor(Math.random() * 13);    // 0–5 MB RAM

    simulateCpuLoad(cpuMs);
    simulateDiskLoad(diskKb);
    simulateMemoryLoad(memoryMb);

    res.send("Done")
});

app.post('/shop', (req, res) => {
    const cpuMs = Math.floor(Math.random() * 300);     // 0–200 ms CPU
    const diskKb = Math.floor(Math.random() * 400);    // 0–500 KB disk
    const memoryMb = Math.floor(Math.random() * 18);    // 0–5 MB RAM

    simulateCpuLoad(cpuMs);
    simulateDiskLoad(diskKb);
    simulateMemoryLoad(memoryMb);

    res.send("Done")
});

app.get('/status', async (req, res) => {
    try {
        const stats = await pidusage(process.pid);

        const totalCpu = getCpuLimit(); // Docker CPU cap
        const totalMemory = getMemoryLimit(); // Docker RAM cap

        res.json({
            timestamp: Date.now(),

            // Actual usage
            cpu: stats.cpu,               // % usage of one core
            memory: stats.memory,         // bytes
            uptime: stats.elapsed,

            // Docker-defined caps
            maxCpu: totalCpu * 100,       // convert to percentage scale
            maxMemory: totalMemory,       // bytes

            // Optional load / system info
            loadavg: os.loadavg(),
            platform: os.platform()
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to get system stats", details: err.message });
    }
});


app.listen(port, () => {
    console.log(`🎯 Target server listening on port ${port}`);
})
