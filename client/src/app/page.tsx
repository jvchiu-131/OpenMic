import React from 'react';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import { Roboto } from 'next/font/google';
import HeroSection from './components/home/heroSection';
import GigsCarousel from './components/home/GigsCarousel';
import MusiciansCarousel from './components/home/MusiciansCarousel';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });


export default function Home() {
  return (
 
    <main className={`${roboto.className} min-h-screen flex flex-col`}>
        <Navbar />
        <HeroSection />
        
        <Footer />
      </main>
   
  )
}
