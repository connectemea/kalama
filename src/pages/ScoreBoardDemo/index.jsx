import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import CollegeTab from './collegeTab2';
import { UserRound } from 'lucide-react';


function CollegeIcon({ color = 'white' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_178_480)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.21925 2.05736C9.64314 1.71823 10.2327 1.69401 10.6803 1.98469L10.7809 2.05736L14.3746 4.93226C14.7304 5.21692 14.9524 5.63326 14.9932 6.08278L15.0001 6.23371V8.33333H16.6667C17.5454 8.33333 18.2652 9.01321 18.3288 9.87561L18.3334 10V16.5833C18.3334 17.0558 17.9759 17.4449 17.5166 17.4946L17.4167 17.5H2.58341C2.11091 17.5 1.7219 17.1425 1.67213 16.6832L1.66675 16.5833V10C1.66675 9.12134 2.34665 8.40153 3.20903 8.33791L3.33341 8.33333H5.00008V6.23371C5.00008 5.77803 5.1865 5.3446 5.512 5.03189L5.62559 4.93226L9.21925 2.05736ZM10.0001 3.56704L6.66675 6.23371V15.8332H13.3334V6.23371L10.0001 3.56704ZM16.6667 10H15.0001V15.8333H16.6667V10ZM5.00008 10H3.33341V15.8333H5.00008V10ZM10.0001 6.66667C11.3808 6.66667 12.5001 7.78596 12.5001 9.16667C12.5001 10.5474 11.3808 11.6667 10.0001 11.6667C8.61933 11.6667 7.50008 10.5474 7.50008 9.16667C7.50008 7.78596 8.61933 6.66667 10.0001 6.66667ZM10.0001 8.33333C9.53983 8.33333 9.16675 8.70642 9.16675 9.16667C9.16675 9.62692 9.53983 10 10.0001 10C10.4603 10 10.8334 9.62692 10.8334 9.16667C10.8334 8.70642 10.4603 8.33333 10.0001 8.33333Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_178_480">
          <path d="M0 8C0 3.58172 3.58172 0 8 0H20V20H8C3.58172 20 0 16.4183 0 12V8Z" fill="none" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Index() {
  const [activeTab, setActiveTab] = useState('college');
  const [colleges, setColleges] = useState([]);
  const [ResultCount, setResultCount] = useState(0);
  const [individuals, setIndividuals] = useState([]);
  const [individualAllRounder, setIndividualAllRounder] = useState([]);

  const [loading, setLoading] = useState(true);
  const ApiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${ApiUrl}/results/leaderboard`);
        const data = await response.json();

        // Log the raw data for debugging

        // Sort colleges by their total score
        const sortedColleges = data.data.results.sort((a, b) => b.totalScore - a.totalScore);
        setColleges(sortedColleges);
        setResultCount(data.data?.totalResultCount);

        // Prepare the formatted data for individual all-rounder categories
        const formattedData = [
          {
            title: 'Kalaprathiba',
            winners: data.data.genderTopScorers
              .filter((scorer) => scorer.gender === 'male')[0]?.topScorers?.map((scorer) => ({
                name: scorer.name,
                image: scorer.image,
                college: scorer.college,
                points: scorer.score,
              }))
              .sort((a, b) => b.points - a.points) || [],
          },
          {
            title: 'Kalathilakam',
            winners: data.data.genderTopScorers
              .filter((scorer) => scorer.gender === 'female')[0]?.topScorers?.map((scorer) => ({
                name: scorer.name,
                image: scorer.image,
                college: scorer.college,
                points: scorer.score,
              }))
              .sort((a, b) => b.points - a.points) || [],
          },
          {
            title: 'Sahithyaprathiba',
            winners: data.data.categoryTopScorers
              .filter((scorer) => scorer.category === 'saahithyolsavam')[0]?.topScorers?.map((scorer) => ({
                name: scorer.name,
                image: scorer.image,
                college: scorer.college,
                points: scorer.score,
              }))
              .sort((a, b) => b.points - a.points) || [],
          },
          {
            title: 'Chithrapradhiba',
            winners: data.data.categoryTopScorers
              .filter((scorer) => scorer.category === 'chithrolsavam')[0]?.topScorers?.map((scorer) => ({
                name: scorer.name,
                image: scorer.image,
                college: scorer.college,
                points: scorer.score,
              }))
              .sort((a, b) => b.points - a.points) || [],
          }
        ];


        setIndividuals(formattedData);

      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);




  return (
    <div className="w-full">
      <Header title="Score Board" href="/" />
      <section className='w-full max-w-[700px] mx-auto mt-10 px-4'>

        <div className="flex justify-center w-full max-w-[360px] mx-auto   sm:px-0">
          <button
            className={`py-[5px] px-6 flex font-bold items-center gap-1 justify-center w-full
            ${activeTab === 'college' ? 'bg-customBlue border border-customBlue text-white' : 'bg-white border border-borderColor border-r-0'
              }`}
            onClick={() => setActiveTab('college')}
          >
            <CollegeIcon color={activeTab === 'college' ? 'white' : 'black'} />
            College
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-4">Loading...</p>
        ) : (
          <div className=''>
            <CollegeTab data={colleges} ResultCount={ResultCount} />
          </div>

        )}

      </section>

    </div>
  );
}

export default Index;
