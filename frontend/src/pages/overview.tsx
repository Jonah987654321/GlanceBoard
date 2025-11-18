import { Center, Grid, Space } from "@mantine/core";

import { ResourceMonitorHalfChart } from "../components/ResourceMonitors/ResourceMonitorHalfChart";
import { useEffect, useState } from "react";
import { ResourceMonitorText } from "../components/ResourceMonitors/ResourceMonitorText";
import { ResourceMonitorBundle } from "../components/ResourceMonitors/ResourceMonitorBundle";
import { ResourceMonitorList } from "../components/ResourceMonitors/ResourceMonitorList";

import { Alert } from "../components/Alert";
import { ProcessListItem } from "../components/ResourceMonitors/ProcessListItem";

export function Overview() {
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [ramUsage, setRamUsage] = useState<number>(0);
  const [storageUsage, setStorageUsage] = useState<number>(0);

  const [uptime, setUptime] = useState<string>("N/A");
  const [cpuTemp, setCpuTemp] = useState<number>(0);
  const [ping, setPing] = useState<number>(0);

  useEffect(() => {
    // Funktion zum Laden der Daten von der API
    const fetchData = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL+"/api/4/all"); // API URL
        const data = await res.json();

        // Beispiel: CPU, RAM, Storage, Uptime, etc. aus dem API Response setzen
        setCpuUsage(data.cpu.total); // Beispiel, je nach Glances API Struktur
        setRamUsage(data.mem.percent);
        setStorageUsage(data.fs[0].percent);
        setUptime(data.uptime.split(",")[0]);
        setCpuTemp(data.sensors[0].value || 0);
        setPing(data.network[0]?.ping || 0);
      } catch (err) {
        console.error("Fehler beim Laden der API:", err);
      }
    };

    // Erstmal Daten laden
    fetchData();

    // Intervall starten
    const intervalId = setInterval(fetchData, 1000); // alle 1 Sekunde

    // Cleanup: Intervall löschen, wenn Component unmountet
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
            components={[
              <ProcessListItem
                process={{
                  pid: 987,
                  name: "postgres",
                  cpu: 82.3,
                  ram: 69.5,
                  user: "postgres",
                }}
              />,
              <ProcessListItem
                process={{
                  pid: 44,
                  name: "systemd-journald",
                  cpu: 1.2,
                  ram: 0.9,
                  user: "root",
                }}
              />,
              <ProcessListItem
                process={{
                  pid: 2023,
                  name: "nginx",
                  cpu: 12.0,
                  ram: 3.1,
                  user: "www-data",
                }}
              />,
              <ProcessListItem
                process={{
                  pid: 4321,
                  name: "node-app",
                  cpu: 55.8,
                  ram: 28.4,
                  user: "appuser",
                }}
              />,
              <ProcessListItem
                process={{
                  pid: 7788,
                  name: "data-analysis.py",
                  cpu: 23.4,
                  ram: 91.0,
                  user: "jonah",
                }}
              />,
            ]}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
