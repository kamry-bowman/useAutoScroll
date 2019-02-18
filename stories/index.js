import React from "react";
import { storiesOf } from "@storybook/react";
import Example from "../example/index";

storiesOf("useAutoScroll", module).add("renders with five cards", () => {
  return <Example />;
});
