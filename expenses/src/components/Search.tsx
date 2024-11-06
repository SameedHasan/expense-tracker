import { useSearch } from "frappe-react-sdk";
import { useState } from "react";

interface SearchResultItem {
  id: string;
  title: string;
  value: string;
  // Add other properties as needed
}

export const Search: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { data: result } = useSearch("Expense Record", searchText);

  if (result) {
    // console.log("result", result);
  }

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSuggestionClick = (suggestion: SearchResultItem) => {
    setSearchText(suggestion.value);
    // Perform additional action based on the selected suggestion
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="Search..."
      />
      {result?.results.length > 0 && (
        <ul className="dropdown-menu">
          {result?.results.map((item) => (
            <li key={item.value} onClick={() => handleSuggestionClick(item)}>
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
