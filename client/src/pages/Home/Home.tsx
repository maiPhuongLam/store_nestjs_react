import React from "react";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import Content from "../../components/Content";
import { useUserContext } from "../../hooks/useUserContext";

const Home = () => {
  const { userState } = useUserContext();
  return (
    <div className="home">
      <Carousel />
      <Content />
    </div>
  );
};

export default Home;
