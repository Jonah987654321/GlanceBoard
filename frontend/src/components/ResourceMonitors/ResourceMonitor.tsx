import { Card, Center, Space, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom"

import "./ResourceMonitor.css";

interface ResourceMonitorProps {
  label: string;
  linksTo?: string | null;
  content: any;
}

export function ResourceMonitor({
  label,
  linksTo = null,
  content,
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
      <Card.Section className="resourceSection">{content}</Card.Section>
      <Card.Section>
        <Center>
          <Text>{label}</Text>
        </Center>
        <Space h="md"></Space>
      </Card.Section>
    </Card>
  );
}
