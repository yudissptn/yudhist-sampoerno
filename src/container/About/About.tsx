import { ParallaxLayer } from "@react-spring/parallax";
import { animated, config, useTransition } from "@react-spring/web";
import { SectionList } from "../../constants";
import "./About.scss";

interface IAbout {
  scrollPos: number;
}

const About = ({ scrollPos }: IAbout) => {
  const transitions = useTransition(scrollPos > 0.95, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: config.molasses,
  });

  return (
    <>
      <ParallaxLayer
        className="about_container"
        offset={1}
        speed={0}
        factor={0.5}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></ParallaxLayer>
      <ParallaxLayer offset={1.05} speed={-2} className="about_title">
        <h2>About Me</h2>
        {transitions(
          (styles, item) =>
            item && (
              <animated.div style={styles} className="about_description">
                After graduating from college, I learned web development from
                online and offline courses for about 6 months before get my full
                time job as a web developer in 2019. I keen to learn web
                technologies to solve real world problems by implementing it
                into web application.
              </animated.div>
            )
        )}
      </ParallaxLayer>
    </>
  );
};

export default About;
