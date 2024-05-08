import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import main_image from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span>App
          </h1>
          <p>
            I'm baby tattooed whatever meggings art party, bruh schlitz PBR&B
            church-key. Selvage ethical neutral milk hotel, thundercats truffaut
            narwhal actually food truck humblebrag chartreuse. Locavore unicorn
            90's, banh mi DIY cronut chicharrones post-ironic franzen
            asymmetrical kombucha keffiyeh paleo godard Brooklyn. Unicorn
            tousled snackwave XOXO vaporware man braid.
          </p>
          <Link to="./register" className="btn register-link">
            Register
          </Link>
          <Link to="./login" className="btn login-link">
            Login/Demo User
          </Link>
        </div>
        <img src={main_image} alt="main-image" className="img main-image" />
      </div>
    </Wrapper>
  );
};

export default Landing;
