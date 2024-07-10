import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetDashboardQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetDashboardQuery();
  const theme = useTheme();

  const defaultData = {
    salesByCategory: {
      Electronics: 5000,
      Apparel: 3000,
      Groceries: 7000,
      Beauty: 2000,
    },
    ordersByCategory: {
      Electronics: 200,
      Apparel: 150,
      Groceries: 300,
      Beauty: 100,
    },
    cartByCategory: {
      Electronics: 50,
      Apparel: 40,
      Groceries: 60,
      Beauty: 30,
    },
    yearlySalesTotal: 17000,
    totalOrders: 750,
    totalCart: 180,
  };

  const chartData = data && !isLoading ? data : defaultData;

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const formatData = (dataObject) => 
    Object.entries(dataObject).map(([category, value], i) => ({
      id: category,
      label: category,
      value,
      color: colors[i % colors.length],
    }));

  const salesData = formatData(chartData.salesByCategory);
  const ordersData = formatData(chartData.ordersByCategory);
  const cartData = formatData(chartData.cartByCategory);

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={salesData}
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
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total Sales:"} ${chartData.yearlySalesTotal}
        </Typography>
        <Typography variant="h6">
          {!isDashboard && "Total Orders:"} {chartData.totalOrders}
        </Typography>
        <Typography variant="h6">
          {!isDashboard && "Total Cart Items:"} {chartData.totalCart}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
