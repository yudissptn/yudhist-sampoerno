import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Navbar from "./components/Navbar/Navbar";
import About from "./container/About/About";
import Home from "./container/Home/Home";
import "./App.scss";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import useParallaxScroll from "./utils/useParallaxScroll";
import Work from "./container/Work/Work";

interface IThemeContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  setTheme: () => {},
});

function App() {
  const [theme, setTheme] = useState<IThemeContext["theme"]>("light");
  const value = useMemo<IThemeContext>(() => ({ theme, setTheme }), [theme]);
  const ref = useRef<IParallax | null>(null);
  const pages = 2;
  const scrollPos = useParallaxScroll({ propsRef: ref, pages });

  return (
    <ThemeContext.Provider value={value}>
      <div className={`app ${theme}`}>
        <Navbar parallaxRef={ref} />
        <Parallax
          className="parallax_container"
          pages={pages}
          style={{ top: "0", left: "0" }}
          ref={ref}
        >
          <Home scrollPos={scrollPos} />
          <About scrollPos={scrollPos} />
          <Work />
        </Parallax>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
