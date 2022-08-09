import { ParallaxLayer } from "@react-spring/parallax";
import { animated, config, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import { SectionList } from "../../constants";
import "./Home.scss";

const jobs = ["Web", "Front End", "Full Stack"];

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

interface IHome {
  scrollPos: number;
}

const Home = ({ scrollPos }: IHome) => {
  const [windowSize, setWindowSize] = useState(getWidth());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWidth());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const { width } = useSpring({
    from: {
      width: "0ch",
    },
    to: [
      {
        width: "7ch",
      },
    ],
    config: config.molasses,
    delay: 500,
    reset: scrollPos < 0.3,
  });

  const { marginTop } = useSpring({
    from: {
      marginTop: windowSize <= 996 ? "6rem" : "5rem",
    },
    to: [
      { marginTop: windowSize <= 996 ? "6rem" : "5rem" },
      { marginTop: "1rem" },
      { marginTop: windowSize <= 996 ? "-4rem" : "-3rem" },
    ],
    config: config.molasses,
    delay: 1000,
    loop: { reverse: true },
  });

  return (
    <ParallaxLayer offset={0} speed={2} className="home_container">
      <div className="home_section">
        <div className="home_title">
          <h1>Hi, I'm</h1>
          <div className="home_title_name_container">
            <animated.div className="home_title_name" style={{ width }}>
              Yudhis
            </animated.div>
          </div>
        </div>
        <div className="home_subtitle">
          <animated.ul style={{ marginTop }}>
            {jobs.map((job) => (
              <li key={job}>
                <h2>{job}</h2>
              </li>
            ))}
          </animated.ul>
          <h2>Developer based on Indonesia</h2>
        </div>
      </div>
    </ParallaxLayer>
  );
};

export default Home;
