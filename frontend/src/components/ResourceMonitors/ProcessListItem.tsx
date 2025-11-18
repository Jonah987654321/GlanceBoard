import { Card, Flex, Text, Progress, Badge, Divider } from "@mantine/core";

export interface ProcessItem {
  pid: number;
  name: string;
  cpu: number; // in %
  ram: number; // in %
  user?: string;
}

interface ProcessListItemProps {
  process: ProcessItem;
}

function getColor(value: number): string {
  if (value > 80) return "red";
  if (value > 50) return "yellow";
  return "blue";
}

export function ProcessListItem({ process }: ProcessListItemProps) {
  return (
    <>
      <Divider />
      <Card padding="sm" shadow="xs" style={{ width: "100%" }} radius={0}>
        <Flex justify="space-between" align="center" mb="xs">
          <Flex direction="column">
            <Text fw={600}>{process.name}</Text>
            <Text size="sm" c="dimmed">
              PID {process.pid} {process.user ? `• ${process.user}` : ""}
            </Text>
          </Flex>

          <Badge color={getColor(process.cpu)} variant="light" size="lg">
            {process.cpu.toFixed(0)}%
          </Badge>
        </Flex>

        {/* CPU + RAM in einer Zeile */}
        <Flex gap="sm" align="center">
          <Flex direction="column" style={{ flex: 1 }}>
            <Text size="xs" mb={2}>
              CPU
            </Text>
            <Progress
              value={process.cpu}
              size="md"
              radius="xl"
              color={getColor(process.cpu)}
            />
          </Flex>

          <Flex direction="column" style={{ flex: 1 }}>
            <Text size="xs" mb={2}>
              RAM
            </Text>
            <Progress
              value={process.ram}
              size="md"
              radius="xl"
              color={getColor(process.ram)}
            />
          </Flex>
        </Flex>
      </Card>
    </>
  );
}
