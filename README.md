# useAutoScroll: a React Hook

This is a React custom hook. It allows you to easily add functionality to your site to programatically vertical scroll through a series of items of interest. A typical scenario would be a vertical stack of "card" type divs, and having an arrow button that you click, to scroll through them.

A codesandbox showing the usage can be seen [here](https://codesandbox.io/s/888kwjxv22).

## Getting Started

The basic functionality is relatively straightforward. You call useAutoScroll, and pass in a DOM node (presumably obtained as a ref), and a CSS-type selector string, as would be used in document.querySelector(e.g., 'h2', '.card' 'h2.card', etc.). useAutoScroll will search within the DOM node using the query selector, and make each item a scrollable destination, in addition to the top of the page. It then returns an object with the following signature: `{ scrollNext: func, scrollBack: func, position: number, length: number }`. The first two properties are functions, and will programatically move through the scroll targets in question. They will wrap around (i.e., if you have 5 elements, and click to go the 6th, you will be taken back to the first). It is up to you to programatically disable this activity if you desire. You can do this using the last two arguments, position and length. The position property tells the current index in the array of scroll-points (including the top of the page). The length property tells you how many such scroll points there currently are. You could use these to selectively deactivate the scrolling, hide the scroll buttons, etc.

### Prerequisites

This is meant to be used with React 16.8+ and is designed for React DOM only.

### Installing

This can be installed using `yarn add use-autoscroll` or `npm install use-autoscroll`. It can then be imported as the default import for the package: `import useAutoScroll from 'use-autoscroll`.

### Usage Example

The basic semantics are as follows:

```
const { scrollNext, scrollBack, position, length } = useAutoScroll(ref.current, '.card')
```

A more elaborate example is as follows:

```
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import useAutoScroll from "use-autoscroll";
const data = [0, 1, 2, 3, 4, 5];

function App() {
  const rootNode = useRef(null);

  const { scrollNext, scrollBack, position, length } = useAutoScroll(
    rootNode.current,
    ".card"
  );
  console.log(position, length);
  return (
    <div className="App" ref={rootNode}>
      <h1>useAutoScroll Example</h1>
      <div className="controls">
        <button onClick={scrollBack}>
          up
        </button>
        <button onClick={scrollNext}>
          down
        </button>
      </div>
      {data.map(datum => (
        <div className="card" key={datum}>
          {datum}
        </div>
      ))}
    </div>
  );
}

```

## Contributing

Contributions and suggestions are welcome! Please open an Issue with any ideas!

## Authors

- **Kamry Bowman** - _Initial work_ - [Kamry Bowman](https://github.com/kamry-bowman)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
