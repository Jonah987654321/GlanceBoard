import { Card, Center, Space, Title, Grid } from "@mantine/core";

import "./ResourceMonitor.css";

interface ResourceMonitorBundleProps {
  title: string;
  components: any[];
}

export function ResourceMonitorBundle({
  title,
  components,
}: ResourceMonitorBundleProps) {
  const span = Math.floor(12 / components.length);
  return (
    <Card shadow="sm" withBorder style={{ flex: 1 }}>
      <Card.Section>
        <Space h="md" />
        <Center>
          <Title fw={500} order={2}>
            {title}
          </Title>
        </Center>
        <Space h="md" />
      </Card.Section>
      <Card.Section>
        <Grid>
          {components.map((component, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 12, lg: span }}>
              {component}
            </Grid.Col>
          ))}
        </Grid>
      </Card.Section>
    </Card>
  );
}
