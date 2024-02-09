import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cmgt.hr.nl/api/projects');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProjects(data);
        setLoading(false);

        
        console.log('Fetched Data:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs once on component mount

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Data from API:</p>
          {console.log('projects:', projects)} {/* Log projects to the console */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {projects.data.map((item) => (
              <div key={item.project.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">{item.project.title}</h2>
                <p className="text-gray-600 mb-4">{item.project.tagline}</p>
                <img src={item.project.header_image} alt={item.project.title} className="w-full h-40 object-cover mb-4" />
                <p className="text-gray-800">{item.project.description}</p>
                <p className="text-blue-500 mt-4">{item.project.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
};

export default HomePage;
