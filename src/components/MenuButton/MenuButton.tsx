import { animated, config, easings, useSpring } from "@react-spring/web";
import { useState } from "react";
import "./MenuButton.scss";

interface IProps {
  barStateChanged: (barState: boolean) => void;
}

const MenuButton = (props: IProps) => {
  const [barState, setBarState] = useState(false);
  const { x } = useSpring({
    x: barState ? 1 : 0,
  });
  const { top: topBar2 } = useSpring({
    from: {
      top: 3,
    },
    to: {
      top: 13,
    },
    config: config.molasses,
  });

  const { top: topBar3 } = useSpring({
    from: {
      top: 3,
    },
    to: {
      top: 23,
    },
    config: config.molasses,
  });

  return (
    <div
      className={"menu-main"}
      onClick={() => {
        setBarState(!barState);
        props.barStateChanged(barState);
      }}
    >
      <animated.hr
        className={"menu-bar"}
        style={{
          top: 3,
          rotate: x.to({ range: [0, 1], output: [0, 45] }),
          x: x.to({ range: [0, 1], output: [0, 5.5] }),
        }}
      />
      <animated.hr
        className={"menu-bar"}
        style={{
          transformOrigin: "center",
          top: topBar2,
          opacity: x.to({ range: [0, 1], output: [1, 0] }),
          rotate: x.to({ range: [0, 1], output: [0, 45] }),
        }}
      />
      <animated.hr
        className={"menu-bar"}
        style={{
          top: topBar3,
          rotate: x.to({ range: [0, 1], output: [0, -43] }),
          x: x.to({ range: [0, 1], output: [0, 2.5] }),
        }}
      />
    </div>
  );
};

export default MenuButton;
