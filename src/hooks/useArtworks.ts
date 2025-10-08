import { useEffect, useState } from "react";
import { _get } from "../api/artic";
import { ArtworkData } from "../interfaces/ArtworkData";

export function useArtworks() {
    const [data, setData] = useState<ArtworkData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //get artwork and make sure it has an image, a title, and artist title
                const response = await _get("/artworks?limit=100");
                const artworkWithAllData = response.data.data.filter(
                    (item: ArtworkData) => item.image_id && item.title !== "Untitled" && item.artist_title
                );
                //start off with default sort (title, ascending)
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

    return {data, loading, setData};
}