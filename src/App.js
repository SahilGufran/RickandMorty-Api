import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";

import Card from "./components/Card/Card";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import CardDetails from "./components/Card/CardDetails";

/* Defining route paths for different sections along with the navbar using react-router-dom*/

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CardDetails />} />

        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<CardDetails />} />

        <Route path="/location" element={<Location />} />
        <Route path="/location/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
}
/**Using hooks to get hold of the data from the api processing it converting to json and 
 * then further passing it to jsx to show data in proper structural form.
 */
const Home = () => {
  let [pageNumber, updatePageNumber] = useState(1);
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");
  let [fetchedData, updateFetchedData] = useState([]);
  let { info, results } = fetchedData;

  /* Storing api for fetching data and to usefor further call
   */
  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&status=${status}&gender=${gender}&species=${species}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    })();
  }, [api]);
   //
   /**
   * Using the json data from the api and passing it to jsx to finally get the result.
   */
  return (
    <div className="App">
      <h1 className="text-center mb-3">Characters</h1>
      <div className="container">
        <div className="row">
          <Filter
           /**Using filter component */
            pageNumber={pageNumber}
            status={status}
            updateStatus={updateStatus}
            updateGender={updateGender}
            updateSpecies={updateSpecies}
            updatePageNumber={updatePageNumber}
          />
          <div className="col-lg-8 col-12">
            <div className="row">
              <Card page="/" results={results} />
            </div>
          </div>
        </div>
      </div>
      
      <Pagination                                   /**using pagination component */
        info={info}                     
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      />
    </div>
  );
};

export default App;
