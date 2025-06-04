import axios from "axios";
import { useEffect, useState } from "react";

const Sidebar = ({
  checked,
  setChecked,
  groupedCategories,
  setGroupedCategories,
}) => {
  const [expanded, setExpanded] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category/getAllCategory");
      setCategories(res.data);
    } catch (error) {
      console.log("Failed to load categories", error);
    }
  };

  // Fetch all subcategories and group by category name
  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("/api/subCategory/getSubcategory");
      const data = res.data;

      const grouped = {};
      const initialChecked = {};

      data.forEach((sub) => {
        const category = sub.category?.name;
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push({ name: sub.name, _id: sub._id });
        initialChecked[sub.name] = false;
      });

      setGroupedCategories(grouped);
      setChecked(initialChecked);
    } catch (error) {
      console.log("Failed to load subcategories", error);
    }
  };

  const toggleExpand = (category) => {
    setExpanded((prev) => (prev === category ? null : category));
  };

  const toggleCheck = (name) => {
    setChecked((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="w-64 px-4 py-4 bg-white min-h-screen">
      <div className="text-sm text-gray-600 mb-2">
        <span className="text-black font-medium">Home</span>
        <span className="mx-1">{">"}</span>
      </div>

      <h2 className="text-sm font-semibold py-6 text-[#003b5c]">Categories</h2>

      <ul className="text-sm text-gray-700">
        <li className="cursor-pointer hover:text-[#003b5c] py-2">
          All Categories
        </li>

        {categories.map((cat) => (
          <li key={cat._id}>
            <div
              className="flex py-2 justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(cat.name)}
            >
              <span>{cat.name}</span>
              <span>{expanded === cat.name ? "▼" : "▶"}</span>
            </div>

            {expanded === cat.name && groupedCategories[cat.name] && (
              <div className="ml-6 mt-2">
                {groupedCategories[cat.name].map((sub) => (
                  <label key={sub._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked[sub?.name]}
                      onChange={() => toggleCheck(sub?.name)}
                      className="accent-[#003b5c]"
                    />
                    <span>{sub?.name}</span>
                  </label>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
