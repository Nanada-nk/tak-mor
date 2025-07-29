import { SearchIcon } from "./icons/index.jsx";

function SearchBar({placeholder = "ค้นหา"}) {
  return (
    <label className="input rounded-full bg-white text-black flex flex-1 items-center border-[#EEF7FB] sm:border-none py-0.5 sm:py-0 w-[325px] sm:w-full">
      <SearchIcon className="w-5 opacity-60" />
      <input type="text" placeholder={placeholder} className="flex-1" />
    </label>
  );
}
export default SearchBar;
