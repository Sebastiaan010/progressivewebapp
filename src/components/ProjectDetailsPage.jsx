// ProjectDetailsPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
       

        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProjectDetails(data);
        setLoading(false);

        console.log('Fetched Project Details:', data);
      } catch (error) {
        console.error('Error fetching project details:', error);
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  return (
    <div>
      {loading ? (
        <p>Loading project details...</p>
      ) : (
        <div>
          <h1>{projectDetails.title}</h1>
          <p>{projectDetails.tagline}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
