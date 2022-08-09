import { IParallax } from "@react-spring/parallax";
import { useEffect, useState } from "react";

interface IProps {
  propsRef: React.MutableRefObject<IParallax | null>;
  pages: number;
}

const useParallaxScroll = ({ propsRef, pages }: IProps) => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    if (propsRef.current) {
      const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const height = propsRef.current!.space;
        const scrollablePages = pages - 1; // because you can't scroll past the last page
        const scrollHeight = height * scrollablePages;

        const scrollTop = e.currentTarget.scrollTop;
        const percentScrolled = scrollTop / scrollHeight;
        const currentPage = Math.floor(percentScrolled * scrollablePages);
        const currentPageScrollTop = scrollTop - height * currentPage;
        const currentPagePercent = currentPageScrollTop / height;

        // because the ParallaxLayer below has an `offset` of `0`
        if (currentPage === 0) {
          setScrollPos(currentPagePercent);
        }
      };

      const container = propsRef.current.container.current;
      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return scrollPos;
};

export default useParallaxScroll;
