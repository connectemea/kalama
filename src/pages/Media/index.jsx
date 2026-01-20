import React, { useEffect, useState } from "react";
import { Download, Copy } from "lucide-react";
import { SearchIcon } from '@/assets/icons';
import { useAutoAnimate } from '@formkit/auto-animate/react';

function Results() {
    const ApiUrl = import.meta.env.VITE_API_URL;
    const [formattedResults, setFormattedResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [parent] = useAutoAnimate()
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${ApiUrl}/results`);
            const result = await response.json();

            // console.log("API Response:", result);
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
        const formatted = events.map(event => ({
            event_name: event.event.name,
            is_group: event.event.event_type.is_group,
            winners: event.winningRegistrations
                .filter(winner => winner.position === 1)
                .map(winner => ({
                    name: winner.eventRegistration.participants[0].user.name,
                    college: winner.eventRegistration.participants[0].user.college,
                    image: winner.eventRegistration.participants[0].user.image
                }))
        })).filter(event => event.winners.length > 0);

        // console.log("Formatted Data:", formatted);
        setFormattedResults(formatted);
    };

    // Filter the results based on the search term
    const filteredResults = formattedResults.filter(event =>
        event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.winners.some(winner => winner.name.toLowerCase().includes(searchTerm.toLowerCase()) || winner.college.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Function to download the image
    const downloadImage = (imageUrl, name) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${name.replace(/\s+/g, "_")}_winner.jpg`; // Format name for filename
        document.body.appendChild(link); // Append to body to ensure compatibility
        link.click();
        document.body.removeChild(link); // Clean up
    };


    // Function to copy text to clipboard
    const copyToClipboard = (name, college, event_name, is_group) => {
        const textToCopy = is_group
            ? `Event: ${event_name}\nWinner: ${college}` // If group, use college name as the winner
            : `Event: ${event_name}\nWinner: ${name || "N/A"}\nCollege: ${college}`;

        navigator.clipboard.writeText(textToCopy)
            .then(() => alert("Copied to clipboard! ✅"))
            .catch(err => console.error("Error copying text:", err));
    };



    return (
        <div className="min-h-screen p-6 w-full z-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🏆 Event Winners (1st Position)</h2>

            <div className='my-10'>
                {/* Search Box */}
                <div className="flex items-center justify-center w-full p-2 border border-gray-800 shadow-sm max-w-[400px] mx-auto focus-within:border-blue-500 focus-within:shadow-md">
                    <img src={SearchIcon} alt="Search Icon" className="w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Search programs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ring-0 focus:ring-0 focus:outline-none w-full pl-2"
                    />
                </div>

            </div>

            {/* No results message */}
            {filteredResults.length === 0 ? (
                <p className="text-center text-gray-500">No winners available.</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-6" ref={parent}>
                    {filteredResults.map((event, index) => (
                        <div key={index} className="bg-white shadow-md rounded-none max-w-[300px] w-full h-fit border min-h-[250px]">
                            <h3 className="text-lg font-semibold  text-center bg-customBlue text-white px-2 py-1 min-h-[60px] flex items-center justify-center">
                                {event.event_name} {event.is_group && "(Group Event)"}
                            </h3>
                            <div className="mt-4">
                                {event.is_group ? (
                                    event.winners.map((winner, idx) => (
                                        <div key={idx} className="flex items-center justify-center gap-3 p-2 border-b last:border-b-0">
                                            <p className="text-md text-gray-600">{winner.college}</p>
                                        </div>
                                    ))
                                ) : (
                                    event.winners.map((winner, idx) => (
                                        <div key={idx} className="flex items-center flex-col w-full gap-3 border-b last:border-b-0">
                                            <div className="flex items-center  p-2 gap-4">
                                                <img className="w-24 h-24  object-cover border border-gray-300"
                                                    src={winner.image} alt={winner.name} />
                                                <div>
                                                    <p className="text-gray-800 font-medium">{winner.name}</p>
                                                    <p className="text-sm text-gray-600">{winner.college}</p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            < div className="mt-2 w-full flex items-center justify-between border border-black font-semibold" >
                                                <button
                                                    onClick={() => downloadImage(winner.image, winner.name)}
                                                    className="bg-[#000] text-white p-2  w-full text-center justify-center flex items-center gap-2 hover:bg-[#3592ba]"
                                                >
                                                    <Download size={16} /> Download
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(winner.name, winner.college, event.event_name, event.is_group)}
                                                    className="bg-[#fff] text-black p-2 w-full text-center justify-center flex items-center gap-2 hover:bg-green-600"
                                                >
                                                    <Copy size={16} /> Copy Details
                                                </button>

                                            </div>

                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))
                    }
                </div >
            )
            }
        </div >
    );
}

export default Results;
