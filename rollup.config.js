import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/index.js",
  output: {
    file: "dist/use-autoscroll.cjs.js",
    format: "cjs"
  },
  // All the used libs needs to be here
  external: ["react"],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    }),
    replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
    uglify()
  ]
};
