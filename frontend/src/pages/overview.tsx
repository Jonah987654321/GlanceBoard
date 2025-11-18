import { Card, Center, Grid, Space, Title } from "@mantine/core";

import { ResourceMonitorHalfChart } from "../components/ResourceMonitors/ResourceMonitorHalfChart";
import { useState } from "react";
import { ResourceMonitorText } from "../components/ResourceMonitors/ResourceMonitorText";

export function Overview() {
  const [cpuUsage, setCpuUsage] = useState<number>(85);
  const [ramUsage, setRamUsage] = useState<number>(85);
  const [storageUsage, setStorageUsage] = useState<number>(85);

  const [uptime, setUptime] = useState<string>("6 days")
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
          <Card shadow="sm" withBorder style={{ flex: 1 }}>
            <Card.Section>
              <Space h="md" />
              <Center>
                <Title fw={500} order={2}>
                  Resources
                </Title>
              </Center>
              <Space h="xl" />
            </Card.Section>
            <Card.Section>
              <Grid>
                <Grid.Col span={4}>
                  <ResourceMonitorHalfChart
                    label="CPU"
                    valueInUse={cpuUsage}
                    secondColorBorder={85}
                    linksTo="/cpu"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <ResourceMonitorHalfChart
                    label="RAM"
                    valueInUse={ramUsage}
                    firstColorBorder={70}
                    secondColorBorder={90}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <ResourceMonitorHalfChart
                    label="Storage"
                    valueInUse={storageUsage}
                    firstColorBorder={70}
                    secondColorBorder={90}
                  />
                </Grid.Col>
              </Grid>
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 12, lg: 6 }}
          style={{ display: "flex" }}
        >
          <Card shadow="sm" withBorder style={{ flex: 1 }}>
            <Card.Section>
              <Space h="md" />
              <Center>
                <Title fw={500} order={2}>
                  System Telemetry
                </Title>
              </Center>
              <Space h="xl" />
            </Card.Section>
            <Card.Section>
              <Grid>
                <Grid.Col span={4}>
                    <ResourceMonitorText value={uptime} label="Uptime"></ResourceMonitorText>
                </Grid.Col>
                <Grid.Col span={4}>
                    <ResourceMonitorText value={cpuTemp+"° C"} label="CPU Temperature"></ResourceMonitorText>
                </Grid.Col>
                <Grid.Col span={4}>
                    <ResourceMonitorText value={ping+"ms"} label="Network Ping"></ResourceMonitorText>
                </Grid.Col>
              </Grid>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
