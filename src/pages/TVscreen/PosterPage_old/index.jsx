import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import Poster from '@/components/Poster';
import React ,{ useState, useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

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

  const settings = {
    dots: true,
    fade: true,
    centerMode: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    centerPadding: "60px",
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipeToSlide: true,
    waitForAnimate: false,
    appendDots: (dots) => {
      if (!dots || dots.length === 0) {
        return (
          <div className="dots-container">
            <ul className="custom-dots"></ul>
          </div>
        );
      }

      const totalDots = dots.length;

      // Find the active dot index
      const activeIndex = dots.findIndex(dot =>
        dot.props.className.includes("slick-active")
      );

      // Ensure that we are always showing 3 dots and that the active dot is included
      let start = activeIndex - 1; // Show one dot before the active dot
      let end = activeIndex + 2; // Show one dot after the active dot

      // Adjust the start and end indices to always show 3 dots
      if (start < 0) {
        start = 0;
        end = Math.min(start + 3, totalDots); // Ensure we don't exceed the total number of dots
      }
      if (end > totalDots) {
        end = totalDots;
        start = Math.max(0, totalDots - 3); // Adjust the start to show the last 3 dots
      }

      return (
        <div className="dots-container">
          <ul className="custom-dots">
            {dots.slice(start, end)} {/* Always show 3 dots */}
          </ul>
        </div>
      );
    },
    customPaging: (i) => (
      <div className="custom-dot"></div>
    ),
  };

  if (loading) {
    return <div key={index} className='border border-customBlue  rounded-[50px] bg-white/20  min-w-fit max-w-[600px] min-h-[300px] mb-20 overflow-hidden'><div className="min-w-[380px] min-h-[400px] bg-slate-200 animate-pulse text-center scale-125">Loading...</div>
    </div>
  }

  if (!programs) {
    return <div>No data available</div>; 
  }

  return (
    <section>
      <div className="slider-container min-w-[600px] mx-auto overflow-hidden">
        <Slider {...settings} className='min-w-[360px]  mx-auto  mt-24'>
          {/* {programs.map((poster, index) => (
            <div key={index} className='border border-customBlue  mb-10 rounded-[50px] bg-white/20  min-w-fit max-w-[600px] min-h-[300px]  overflow-hidden'>
              <Poster data={poster} />
            </div>
          ))} */}
           <div className='border border-customBlue  mb-10 rounded-[50px] bg-white/20  min-w-fit max-w-[600px] min-h-[300px]  overflow-hidden'>
              <Poster data={programs[0]} />
            </div>
            <div className='border border-customBlue  mb-10 rounded-[50px] bg-white/20  min-w-fit max-w-[600px] min-h-[300px]  overflow-hidden'>
              <Poster data={programs[1]} />
            </div>
            <div className='border border-customBlue  mb-10 rounded-[50px] bg-white/20  min-w-fit max-w-[600px] min-h-[300px]  overflow-hidden'>
              <Poster data={programs[2]} />
            </div>
        </Slider>
      </div>
    </section>
  )
}

export default index
