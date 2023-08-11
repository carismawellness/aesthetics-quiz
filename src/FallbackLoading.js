import React from 'react';

function FallbackLoading() {
  return (
    <div className="min-h-screen flex items-start justify-center lg:pt-8">
        <div className='w-full lg:w-1/2'>
            <div className="fallback-grid">
            {Array(9).fill().map((_, i) => <div key={i} className="fallback-grid-item"></div>)}
            </div>
        </div>
    </div>
  );
}

export default FallbackLoading;