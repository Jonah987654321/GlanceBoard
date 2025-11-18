import { DonutChart } from "@mantine/charts";
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
      <DonutChart
        data={[
          { name: "In use", value: valueInUse, color: usageColor },
          { name: "Free", value: 100 - valueInUse, color: "gray.5" },
        ]}
        thickness={25}
        startAngle={180}
        endAngle={0}
        tooltipDataSource="segment"
        mx="auto"
        chartLabel={valueInUse + "%"}
      />
    </ResourceMonitor>
  );
}
