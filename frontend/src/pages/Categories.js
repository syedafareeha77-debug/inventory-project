import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("categories");
    if (saved) setCategories(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateCategory = () => {
    if (!newCategory.name) return;

    if (editingIndex !== null) {
      const updated = [...categories];
      updated[editingIndex] = newCategory;
      setCategories(updated);
      setEditingIndex(null);
    } else {
      setCategories([...categories, newCategory]);
    }
    setNewCategory({ name: "", description: "" });
  };

  const handleEdit = (index) => {
    setNewCategory(categories[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this category?")) {
      const updated = categories.filter((_, i) => i !== index);
      setCategories(updated);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="flex min-h-screen text-white font-['Plus_Jakarta_Sans']"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(4, 58, 37, 1) 20%, rgba(6, 43, 43, 1) 50%, rgb(2, 11, 44) 100%)",
      }}
    >
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 md:pt-8">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Categories
          </h1>
          <p className="text-emerald-400/80 text-sm sm:text-base">
            Organize your products into manageable categories.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Left Side: Form Card */}
          <div className="w-full lg:w-1/3 bg-white/5 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 shadow-xl h-fit">
            <h2 className="text-xl font-bold mb-4 sm:mb-6 text-emerald-400">
              {editingIndex !== null ? "Edit Category" : "Add New Category"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Category Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Electronics"
                  value={newCategory.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Brief details..."
                  value={newCategory.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all"
                  rows={4}
                ></textarea>
              </div>

              <button
                onClick={handleAddOrUpdateCategory}
                className="w-full px-3 py-3 bg-emerald-500 text-[#1a2223] font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <FiPlus size={20} />
                {editingIndex !== null ? "Update Category" : "Add Category"}
              </button>

              {editingIndex !== null && (
                <button
                  onClick={() => { setEditingIndex(null); setNewCategory({ name: "", description: "" }) }}
                  className="w-full text-gray-400 hover:text-white text-sm"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          {/* Right Side: Search & Table Card */}
          <div className="w-full lg:w-2/3 bg-white/5 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 shadow-xl overflow-hidden">

            {/* Search */}
            <div className="relative mb-4 sm:mb-6">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-hidden">
              <table className="w-full text-left text-sm sm:text-base">
                <thead className="bg-white/10 text-white/400 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 font-bold">ID</th>
                    <th className="px-4 sm:px-6 py-3 font-bold">Name</th>
                    <th className="px-4 sm:px-6 py-3 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCategories.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-6 text-gray-500 italic">
                        No categories found.
                      </td>
                    </tr>
                  ) : (
                    filteredCategories.map((cat, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 sm:px-6 py-3 text-gray-400">#{idx + 1}</td>
                        <td className="px-4 sm:px-6 py-3 font-semibold">{cat.name}</td>
                        <td className="px-4 sm:px-6 py-3">
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => handleEdit(idx)}
                              className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-all"
                            >
                              <FiEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(idx)}
                              className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                            >
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
        </div>
      </main>
    </div>
  );
};

export default Categories;
