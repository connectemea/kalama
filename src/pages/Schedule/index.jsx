import React, { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { eventData } from '@/const/StageData';
import { motion, AnimatePresence } from "motion/react";
import { SearchIcon } from '@/assets/icons';
import SearchEmpty from '@/assets/gifs/notfound.webp';
import { useAutoAnimate } from '@formkit/auto-animate/react';

function Schedule() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(Object.keys(eventData)[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStages, setFilteredStages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parent] = useAutoAnimate()
  const { dateState } = useParams();
  // console.log(dateState);
  useEffect(() => {
    setSelectedDate(dateState);
  }, [dateState]);

  useEffect(() => {
    const filterStages = () => {
      setLoading(true);
      const filtered = Object.values(eventData).flatMap((day) => {
        return day.stages
          .map((stage) => ({
            ...stage,
            programs: stage.programs.filter((program) =>
              program.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
          }))
          .filter((stage) => stage.programs.length > 0);
      });

      setFilteredStages(filtered);
      setLoading(false);
    };

    if (searchTerm) {
      filterStages();
    } else {
      // Reset when no search term
      setFilteredStages([]);
      document.getElementById('search').value = "";
      setSelectedDate(dateState);
    }
  }, [searchTerm]);

  // Handle search term change
  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      setSelectedDate(Object.keys(eventData)[0]);
      setSearchTerm("");
      document.getElementById('search').value = "";
      // document.getElementById('search').innerHTML = "";
    } else {
      setSelectedDate("");
      setSearchTerm(e.target.value);
    }
  };

  const handleSelectStage = (id) => {
    navigate(`/stage/${selectedDate}/${id}`);
  };

  function pickColor(rank) {
    const colors = ['border-b-[5px] border-b-[#3592BA]', 'border-b-[5px] border-b-customEmerald', 'border-b-[5px] border-b-customGreen'];
    return colors[(rank - 1) % colors.length];
  }

  const Stages = eventData[selectedDate]?.stages;


  // Auto-filter the dates based on the search term
  const filteredDates = Object.keys(eventData).filter((date) => {
    return eventData[date].stages.some((stage) =>
      stage.programs.some((program) =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  function getDateByProgramName(programName, eventData) {
    for (const [date, data] of Object.entries(eventData)) {
      for (const stage of data.stages) {
        for (const program of stage.programs) {
          if (program.name.toLowerCase() === programName.toLowerCase()) {
            return date; // Return the date if a match is found
          }
        }
      }
    }
    return null; // Return null if no match is found
  }
  

  const handleDateSelect = (date) => {
    setSearchTerm("");
    document.getElementById('search').value = "";

    setSelectedDate(date);
    navigate(`/schedule/${date}`);
  }

  return (
    <div className="w-full select-none z-10">
      <Header title="Schedule" href="/" />

      <section className='mt-10'>
        {/* Date Navigation */}
        <motion.div
          className="flex items-center justify-center px-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-start gap-4 mb-6 overflow-auto scroll-pl-6 snap-x scrollbar-hide mx-auto">

            {Object.keys(eventData).map(date => (
              <button
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`px-3 snap-start py-[5px] whitespace-nowrap border-2 border-borderColor hover:bg-customBlue/90 hover:border-customBlue hover:text-white transition-all ease-in-out ${selectedDate === date
                  ? 'bg-customBlue text-white font-bold border !border-customBlue'
                  : 'bg-white '
                  }`}
              >
                {date}
              </button>
            ))
            }
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-4 mx-auto max-w-[600px]">

          {/* Search Box */}
          <div className="flex items-center justify-center w-full p-2 border border-gray-800 shadow-sm max-w-[400px] mx-auto focus-within:border-blue-500 focus-within:shadow-md">
            <img src={SearchIcon} alt="Search Icon" className="w-6 h-6" />
            <input
              type="search"
              id="search"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="ring-0 focus:ring-0 focus:outline-none w-full pl-2"
            />
          </div>

        </div>
        <div className='' ref={parent}>
          {searchTerm && (
            <AnimatePresence>
              <motion.div
                ref={parent}
                className="space-y-4 max-w-[600px] mx-auto px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 50 }} // Exit animation
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {filteredStages.length > 0 ? (
                  filteredStages.map((stage, index) => (
                    <motion.div
                      key={index}
                      className={`max-w-[400px] mx-auto overflow-auto`}
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.3 + index * 0.2,
                      }}
                    >
                      <div className={`p-1 border-2 border-borderColor w-full relative`}>
                        <div className="p-2 text-center text-white cursor-pointer bg-black mb-1">
                          <h2 className="text-md font-bold pb-0">{stage.name}</h2>
                          <p className="text-2xl font-black uppercase">{stage.stage}</p>
                          <p className="text-sm  text-gray-400 mt-1">{getDateByProgramName(stage.programs[0].name, eventData)}</p>
                        </div>

                        {/* Program List */}
                        <div className="max-w-[500px] mx-auto space-y-2">
                          {stage.programs.map((program, idx) => (
                            <div
                              key={idx}
                              className="p-2 text-black border border-borderColor flex justify-between items-center gap-4"
                            >
                              <h2 className="text-lg font-bold max-w-[400px] leading-6"
                                style={{ overflowWrap: 'anywhere' }}
                              >{program.name}</h2>
                              <p className="text-sm font-semibold text-black border border-black whitespace-nowrap p-1">{program.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : loading ? (
                  <p>Loading...</p>
                ) : (
                  <p className='flex items-center justify-center'>
                    <img src={SearchEmpty} alt="No Results Found" className="max-w-[360px] mx-auto" />

                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {!searchTerm && (
            <AnimatePresence>
              {/* Stage Display */}
              <motion.div
                className="space-y-4 max-w-[600px] mx-auto px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0, y: 50 }} // Exit animation
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {Stages?.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    className={`max-w-[400px] mx-auto ${pickColor(index + 1)}`}
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.2,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className={`p-1 border-2 border-borderColor w-full relative`}>
                      <div
                        onClick={() => handleSelectStage(stage.id)}
                        className={`p-2 text-center text-white cursor-pointer ${(index + 1) % 2 === 0 ? 'bg-[#605F5F]' : 'bg-black'}`}
                      >
                        <h2 className="text-md font-bold pb-0">{stage.stage}</h2>
                        <p className="text-2xl font-black uppercase">{stage.name}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}

export default Schedule;
