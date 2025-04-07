
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Features from '@/components/home/Features';
import Personas from '@/components/home/Personas';
import Demo from '@/components/home/Demo';
import CallToAction from '@/components/home/CallToAction';
import HomeFooter from '@/components/home/HomeFooter';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Features />
      <Personas />
      <Demo />
      <CallToAction />
      <HomeFooter />
    </div>
  );
};

export default Home;
