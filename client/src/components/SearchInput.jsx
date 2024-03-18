function SearchInput({ setSearch, search }) {
  return (
    <div className="input-group ">
      <input
        type="text"
        placeholder="search"
        className="h-[45px]"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchInput;
