import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/ui/Header';
import { SearchIcon } from '@/assets/icons';
import Empty from '@/assets/gifs/empty.gif';
import Loading from '@/assets/gifs/loading_hand.gif';
import { motion } from "motion/react";
import { useAutoAnimate } from '@formkit/auto-animate/react';


function Index() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parent] = useAutoAnimate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${ApiUrl}/events/resultPublished`);
        const data = await response.json();
        const sortData = data?.data.sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated));
        setPrograms(sortData);
        setFilteredPrograms(sortData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm !== '') {
      const filteredProgram = programs.filter((program) => program.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredPrograms(filteredProgram);
    } else {
      setFilteredPrograms(programs);
    }
  }, [searchTerm, programs]);

  const handleProgramSelect = (program) => {
    navigate(`/result/${program._id}`);
  };


  const isNewRelease = (dateString) => {
    // console.log(dateString);
    const currentDate = new Date();
    const programDate = new Date(dateString);

    // Calculate the difference in hours
    const timeDifference = Math.abs(currentDate - programDate) / (1000 * 60);
    // console.log(timeDifference <= 80);
    // console.log(timeDifference <= 30);
    return timeDifference <= 30;
  };


  function ExtractedText(text) {
    if (!text) {
      return null;
    }

    const match = text.match(/^(.*?\s*)(\(EASTERN\)|\(WESTERN\))\s*(.*)?/);

    return (
      <span>
        {match ? (
          <>
            {match[1]} {/* Normal text before (EASTERN) */}
            {match[2]} {/* Normal (EASTERN) or (WESTERN) */}
            {match[3] && <span style={{ fontSize: "0.7em" }}> {match[3]}</span>}
          </>
        ) : (
          text
        )}
      </span>
    );
  }

  return (
    <div className='w-full p-4 z-10 relative'>
      <Header title="Results" href="/" />
      <section className='max-w-[700px] mx-auto' ref={parent}>
        <div className='mt-10'>
          {/* Search Box */}
          <div className="flex mb-4 items-center justify-center gap-[10px] w-full max-w-[360px] mx-auto">
            <div 
              className='rounded-[200px] relative h-[30px] w-[30px] flex items-center justify-center flex-shrink-0'
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, #0F5BA8 0%, #022564 100%)'
              }}
            >
              <img src={SearchIcon} alt="Search" className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ring-0 focus:ring-0 focus:outline-none w-full rounded-[200px] border border-borderColor px-4 py-2 h-[30px]"
            />
          </div>

        </div>

        {/* Program List */}
        {/* { */}
        <div className='mt-10 w-full mx-auto'>
          <motion.div
            className='flex flex-wrap gap-4 items-center justify-center w-full mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            ref={parent}
          >
            {!loading ? (
              <>
                {filteredPrograms.length > 0 ? (
                  filteredPrograms.map((program, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleProgramSelect(program)}
                      className='bg-[#605F5F] text-[#012161] border-[1.6px] bg-transparent cursor-pointer border-b-[4px] hover:border-b-[2px] border-borderColor px-4 py-1 rounded-xl shadow-md flex items-center justify-center leading-5 relative'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {ExtractedText(program?.name)}
                      {isNewRelease(program?.last_updated) && (
                        <span className='text-[10px] bg-red-500 text-white px-1 h-[16px] flex items-center justify-center py-[0.1px] rounded-md ml-2 absolute -top-2 -right-3'>
                          New
                        </span>
                      )}
                    </motion.button>
                  ))
                ) : (
                  programs.length === 0 ? (
                    <div>
                      <p className='text-gray-500 flex flex-col text-center'>
                        Not Results Published Yet
                      </p>
                    </div>
                  ) : (
                    <motion.p
                      className='text-gray-500 flex flex-col text-center'
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      No Results found.
                      <img src={Empty} alt="empty" className="mt-2 max-w-[380px]" />
                    </motion.p>
                  )
                )}
              </>
            ) : (
              <div className='flex items-center justify-center w-full py-6'>
                {/* <Loader className='animate-spin' /> */}
                <img src={Loading} alt="loading" className="max-w-[360px]" />
              </div>
            )}
          </motion.div>
        </div>
        {/* // ) : (
          //   <div className='flex items-center justify-center w-full py-6'>
          //     <img src={Loading} alt="loading" className="max-w-[360px]" />
          //   </div>
          // )
        // } */}
      </section >




      {/* <Poster /> */}
    </div >
  );
}

export default Index;

