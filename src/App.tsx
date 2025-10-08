import React from "react";
import { BrowserRouter as Router,
 Routes,
 Route,
 Link } from "react-router-dom";
import ListView from "./components/ListView";
import GalleryView from "./components/GalleryView";
import DetailsView from "./components/DetailsView";


function Home() {
 return <div className="homePage">
     <h1>Home Page</h1>
     <p>Click on links to see the list view, gallery view, and details view</p>
   </div>;
}

function App() {
 return (
   <Router basename="/mp2">
     <div>
       <nav>
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