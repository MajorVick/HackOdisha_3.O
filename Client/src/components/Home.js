import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DoctorCard from "./DoctorCard";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/doctors');
        const data = await response.json();
        setDoctors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full flex justify-center bg-webgrey pt-16">
        <div className="w-2/3 pb-10">
          <h1 className="font-IBM text-3xl font-medium pt-12 pb-4">
            Doctors near you
          </h1>
          <div className="w-full flex flex-wrap gap-6">
            {doctors.map((doctor) => (
              <DoctorCard 
                key = {doctor._id}
                id = {doctor._id}
                name = {doctor.name}
                specialization= {doctor.specialization}
                rating = {doctor.rating}
                availableHours={doctor.availableHours}
                profilePicture={doctor.profilePicture}
              />
            ))}
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
