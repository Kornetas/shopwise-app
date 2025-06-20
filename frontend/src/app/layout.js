import "../styles/global.css";
import ReduxProvider from "../store/ReduxProvider";
import AuthInit from "../components/Init/AuthInit";
import Navbar from "../components/Navbar/Navbar";

// Metadata for the app (used by Next.js for SEO and page info)
export const metadata = {
  title: "Shopwise",
  description: "Generated by create next app",
};

// Root layout component for the entire application
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ReduxProvider gives access to the Redux store for all components */}
        <ReduxProvider>
          {/* AuthInit handles authentication logic when the app loads */}
          <AuthInit />
          {/* Navbar is always visible at the top of the page */}
          <Navbar />
          {/* Main section for rendering page-specific content */}
          <main>{children}</main>
          {/* Footer is always at the bottom, with some basic styling */}
          <footer
            style={{
              marginTop: "2rem",
              padding: "1rem",
              borderTop: "1px solid #49416D",
            }}
          >
            Shopwise &copy; {new Date().getFullYear()}
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
