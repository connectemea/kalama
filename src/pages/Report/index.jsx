import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import { SearchIcon } from '@/assets/icons';
import { useAutoAnimate } from '@formkit/auto-animate/react';

function ResultsFull() {
    const ApiUrl = import.meta.env.VITE_API_URL;
    const [formattedResults, setFormattedResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [parent] = useAutoAnimate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${ApiUrl}/results`);
            const result = await response.json();

            if (!result || !result.data || !Array.isArray(result.data)) {
                console.error("Invalid API response format:", result);
                return;
            }

            formatResults(result.data);
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    };

    const formatResults = (events) => {
        const formatted = events
            .filter(event => event.event.event_type.is_group) // Only group events
            .map(event => ({
                event_name: event.event.name,
                is_group: event.event.event_type.is_group,
                winners: event.winningRegistrations.reduce((acc, winner) => {
                    const collegeName = winner.eventRegistration.participants[0].user.college;
                    const position = winner.position;
                    const participants = winner.eventRegistration.participants.map(participant => ({
                        name: participant.user.name,
                        image: participant.user.image,
                    }));

                    // Group by college name
                    if (!acc[collegeName]) {
                        acc[collegeName] = [];
                    }
                    acc[collegeName].push({ position, participants });

                    return acc;
                }, {})
            }));

        setFormattedResults(formatted);
    };

    const filteredResults = formattedResults.filter(event =>
        event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.keys(event.winners).some(college =>
            college.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.winners[college].some(winner =>
                winner.participants.some(participant =>
                    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        )
    );

  

    return (
        <div className="min-h-screen p-6 w-full z-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🏆 Group Event Winners</h2>

            <div className='my-10'>
                <div className="flex items-center justify-center w-full p-2 border border-gray-800 shadow-sm max-w-[400px] mx-auto">
                    <img src={SearchIcon} alt="Search Icon" className="w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Search events or colleges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ring-0 focus:ring-0 focus:outline-none w-full pl-2"
                    />
                </div>
            </div>

           

            {filteredResults.length === 0 ? (
                <p className="text-center text-gray-500">No winners available.</p>
            ) : (
                <div id="group-event-results" className="flex flex-wrap justify-center gap-6" ref={parent}>
                    {filteredResults.map((event, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg max-w-[400px] w-full border min-h-[250px]">
                            <h3 className="text-lg font-semibold text-center bg-customBlue text-white px-4 py-2">
                                {event.event_name} (Group Event)
                            </h3>
                            <div className="p-4">
                                {Object.keys(event.winners).map((collegeName, idx) => (
                                    <div key={idx} className="mb-6">
                                        <h4 className="text-md font-bold text-gray-800 text-center">{collegeName}</h4>
                                        {event.winners[collegeName].map((winner, posIdx) => (
                                            <div key={posIdx} className="mt-2">
                                                <p className="text-gray-700 font-medium">🏅 Position {winner.position}</p>
                                                <div className="grid grid-cols-2 gap-4 mt-2">
                                                    {winner.participants.map((participant, partIdx) => (
                                                        <div key={partIdx} className="flex items-center gap-3 p-2 border-b last:border-b-0">
                                                            <img className="w-14 h-14 object-cover border border-gray-300 rounded-full"
                                                                src={participant.image} alt={participant.name} />
                                                            <p className="text-gray-800">{participant.name}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ResultsFull;
