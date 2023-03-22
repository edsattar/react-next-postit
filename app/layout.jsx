import "./globals.css";
import Nav from "./auth/Nav";
import QueryWrapper from "./auth/QueryWrapper";

export const metadata = {
  title: "React Next Postit",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-200 mx-4 md:mx-48 xl:mx-96 font-roboto">
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}