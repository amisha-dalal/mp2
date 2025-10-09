import { useEffect, useState } from "react";
import { ArtworkData } from "../interfaces/ArtworkData";
import { useArtworks } from "../hooks/useArtworks"; 
import {useNavigate, useParams } from "react-router-dom";

//there should be a general details layout
//the actual artwork data we get will depend on the id parameter

const DetailsView = () => {
    //need to use params and navigate for this
    const { id } = useParams();
    const navigate = useNavigate();
    //useArtworks to get all the artwork data
    const { data } = useArtworks();
    //also need to store specific artwork that matches id
    const [artwork, setArtwork] = useState<ArtworkData>();

    useEffect(() => {
        //id param is a string, need to convert to number to match in artwork data
        const idNum = Number(id);
        //should find the specific artwork from data based on id
        const findArtwork = data.find((a) => a.id === idNum);
        setArtwork(findArtwork);
    }, [id, data]);

    if (!artwork) return <div>Loading artwork...</div>;


    //we have the current id artwork set now
    //also need to figure out the prev and next ids
    //find the index of the artwork id in data
    const index = data.findIndex((a) => a.id === artwork.id);
    //if index is the first, then prev id can be the very last
    //otherwise just id at data[index - 1]
    const prevId = index > 0 ? data[index - 1].id : data[data.length - 1].id;
    //if index is the last, then next id can be the very first
    //otherwise just id at data[index + 1]
    const nextId = index < data.length - 1 ? data[index + 1].id : data[0].id;

    //prev and next buttons, and then also display artwork image, title, and all other attributes
    return (
        <div className="detailPage">
            <h1>Details of {artwork.title}</h1>
            <div className="nav-buttons">
                <button onClick={() => navigate(`/artwork/${prevId}`)}>← Prev</button>
                <button onClick={() => navigate(`/artwork/${nextId}`)}>Next →</button>
            </div>
            <div className="artwork-details">
                <img
                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/800,/0/default.jpg`}
                    alt={artwork.title}
                />
                <p>Artist title: {artwork.artist_title ?? "N/A"}</p>
                <p>Origin: {artwork.place_of_origin ?? "N/A"}</p>
                <p>Medium: {artwork.medium_display ?? "N/A"}</p>
            </div>
        </div>
    );

};

export default DetailsView;