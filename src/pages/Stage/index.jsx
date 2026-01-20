import { useParams } from 'react-router-dom';
import Header from '@/components/ui/Header';
import { eventData } from '@/const/StageData';

function Stage() {
  const { date, id } = useParams();
  const stage = eventData[date]?.stages.find(stage => stage.id === parseInt(id));
  
  if (!stage) {
    return <p className="text-center mt-10 text-red-600">Stage not found.</p>;
  }

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

  const borderColor = pickColor((parseInt(id) % 3) + 1);

  return (
    <div className="w-full select-none">
      <Header title="Stage" href={`/schedule/${date}`} />

      <section className='p-3 max-w-[500px] mx-auto mt-6'>
        <div className="flex relative justify-start gap-3 rounded-xl w-full flex-1 bg-white p-2 pb-2 mb-4 border border-b-[4px] mx-auto overflow-hidden"
          style={{ borderColor: borderColor, borderBottomColor: borderColor }}
        >
          <div className="flex flex-col gap-1 flex-1 w-full">
            {/* Header Section */}
            <div 
              className="text-center text-white p-4 rounded-t-xl mb-2"
              style={{ backgroundColor: borderColor }}
            >
              <h1 className='text-2xl font-bold'>{stage.name || 'Stage Name'}</h1>
              {stage?.location && (
                <span className="inline-block px-3 py-1 rounded-[200px] text-gray-600 text-xs font-semibold mt-2 bg-gray-200">
                  {stage.location}
                </span>
              )}
            </div>
            
            {/* Program List */}
            <div className="space-y-2 px-2">
              {stage.programs.length > 0 ? (
                stage.programs.map((program, index) => (
                  <div
                    key={index}
                    className="p-2 text-black flex justify-between items-center gap-4"
                  >
                    <h2 
                      className="text-sm font-semibold leading-4 flex-1"
                      style={{ 
                        overflowWrap: 'anywhere', 
                        wordBreak: 'break-word',
                        color: borderColor
                      }}
                    >
                      {program.name}
                    </h2>
                    <div
                      className="rounded-[200px] border-none cursor-pointer"
                      style={{
                        background: borderColor,
                        borderRadius: '12px',
                        paddingTop: '4px',
                        paddingBottom: '0'
                      }}
                    >
                      <span 
                        className="text-xs font-semibold rounded-[200px] px-3 py-1 whitespace-nowrap flex-shrink-0 border block"
                        style={{ 
                          backgroundColor: 'white',
                          borderColor: borderColor,
                          color: borderColor,
                          transform: 'translateY(-4px)',
                          borderRadius: '12px',
                          height: '23px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {program.time}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No programs available for this stage.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Stage;
