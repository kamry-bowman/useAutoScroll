import { useEffect, useState } from "react";

const useAutoScroll = (node, selector, includeTop = true) => {
  const [position, setPosition] = useState(0);
  const [target, setTarget] = useState(null);
  const [steps, setSteps] = useState([]);

  // grabs the DOM nodes that are targeted by the selector, and saves them to the steps ref
  useEffect(
    function grabJumpPoints() {
      if (node) {
        const initialArray = includeTop
          ? [
              {
                scrollIntoView: () => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }
            ]
          : [];
        setSteps([...initialArray, ...node.querySelectorAll(selector)]);
      }
    },
    [node]
  );

  // tracks updates to target, and scrolls the screen to them when target updates
  useEffect(
    function scrollToTarget() {
      if (steps.length && typeof target === "number") {
        steps[target].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [target]
  );

  // updates the current position as the user scrolls (or from programatic scrolling)
  const updateScroll = () => {
    if (node && position !== undefined) {
      const scrollDistance = window.scrollY || 0;
      let newPoint = 0;

      steps.forEach((point, index) => {
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
    const nextPoint = (position + 1) % steps.length;
    setTarget(nextPoint);
  };

  // function exposed to consuming component
  const scrollBack = () => {
    const candidate = position - 1;
    const prevPoint = candidate >= 0 ? candidate : steps.length + candidate;
    setTarget(prevPoint);
  };
  return { scrollNext, scrollBack, position, length: steps.length };
};

export default useAutoScroll;
