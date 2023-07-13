import React from "react";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import Content from "../../components/Content";

const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <Content />
    </div>
  );
};

export default Home;
