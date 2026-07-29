import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getCategories } from "../services/categoryService.js";

function CategoryDropdown() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(category) {
    setOpen(false);
    if (category) {
      navigate(`/products?category=${category.id}`);
    } else {
      navigate("/products");
    }
  }

  return ( 
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gray-900 border border-gray-700 text-white
        px-4 py-2 rounded-full hover:border-amber-700 transition min-w-[140px] justify-between"
      >
        <span className="text-gray-300">Category</span>
        <ChevronDown
          size={16}
          className={`text-amber-700 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 bg-gray-900 border border-gray-700
        rounded-xl shadow-lg overflow-hidden z-50 min-w-[140px]">
          <button
            onClick={() => handleSelect(null)}
            className="w-full text-right px-4 py-2 text-sm text-gray-300 hover:bg-gray-800
            hover:text-amber-700 transition"
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat)}
              className="w-full text-right px-4 py-2 text-sm text-gray-300 hover:bg-gray-800
              hover:text-amber-700 transition"
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryDropdown;