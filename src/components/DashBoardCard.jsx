"use client";
import toast from "react-hot-toast";
import { useGetAllOrdersQuery } from "@/redux/features/api/authApi";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { CheckCircleIcon, CurrencyDollarIcon, ShoppingCartIcon, PauseIcon } from '@heroicons/react/solid';
// Register the plugin
Chart.register(ChartDataLabels);

export default function DashBoardCard() {
  const { data, isFetching, refetch } = useGetAllOrdersQuery();
  const [topProducts, setTopProducts] = useState([]);
  const [todaySalesSummary, setTodaySalesSummary] = useState({
    totalSales: 0,
    totalOrders: 0,
    canceledOrders: 0,
    onHold: 0,
    processing: 0,
    shipping: 0,
  });

  const topProductsChartRef = useRef(null);
  const todaySalesChartRef = useRef(null);

  useEffect(() => {
    if (data) {
      const completedOrders = data.orders.filter(
        (order) => order.status === "Completed"
      );

      const salesMap = new Map();
      completedOrders.forEach((order) => {
        const { sku, total } = order;
        if (sku && total) {
          if (salesMap.has(sku)) {
            salesMap.set(sku, salesMap.get(sku) + total);
          } else {
            salesMap.set(sku, total);
          }
        }
      });

      const sortedProducts = [...salesMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      setTopProducts(sortedProducts);
    }
  }, [data]);

  useEffect(() => {
    if (topProductsChartRef.current) {
      const labels = topProducts.map((entry) => entry[0]);
      const dataPoints = topProducts.map((entry) => entry[1]);

      if (topProductsChartRef.current.chart) {
        topProductsChartRef.current.chart.destroy();
      }

      topProductsChartRef.current.chart = new Chart(
        topProductsChartRef.current,
        {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Sales Volume",
                data: dataPoints,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0,
                },
              },
            },
            plugins: {
              datalabels: {
                anchor: "end",
                align: "top",
                formatter: Math.round,
                font: {
                  weight: "bold",
                },
              },
            },
          },
        }
      );
    }
  }, [topProducts]);

  useEffect(() => {
    if (data) {
      const today = new Date().toISOString().split("T")[0];

      const todayOrders = data.orders.filter((order) =>
        order.createdAt.startsWith(today)
      );

      const totalSales = todayOrders.reduce(
        (total, order) => total + (order.total || 0),
        0
      );
      const totalOrders = todayOrders.length;
      const canceledOrders = todayOrders.filter(
        (order) => order.status === "Canceled"
      ).length;
      const onHold = todayOrders.filter(
        (order) => order.status === "On hold"
      ).length;
      const processing = todayOrders.filter(
        (order) => order.status === "Processing"
      ).length;
      const shipping = todayOrders.filter(
        (order) => order.status === "Shipping"
      ).length;

      setTodaySalesSummary({
        totalSales,
        totalOrders,
        canceledOrders,
        onHold,
        processing,
        shipping,
      });
    }
  }, [data]);

  useEffect(() => {
    if (todaySalesChartRef.current) {
      const labels = [
        "Total Orders",
        "Canceled Orders",
        "On Hold",
        "Processing",
        "Shipping",
      ];
      const dataPoints = [
        todaySalesSummary.totalOrders,
        todaySalesSummary.canceledOrders,
        todaySalesSummary.onHold,
        todaySalesSummary.processing,
        todaySalesSummary.shipping,
      ];

      if (todaySalesChartRef.current.chart) {
        todaySalesChartRef.current.chart.destroy();
      }

      todaySalesChartRef.current.chart = new Chart(todaySalesChartRef.current, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Today Sales Summary",
              data: dataPoints,
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
          plugins: {
            legend: {
              position: "top",
            },
            datalabels: {
              formatter: (value, context) => {
                return `${
                  context.chart.data.labels[context.dataIndex]
                }: ${value}`;
              },
              color: "#fff",
              backgroundColor: "#404040",
              borderRadius: 3,
              padding: 4,
              font: {
                weight: "bold",
              },
            },
          },
        },
      });
    }
  }, [todaySalesSummary]);

  const total = data?.orders?.reduce((total, item) => {
    if (item?.status === "Completed") {
      total += item?.total || 0;
    }
    return total;
  }, 0);

  return (
    <div className=" sm:p-7 border border-gray-300 rounded-lg bg-gray-50 my-10">
      <h1 className="text-gray-700  lg:text-xl">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Total Orders</h2>
          <p className="text-lg">{data?.orders?.length}</p>
        </div>
        <ShoppingCartIcon className="h-12 w-12"/>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Revenue</h2>
          <p className="text-lg">{total}/=</p>
        </div>
        <CurrencyDollarIcon className="h-12 w-12"/>
      </div>
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Completed</h2>
          <p className="text-lg">
            {data?.orders.filter((item) => item.status === "Completed")?.length}
          </p>
        </div>
        <CheckCircleIcon className="h-12 w-12"/>
      </div>
      <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Hold</h2>
          <p className="text-lg">
            {data?.orders.filter((item) => item.status === "On hold")?.length}
          </p>
        </div>
        <PauseIcon className="h-12 w-12"/>
      </div>
    </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Top Sale Product</h2>
          <div className="h-124">
            <canvas ref={topProductsChartRef}></canvas>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4"> Sales Summary</h2>
            <h1>{todaySalesSummary.totalSales}/=</h1>
          <div className="h-74 ">
            <div
              className="chart-container"
              style={{ position: "relative", height: "400px", width: "400px" }}
            >
              <canvas ref={todaySalesChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
