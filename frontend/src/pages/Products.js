import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    supplier: "",
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = formData;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, formData]);
    }
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      supplier: "",
    });
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="flex min-h-screen text-white font-['Plus_Jakarta_Sans']"
      style={{
        background:
          "linear-gradient(circle at 80% 20%, rgba(4, 58, 37, 1) 20%, rgba(6, 43, 43, 1) 50%, rgb(2, 11, 44) 100%)",
      }}
    >
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 md:pt-8">
        {/* ================= HEADER ================= */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Product Management
          </h1>
          <p className="text-emerald-400/80 text-sm sm:text-base">
            Manage your inventory products, prices, and stock levels.
          </p>
        </div>

        {/* ================= SEARCH + BUTTON ================= */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6 sm:mb-8">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none backdrop-blur-md"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-[#1a2223] font-bold rounded-xl hover:bg-emerald-400 transition shadow-lg w-full md:w-auto"
          >
            <FiPlus size={20} />
            Add New Product
          </button>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm sm:text-base">
              <thead className="bg-white/10 uppercase tracking-wider text-gray-300">
                <tr>
                  <th className="px-4 sm:px-6 py-4">ID</th>
                  <th className="px-4 sm:px-6 py-4">Name</th>
                  <th className="px-4 sm:px-6 py-4">Category</th>
                  <th className="px-4 sm:px-6 py-4">Supplier</th>
                  <th className="px-4 sm:px-6 py-4">Price</th>
                  <th className="px-4 sm:px-6 py-4">Stock</th>
                  <th className="px-4 sm:px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-12 text-gray-400 italic"
                    >
                      No products found in the inventory.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((prod, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition">
                      <td className="px-4 sm:px-6 py-4 text-gray-400">
                        {idx + 1}
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-semibold">
                        {prod.name}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {prod.category || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-gray-300">
                        {prod.supplier}
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-bold text-emerald-400">
                        ${prod.price}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`font-bold ${prod.stock < 5
                              ? "text-red-400"
                              : "text-white"
                            }`}
                        >
                          {prod.stock}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(idx)}
                            className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-white transition"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(idx)}
                            className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MODAL ================= */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a2223] w-full max-w-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-emerald-400">
                {editingIndex !== null ? "Update Product" : "Create New Product"}
              </h2>

              <div className="space-y-4">
                {["name", "description", "category", "supplier"].map((f) => (
                  <input
                    key={f}
                    name={f}
                    placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                    value={formData[f]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none"
                  />
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none"
                  />
                  <input
                    name="stock"
                    type="number"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingIndex(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOrUpdate}
                  className="px-6 py-3 bg-emerald-500 text-[#1a2223] font-bold rounded-xl hover:bg-emerald-400 transition"
                >
                  {editingIndex !== null ? "Save Changes" : "Confirm Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
