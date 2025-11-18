import express from "express";
import ping from "ping";
import cors from "cors";

const app = express();
const port = 22223;

app.use(cors({ origin: "*" }));

// Hosts ordered by preference
const hosts = ["8.8.8.8", "1.1.1.1"];
let selectedHost = hosts[0];

// Ping history
const PING_HISTORY = [];
const HISTORY_DURATION = 10000; // 10 seconds

// Function for retrieving the ping
async function updatePing() {
  for (const host of hosts) {
    const res = await ping.promise.probe(host, { timeout: 1 });
    if (res.alive) {
      selectedHost = host;
      PING_HISTORY.push({ time: Date.now(), ping: parseFloat(res.time) });
      break;
    }
  }

  // Remove old values
  const cutoff = Date.now() - HISTORY_DURATION;
  while (PING_HISTORY.length && PING_HISTORY[0].time < cutoff) {
    PING_HISTORY.shift();
  }
}

// Update every 1 second
setInterval(updatePing, 1000);

// API Endpoint
app.get("/ping", (req, res) => {
  if (!PING_HISTORY.length) {
    return res.json({ host: selectedHost, average: null });
  }
  const avg =
    PING_HISTORY.reduce((sum, p) => sum + p.ping, 0) / PING_HISTORY.length;
  res.json({ host: selectedHost, average: parseFloat(avg.toFixed(2)) });
});

app.listen(port, () => {
  console.log(`Ping API running at http://localhost:${port}`);
});
