import React from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import ExpertCard from '../components/ExpertCard';

const ExpertsPage: React.FC = () => {
  // Sample data for experts (Vets, Agronomists, Crop specialists [cite: 51, 52, 53, 54])
  const experts = [
    {
      name: 'Dr. Chinedu Eze',
      specialty: 'Veterinary Doctor',
      rating: 4.9,
      rateAgroCoin: 30,
      languages: 'English, Igbo',
      imageUrl: '/assets/expert1.jpg',
    },
    {
      name: 'Dr. Fatima Bello',
      specialty: 'Agronomist & Soil Scientist',
      rating: 4.7,
      rateAgroCoin: 35,
      languages: 'English, Hausa',
      imageUrl: '/assets/expert2.jpg',
    },
    {
      name: 'Mr. Kunle Adekunle',
      specialty: 'Crop Specialist (Cash Crops)',
      rating: 4.5,
      rateAgroCoin: 25,
      languages: 'English, Yoruba',
      imageUrl: '/assets/expert3.jpg',
    },
    {
      name: 'Prof. Adaobi Okeke',
      specialty: 'Soil Scientist',
      rating: 4.9,
      rateAgroCoin: 40,
      languages: 'English, Igbo',
      imageUrl: '/assets/expert4.jpg',
    },
  ];

  return (
    <Layout>
      {/* 1. Header */}
      <header className="flex flex-col p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold mb-1">Expert Consultation Hub</h1>
        <p className="text-sm opacity-90">Connect with certified Vets, Agronomists, and Specialists[cite: 51, 52, 53].</p>
      </header>

      {/* 2. Search and Filter Bar */}
      <div className="p-4 bg-white border-b border-gray-200">
        <input
          type="search"
          placeholder="Search by specialty (Vet, Soil, Crop) or name..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex space-x-3 mt-3 overflow-x-auto pb-1">
          <button className="shrink-0 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-300">
            All Specialists
          </button>
          <button className="shrink-0 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
            Veterinary Doctors
          </button>
          <button className="shrink-0 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
            Agronomists
          </button>
          <button className="shrink-0 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
            Soil Scientists
          </button>
        </div>
      </div>

      {/* 3. Expert List */}
      <main className="p-4 space-y-4 mb-20">
        <p className="text-md font-semibold text-gray-700">Available Experts (Paid with AgroCoin )</p>
        {experts.map((expert, index) => (
          <ExpertCard
            key={index}
            name={expert.name}
            specialty={expert.specialty}
            rating={expert.rating}
            rateAgroCoin={expert.rateAgroCoin}
            languages={expert.languages}
            imageUrl={expert.imageUrl}
          />
        ))}
      </main>

      {/* 4. Mobile Navbar */}
      <MobileNavbar />
    </Layout>
  );
};

export default ExpertsPage;