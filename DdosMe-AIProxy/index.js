const express = require('express');
const database = require('./database.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { ObjectId } = require('mongodb');

const port = 3456;
const app = express();

const TARGET_URL = process.env.TARGET_URL || 'http://ddosme_backend:3246';


app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true)
    },
    credentials: true
}));

const mongoUrl = "mongodb://ddosme_mongodb:27017/ddosMe";

var experimentVars = {};

const initExperimentVars = async () => {
    experimentVars = {
        status: 'stopped',
        ai: false,
        autoReq: false,
        minReqSpeed: 2,
    };

    await database.connect(mongoUrl);

    try {
        const varsRes = await database.get('experimentVars', {});
        if (!varsRes || varsRes.length === 0) {
            console.log("Initializing experiment vars...");

            await database.insert('experimentVars', experimentVars);
        }
    } catch (error) {
        try {
            await database.insert('experimentVars', experimentVars);
        } catch (error) {
            console.log("Failed to initialize experiment vars:", error);
        }
    }
}
initExperimentVars();

app.get('/stats', async (req, res) => {
    try {
        const db = database.getDb();
        const systemStatusCollection = db.collection('serverStatus');
        const requestCollection = db.collection('inboundRequests');
        const experimentVarsCollection = db.collection('experimentVars');

        const now = Date.now();
        const twoMinAgo = now - 2 * 60 * 1000;

        // 1. Latest system status
        const latestStatus = await systemStatusCollection
            .find({})
            .sort({ timestamp: -1 })
            .limit(1)
            .project({
                _id: 0,
                timestamp: 1,
                cpu: 1,
                memory: 1,
                uptime: 1,
                maxCpu: 1,
                maxMemory: 1,
                platform: 1,
                target: 1,
            })
            .toArray();

        // 2. Request stats aggregation
        const requestStatsAgg = await requestCollection.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    blocked: { $sum: { $cond: ['$blocked', 1, 0] } },
                    size: { $sum: '$size' },
                }
            }
        ]).toArray();

        const requestStats = requestStatsAgg[0] || { total: 0, blocked: 0, size: 0 };

        // 3. Last 20 requests
        const lastRequests = await requestCollection
            .find({})
            .sort({ date: -1 })
            .limit(20)
            .project({ _id: 0, id: 1, date: 1, deviceIp: 1, size: 1, blocked: 1 })
            .toArray();

        // 4. Resource usage graph (last 2 min)
        const resourceUsage = await systemStatusCollection
            .find({ timestamp: { $gte: twoMinAgo } })
            .sort({ timestamp: 1 })
            .project({ _id: 0, timestamp: 1, cpu: 1, memory: 1 })
            .toArray();

        // 5. Requests graph (bucketed in 5s intervals)
        const recentRequests = await requestCollection
            .find({ date: { $gte: twoMinAgo } })
            .project({ date: 1, blocked: 1 })
            .toArray();

        const bucketSize = 5 * 1000;
        const buckets = {};

        for (let i = 0; i < 24; i++) {
            const ts = twoMinAgo + i * bucketSize;
            buckets[ts] = { timestamp: ts, total: 0, blocked: 0 };
        }

        for (const req of recentRequests) {
            const bucketTimestamp = twoMinAgo + Math.floor((req.date - twoMinAgo) / bucketSize) * bucketSize;
            if (buckets[bucketTimestamp]) {
                buckets[bucketTimestamp].total++;
                if (req.blocked) buckets[bucketTimestamp].blocked++;
            }
        }

        const requestsGraph = Object.values(buckets);

        experimentVars = await experimentVarsCollection.findOne({});

        // Final response
        res.json({
            latestStatus: latestStatus[0] || {},
            requests: requestStats,
            lastRequests,
            resourceUsageGraph: resourceUsage,
            requestsGraph,
            experimentVars
        });

    } catch (error) {
        console.error('Error in /stats route:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

app.get('/stop', async (req, res) => {
    try {
        const dbRes = await database.update('experimentVars', {}, { status: 'stopped' });
        res.status(200).send('Experiment stopped');
    } catch (error) {
        console.error('Error in /stop route:', error);
        res.status(500).json({ error: 'Failed to stop experiment' });
    }
});

app.get('/start', async (req, res) => {
    try {
        const dbRes = await database.update('experimentVars', {}, { status: 'running' });
        res.status(200).send('Experiment started');
    } catch (error) {
        console.error('Error in /start route:', error);
        res.status(500).json({ error: 'Failed to start experiment' });
    }
});

app.get('/toggleAI', async (req, res) => {
    try {
        const dbRes = await database.update('experimentVars', {}, { ai: !experimentVars.ai });
        res.status(200).send('AI toggled');
    } catch (error) {
        console.error('Error in /toggleAI route:', error);
        res.status(500).json({ error: 'Failed to toggle AI' });
    }
});

app.get('/toggleAutoReq', async (req, res) => {
    try {
        const dbRes = await database.update('experimentVars', {}, { autoReq: !experimentVars.autoReq });
        res.status(200).send('Auto request toggled');
    } catch (error) {
        console.error('Error in /toggleAutoReq route:', error);
        res.status(500).json({ error: 'Failed to toggle auto request' });
    }
});

app.post('/setMinReqSpeed/:minReqSpeed', async (req, res) => {
    try {
        const minReqSpeed = req?.params?.minReqSpeed || 2;
        const dbRes = await database.update('experimentVars', {}, { minReqSpeed });
        res.status(200).send('Min request speed set');
    } catch (error) {
        console.error('Error in /setMinReqSpeed route:', error);
        res.status(500).json({ error: 'Failed to set min request speed' });
    }
});

app.get('/getMinReqSpeed', async (req, res) => {
    try {
        res.status(200).json({ minReqSpeed: experimentVars.minReqSpeed });
    } catch (error) {
        console.error('Error in /getMinReqSpeed route:', error);
        res.status(500).json({ error: 'Failed to get min request speed' });
    }
});

/*
{
    latestStatus: {
        timestamp: ,
        cpu: ,
        memory:,
        uptime:,
        maxCpu: ,
        maxMemory:,
        platform:,
        target:,
    },
    requests: {
        total:,
        blocked:,
        size:,
    },
    lastRequests: [
        {
            id:,
            date:,
            deviceIp:,
            size:,
            blocked:,
        },
        ... last20 requests
    ],
    resourceUsageGraph: [
        {
            timestamp:,
            cpu:,
            memory:,
        }... for a chartJs graph showing the mem and cpu usage in % from the last 2 min or so
    ],
    requestsGraph: [
        {
            timestamp:,
            total:,
            blocked:,
        }... for a chartJs graph showing the number of requests in the last 2 min or so
    ],
    experimentVars: {
        status:,
        ai:,
        autoReq:,
        minReqSpeed:,
    },
}
*/

app.use(async (req, res, next) => {
    if (experimentVars?.status !== 'running') {
        return res.sendStatus(403);
    }

    const ip = req.cookies['fake-ip'];
    const now = Date.now();
    let blocked = false;

    if (experimentVars?.ai && ip) {
        try {
            const ipRequests = await database.get('inboundRequests', {
                deviceIp: ip,
                date: { $gte: now - 5 * 1000 },
            });

            if (ipRequests.length >= 5) {
                console.log("[AI] Blocking IP:", ip);
                blocked = true;

                await database.insert('inboundRequests', {
                    id: crypto.randomUUID(),
                    date: now,
                    deviceIp: ip,
                    size: parseInt(req.headers['content-length'] || 0),
                    blocked,
                });

                return res.sendStatus(429); // Too Many Requests
            }
        } catch (err) {
            console.error("[DB] Error in AI check:", err);
        }
    }

    // Not blocked — log and continue
    try {
        await database.insert('inboundRequests', {
            id: crypto.randomUUID(),
            date: now,
            deviceIp: ip,
            size: parseInt(req.headers['content-length'] || 0),
            blocked,
        });
    } catch (err) {
        console.error("[DB] Failed to log request:", err);
    }

    next(); // continue to proxy
});

app.use('/', createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
}));



async function pollTargetStatus() {
    try {
        const response = await axios.get(`${TARGET_URL}/status`);
        const data = response.data;

        await database.insert('serverStatus', {
            ...data,
            target: TARGET_URL, // optional, useful if you monitor multiple targets
        });

    } catch (err) {
        console.error("❌ Failed to get target status:", err.message);
    }
}

setInterval(pollTargetStatus, 3000);


app.listen(port, () => {
    console.log(`🧠 AI Proxy listening on port ${port}`);
});
