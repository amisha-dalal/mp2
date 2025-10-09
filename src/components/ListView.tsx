import { useState } from "react";
import { useArtworks } from "../hooks/useArtworks"; 
import {Link } from "react-router-dom";


const ListView = () => {
   const {data, loading, setData} = useArtworks();
   const [sortKey, setSortKey] = useState<"title" | "artist_title">("title");
   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
   const [searchInput, setSearchInput] = useState("");

   if (loading) return <div>Loading...</div>;

   //sortBy function will be called when drop downs get changed, sort data accordingly
   function sortBy(sortKey: "title" | "artist_title", sortDirection: "asc" | "desc") {
       setSortKey(sortKey);
       setSortDirection(sortDirection);
       const sortedData = [...data].sort((a, b) => {
           if (sortDirection === "asc") {
               return a[sortKey].localeCompare(b[sortKey]);
           } else {
               return b[sortKey].localeCompare(a[sortKey]);
           }
       });
       setData(sortedData);
   }

   //need to account for if the value was null, can't apply lower case otherwise
   const matchesSearch = (value: string | null) => (value || "").toLowerCase().includes(searchInput.toLowerCase());
   
   //display data that matches based on search input with title, artist title, origin, medium,
   const searchFilteredData = data.filter((item) =>
        matchesSearch(item.title) || matchesSearch(item.artist_title) ||
        matchesSearch(item.place_of_origin) || matchesSearch(item.medium_display)
   );

   //search bar, sort by drop down, order drop down, and list of artwork items
   return (
       <div className="ListPage">
           <h1>Artwork List</h1>
           <div className="search-controls">
               <label>Search for an artwork title or artist title   </label>
               <input
               type="text"
               value={searchInput}
               placeholder="Enter artwork/artist title"
               onChange={(e) => setSearchInput(e.target.value)}
               />
           </div>
           <div className="sort-controls">
               <label>Sort by: </label>
               <select value={sortKey} onChange={e => sortBy(e.target.value as "title" | "artist_title", sortDirection)}>
                   <option value="title">Title</option>
                   <option value="artist_title">Artist Title</option>
               </select>


               <label>  Order: </label>
               <select value={sortDirection} onChange={e => sortBy(sortKey, e.target.value as "asc" | "desc")}>
                   <option value="asc">Ascending</option>
                   <option value="desc">Descending</option>
               </select>
           </div>
           <div className="ListDisplay">
                <ul>
                {searchFilteredData.map(item => (
                    <li key={item.id} className="listItem">
                        <Link to={`/artwork/${item.id}`}>
                            <img
                        src={`https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg`}
                        alt={item.title}
                        />
                        </Link>
                        <div className="listText">
                            {sortKey === "title" ? (
                                <> 
                                    <p>Title: {item.title}</p>
                                    <p>Artist title: {item.artist_title}</p>
                                </>
                            ) : (
                                <>
                                    <p>Artist title: {item.artist_title}</p>
                                    <p>Title: {item.title}</p>
                                </>
                            )}
                            
                        </div>
                    </li>
                ))}
                </ul>            
            </div>
       </div>
   );
};


export default ListView;