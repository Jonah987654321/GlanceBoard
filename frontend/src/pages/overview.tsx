import { Card, Center, Grid, Space, Title } from "@mantine/core";

import { ResourceMonitorHalfChart } from "../components/ResourceMonitors/ResourceMonitorHalfChart";
import { useState } from "react";
import { ResourceMonitorText } from "../components/ResourceMonitors/ResourceMonitorText";
import { ResourceMonitorBundle } from "../components/ResourceMonitors/ResourceMonitorBundle";

export function Overview() {
  const [cpuUsage, setCpuUsage] = useState<number>(85);
  const [ramUsage, setRamUsage] = useState<number>(85);
  const [storageUsage, setStorageUsage] = useState<number>(85);

  const [uptime, setUptime] = useState<string>("6 days");
  const [cpuTemp, setCpuTemp] = useState<number>(50);
  const [ping, setPing] = useState<number>(20);
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
    </>
  );
}
