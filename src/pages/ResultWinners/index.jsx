import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/ui/Header';
import CollegeCard from '@/components/collegeCard';
import Poster from '@/components/Poster';
import { Share2, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import ReactGA from "react-ga4";
import { motion } from "motion/react";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Empty from '@/assets/gifs/empty.gif';
import Loading from '@/assets/gifs/loading_hand.gif';

function Index() {
  const { eventId } = useParams();
  const [winners, setWinners] = useState([]);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [posterData, setPosterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posterLoading, setPosterLoading] = useState(false);
  const [eventName, setEventName] = useState('');
  const [programData, setProgramData] = useState(null);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    const fetchWinners = async () => {
      setLoading(true);
      try {
        const ApiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${ApiUrl}/result/event/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }

        const { data } = await response.json();
        
        if (data && data.length > 0) {
          const program = data[0];
          setEventName(program.name);
          setProgramData(program);

          // Transform winners data for collegeCard format
          const formattedWinners = program.winningRegistrations.reduce((acc, winner) => {
            if (program.is_group && winner.eventRegistration.collegeName) {
              // Group Winners
              const positionIndex = acc.findIndex(w => w.position === winner.position);
              const newUser = {
                collegeName: winner.eventRegistration.collegeName,
                rank: winner.position,
                name: winner.eventRegistration.collegeName
              };

              if (positionIndex === -1) {
                acc.push({
                  position: winner.position,
                  users: [newUser]
                });
              } else {
                acc[positionIndex].users.push(newUser);
              }
            } else {
              // Individual Winners
              const participants = winner.eventRegistration.participants?.user || winner.eventRegistration.participants || [];
              participants.forEach((participant) => {
                const positionIndex = acc.findIndex(w => w.position === winner.position);
                const name = participant.name || participant.user?.name;
                const college = participant.college || participant.user?.college || "Unknown College";
                const newUser = {
                  collegeName: `${name} - ${college}`,
                  rank: winner.position,
                  name: name,
                  college: college
                };

                if (positionIndex === -1) {
                  acc.push({
                    position: winner.position,
                    users: [newUser]
                  });
                } else {
                  acc[positionIndex].users.push(newUser);
                }
              });
            }
            return acc;
          }, []).sort((a, b) => a.position - b.position);

          // Flatten winners for display
          const flattenedWinners = formattedWinners.flatMap((positionGroup) => 
            positionGroup.users.map((user) => ({
              ...user,
              position: positionGroup.position
            }))
          );

          setWinners(flattenedWinners);

          // Set first winner as selected and generate poster
          if (flattenedWinners.length > 0 && program) {
            const firstWinner = flattenedWinners[0];
            setSelectedWinner(firstWinner);
            setPosterLoading(true);
            
            // Format data for poster
            const posterWinner = {
              name: firstWinner.name || firstWinner.collegeName,
              college: firstWinner.college || firstWinner.collegeName,
              image: firstWinner.image || null
            };

            const posterData = {
              programName: program.name,
              id: program._id,
              result_no: program.serial_number,
              stageStatus: program.is_onstage,
              is_group: program.is_group,
              winners: [{
                position: firstWinner.position,
                users: [posterWinner]
              }]
            };

            setPosterData(posterData);
            setPosterLoading(false);
          }
        }
      } catch (error) {
        console.error('Failed to fetch winners', error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchWinners();
    }
  }, [eventId]);

  const handleWinnerSelect = async (winner) => {
    if (!programData) return;
    
    setSelectedWinner(winner);
    setPosterLoading(true);

    try {
      // Format data for poster - need to reconstruct winner object for poster
      const posterWinner = {
        name: winner.name || winner.collegeName,
        college: winner.college || winner.collegeName,
        image: winner.image || null
      };

      const posterData = {
        programName: programData.name,
        id: programData._id,
        result_no: programData.serial_number,
        stageStatus: programData.is_onstage,
        is_group: programData.is_group,
        winners: [{
          position: winner.position,
          users: [posterWinner]
        }]
      };

      setPosterData(posterData);
    } catch (error) {
      console.error('Failed to generate poster data', error);
    } finally {
      setPosterLoading(false);
    }
  };

  const handleDownload = () => {
    const poster = document.getElementById('resultPosterId');
    ReactGA.event({
      category: "Button",
      action: "Click",
      label: "Download result",
    });
    html2canvas(poster, {
      scale: 5,
      useCORS: true
    }).then((canvas) => {
      const imageUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${eventName}-${selectedWinner?.name || 'result'}.png`;
      link.click();
    });
  };

  const handleShare = async () => {
    const poster = document.getElementById('resultPosterId');
    ReactGA.event({
      category: "Button",
      action: "Click",
      label: "Share now result",
    });
    html2canvas(poster, {
      scale: 5,
      useCORS: true
    }).then((canvas) => {
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], 'poster.png', { type: 'image/png' });

        if (navigator.share) {
          try {
            await navigator.share({
              title: "Kalappuram",
              url: 'https://czonekalappuram.in',
              text: "Check out the winners! 🎉",
              files: [file],
            });
          } catch (err) {
            console.error('Error sharing:', err);
          }
        } else {
          console.warn('Web Share API not supported or file sharing not supported');
          alert('Sorry, file sharing is not supported on your device please download the image and share it manually');
        }
      });
    });
  };


  return (
    <div className='w-full p-4 z-10 relative'>
      <Header title="Results" href="/result" />
      <section className='max-w-[700px] mx-auto' ref={parent}>
        {loading ? (
          <div className='flex items-center justify-center w-full py-6'>
            <img src={Loading} alt="loading" className="max-w-[360px]" />
          </div>
        ) : (
          <>
            {/* Poster Display */}
            {posterData && selectedWinner && (
              <div className='min-h-[400px] pb-4'>
                <div className='flex items-center justify-center pt-6'>
                  {posterLoading ? (
                    <div className='w-full h-full min-h-[400px] max-w-[360px] bg-slate-200 animate-pulse'></div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className='w-fit h-fit' id='resultPosterId'>
                        <Poster data={posterData} />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className='flex items-center justify-center gap-2 mt-4 max-w-[300px] mx-auto'>
                  <button 
                    onClick={handleShare} 
                    className='flex flex-1 text-center justify-center items-center gap-1 border-2 border-borderColor px-2 py-1 hover:bg-black hover:text-white transition-all ease-in-out duration-300'
                  >
                    <Share2 className='w-4 h-4' />
                    <p className='font-semibold'>Share</p>
                  </button>
                  <button 
                    onClick={handleDownload} 
                    className='flex flex-1 text-center justify-center items-center gap-1 border-2 border-borderColor px-2 py-1 hover:bg-black hover:text-white transition-all ease-in-out duration-300'
                  >
                    <Download className='w-4 h-4' />
                    <p className='font-semibold'>Download</p>
                  </button>
                </div>
              </div>
            )}

            {/* Winners List */}
            <div className='mt-10 max-w-[360px] mx-auto'>
              {winners.length > 0 ? (
                winners.map((winner, index) => (
                  <div
                    key={`${winner.position}-${index}`}
                    onClick={() => handleWinnerSelect(winner)}
                    className={`cursor-pointer transition-opacity ${selectedWinner?.name === winner.name && selectedWinner?.position === winner.position ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                  >
                    <CollegeCard college={winner} />
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-[300px]">
                  <img src={Empty} alt="Empty" className="w-1/2" />
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Index;
