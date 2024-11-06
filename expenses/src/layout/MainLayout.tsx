import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <div>
        <main>
          <Navbar />
          {children}
        </main>
      </div>
    </>
  );
}
