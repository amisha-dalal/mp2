import { useArtworks } from "../hooks/useArtworks"; 
import { useState } from "react";
import {Link } from "react-router-dom";

const GalleryView = () => {
    const {data, loading} = useArtworks();
    const [filters, setFilters] = useState({
        artist_title: "",
        place_of_origin: "",
        medium_display: "",
    });

    if (loading) return <div>Loading...</div>;

    //need to get unique values from attributes we are going to filter on
    const uniqueArtistTitles = Array.from(new Set(data.map(item => item.artist_title).filter(Boolean)));
    const uniqueOrigins = Array.from(new Set(data.map(item => item.place_of_origin).filter(Boolean)));
    const uniqueMediums = Array.from(new Set(data.map(item => item.medium_display).filter(Boolean)));

    //will call this whenever something gets changed in attribute drop downs
    //similar to sortBy function from list view
    //only one attribute (key) can be changed at a time
    function handleFilterChange(key: string, value: string) {
        setFilters(prev => ({ ...prev, [key]: value }));
    }

    //filter data based on attributes
    //similar to searchFilteredData in list view
    const filteredData = data.filter((item) => 
        (!filters.artist_title || item.artist_title === filters.artist_title) &&
        (!filters.place_of_origin || item.place_of_origin === filters.place_of_origin) &&
        (!filters.medium_display || item.medium_display === filters.medium_display)
    );

    //drop downs for artist title, origin, medium, gallery and grid of artwork items
    return (
       <div className="gridDisplay">
           <h1>Gallery View</h1>
           <div className="filter-controls">
            <div className="dropDownWhole">
                <label> Artist title </label>
                <select value={filters.artist_title} onChange={e => handleFilterChange("artist_title", e.target.value)}>
                    <option value="">Show All</option>
                    {uniqueArtistTitles.map(artist => (
                        <option className="dropDownEntry" key={artist} value={artist}>{artist}</option>
                    ))}
                </select>
            </div>
            <div className="dropDownWhole">
                <label> Place of Origin </label>
                <select value={filters.place_of_origin} onChange={e => handleFilterChange("place_of_origin", e.target.value)}>
                    <option value="">Show All</option>
                    {uniqueOrigins.map(origin => (
                        <option className="dropDownEntry" key={origin} value={origin}>{origin}</option>
                    ))}
                </select>
            </div>
            <div className="dropDownWhole">
                <label> Medium Display </label>
                <select value={filters.medium_display} onChange={e => handleFilterChange("medium_display", e.target.value)}>
                    <option value="">Show All</option>
                    {uniqueMediums.map(medium => (
                        <option className="dropDownEntry" key={medium} value={medium}>{medium}</option>
                    ))}
                </select>
            </div>
           </div>
           <div className="galleryGrid">
            <ul>
               {filteredData.map(item => (
                   <li key={item.id} className="gridItem">
                    <Link to={`/artwork/${item.id}`}>
                    <img
                       src={`https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg`}
                       alt={item.title}
                       />
                    </Link>
                   </li>
               ))}
           </ul>
           </div>
       </div>
   );
};

export default GalleryView;