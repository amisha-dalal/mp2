import React, { useEffect, useState } from "react";
import { _get } from "../api/artic";


//used this for reference: https://www.geeksforgeeks.org/reactjs/axios-in-react-a-guide-for-beginners/


interface ArtworkData {
   id: number;
   title: string;
   image_id: string;
   artist_title: string;
}


const ListView = () => {
   const [data, setData] = useState<ArtworkData[]>([]);
   const [loading, setLoading] = useState(true);
   const [sortKey, setSortKey] = useState<"title" | "artist_title">("title");
   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
   const [searchInput, setSearchInput] = useState("");


   useEffect(() => {
       const fetchData = async () => {
           try {
               const response = await _get("/artworks?limit=60");
               const artworkWithAllData = response.data.data.filter(
                   (item: ArtworkData) => item.image_id && item.title !== "Untitled" && item.artist_title
               );
               const sortedData = [...artworkWithAllData].sort((a, b) =>
                   a.title.localeCompare(b.title)
               );
               setData(sortedData);
           } catch (error) {
               console.error("Error fetching data: ", error);
           } finally {
               setLoading(false);
           }
       };
       fetchData();
   }, []);


  


   if (loading) return <div>Loading...</div>;


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


   const searchFilteredData = data.filter((item) =>
       item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
       item.artist_title.toLowerCase().includes(searchInput.toLowerCase())
   );


   return (
       <div>
           <h1>Artwork List</h1>
           <div className="search-controls">
               <label>Search for an artwork title or artist title</label>
               <input
               type="text"
               value={searchInput}
               placeholder="Enter an artwork title or artist title"
               onChange={(e) => setSearchInput(e.target.value)}
               />
           </div>
           <div className="sort-controls">
               <label>Sort by: </label>
               <select value={sortKey} onChange={e => sortBy(e.target.value as "title" | "artist_title", sortDirection)}>
                   <option value="title">Title</option>
                   <option value="artist_title">Artist Title</option>
               </select>


               <label>Order: </label>
               <select value={sortDirection} onChange={e => sortBy(sortKey, e.target.value as "asc" | "desc")}>
                   <option value="asc">Ascending</option>
                   <option value="desc">Descending</option>
               </select>
           </div>
           <ul>
               {searchFilteredData.map(item => (
                   <li key={item.id} className="list_item">
                       <img
                       src={`https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg`}
                       alt={item.title}
                       />
                       <p>Title: {item.title}</p>
                       <p>Artist title: {item.artist_title}</p>
                   </li>
               ))}
           </ul>
       </div>
   );
};


export default ListView;