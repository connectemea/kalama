import React from 'react';
import { Avatar_bl, Avatar_br } from '@/assets/elements';
import { Logo_p_logo } from '@/assets/logos';
import { Logo_GloryBoard } from '@/assets/logos/kalappuram';
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import { Page_bottom } from '../../assets/elements';

const Layout = () => {
  const handleClick = () => {
    window.open('https://www.instagram.com/gloryboard_?igshid=bjR4eHRmbGpyb3My', '_blank');
  }
  return (
    <div className="min-h-[100dvh] flex flex-col">

      {/* Main Content */}
      <main className="flex w-full mx-auto flex-grow h-full min-h-[calc(100dvh-200px)] flex-1 pb-32">
        <Outlet />
      </main>

      {/* Footer Section */}
      <motion.footer initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5, ease: "easeOut", delay: 2 }} className="flex justify-center items-center w-full relative">
        <img src={Logo_GloryBoard} alt="Logo" className="absolute bottom-16 z-10 bg-white left-0  right-0 mx-auto w-full max-w-[100px] cursor-pointer" onClick={handleClick} />
        <img src={Page_bottom} alt="Bottom Left Avatar" className="absolute bottom-0 left-0 w-full max-w-[100vw] md:hidden" />
      </motion.footer>
    </div>
  );
};

export default Layout;
