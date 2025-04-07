import React from 'react';
import { ExternalLink, User2Icon, } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "E-Learning Platform",
      description: "A full-stack online education system with video courses and quizzes",
      tags: ["React", "Node.js", "MongoDB"],
      liveUrl: "https://www.github.com",
      codeUrl: "https://www.github.com",
      image: "webdev.avif"
    },
    {
      id: 2,
      title: "Community Forum",
      description: "Real-time discussion platform with user authentication",
      tags: ["Next.js", "Firebase", "Tailwind"],
      liveUrl: "https://www.github.com",
      codeUrl: "https://www.github.com",
      image: "virtual.jpg"
    },
    {
      id: 3,
      title: "Knowledge Sharing App",
      description: "Crowdsourced tutorial platform with upvoting system",
      tags: ["TypeScript", "GraphQL", "PostgreSQL"],
      liveUrl: "https://www.github.com",
      codeUrl: "https://www.github.com",
      image: "classroom.jpg"
    },
    {
      id: 4,
      title: "Online Course Builder",
      description: "Tool for educators to create interactive courses",
      tags: ["React", "Express", "AWS S3"],
      liveUrl: "https://www.github.com",
      codeUrl: "https://www.github.com",
      image: "technology.jpg"
    },
    {
        id: 5,
        title: "Mini Chat Applicaton",
        description: "Tool for educators to create interactive courses",
        tags: ["React", "Express", "AWS S3"],
        liveUrl: "https://www.github.com",
        codeUrl: "https://www.github.com",
        image: "artificial.webp"
      },
      {
        id: 6,
        title: "Virtual AI Assistance",
        description: "Tool for educators to create interactive courses",
        tags: ["React", "Express", "AWS S3"],
        liveUrl: "https://www.github.com",
        codeUrl: "https://www.github.com",
        image: "Gamedevelopment.jpg"
      }
    ];

  ;

  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Our Projects</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Explore our innovative solutions that empower learning and knowledge sharing
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a 
                    href={project.liveUrl}
                    className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2" size={16} />
                    Live Demo
                  </a>
                  <a 
                    href={project.codeUrl}
                    className="flex items-center text-gray-600 hover:text-gray-800 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <User2Icon className="mr-2" size={16} />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;