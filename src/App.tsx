import React from "react";
import { BrowserRouter as Router,
 Routes,
 Route,
 Link } from "react-router-dom";
import ListView from "./components/ListView";
import GalleryView from "./components/GalleryView";
import DetailsView from "./components/DetailsView";
import "./App.css"


function Home() {
 return <div className="homePage">
  <div className="homeContent">
    <h1>MP 2</h1>
    <p>Welcome to my MP2! I used the Art Institute of Chicago API. 
    Click on links in the nav bar to see the list view and gallery view.
    If you click on an image, it will open the details view for that artwork.
    Additionally, you can navigate to previous and next artworks from a details view.</p>
  </div>
  </div>;
}

function App() {
 return (
   <Router basename="/mp2">
     <div>
       <nav className="navbar">
         <Link to="/">Home</Link>
         <Link to="/list-view">List View</Link>
         <Link to="/gallery-view">Gallery View</Link>
       </nav>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/list-view" element={<ListView />} />
         <Route path="/gallery-view" element={<GalleryView />} />
         <Route path="/artwork/:id" element={<DetailsView />} />
       </Routes>
     </div>
   </Router>
 );
}


export default App;