import { Card, Center, Space, Title } from "@mantine/core";

import "./ResourceMonitor.css";

interface ResourceMonitorListProps {
  title: string;
  components: any[];
}

export function ResourceMonitorList({
  title,
  components,
}: ResourceMonitorListProps) {
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
        {components.map((component, index) => (<>{ component }</>))}
      </Card.Section>
    </Card>
  );
}
