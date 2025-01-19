import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import Poster from '@/components/Poster';
import React, { useRef, useState ,useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function index() {
     const [colleges, setColleges] = useState([]);
        const [individuals, setIndividuals] = useState([]);
        const [loading, setLoading] = useState(true);
        const [programs, setPrograms] = useState([]);
        const [filteredPrograms, setFilteredPrograms] = useState([]);
        const ApiUrl = import.meta.env.VITE_API_URL;
        const [PosterLoading, setPosterLoading] = useState(true);
    
    
        useEffect(() => {
        // Fetching Data concurrently
        fetchData();
    
        // Setting an interval to refetch data every 30 seconds (30000ms)
        const intervalId = setInterval(() => {
            fetchData();
        }, 30000);
    
        // Cleanup the interval when the component is unmounted or the effect re-runs
        return () => clearInterval(intervalId);
    }, []);
    
        const fetchData = async () => {
                setLoading(true);
                try {
                   
                    const eventsResponse = await fetch(`${ApiUrl}/events/resultPublished`);
                    // Handling Leaderboard Data
    
                    // Handling Event Data
                    const eventsData = await eventsResponse.json();
                    const programsList = eventsData?.data || [];
                    setFilteredPrograms(programsList.slice(0, 4));
    
                    // Fetch program data for each event
                    setPrograms([]);
                    for (let program of programsList.slice(0, 4)) {
                        await handleProgramSelect(program);
                    }
    
                } catch (error) {
                    console.error('Error fetching leaderboard or event data:', error);
                } finally {
                    setLoading(false);
                }
            };
    
        const handleProgramSelect = async (program) => {
            try {
                setPosterLoading(true)
                const response = await fetch(`${ApiUrl}/result/event/${program._id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                setPosterLoading(true)
                if (!response.ok) throw new Error('Failed to fetch program data');
    
                const { data } = await response.json();
    
                console.log(data);
                const formattedData = data?.map((program) => ({
                    programName: program.name,
                    id: program._id,
                    result_no: program.serial_number,
                    stageStatus: program.is_onstage,
                    is_group: program.is_group,
                    winners: program.winningRegistrations.reduce((acc, winner) => {
                        if (program.is_group && winner.eventRegistration.collegeName) {
                            // Group Winners
                            acc.push({ position: winner.position, name: winner.eventRegistration.collegeName });
                        } else {
                            // Individual Winners
                            winner.eventRegistration.participants.user.forEach((participant) => {
                                acc.push({
                                    position: winner.position,
                                    name: participant.name,
                                    college: participant.college || "Unknown College",
                                    year: participant.year_of_study || "N/A",
                                });
                            });
                        }
                        return acc;
                    }, []).sort((a, b) => a.position - b.position),
                }));
    
                // Avoid adding duplicate programs by checking the id
                setPrograms((prev) => {
                    // Check if program with the same id already exists
                    const existingProgram = prev.find(item => item.id === formattedData[0].id);
                    if (existingProgram) {
                        return prev;  // If exists, return the current state unchanged
                    } else {
                        return [...prev, formattedData[0]];  // Otherwise, add the new program
                    }
                });
                if (programs.length === 4) {
                    setPosterLoading(false);
                }
            } catch (error) {
                console.error('Failed to select program', error);
            } finally {
                setPosterLoading(false)
            }
        };

  if (loading) {
    return <div key={index} className=' mx-auto  rounded-[50px] bg-white/20  min-w-fit max-w-[600px] my-10 min-h-[300px] mb-20 overflow-hidden'><div className="min-w-[380px] min-h-[400px] bg-slate-200 animate-pulse text-center scale-125">Loading...</div>
    </div>
  }

  if (!programs) {
    return <div>No data available</div>; 
  }

  return (
    <section>
      <div className=" mx-auto overflow-hidden flex justify-center items-center  p-4">
      <Swiper
       centeredSlides={true}
       autoplay={{
         delay: 10000,
         disableOnInteraction: false,
       }}
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
         {programs.map((poster, index) => (
             <SwiperSlide className="flex items-center justify-center">
            <div key={index} className='  mb-10 rounded-[50px] bg-white/20   overflow-hidden flex items-center justify-center'>
              <Poster data={poster} />
            </div>
            </SwiperSlide>
          ))}
      </Swiper>
         
          
      </div>
    </section>
  )
}

export default index
