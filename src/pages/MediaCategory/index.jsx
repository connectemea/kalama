import React, { useEffect, useState } from "react";
import { Download, Copy } from "lucide-react";
import { SearchIcon } from '@/assets/icons';
import { useAutoAnimate } from '@formkit/auto-animate/react';

function Results() {
    const ApiUrl = import.meta.env.VITE_API_URL;
    const [formattedCategoryResults, setFormattedCategoryResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState(null);
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

            formatResultsCategory(result.data);
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    };

    const filteredResults = formattedCategoryResults.map(category => ({
        ...category,
        events: category.events.map(event => ({
            ...event,
            winners: event.winners.filter(winner =>
                winner.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(event => event.winners.length > 0) // Remove events with no matching winners
    })).filter(category => category.events.length > 0); // Remove empty categories


    const formatResultsCategory = (events) => {
        const groupedResults = events.reduce((acc, event) => {
            const category = event.event.result_category || "Uncategorized";
            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push({
                event_name: event.event.name,
                is_group: event.event.event_type.is_group,
                winners: event.winningRegistrations.map(winner => ({
                    position: winner.position,
                    name: winner.eventRegistration.participants[0].user.name,
                    college: winner.eventRegistration.participants[0].user.college || "Unknown College",
                    image: winner.eventRegistration.participants[0].user.image || null
                }))
            });
            return acc;
        }, {});

        const formatted = Object.entries(groupedResults).map(([category, events]) => ({
            category_name: category,
            events: events.filter(event => event.winners.length > 0)
        }));

        setFormattedCategoryResults(formatted);
        if (formatted.length > 0) {
            setActiveTab(formatted[0].category_name); // Set first category as default active tab
        }
    };

    return (
        <div className="min-h-screen p-6 w-full z-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🏆 Category Event Winners</h2>

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

            {/* Tab Navigation */}
            <div className="flex justify-center space-x-4 mb-6 border-b pb-2">
                {formattedCategoryResults.map((category) => (
                    <button
                        key={category.category_name}
                        onClick={() => setActiveTab(category.category_name)}
                        className={`px-4 py-2 font-bold border-b-2 ${activeTab === category.category_name ? 'border-black text-black' : 'border-transparent text-gray-500'}`}
                    >
                        {category.category_name}
                    </button>
                ))}
            </div>

            {/* Category Data */}
            {filteredResults.map((categoryData) => (
                activeTab === categoryData.category_name && (
                    <div key={categoryData.category_name} className="w-full" ref={parent}>
                        <div className="flex flex-wrap justify-center gap-6">
                            {categoryData.events.map((event, eventIndex) => (
                                <div key={eventIndex} className="bg-white shadow-md rounded-none max-w-[300px] w-full h-fit border min-h-[200px]">
                                    <h3 className="text-lg font-semibold text-center bg-customBlue text-white px-2 py-1 min-h-[60px] flex items-center justify-center">
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
                                                    <div className="flex items-center p-2 gap-4">
                                                        <img className="w-24 h-24 object-cover border border-gray-300"
                                                            src={winner.image} alt={winner.name} />
                                                        <div>
                                                            <p className="text-gray-800 font-medium">Position: {winner.position}</p>
                                                            <p className="text-gray-800 font-medium">{winner.name}</p>
                                                            <p className="text-sm text-gray-600">{winner.college}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}

export default Results;
