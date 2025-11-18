import { Flex, Notification, Text } from "@mantine/core";
import { AiOutlineExclamation } from "react-icons/ai";

interface AlertProps {
  type: string;
  content: string;
  timestamp: number;
  alertTarget?: string | null;
}

export function Alert({
  type,
  content,
  timestamp,
  alertTarget = null,
}: AlertProps) {
  const color = type == "CRITICAL" ? "red" : "yellow";
  const backgroundColor = type == "CRITICAL" ? "#ffbfbfff" : "#fff9bfff";
  const date = new Date(timestamp * 1000);
  const title = type+(alertTarget!=null?" - Type: "+alertTarget:"");
  return (
    <Notification
      withCloseButton={false}
      color={color}
      title={title}
      icon={<AiOutlineExclamation />}
      styles={{ root: { backgroundColor: backgroundColor } }}
    >
      <Flex justify="space-between" align="center">
        <Text>{content}</Text>
        <Text opacity={0.7}>{date.toLocaleString()}</Text>
      </Flex>
    </Notification>
  );
}
