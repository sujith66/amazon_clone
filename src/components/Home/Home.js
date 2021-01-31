import React from "react";
import HomeImage from "../../images/homeImage.jpg";
import Product from "../Product/Product";
import book1 from "../../images/book1.jpg";
import image1 from "../../images/image1.jpg";
import image2 from "../../images/image2.jpg";
import image3 from "../../images/image3.jpg";
import "./Home.css";
import { nanoid } from "nanoid";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__backImage"
          src={HomeImage}
          alt="Home image for amazon"
        />

        <div className="home__row">
          <Product
          id={nanoid()}
            title="One Indian Girl"
            price={10.00}
            rating={5}
            image={book1}
          />
          <Product
          id={nanoid()}
            title="Lenovo IdeaPad Slim 3i 10th Gen Intel Core i3 14 inch Full HD Thin and Light Laptop (4GB/256GB SSD/Windows 10/MS Office 2019/"
            price={450.00}
            rating={3}
            image={image1}
          />
        </div>
        <div className="home__row">
          <Product
          id={nanoid()}
            title="Prestige IRIS LPG Gas Stove, 3 Burner, Black"
            price={25.00}
            rating={3}
            image={image2}
          />
          <Product
          id={nanoid()}
            title="COSMUS Darwin Navy Blue Laptop Backpack for (15.6 inch)"
            price={28.00}
            rating={3}
            image={image3}
          />
          <Product
          id={nanoid()}
            title="COSMUS Darwin Navy Blue Laptop Backpack for (15.6 inch)"
            price={25.00}
            rating={4}
            image={image3}
          />
        </div>
        <div className="home__row">
          <Product
          id={nanoid()}
            title="COSMUS Darwin Navy Blue Laptop Backpack for (15.6 inch)"
            price={25.00}
            rating={1}
            image={image3}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
