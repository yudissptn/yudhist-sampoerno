import { IParallax } from "@react-spring/parallax";
import {
  animated,
  useSpring,
  useSpringRef,
  useTransition,
  useChain,
} from "@react-spring/web";
import { useState } from "react";
import { SectionList } from "../../constants";
import MenuButton from "../MenuButton/MenuButton";
import ToggleButton from "../ToggleButton/ToggleButton";
import "./Navbar.scss";

interface INavBar {
  parallaxRef: React.MutableRefObject<IParallax | null>;
}

const Navbar = ({ parallaxRef }: INavBar) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { width } = useSpring({
    from: {
      width: "0%",
    },
    to: {
      width: openMenu ? "100%" : "0%",
    },
  });
  const sectionList = Object.keys(SectionList);
  const springApi = useSpringRef();
  const transApi = useSpringRef();
  const transition = useTransition(openMenu ? sectionList : [], {
    ref: transApi,
    trail: 400 / sectionList.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  const handleBarState = (barState: boolean) => setOpenMenu(!barState);
  useChain(openMenu ? [springApi, transApi] : [transApi, springApi], [
    0,
    openMenu ? 0.1 : 0.6,
  ]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <nav className="navbar">
        <div className="navbar-section"></div>
        <div className="navbar-section">
          <ul className="navbar-links">
            {sectionList.map((section, i) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={() => {
                    parallaxRef.current?.scrollTo(i);
                  }}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-section">
          <div className="navbar-toggle">
            <ToggleButton />
          </div>
          <div className="navbar-menu">
            <MenuButton barStateChanged={handleBarState} />
          </div>
        </div>
      </nav>
      <animated.div
        className={"navbar-menu-dialog-container"}
        style={{
          width,
        }}
      >
        <ul className="navbar-menu-dialog">
          {transition((style, item) => (
            <animated.li key={item} style={style}>
              <a href={`#${item}`}>{item}</a>
            </animated.li>
          ))}
        </ul>
      </animated.div>
    </div>
  );
};

export default Navbar;
