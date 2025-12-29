import { useState, useEffect } from "react";
import { FiSearch, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Stock = () => {
  const [stockItems, setStockItems] = useState([]);
  const [search, setSearch] = useState("");

  /* Load stock from products */
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      const stockData = products.map((p, index) => ({
        id: index + 1,
        name: p.name || "N/A",
        category: p.category || "N/A",
        supplier: p.supplier || "N/A",
        stock: parseInt(p.stock) || 0,
      }));
      setStockItems(stockData);
    }
  }, []);

  const filteredStock = stockItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen text-white font-['Plus_Jakarta_Sans']">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">
            Stock Inventory
          </h1>
          <p className="text-emerald-500">
            Monitor available stock levels for all products.
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search stock..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 text-white"
            />
          </div>

          <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">
            <FiAlertTriangle /> Low stock below 5 units
          </div>
        </div>

        {/* TABLE (Responsive for Mobile) */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-x-auto shadow-2xl">
          <table className="min-w-full text-left table-auto md:table-fixed">
            <thead className="bg-white/10 text-white uppercase text-sm tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">ID</th>
                <th className="px-6 py-4 font-bold">Product Name</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Supplier</th>
                <th className="px-6 py-4 font-bold text-center">Stock</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredStock.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-gray-400 italic"
                  >
                    No stock data found.
                  </td>
                </tr>
              ) : (
                filteredStock.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-400">{item.id}</td>

                    <td className="px-6 py-4 font-semibold text-white">
                      {item.name}
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-white/80">{item.supplier}</td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`font-bold ${
                          item.stock < 5 ? "text-red-400" : "text-white"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      {item.stock < 5 ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold">
                          <FiAlertTriangle /> LOW
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold">
                          <FiCheckCircle /> OK
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Stock;
