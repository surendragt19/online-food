import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";

const Home = () => {
  const [ites, setItems] = useState([]);
  const [categoryFood, setCategory] = useState([]);

  const [search, seSearch] = useState("");

  const displayItem = async () => {
    const res = await fetch(`${window.location.origin}/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setItems(data[0]);
    setCategory(data[1]);
    // console.log("itema",data[0],"Cat",data[1]);
  };

  useEffect(() => {
    displayItem();
  }, []);

  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="slider">
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: "10" }}
          >
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Food Items"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  seSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/1448721/pexels-photo-1448721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/8471703/pexels-photo-8471703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/1956974/pexels-photo-1956974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* card */}

      <div className="container">
        {categoryFood.length !== 0 ? (
          categoryFood.map((ele) => (
            <div key={ele._id} className="row mb-3">
              <div className="fs-3 m-3">{ele.CategoryName}</div>
              <hr />
              {ites.length !== 0 ? (
                ites
                  .filter(
                    (foodData) =>
                      foodData.CategoryName === ele.CategoryName &&
                      foodData.name &&
                      foodData.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div>No Items Available</div>
              )}
            </div>
          ))
        ) : (
          <div>No Categories Available</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
