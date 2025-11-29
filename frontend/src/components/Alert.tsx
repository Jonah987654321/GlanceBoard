import { Flex, Notification, Text } from "@mantine/core";
import { AiOutlineExclamation } from "react-icons/ai";

export interface Alert {
  type: string;
  content: string;
  timestamp: number;
  target?: string | null;
}

interface AlertProps {
  alert: Alert;
}

export function Alert({ alert }: AlertProps) {
  const color = alert.type == "CRITICAL" ? "red" : "yellow";
  const backgroundColor = alert.type == "CRITICAL" ? "#ffbfbfff" : "#fff9bfff";
  const date = new Date(alert.timestamp * 1000);
  const title =
    alert.type + (alert.target != null ? " - Type: " + alert.target : "");
  return (
    <Notification
      withCloseButton={false}
      color={color}
      title={title}
      icon={<AiOutlineExclamation />}
      styles={{ root: { backgroundColor: backgroundColor } }}
    >
      <Flex justify="space-between" align="center">
        <Text>{alert.content}</Text>
        <Text opacity={0.7}>{date.toLocaleString()}</Text>
      </Flex>
    </Notification>
  );
}
