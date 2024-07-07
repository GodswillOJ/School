import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetOverallStatsQuery } from "state/api";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetOverallStatsQuery();

  const defaultData = {
    monthlyData: [
      { month: "January", totalSales: 1000, totalUnits: 50 },
      { month: "February", totalSales: 1200, totalUnits: 60 },
      { month: "March", totalSales: 900, totalUnits: 45 },
      { month: "April", totalSales: 1500, totalUnits: 75 },
      { month: "May", totalSales: 2000, totalUnits: 100 },
      { month: "June", totalSales: 1800, totalUnits: 90 },
      { month: "July", totalSales: 1700, totalUnits: 85 },
      { month: "August", totalSales: 1600, totalUnits: 80 },
      { month: "September", totalSales: 1900, totalUnits: 95 },
      { month: "October", totalSales: 2100, totalUnits: 105 },
      { month: "November", totalSales: 2300, totalUnits: 115 },
      { month: "December", totalSales: 2500, totalUnits: 125 },
    ],
  };

  const monthlyData = data?.monthlyData || defaultData.monthlyData;

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    monthlyData.reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data.push({ x: month, y: curSales });
        totalUnitsLine.data.push({ x: month, y: curUnits });

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [monthlyData, theme.palette.secondary]);

  if (isLoading) return "Loading...";

  return (
    <div style={{ height: '22rem'}}>
      <ResponsiveLine
        data={view === "sales" ? totalSalesLine : totalUnitsLine}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        enableArea={isDashboard}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (v) => (isDashboard ? v.slice(0, 3) : v),
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? "" : "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard
            ? ""
            : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
          legendOffset: -50,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={
          !isDashboard
            ? [
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 30,
                  translateY: -40,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
            : undefined
        }
      />
    </div>
  );
};

export default OverviewChart;
