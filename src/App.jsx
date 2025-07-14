import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import LogoScroller from "./components/LogoScroller";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Experience />
      <LogoScroller />
      <Story />
      {/* <div className="my-8 md:my-16"> */}
      {/* </div> */}
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
