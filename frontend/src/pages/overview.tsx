import { Center, Grid, Space } from "@mantine/core";

import { ResourceMonitorHalfChart } from "../components/ResourceMonitors/ResourceMonitorHalfChart";
import { useEffect, useState } from "react";
import { ResourceMonitorText } from "../components/ResourceMonitors/ResourceMonitorText";
import { ResourceMonitorBundle } from "../components/ResourceMonitors/ResourceMonitorBundle";
import { ResourceMonitorList } from "../components/ResourceMonitors/ResourceMonitorList";

import { Alert } from "../components/Alert";
import { ProcessListItem } from "../components/ResourceMonitors/ProcessListItem";
import type { ProcessItem } from "../components/ResourceMonitors/ProcessListItem";

function getGlanceAPIURL() {
  if (import.meta.env.VITE_GLANCES_API == undefined || import.meta.env.VITE_GLANCES_API.trim().length === 0) {
    return (
      window.location.protocol + "//" + window.location.hostname + ":61208"
    );
  } else {
    return import.meta.env.VITE_GLANCES_API;
  }
}

function getPingAPIURL() {
  if (import.meta.env.VITE_PING_API == undefined || import.meta.env.VITE_PING_API.trim().length === 0) {
    return (
      window.location.protocol + "//" + window.location.hostname + ":22223"
    );
  } else {
    return import.meta.env.VITE_PING_API;
  }
}

export function Overview() {
  console.log(getGlanceAPIURL());
  const [processes, setProcesses] = useState<ProcessItem[]>([]);
  useEffect(() => {
    async function fetchProcesses() {
      try {
        const res = await fetch(getGlanceAPIURL() + "/api/4/processlist");
        const apiData = await res.json();

        // Only keep processes taking at least 1% cpu
        const running = apiData.filter((p: any) => p.cpu_percent > 1.0);

        // Map into ProcessItem
        const updatedList: ProcessItem[] = running.map((p: any) => ({
          pid: p.pid,
          name: p.name,
          cpu: p.cpu_percent,
          ram: p.memory_percent,
          user: p.username,
        }));

        setProcesses((prev) => {
          const prevByPid = new Map(prev.map((p) => [p.pid, p]));

          const merged: ProcessItem[] = [];

          for (const p of updatedList) {
            if (prevByPid.has(p.pid)) {
              // Process already existing, only update RAM & cpu
              const old = prevByPid.get(p.pid)!;
              merged.push({
                ...old,
                cpu: p.cpu,
                ram: p.ram,
              });
              prevByPid.delete(p.pid);
            } else {
              // New process
              merged.push(p);
            }
          }

          // Sort by CPU usage
          merged.sort((a, b) => b.cpu - a.cpu);

          return merged;
        });
      } catch (err) {
        console.error("Failed to fetch process list", err);
      }
    }
    fetchProcesses(); // initial
    const id = setInterval(fetchProcesses, 5000);

    return () => clearInterval(id);
  }, []);

  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [ramUsage, setRamUsage] = useState<number>(0);
  const [storageUsage, setStorageUsage] = useState<number>(0);
  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Fetch CPU
        const cpuRes = await fetch(getGlanceAPIURL() + "/api/4/cpu"); // API URL
        const cpuData = await cpuRes.json();
        setCpuUsage(cpuData.total);

        // Fetch RAM
        const memRes = await fetch(getGlanceAPIURL() + "/api/4/mem"); // API URL
        const memData = await memRes.json();
        setRamUsage(memData.percent);

        // Fetch Storage usage
        const fsRes = await fetch(getGlanceAPIURL() + "/api/4/fs"); // API URL
        const fsData = await fsRes.json();
        setStorageUsage(fsData[0].percent);
      } catch (err) {
        console.error("Error when calling API:", err);
      }
    };

    // Init
    fetchResources();

    const intervalId = setInterval(fetchResources, 1000); // once a second

    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  const [uptime, setUptime] = useState<string>("N/A");
  const [cpuTemp, setCpuTemp] = useState<number>(0);
  const [ping, setPing] = useState<number>(0);
  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        // Fetch Uptime
        const uptimeRes = await fetch(getGlanceAPIURL() + "/api/4/uptime");
        const uptimeData = await uptimeRes.text();
        setUptime(uptimeData.substring(1, uptimeData.length-1));

        // Fetch sensors
        const sensorRes = await fetch(getGlanceAPIURL() + "/api/4/sensors"); // API URL
        const sensorData = await sensorRes.json();
        setCpuTemp(sensorData[0].value || 0);

        // Fetch ping
        const pingRes = await fetch(getPingAPIURL()+"/ping");
        if (!pingRes.ok) throw new Error("Ping API Error");

        const data = await pingRes.json();
        setPing(Math.round(data.average) || 0);
      } catch (err) {
        console.error("Error when calling API:", err);
      }
    };

    // Init data
    fetchTelemetry();

    // Intervall starten
    const intervalId = setInterval(fetchTelemetry, 10000); // Call every 10sec

    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Center>
        <h1>
          Monitoring Overview for <i>piserver</i>
        </h1>
        <Space h="md" />
      </Center>
      <Grid style={{ display: "flex", gap: "1rem" }}>
        <Grid.Col
          span={{ base: 12, md: 12, lg: 6 }}
          style={{ display: "flex" }}
        >
          <ResourceMonitorBundle
            title="Resources"
            components={[
              <ResourceMonitorHalfChart
                label="CPU"
                valueInUse={cpuUsage}
                secondColorBorder={85}
                linksTo="/cpu"
              />,
              <ResourceMonitorHalfChart
                label="RAM"
                valueInUse={ramUsage}
                firstColorBorder={70}
                secondColorBorder={90}
              />,
              <ResourceMonitorHalfChart
                label="Storage"
                valueInUse={storageUsage}
                firstColorBorder={70}
                secondColorBorder={90}
              />,
            ]}
          />
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 12, lg: 6 }}
          style={{ display: "flex" }}
        >
          <ResourceMonitorBundle
            title="System Telemetry"
            components={[
              <ResourceMonitorText value={uptime} label="Uptime" />,
              <ResourceMonitorText
                value={cpuTemp + "° C"}
                label="CPU Temperature"
              />,
              <ResourceMonitorText value={ping + "ms"} label="Network Ping" />,
            ]}
          />
        </Grid.Col>
      </Grid>
      <Space h="xl"></Space>
      <Grid style={{ display: "flex", gap: "1rem" }}>
        <Grid.Col
          span={{ base: 12, md: 12, lg: 6 }}
          style={{ display: "flex" }}
        >
          <ResourceMonitorList
            title="Notifications & Warnings"
            components={[
              <Alert
                type="CRITICAL"
                content="You should handle this"
                timestamp={1762177546}
                alertTarget="MEM"
              />,
              <Alert
                type="WARNING"
                content="Could really be worse"
                timestamp={176213546}
              />,
            ]}
          />
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 12, lg: 6 }}
          style={{ display: "flex" }}
        >
          <ResourceMonitorList
            title="Running processes"
            components={processes.map((p) => (
              <ProcessListItem key={p.pid} process={p} />
            ))}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
