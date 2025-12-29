import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { FiTrendingUp, FiUsers, FiShoppingBag, FiRefreshCcw, FiPieChart } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const Reports = () => {
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [12000, 15000, 18000, 20000, 22000, 21000, 24000, 26000, 28000, 30000, 32000, 34000],
        borderColor: "#10b981", // Emerald 500
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1a2223",
        titleColor: "#10b981",
        bodyColor: "#fff",
        padding: 12,
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
      },
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: { color: "rgba(255,255,255,0.5)", font: { size: 11 } } 
      },
      y: { 
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "rgba(255,255,255,0.5)", font: { size: 11 } } 
      },
    },
  };

  const reportData = [
    { month: "Jan", sales: 12000, orders: 120, status: "Stable" },
    { month: "Feb", sales: 15000, orders: 150, status: "Increasing" },
    { month: "Mar", sales: 18000, orders: 200, status: "Stable" },
    { month: "Apr", sales: 20000, orders: 180, status: "Increasing" },
    { month: "May", sales: 22000, orders: 210, status: "Stable" },
  ];

  const stats = [
    { title: "Total Revenue", value: "$1,200,000", icon: <FiTrendingUp />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Active Users", value: "3,450", icon: <FiUsers />, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Total Orders", value: "8,730", icon: <FiShoppingBag />, color: "text-purple-400", bg: "bg-purple-500/10" },
    { title: "Returns", value: "430", icon: <FiRefreshCcw />, color: "text-red-400", bg: "bg-red-500/10" },
  ];

  return (
    <div className="flex min-h-screen text-white font-['Plus_Jakarta_Sans']">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Business Analytics</h1>
          <p className="text-emerald-400/80">Monitor your performance and financial growth.</p>
        </div>

        {/* Compact Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl">
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-2 text-xl`}>
                {stat.icon}
              </div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.title}</p>
              <h2 className="text-xl font-black mt-1">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Main Chart Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FiPieChart className="text-emerald-400" /> Revenue Growth
            </h2>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none focus:border-emerald-500 transition-all">
              <option className="bg-[#1a2223]">Year 2025</option>
              <option className="bg-[#1a2223]">Year 2024</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <Line data={salesData} options={chartOptions} />
          </div>
        </div>

        {/* Monthly Summary Table */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">Monthly Performance Summary</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-emerald-400 uppercase text-xs font-bold">
                <tr>
                  <th className="px-6 py-4">Month</th>
                  <th className="px-6 py-4">Sales Revenue</th>
                  <th className="px-6 py-4">Total Orders</th>
                  <th className="px-6 py-4">Growth Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {reportData.map((item) => (
                  <tr key={item.month} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold">{item.month}</td>
                    <td className="px-6 py-4 font-mono text-emerald-400">${item.sales.toLocaleString()}</td>
                    <td className="px-6 py-4">{item.orders}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.status === "Increasing" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
