import Sidebar from "../components/Sidebar";
import {
  FaBoxOpen,
  FaLayerGroup,
  FaExclamationTriangle,
  FaChartLine,
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
} from "react-icons/fa";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const lowStockItems = [
    { name: "Smartphone", quantity: 3 },
    { name: "Laptop", quantity: 2 },
    { name: "Headphones", quantity: 5 },
  ];

  const recentSales = [
    { product: "Smartphone", price: "$500" },
    { product: "Laptop", price: "$1200" },
    { product: "Headphones", price: "$150" },
  ];

  const topSellingProducts = [
    { name: "Smartphone", icon: <FaMobileAlt />, price: "$500" },
    { name: "Laptop", icon: <FaLaptop />, price: "$1200" },
    { name: "Headphones", icon: <FaHeadphones />, price: "$150" },
  ];

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 8, 17, 14, 22],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.25)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#10b981",
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Sales Trend",
        color: "#ffffff",
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.1)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="flex min-h-screen font-['Plus_Jakarta_Sans']"
      style={{
        background:
          "linear-gradient(circle at 80% 20%, rgba(4, 58, 37, 1) 20%, rgba(6, 43, 43, 1) 50%, rgb(2, 11, 44) 100%)",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 text-white overflow-y-auto pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-emerald-400/80 text-base sm:text-lg">
            Welcome back! Here is what's happening today.
          </p>
        </div>

        {/* ================= COMPACT TOP CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {[
            { title: "Total Products", value: "150", icon: <FaBoxOpen />, color: "text-blue-400" },
            { title: "Total Stock", value: "320", icon: <FaLayerGroup />, color: "text-emerald-400" },
            { title: "Low Stock", value: "10", icon: <FaExclamationTriangle />, color: "text-red-400" },
            { title: "Total Sales", value: "75", icon: <FaChartLine />, color: "text-purple-400" },
          ].map((card, i) => (
            <div
              key={i}
              className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition shadow-xl"
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg bg-white/5 ${card.color} text-xl`}>
                  {card.icon}
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  +12.5%
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-tight">
                {card.title}
              </p>
              <p className="text-2xl font-bold leading-snug">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* ================= CHART + LOW STOCK ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-2 p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 h-[300px] sm:h-[380px] lg:h-96 shadow-xl">
            <Line data={salesData} options={salesOptions} />
          </div>

          <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 h-[300px] sm:h-[380px] lg:h-96 flex flex-col shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Low Stock Items
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar">
              {lowStockItems.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-lg bg-white/5"
                >
                  <span className="text-sm sm:text-base">{item.name}</span>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs sm:text-sm font-bold">
                    {item.quantity} left
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full py-3 rounded-xl bg-emerald-500 text-[#022c22] font-bold hover:bg-emerald-400 transition">
              Restock All
            </button>
          </div>
        </div>

        {/* ================= BOTTOM TABLES ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-emerald-400">
              Recent Sales
            </h3>
            <div className="space-y-3">
              {recentSales.map((sale, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition"
                >
                  <span className="text-sm sm:text-base text-gray-300">
                    {sale.product}
                  </span>
                  <span className="font-bold text-emerald-400">
                    {sale.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-blue-400">
              Top Selling Products
            </h3>
            <div className="space-y-3">
              {topSellingProducts.map((product, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 bg-blue-400/10 p-2 rounded-lg">
                      {product.icon}
                    </span>
                    <span className="text-sm sm:text-base">{product.name}</span>
                  </div>
                  <span className="font-bold">{product.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
