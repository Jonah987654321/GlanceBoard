import { Center, Text } from "@mantine/core";
import { ResourceMonitor } from "./ResourceMonitor";

interface ResourceMonitorTextProps {
  label: string;
  value: string;
  linksTo?: string | null;
}

export function ResourceMonitorText({
  label,
  value,
  linksTo = null,
}: ResourceMonitorTextProps) {
  return (
    <ResourceMonitor label={label} linksTo={linksTo}>
      <Center style={{ height: "100%" }}>
        <Text size="xl" fw={700}>
          {value}
        </Text>
      </Center>
    </ResourceMonitor>
  );
}
