import React, { useEffect, useState } from 'react';
import CollegeTab from './components/collegeTab';
import IndividualTab from './components/individualTab';
import { Logo_aikiam, Logo_kalama, Logo_kaloolsavm, Logo_GloryBoard } from "@/assets/logos";
import PosterTab from './components/PosterTab';
import { Avatar_bl, Avatar_br } from '@/assets/elements';
import QrCode from '@/assets/qrcode.svg'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import TvPoster from '@/pages/TVscreen/PosterPage';
import { motion, AnimatePresence } from 'motion/react'

function Index() {
    const [colleges, setColleges] = useState([]);
    const [individuals, setIndividuals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [programs, setPrograms] = useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const ApiUrl = import.meta.env.VITE_API_URL;
    const [PosterLoading, setPosterLoading] = useState(true);

    const [showPoster, setShowPoster] = useState(false);

    const [parent] = useAutoAnimate()


    useEffect(() => {
        // Fetching Data concurrently
        fetchData();

        // Setting an interval to refetch data every 30 seconds (30000ms)
        const intervalId = setInterval(() => {
            fetchData();
        }, 50000);

        const intervalId2 = setInterval(() => {
            setShowPoster(!showPoster);
        }, 1000 * (showPoster ? 10 : 40));

        // Cleanup the interval when the component is unmounted or the effect re-runs
        return () => clearInterval(intervalId, intervalId2);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [leaderboardResponse, eventsResponse] = await Promise.all([
                fetch(`${ApiUrl}/results/leaderboard`),
                fetch(`${ApiUrl}/events/resultPublished`)
            ]);

            // Handling Leaderboard Data
            const leaderboardData = await leaderboardResponse.json();
            const sortedColleges = leaderboardData.data.results.sort((a, b) => b.totalScore - a.totalScore);
            setColleges(sortedColleges);

            const formattedData = [
                {
                    title: 'Kalaprathiba',
                    winners: leaderboardData.data.genderTopScorers.filter((scorer) => scorer.gender === 'male')[0]?.topScorers?.map((scorer) => ({
                        name: scorer.name,
                        image: scorer.image,
                        college: scorer.college,
                        points: scorer.score,
                    }))
                        .sort((a, b) => b.points - a.points) || [],
                },
                {
                    title: 'Kalathilakam',
                    winners: leaderboardData.data.genderTopScorers.filter((scorer) => scorer.gender === 'female')[0]?.topScorers?.map((scorer) => ({
                        name: scorer.name,
                        image: scorer.image,
                        college: scorer.college,
                        points: scorer.score,
                    }))
                        .sort((a, b) => b.points - a.points) || [],
                },
                {
                    title: 'Sahithyaprathiba',
                    winners: leaderboardData.data.categoryTopScorers.filter((scorer) => scorer.category === 'saahithyolsavam')[0]?.topScorers?.map((scorer) => ({
                        name: scorer.name,
                        image: scorer.image,
                        college: scorer.college,
                        points: scorer.score,
                    }))
                        .sort((a, b) => b.points - a.points) || [],
                },
                {
                    title: 'Chithrapradhiba',
                    winners: leaderboardData.data.categoryTopScorers.filter((scorer) => scorer.category === 'chithrolsavam')[0]?.topScorers?.map((scorer) => ({
                        name: scorer.name,
                        image: scorer.image,
                        college: scorer.college,
                        points: scorer.score,
                    }))
                        .sort((a, b) => b.points - a.points) || [],
                },
            ];

            setIndividuals(formattedData);

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

            const formattedData = data.map((program) => ({
                programName: program.name,
                id: program._id,
                result_no: program.serial_number,
                stageStatus: program.is_onstage,
                is_group: program.is_group,
                winners: program.winningRegistrations.reduce((acc, winner) => {
                    if (program.is_group && winner.eventRegistration.collegeName) {
                        // Group Winners
                        const positionIndex = acc.findIndex(w => w.position === winner.position);
                        const newUser = {
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
                        winner.eventRegistration.participants.user.forEach((participant) => {
                            const positionIndex = acc.findIndex(w => w.position === winner.position);
                            const newUser = {
                                name: participant.name,
                                college: participant.college || "Unknown College",
                                year: participant.year_of_study || "N/A"
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
        }
    };

    return (
        <div className="w-full h-[100vh] relative overflow-hidden p-4 select-none">
            <section className="hidden lg:block w-full mx-auto">
                <div className="flex justify-between items-center w-full max-w-[90vw] mx-auto px-4">
                    <div className="flex gap-4 items-center justify-center h-fit w-fit">
                        <div>
                            <img src={Logo_kalama} alt="Kalama Logo" className="mx-auto max-w-[10vh] w-full" />
                        </div>
                        <div className="flex flex-col items-center justify-between gap-10 h-full">
                            <img src={Logo_aikiam} alt="Aikiam Logo" className="mx-auto max-w-[10vw] w-full" />
                            <img src={Logo_kaloolsavm} alt="Kaloolsavm Logo" className="mx-auto w-[12vw] max-w-[12vw] " />
                        </div>
                    </div>
                    <div>
                        <h1 className='  font-semibold right-0 whitespace-nowrap text-[54px] leading-[1px]'>
                            {showPoster ? "Results" : "Score Board"}
                        </h1>
                    </div>
                    <div >
                        {/* <img src={Logo_GloryBoard} alt="Product Logo" className="mx-auto max-w-[20vw]" /> */}

                        <div className='bg-customBlue text-white rounded-xl max-w-[300px] mx-auto flex border border-customBlue mt-10 overflow-hidden' style={{ boxShadow: '0px 2px 14px 2px rgba(0, 0, 0, 0.25)' }}>
                            <div className='p-2 flex flex-col items-center justify-center gap-1 text-center'>
                                <div>
                                    <h1 className='font-bold text-xs'>Scan the QR Code
                                    </h1>
                                    <h3 className='text-xs font-thin'>to Explore More</h3>
                                </div>

                                <div className=''>
                                    <div className='bg-white px-2 text-customBlue max-w-fit mx-auto font-semibold'>czonekalama.in</div>
                                </div>
                            </div>
                            <div className='bg-white p-2 flex justify-center items-center'>
                                <img src={QrCode} width={50} height={50} alt='qr code' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <AnimatePresence mode="wait">
                        {showPoster ? (
                            <motion.div
                                key="poster"
                                initial={{ opacity: 0, x: 100 }}  // Starts from the right
                                animate={{ opacity: 1, x: 0 }}   // Moves to center
                                exit={{ opacity: 0, x: -100 }}   // Moves out to the left
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className=" inset-0 w-full"
                            >
                                <TvPoster programs={programs} loading={loading} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="tabs"
                                initial={{ opacity: 0, x: -100 }}  // Starts from the left
                                animate={{ opacity: 1, x: 0 }}    // Moves to center
                                exit={{ opacity: 0, x: 100 }}     // Moves out to the right
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className=" inset-0 w-full"
                            >
                                <main className="flex justify-around items-start w-full gap-10 px-4">
                                    <div className="flex justify-center w-full mx-auto sm:px-0 px-4 flex-1">
                                        <CollegeTab data={colleges} />
                                    </div>
                                    <div className="flex justify-center w-full mx-auto sm:px-0 px-4 flex-1">
                                        <IndividualTab data={individuals} />
                                    </div>
                                </main>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <img src={Avatar_bl} alt="Bottom Left Avatar" className="absolute bottom-0 left-0 w-full max-w-[25vw]" />
                <img src={Avatar_br} alt="Bottom Right Avatar" className="absolute bottom-0 right-0 w-full max-w-[25vw]" />




                <div
                    className="-z-10 absolute top-[8%] -left-2 w-[300px] h-[300px] bg-[#8DC63F]/70 rounded-full blur-3xl opacity-40"
                />


                <div
                    className="-z-10 absolute top-[10%] -right-2 w-[300px] h-[300px] bg-[#2E769F]/80 rounded-full blur-3xl opacity-50"
                />

                <div
                    className="-z-10 absolute -bottom-2 left-4 w-[300px] h-[300px] bg-[#F99D1C]/80 rounded-full blur-3xl opacity-40"
                />


                <div
                    className="-z-10 absolute -bottom-4 right-6 w-[300px] h-[300px] bg-[#20BBAD]/70 rounded-full blur-3xl opacity-50"
                />
            </section>

            <div className="flex items-center justify-center w-full min-h-screen px-4 py-2 bg-slate-100 font-semibold lg:hidden">
                This Page is optimized for TV screens only.
            </div>
        </div>
    );
}

export default Index;
