import React, { useEffect } from "react";
import { motion } from "framer-motion";

const NewHomePage: React.FC = () => {
    useEffect(() => {
        const handleScroll = () => {
          const secondPage = document.getElementById("secondPage");
          if (secondPage) {
            const secondPageTop = secondPage.offsetTop;
            const scrollY = window.scrollY;
    
            // Auto-scroll when user reaches 50% of the second section
            if (scrollY > secondPageTop - window.innerHeight / 2) {
              window.scrollTo({
                top: secondPageTop,
                behavior: "smooth",
              });
            }
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
      
  return (
    <div className="w-full ">
      {/* Hero Section */}
      <section className="w-full h-screen bg-[#f5efe6] px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-center space-x-10">
          {/* Left Side - Image */}
          <motion.img
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            src="/images/newhome-bg.jpg"
            alt="Registry Concept"
            className="w-80 md:w-[500px] h-[400px] rounded-lg shadow-lg object-cover"
          />

          {/* Right Side - Headline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#4a3b2c] leading-tight">
              FundMyWish
            </h1>
            <p className="text-2xl md:text-3xl mt-2 text-gray-700">
              Your Gift Registry Ultimate Solution
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Effortless gifting made easy. Choose your registry today.
            </p>
          </motion.div>
        </div>
        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl text-gray-500 text-center mt-10 mb-10"
        >
          Scroll down to begin
        </motion.div>
      </section>

      <section className="relative w-full h-screen bg-[#A1D884] flex items-center justify-center px-10 md:px-20">
      
      {/* Left Side - Image */}
      <div className="relative w-1/3">
        {/* Frame effect */}
        <div className="absolute -top-5 -left-5 border-2 border-black w-[200px] h-[250px]"></div>

        {/* Image */}
        <img
          src="/images/registry-concept.jpg"
          alt="Registry Concept"
          className="relative w-[200px] h-[250px] object-cover grayscale shadow-lg"
        />
        
        {/* Small Arrow Icon */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-8 left-4 text-black text-xl"
        >
          ⬇
        </motion.div>

        {/* Small Description */}
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-32 left-4 text-[10px] text-black w-40 leading-tight"
        >
          FundMyWish offers an effortless and secure way to set up a gift registry, 
          making every celebration simple and elegant.
        </motion.p>
      </div>

      {/* Right Side - Large Text */}
      <div className="w-2/3 text-right">
        {/* Small Title */}
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-900 text-xl font-semibold tracking-wide"
        >
          Easy Gift Registry Solution
        </motion.h3>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-[100px] font-bold text-black leading-none"
        >
          FundMyWish
        </motion.h1>
      </div>
    </section>

      {/* Registry Selection Blocks */}
      <section id="secondPage" className="w-full h-screen">
      {/* Split Screen */}
      <div className="flex h-screen w-full">
        
        {/* Wedding Section */}
        <div className="w-1/2 h-full relative group">
          {/* Background Image or GIF */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:brightness-100"
            style={{
              backgroundImage: "url('/images/wedding-bg.jpg')",
              filter: "brightness(50%)",
            }}
          ></div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h2 className="text-4xl font-bold">Wedding Registry</h2>
            <p className="mt-2">Effortless wedding gift collection</p>
            <a
              href="/wedding"
              className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
            >
              Explore Wedding
            </a>
          </div>
        </div>

        {/* Baby Section */}
        <div className="w-1/2 h-full relative group">
          {/* Background Image or GIF */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:brightness-100"
            style={{
              backgroundImage: "url('/images/baby-bg.jpg')",
              filter: "brightness(50%)",
            }}
          ></div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h2 className="text-4xl font-bold">Baby Registry</h2>
            <p className="mt-2">The best way to welcome your little one</p>
            <a
              href="/baby"
              className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
            >
              Explore Baby
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Section */}
      <div className="w-full flex flex-col items-center justify-center py-20 bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700">
          Not here for wedding or baby?
        </h2>
        <p className="text-gray-600 mt-2">You can still use our registry tools!</p>
        <a
          href="/other"
          className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition"
        >
          Explore Other Registries
        </a>
      </div>
    </section>
    </div>
  );
};

export default NewHomePage;
