import { IoMdCloseCircle } from "react-icons/io";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search through 500+ movies online"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoMdCloseCircle
          size={20}
          color="#AB8BFF"
          className="cursor-pointer"
          onClick={() => setSearchTerm("")}
        />
      </div>
    </div>
  );
};

export default Search;
