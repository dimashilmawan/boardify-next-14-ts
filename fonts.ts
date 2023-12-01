import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const calFont = localFont({
  src: "./public/fonts/font.woff2",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
