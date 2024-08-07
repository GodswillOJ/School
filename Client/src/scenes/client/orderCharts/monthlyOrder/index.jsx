import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "Components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetOverallStatsQuery } from "state/api";

const MonthlyOrders = () => {
  const { data } = useGetOverallStatsQuery();
  const theme = useTheme();

  // Default data in case the API data is null
  const defaultData = {
    monthlyData: {
      January: { month: "January", totalOrders: 150 },
      February: { month: "February", totalOrders: 180 },
      March: { month: "March", totalOrders: 90 },
      April: { month: "April", totalOrders: 100 },
      May: { month: "May", totalOrders: 80 },
      June: { month: "June", totalOrders: 200 },
      July: { month: "July", totalOrders: 90 },
    },
  };

  const [formattedData] = useMemo(() => {
    const monthlyData = data?.monthlyData || defaultData.monthlyData;
    const totalOrdersLine = {
      id: "totalOrders",
      color: theme.palette.secondary.main,
      data: [],
    };

    Object.values(monthlyData).forEach(({ month, totalOrders }) => {
      totalOrdersLine.data = [
        ...totalOrdersLine.data,
        { x: month, y: totalOrders },
      ];
    });

    const formattedData = [totalOrdersLine];
    return [formattedData];
  }, [data, theme.palette.secondary.main]);

  return (
    <Box m="1.5rem 1.5rem">
      <Header title="MONTHLY ORDERS" subtitle="Chart of monthly orders" />
      <Box height="75vh">
        {data || defaultData ? (
          <ResponsiveLine
            data={formattedData}
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
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            // curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total Orders",
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
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
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
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default MonthlyOrders;
