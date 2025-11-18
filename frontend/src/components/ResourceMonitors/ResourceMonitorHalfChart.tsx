import { Center, SemiCircleProgress } from "@mantine/core";
import { ResourceMonitor } from "./ResourceMonitor";

interface ResourceHalfChartProps {
  label: string;
  valueInUse: number;
  linksTo?: string | null;
  firstColorBorder?: number;
  secondColorBorder?: number;
}

export function ResourceMonitorHalfChart({
  label,
  valueInUse,
  linksTo = null,
  firstColorBorder = 60,
  secondColorBorder = 80,
}: ResourceHalfChartProps) {
  const usageColor =
    valueInUse < firstColorBorder
      ? "green"
      : valueInUse < secondColorBorder
      ? "yellow"
      : "red";
  return (
    <ResourceMonitor label={label} linksTo={linksTo}>
      <Center>
        <SemiCircleProgress
          fillDirection="left-to-right"
          orientation="up"
          filledSegmentColor={usageColor}
          value={valueInUse}
          thickness={25}
          label={valueInUse + "%"}
          transitionDuration={1000} 
        />
      </Center>
    </ResourceMonitor>
  );
}
