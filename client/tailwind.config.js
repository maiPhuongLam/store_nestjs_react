/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/src/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "rgb(17 24 39)",
      },
    },
  },
});
