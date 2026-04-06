import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";


import QuoteForm from "./sections/QuoteForm";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1628]">
      <Navbar />
      <Hero />
      <Services />


      <QuoteForm />
      <Contact />
      <Footer />
    </main>
  );
}
