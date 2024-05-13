import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "hooks";

const data = [
  {
    id: "css",
    label: "css",
    value: 141,
    color: "hsl(37, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 97,
    color: "hsl(133, 70%, 50%)",
  },
  {
    id: "rust",
    label: "rust",
    value: 255,
    color: "hsl(185, 70%, 50%)",
  },
  {
    id: "sass",
    label: "sass",
    value: 14,
    color: "hsl(264, 70%, 50%)",
  },
  {
    id: "ruby",
    label: "ruby",
    value: 462,
    color: "hsl(272, 70%, 50%)",
  },
];
const MyResponsivePie = () => {
  const { theme } = useTheme();
  return (
    <ResponsivePie
      theme={{
        background: theme === "dark" ? "#030712" : "#f5f5f5",
        text: {
          fontSize: 11,
          fill: "#333333",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
        axis: {
          domain: {
            line: {
              stroke: theme === "dark" ? "#ffffff" : "#333333",
              strokeWidth: 1,
            },
          },
          legend: {
            text: {
              fontSize: 12,
              fill: theme === "dark" ? "#ffffff" : "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
          ticks: {
            line: {
              stroke: theme === "dark" ? "#ffffff" : "#333333",
              strokeWidth: 1,
            },
            text: {
              fontSize: 11,
              fill: theme === "dark" ? "#ffffff" : "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
        },
        grid: {
          line: {
            stroke: "#dddddd",
            strokeWidth: 1,
          },
        },
        legends: {
          title: {
            text: {
              fontSize: 11,
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
          text: {
            fontSize: 11,
            fill: theme === "dark" ? "#ffffff" : "black",
            outlineWidth: 0,
            outlineColor: "transparent",
          },
          ticks: {
            line: {},
            text: {
              fontSize: 10,
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
        },
        annotations: {
          text: {
            fontSize: 13,
            fill: "#333333",
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
          link: {
            stroke: "#000000",
            strokeWidth: 1,
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
          outline: {
            stroke: "#000000",
            strokeWidth: 2,
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
          symbol: {
            fill: "#red",
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
        },
        tooltip: {
          container: {
            background: theme === "dark" ? "#333333" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#333333",
            fontSize: 12,
          },
          basic: {},
          chip: {},
          table: {},
          tableCell: {},
          tableCellValue: {},
        },
      }}
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.55}
      padAngle={2}
      cornerRadius={6}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={theme === "dark" ? "#eee" : "#333333"}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsRadiusOffset={0.45}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: theme === "dark" ? "#eee" : "#333333",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default MyResponsivePie;
