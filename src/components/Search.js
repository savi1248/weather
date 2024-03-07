export default function Search({search, setSearch, handleSearch}) {
    
    return (
        <div className="search-engine">
            <input
                type="text"
                className="city-search"
                placeholder="Enter the city name"
                name="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <button
             
            onClick={handleSearch}>
                 Search 
            </button>
             </div>
    )
}