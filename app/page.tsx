import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import WhyUs from "./sections/WhyUs";
import About from "./sections/About";
import QuoteForm from "./sections/QuoteForm";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1628]">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <About />
      <QuoteForm />
      <Contact />
      <Footer />
    </main>
  );
}
