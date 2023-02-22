import React from "react";
import withAuth from "../hoc/withAuth";
import {
  HomeContainer,
  HomeSubtitle,
  HomeTitle,
  Link,
  LinkedInLink,
  MadeBy,
} from "./Home.styled";

const Home = ({ isAuth }) => {
  return (
    <HomeContainer>
      <HomeTitle>Welcome to your personnal Project Manager !</HomeTitle>
      <HomeSubtitle>
        {isAuth ? (
          <div>
            Click on <Link to="/apps">Apps</Link> to manage your projects 💻
          </div>
        ) : (
          <>
            <div>
              Click on <Link to="/login">Login</Link> to sign in 🔥
            </div>
            <div>
              Not register yet ? No problem,{" "}
              <Link to="/login" state={{ tabIndex: 1 }}>
                Sign Up
              </Link>{" "}
              right now !
            </div>
          </>
        )}
      </HomeSubtitle>
      <MadeBy>
        Made with ❤️ by{" "}
        <LinkedInLink
          href="https://www.linkedin.com/in/sofiane-belazouz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sofiane BELAZOUZ
        </LinkedInLink>
      </MadeBy>
    </HomeContainer>
  );
};

export default withAuth(Home, { redirect: false });
