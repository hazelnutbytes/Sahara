
import React, { useState, useCallback } from 'react';

const PanicButton: React.FC = () => {
  const [alertState, setAlertState] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handlePanicClick = useCallback(() => {
    setAlertState('loading');
    setMessage('Getting your location...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Simulate sending alert to authorities/NGOs
        setTimeout(() => {
          setAlertState('sent');
          setMessage(`Alert sent with your location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}. Help is on the way.`);
        }, 1500);
      },
      (error) => {
        setAlertState('error');
        setMessage(`Could not get location. ${error.message}. Please call emergency services.`);
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);
  
  const resetState = () => {
    setAlertState('idle');
    setMessage('');
  }

  return (
    <>
      <button
        onClick={handlePanicClick}
        disabled={alertState !== 'idle'}
        className="fixed bottom-20 right-4 z-30 flex items-center justify-center w-16 h-16 bg-sahaara-red-dark rounded-full shadow-2xl text-white transform hover:scale-110 transition-transform duration-200 animate-pulse disabled:animate-none disabled:bg-gray-400"
      >
        <span className="text-xs font-bold">SOS</span>
      </button>

      {(alertState === 'sent' || alertState === 'error' || alertState === 'loading') && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            {alertState === 'loading' && (
               <div className="w-12 h-12 border-4 border-sahaara-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            )}
            {alertState === 'sent' && (
                <div className="w-12 h-12 bg-sahaara-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
            )}
            {alertState === 'error' && (
                 <div className="w-12 h-12 bg-sahaara-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
            )}
            <h3 className="text-lg font-bold mb-2">
              {alertState === 'sent' ? 'Alert Sent!' : alertState === 'error' ? 'Error' : 'Sending Alert...'}
            </h3>
            <p className="text-gray-600 text-sm mb-6">{message}</p>
            {alertState !== 'loading' && (
                 <button onClick={resetState} className="w-full bg-sahaara-blue hover:bg-sahaara-blue-dark text-white font-bold py-2 px-4 rounded">
                    Close
                </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PanicButton;
