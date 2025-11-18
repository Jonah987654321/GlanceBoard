import { Card, Center, Space, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom"

import "./ResourceMonitor.css";

interface ResourceMonitorProps {
  label: string;
  linksTo?: string | null;
  children: React.ReactNode;
}

export function ResourceMonitor({
  label,
  linksTo = null,
  children,
}: ResourceMonitorProps) {
  const navigate = useNavigate();
  const setLink =
    linksTo !== null
      ? {
          style: { cursor: "pointer" },
          onClick: () => navigate(linksTo),
        }
      : {};
  return (
    <Card shadow="none" {...setLink}>
      <Card.Section className="resourceSection">{children}</Card.Section>
      <Card.Section>
        <Center>
          <Text>{label}</Text>
        </Center>
        <Space h="md"></Space>
      </Card.Section>
    </Card>
  );
}
