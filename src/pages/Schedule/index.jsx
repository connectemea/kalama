import { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { eventData } from '@/const/StageData';
import { motion, AnimatePresence } from "motion/react";
import { SearchIcon } from '@/assets/icons';
import { Star } from '@/assets/elements';
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

  function pickColor(index) {
    if (index === 1) {
      return '#012161'
    } else if (index === 2) {
      return '#3548AC'
    } else if (index === 3) {
      return '#146BB6'
    } else {
      return '#000000'
    }
  }

  function getBorderColor(index) {
    return pickColor(index);
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
              <div
                key={date}
                className="rounded-xl border-none cursor-pointer"
                style={{
                  background: selectedDate === date ? '#146BB6' : '#012161',
                  borderRadius: '12px',
                  paddingTop: '4px',
                  paddingBottom: '0'
                }}
              >
                <button
                  onClick={() => handleDateSelect(date)}
                  className={`px-3 rounded-xl snap-start whitespace-nowrap border-2 transition-all ease-in-out block w-full ${selectedDate === date
                    ? 'bg-white'
                    : 'bg-white text-[#012161] border-[#012161] hover:bg-customBlue/90 hover:border-customBlue hover:text-white'
                    }`}
                  style={{
                    transform: 'translateY(-4px)',
                    borderRadius: '12px',
                    height: '23px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...(selectedDate === date ? {
                      color: '#146BB6',
                      borderColor: '#146BB6'
                    } : {})
                  }}
                >
                  {date}
                </button>
              </div>
            ))
            }
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-4 mx-auto max-w-[600px]">

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
              type="search"
              id="search"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="ring-0 focus:ring-0 focus:outline-none w-full rounded-[200px] border border-borderColor px-4 py-2 h-[30px]"
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
                      <div className="flex relative justify-start gap-3 rounded-xl w-full flex-1 bg-white p-2 pb-2 mb-4 border border-b-[4px] mx-auto overflow-hidden"
                        style={{ borderColor: getBorderColor((index % 3) + 1), borderBottomColor: getBorderColor((index % 3) + 1) }}
                      >
                        <img src={Star} alt="" className='absolute top-0 -right-[15px] w-[30px] h-[30px]' />
                        <div className="flex flex-col gap-1 flex-1 w-full">
                          <div className="text-center">
                            <span 
                              className="inline-block px-3 py-1 rounded-[200px] text-white text-xs font-semibold mb-2 mx-auto"
                              style={{ backgroundColor: getBorderColor((index % 3) + 1) }}
                            >
                              {stage.stage}
                            </span>
                            <h2 className="text-xl font-black uppercase text-gray-800">{stage.name}</h2>
                            <p className="text-sm text-gray-400 mt-1">{getDateByProgramName(stage.programs[0].name, eventData)}</p>
                          </div>
                          {/* Program List */}
                          <div className="space-y-2">
                            {stage.programs.map((program, idx) => (
                              <div
                                key={idx}
                                className="p-2 text-black flex justify-between items-center gap-4"
                              >
                                <h2 className="text-sm font-semibold leading-4 flex-1"
                                  style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                                >{program.name}</h2>
                                <p className="text-xs font-semibold text-white rounded-xl px-2 py-1 whitespace-nowrap flex-shrink-0"
                                  style={{ backgroundColor: getBorderColor((index % 3) + 1) }}
                                >{program.time}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <img src={Star} alt="" className='absolute -bottom-[20px] left-20 w-[30px] h-[50px]' />
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
                    className="max-w-[400px] mx-auto"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.2,
                    }}
                    viewport={{ once: true }}
                  >
                    <div 
                      className="flex relative justify-start gap-3 rounded-xl w-full flex-1 bg-white p-2 pb-2 mb-4 border border-b-[4px] mx-auto overflow-hidden cursor-pointer"
                      style={{ borderColor: getBorderColor((index % 3) + 1), borderBottomColor: getBorderColor((index % 3) + 1) }}
                      onClick={() => handleSelectStage(stage.id)}
                    >
                      <img src={Star} alt="" className='absolute top-5 -right-[15px] w-[30px] h-[30px]' />
                      <div className="flex flex-col gap-1 flex-1 w-full text-center">
                        <span 
                          className="inline-block px-3 py-1 rounded-[200px] text-white text-xs font-semibold mb-2 mx-auto"
                          style={{ backgroundColor: getBorderColor((index % 3) + 1) }}
                        >
                          {stage.stage}
                        </span>
                        <p className="text-xl font-black uppercase text-gray-800">{stage.name}</p>
                      </div>
                      <img src={Star} alt="" className='absolute -bottom-[22px] left-8 w-[40px] h-[50px]' />
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
