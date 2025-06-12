
export interface SearchBarProps {
  onChange: (value: string) => void;
}

export function SearchBar({onChange}: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}