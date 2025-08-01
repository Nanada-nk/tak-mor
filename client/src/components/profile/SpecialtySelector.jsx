import React, { useState, useEffect, useRef } from "react";
import doctorApi from "../../api/doctorApi";

function SpecialtySelector({ selected, onChange, disabled }) {
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    doctorApi.getAllSpecialties().then(res => {
      setAllSpecialties(res.data);
      setLoading(false);
    });
  }, []);

  // Defensive: Remove duplicates from selected
  const uniqueSelected = selected.filter((s, idx, arr) => arr.findIndex(x => x.id === s.id) === idx);

  // Only show specialties not already selected, order by name, and limit to 5
  const filtered = allSpecialties
    .filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      !uniqueSelected.some(sel => sel.id === s.id)
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 5);

  const addSpecialty = (spec) => {
    if (!selected.some(sel => sel.id === spec.id)) {
      onChange([...selected, spec]);
      setSearch("");
      inputRef.current && inputRef.current.focus();
    }
  };

  const removeSpecialty = (id) => {
    onChange(selected.filter(s => s.id !== id));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {uniqueSelected.map(s => (
          <span
            key={s.id}
            className="bg-blue-200/80 text-blue-900 px-3 py-1 rounded-full text-xs font-medium shadow flex items-center gap-1 border border-blue-300"
          >
            {s.name}
            <button
              type="button"
              className="ml-1 text-blue-900 hover:text-red-500 focus:outline-none"
              onClick={() => removeSpecialty(s.id)}
              disabled={disabled}
              aria-label={`Remove ${s.name}`}
              style={{ lineHeight: 1 }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <input
          ref={inputRef}
          className="bg-blue-200/40 text-blue-900 px-2 py-1 rounded-full text-xs font-medium shadow border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full transition-all duration-100"
          type="text"
          placeholder="Search specialties..."
          value={search || ""}
          onChange={e => setSearch(e.target.value)}
          disabled={disabled}
          style={{ minWidth: 0, height: '28px' }}
          autoComplete="off"
        />
      </div>
      {loading ? (
        <div className="text-xs text-gray-400">Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {filtered.length === 0 && search ? (
            <div className="text-xs text-gray-400">No specialties found</div>
          ) : (
            filtered.map(s => (
              <button
                key={s.id}
                type="button"
                className="bg-white text-blue-800 px-3 py-1 rounded-full text-xs font-semibold border border-blue-400 border-dashed shadow-sm hover:bg-blue-100 hover:border-blue-600 transition-all duration-100 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => addSpecialty(s)}
                disabled={disabled}
                style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
                aria-label={`Add ${s.name}`}
              >
                <span className="text-blue-500 text-base leading-none">＋</span>
                {s.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SpecialtySelector;
