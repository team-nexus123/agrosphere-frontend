import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { Link, useNavigate } from 'react-router-dom';

// We'll simulate receiving expert details via a mock setup, 
// but in a real app, this data would come via routing params (e.g., /experts/book/123)

const mockExpert = {
    name: 'Dr. Fatima Bello',
    specialty: 'Agronomist & Soil Scientist',
    rateAgroCoin: 35,
    imageUrl: '/assets/expert2.jpg',
    commission: 0.15, // Agrosphere earns commissions [cite: 56] (15% simulated)
};

const ExpertBookingPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('2025-12-15');
    const [selectedTime, setSelectedTime] = useState('11:00 AM');
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Simulated Available Time Slots
    const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

    // Calculate costs
    const expertFee = mockExpert.rateAgroCoin;
    const agrosphereCommission = Math.round(expertFee * mockExpert.commission);
    const totalCost = expertFee + agrosphereCommission;

    const handleConfirmBooking = () => {
        // Simulate Web3 payment/transaction finalization
        setIsConfirmed(true);
        // In a real app, this would deduct AgroCoin from the user's wallet.
        
        // After confirmation, we might navigate back or stay on the success state.
        setTimeout(() => {
            navigate('/experts', { replace: true });
        }, 3000); 
    };
    
    // Simple mock calendar render for demonstration
    const renderCalendar = () => {
        const dates = [14, 15, 16, 17, 18, 19, 20].map(day => `2025-12-${day}`);
        return (
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {dates.map(date => (
                    <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`shrink-0 w-16 h-16 rounded-lg text-center p-1 border-2 transition-all ${
                            selectedDate === date
                                ? 'bg-green-600 text-white border-green-700'
                                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        <p className="text-xs">Dec</p>
                        <p className="text-xl font-bold">{date.split('-')[2]}</p>
                    </button>
                ))}
            </div>
        );
    };

    if (isConfirmed) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
                    <span className="text-6xl text-amber-500 mb-4">✅</span>
                    <h2 className="text-2xl font-bold text-green-700">Consultation Booked!</h2>
                    <p className="text-gray-600 mt-2">You successfully paid **{totalCost} AgroCoin**.</p>
                    <p className="text-sm text-gray-500 mt-1">Check your email for the meeting link with {mockExpert.name}.</p>
                    <Link to="/experts" className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                        Return to Expert Hub
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* 1. Header */}
            <header className="flex items-center p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
                <Link to="/experts" className="text-xl mr-3">
                    {'<'} 
                </Link>
                <h1 className="text-lg font-semibold">Book Consultation</h1>
            </header>

            {/* 2. Scrollable Content Area */}
            <main className="grow overflow-y-auto p-4 space-y-5 pb-24"> 
                
                {/* Expert Profile Snippet */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow-md border-2 border-green-300">
                    <img 
                        src={mockExpert.imageUrl} 
                        alt={mockExpert.name} 
                        className="w-12 h-12 rounded-full object-cover border border-green-500"
                    />
                    <div className="ml-3">
                        <h3 className="text-lg font-bold text-gray-800">{mockExpert.name}</h3>
                        <p className="text-sm text-green-700">{mockExpert.specialty}</p>
                    </div>
                </div>

                {/* --- A. Date Selection --- */}
                <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">🗓️ Select a Date</h2>
                    {renderCalendar()}
                </div>

                {/* --- B. Time Selection --- */}
                <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">🕒 Select a Time Slot</h2>
                    <div className="grid grid-cols-3 gap-3">
                        {availableTimes.map(time => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 rounded-lg border transition-all ${
                                    selectedTime === time
                                        ? 'bg-amber-500 text-white font-semibold border-amber-600'
                                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- C. Cost Summary --- */}
                <div className="p-4 bg-amber-50 rounded-xl shadow-md border border-amber-300">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Summary</h2>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <p>Expert Fee ({mockExpert.name})</p>
                            <p className='font-semibold'>{expertFee} AC</p>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                            <p>Agrosphere Commission [cite: 56]</p>
                            <p className='font-semibold text-red-500'>+{agrosphereCommission} AC</p>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-1">
                            <p>Total AgroCoin Due</p>
                            <p className='text-amber-600'>{totalCost} AC</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* 3. Fixed Footer: Confirm Button */}
            <div className="fixed bottom-16 w-full max-w-sm bg-white p-4 border-t border-gray-300 shadow-2xl z-20">
                <p className="text-center text-sm text-gray-600 mb-2">
                    Booking: **{selectedDate}** at **{selectedTime}**
                </p>
                <button 
                    onClick={handleConfirmBooking}
                    className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700 transition-colors"
                >
                    Confirm & Pay {totalCost} AgroCoin
                </button>
            </div>

            {/* 4. Mobile Navbar */}
            <MobileNavbar />
        </Layout>
    );
};

export default ExpertBookingPage;