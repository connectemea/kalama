import { Logo , Logo_Kalolsavam, Logo_Aikia } from "@/assets/logos/kalappuram";
import HomeBtn from "@/components/ui/HomeBtn";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Index() {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col z-10 justify-around gap-10 min-h-[calc(100dvh-100px)] py-10 mx-auto  w-full overflow-x-hidden overflow-y-auto relative">

<motion.div
    className="-z-10 absolute top-52 -left-56 w-[300px] h-[300px] bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 rounded-full blur-2xl opacity-40"
    initial={{ scale: 1, x: 0 }}
    animate={{
      scale: [1, 1.2, 1], // Pulsating effect
      x: [0, -20, 0], // Slight horizontal movement
      y: [0, 20, 0], // Up and down motion
    }}
    transition={{
      duration: 6, // Total animation duration
      repeat: Infinity, // Infinite loop
      ease: "easeInOut",
    }}
  ></motion.div>


  <motion.div
    className="-z-10 absolute -top-52 -right-20 w-[300px] h-[300px] bg-gradient-to-r from-purple-400 via-violet-500 to-red-500 rounded-full blur-2xl opacity-50"
    initial={{ scale: 1, x: 0 }}
    animate={{
      scale: [1, 1.3, 1], // Pulsating effect
      x: [0, 20, 0], // Slight horizontal movement
      y: [0, -20, 0], // Up and down motion
    }}
    transition={{
      duration: 7, // Slightly different duration for variation
      repeat: Infinity, // Infinite loop
      ease: "easeInOut",
    }}
  ></motion.div>
  

      {/* Logo Aikiam */}
      <motion.div initial={{ opacity: 0, scale: 1.5 }} // Start off-screen to the right, and slightly scaled up
        animate={{ opacity: 1, x: 0, scale: 1 }} // Animate to normal position and size
        transition={{
          delay: 0.6,
          duration: 0.6, // Adjust for faster/slower timing
          ease: 'easeOut',
          type: 'spring',
          stiffness: 500, // High stiffness gives a fast, snappy motion
          damping: 30, // Low damping helps create the fast "light speed" feel
        }} className="flex justify-center">
        <img src={Logo_Aikia} alt="Aikiam Logo" className="" />
      </motion.div>

      {/* Logo Kaloolsavm */}
      <motion.div
        initial={{ opacity: 0, scale: 1.5 }} // Start off-screen to the right, and slightly scaled up
        animate={{ opacity: 1, x: 0, scale: 1 }} // Animate to normal position and size
        transition={{
          delay: 0.6,
          duration: 0.6,
          scale: 1.5, // Adjust for faster/slower timing
          ease: 'easeOut',
          type: 'spring',
          stiffness: 500, // High stiffness gives a fast, snappy motion
          damping: 30, // Low damping helps create the fast "light speed" feel
        }}
        className="flex justify-center">
        <img src={Logo_Kalolsavam} alt="Kaloolsavm Logo" className="" />
      </motion.div>

      {/* Logo Kalama */}
      <div
        className="flex flex-1 flex-grow justify-center items-center"
      >
        <motion.img initial={{ opacity: 0, y: -100, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2, type: "spring", stiffness: 500 }} src={Logo} alt="Kalama Logo" className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] h-auto" />
      </div>

      <div className="flex flex-col justify-center gap-4 z-30 relative">
        <motion.div initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 1 }} className="max-w-[340px] mx-auto">
          <HomeBtn
            label="Score Board"
            className="hover:scale-105 ease-in-out duration-100"
            onClick={() => navigate("scoreboard")}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 1.3 }} className="flex justify-center  gap-4 w-full">
          <HomeBtn label="Result" onClick={() => navigate("result")} className="hover:scale-105 ease-in-out duration-100" />
          <HomeBtn label="Schedule" onClick={() => navigate("schedule/22-01-25")} className="hover:scale-105 ease-in-out duration-100"  />
        </motion.div>
      </div>
    </div>
  );
}

export default Index;
