import { useEffect, useState, useRef } from "react";

const useAutoScroll = (node, selector) => {
  const [position, setPosition] = useState(0);
  const [target, setTarget] = useState(null);
  const steps = useRef([
    {
      scrollIntoView: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  ]);

  // grabs the DOM nodes that are targeted by the selector, and saves them to the steps ref
  useEffect(
    function grabJumpPoints() {
      if (node) {
        const cards = node.querySelectorAll(selector);
        steps.current.splice(1, steps.current.length - 1);
        cards.forEach(card => {
          steps.current.push(card);
        });
      }
    },
    [node]
  );

  // tracks updates to target, and scrolls the screen to them when target updates
  useEffect(
    function scrollToTarget() {
      if (steps.current && typeof target === "number") {
        const current = steps.current[target];
        current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [target]
  );

  // updates the current position as the user scrolls (or from programatic scrolling)
  const updateScroll = () => {
    if (node && position !== undefined) {
      const scrollDistance = window.scrollY || 0;
      let newPoint = 0;

      steps.current.forEach((point, index) => {
        // subtract 10 to give some leeway if autoscroll stops a few pixels short
        if (scrollDistance > point.offsetTop - 10) {
          newPoint = index;
        }
      });
      setPosition(newPoint);
    }
  };

  // initialize scroll behavior with event listener
  useEffect(() => {
    document.addEventListener("scroll", updateScroll);

    // return cleanup behavior
    return () => window.removeEventListener("scroll", updateScroll);
  }, [node, steps]);

  // function exposed to consuming component
  const scrollNext = () => {
    const nextPoint = (position + 1) % steps.current.length;
    setTarget(nextPoint);
  };

  // function exposed to consuming component
  const scrollBack = () => {
    const candidate = position - 1;
    const prevPoint =
      candidate >= 0 ? candidate : steps.current.length + candidate;
    setTarget(prevPoint);
  };
  return { scrollNext, scrollBack, position };
};

export default useAutoScroll;
