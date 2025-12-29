import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiMail, FiPhone } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("suppliers");
    if (saved) setSuppliers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
  }, [suppliers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...suppliers];
      updated[editingIndex] = formData;
      setSuppliers(updated);
      setEditingIndex(null);
    } else {
      setSuppliers([...suppliers, formData]);
    }
    setFormData({ name: "", email: "", phone: "", address: "" });
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setFormData(suppliers[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers(suppliers.filter((_, i) => i !== index));
    }
  };

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen text-white font-['Plus_Jakarta_Sans']">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* ================= HEADER SECTION (Products Style) ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Supplier Management</h1>
          <p className="text-emerald-400/80">Keep track of your vendors and their contact details.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-all backdrop-blur-md text-white"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-[#1a2223] font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 w-full md:w-auto justify-center"
          >
            <FiPlus size={22} /> Add New Supplier
          </button>
        </div>

        {/* ================= TABLE SECTION (Products Style) ================= */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-white/10 text-white uppercase text-sm tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Supplier Name</th>
                  <th className="px-6 py-4 font-bold">Contact Info</th>
                  <th className="px-6 py-4 font-bold">Address</th>
                  <th className="px-6 py-4 font-bold text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filteredSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-gray-400 text-lg italic">
                      No suppliers found.
                    </td>
                  </tr>
                ) : (
                  filteredSuppliers.map((sup, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 font-semibold text-white">
                        {sup.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-2 text-gray-300 text-sm">
                            <FiMail className="text-emerald-400" size={14} /> {sup.email || "N/A"}
                          </span>
                          <span className="flex items-center gap-2 text-gray-300 text-sm">
                            <FiPhone className="text-emerald-400" size={14} /> {sup.phone || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm italic max-w-xs truncate">
                         {sup.address || "No address provided"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEdit(idx)} className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-all">
                            <FiEdit size={18} />
                          </button>
                          <button onClick={() => handleDelete(idx)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                            <FiTrash2 size={18} />
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

        {/* ================= MODAL SECTION (Products Style) ================= */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#1a2223]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a2223] border border-white/10 w-full max-w-md p-8 rounded-2xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-emerald-400">
                {editingIndex !== null ? "Update Supplier" : "Create New Supplier"}
              </h2>

              <div className="space-y-4">
                <input name="name" placeholder="Supplier Name" value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none text-white transition-all" />
                
                <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none text-white transition-all" />

                <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none text-white transition-all" />

                <textarea name="address" placeholder="Physical Address" value={formData.address} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none text-white transition-all" rows={3}></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button onClick={() => { setIsModalOpen(false); setEditingIndex(null); }} className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button onClick={handleAddOrUpdate} className="px-6 py-3 bg-emerald-500 text-[#1a2223] font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
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

export default Suppliers;