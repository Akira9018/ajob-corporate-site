// import React from 'react';  // React 17以降は不要
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Works from './components/Works';
import Gallery from './components/Gallery';
import News from './components/News';
import CTA from './components/CTA';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#1A1A1A] text-[#F5F5F5] min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        <Works />
        <Gallery />
        <News />
        <CTA />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;