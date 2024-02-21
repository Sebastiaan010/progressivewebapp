import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cmgt.hr.nl/api/projects?page=${currentPage}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setProjects(data);
        setTotalPages(data.meta.total_pages); 
        setLoading(false);
  
        console.log('Fetched Data:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [currentPage]);

 const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
  console.log('Test', currentPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  console.log('Test', currentPage - 1);
};

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {projects.data.map((item) => (
              <div key={item.project.id} className="bg-white p-6 rounded-lg shadow-md relative">
                <h2 className="text-xl font-bold mb-2">{item.project.title}</h2>
                <p className="text-gray-600 mb-4">{item.project.tagline}</p>
                <img src={item.project.header_image} alt={item.project.title} className="w-full h-40 object-cover mb-4" />
                <p className="text-blue-500 mt-4">{item.project.author}</p>
                <Link to={`/details/${item.project.id}`}></Link>
                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Details
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`bg-gray-500 text-white py-2 px-4 rounded ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            Vorige Pagina
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`bg-blue-500 text-white py-2 px-4 rounded ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            Volgende pagina
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
