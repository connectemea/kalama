import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/ui/Header';
import { eventData } from '@/const/StageData';
import classNames from 'classnames';

function Stage() {
  const { date, id } = useParams();
  const stage = eventData[date]?.stages.find(stage => stage.id === parseInt(id));
  const colors = ['#8DC63F', '#00A99D', '#3592BA'];
  if (!stage) {
    return <p className="text-center mt-10 text-red-600">Stage not found.</p>;
  }

  function pickColor(rank) {
    return colors[rank % 3];
  }
  return (
    <div className="w-full select-none">
      <Header title="Stage" href={`/schedule/${date}`} color={pickColor(id)} />

      <section className='p-3 max-w-[500px] mx-auto mt-6 overflow-auto'>
        <div className='border-borderColor border p-2'>
          <div className={`text-center font-bold mb-1  ${(id) % 2 === 0 ? 'bg-[#605F5F]' : 'bg-black'} text-white p-4`}>
            <h1 className='text-2xl'>{stage.name || 'Stage Name'}</h1>
            <span className='text-md font-normal text-gray-400 mb-1'>{date || 'Date'}</span>
            {stage?.location && <h1 className="text-md">{stage.location || 'location'}</h1>}
            {/* <h1 className="text-md">{stage.location || 'location'}</h1> */}
          </div>
          <div className="max-w-[500px] mx-auto space-y-4 border border-borderColor p-2">
            {stage.programs.length > 0 ? (
              stage.programs.map((program, index) => (
                <div
                  key={index}
                  className="p-2  text-black border border-borderColor  flex justify-between items-center gap-4"
                >
                  <h2 className="text-lg font-bold max-w-[400px] leading-6">{program.name}</h2>
                  <p className={classNames("text-sm  border border-borderColor px-2 font-semibold text-white whitespace-nowrap",
                    {
                      'bg-[#3592BA]': id % 3 === 2,
                      'bg-customEmerald': id % 3 === 1,
                      'bg-customGreen': id % 3 === 0
                    }
                  )}>{program.time}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No programs available for this stage.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Stage;
