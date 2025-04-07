import React from 'react';
import { 
  LinkedinIcon, 
  TwitterIcon, 
  GithubIcon, 
  MailIcon 
} from 'lucide-react';

const TrainersSection = () => {
  const trainers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Web Development Expert",
      bio: "10+ years building scalable web applications. Specializes in React and Node.js.",
      image: "tutor1.webp",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "#"
      }
    },
    {
      id: 2,
      name: "John Williams",
      role: "Data Science Instructor",
      bio: "Machine learning specialist with PhD in Computer Science. Loves making complex concepts simple.",
      image: "tutor2.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "#"
      }
    },
    {
      id: 3,
      name: "Mary Chen",
      role: "UX/UI Design Mentor",
      bio: "Former design lead at Google. Passionate about creating intuitive user experiences.",
      image: "tutor3.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "#"
      }
    },
    {
      id: 4,
      name: "Prisca Patel",
      role: "DevOps Specialist",
      bio: "Helps teams implement CI/CD pipelines. Cloud infrastructure guru.",
      image: "tutor4.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "#"
      }
    }
  ];

  return (
    <section id="trainers" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Meet Our Trainers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn from industry experts with real-world experience and passion for teaching
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer) => (
            <div 
              key={trainer.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800">{trainer.name}</h3>
                <p className="text-emerald-600 mb-2">{trainer.role}</p>
                <p className="text-gray-600 text-sm mb-4">{trainer.bio}</p>
                
                <div className="flex justify-center space-x-3">
                  <a 
                    href={trainer.social.linkedin} 
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label={`${trainer.name} LinkedIn`}
                  >
                    <LinkedinIcon size={18} />
                  </a>
                  <a 
                    href={trainer.social.twitter} 
                    className="text-gray-500 hover:text-blue-400 transition-colors"
                    aria-label={`${trainer.name} Twitter`}
                  >
                    <TwitterIcon size={18} />
                  </a>
                  <a 
                    href={trainer.social.github} 
                    className="text-gray-500 hover:text-gray-800 transition-colors"
                    aria-label={`${trainer.name} GitHub`}
                  >
                    <GithubIcon size={18} />
                  </a>
                  <a 
                    href={`mailto:${trainer.social.email}`} 
                    className="text-gray-500 hover:text-blue-400 transition-colors"
                    aria-label={`Email ${trainer.name}`}
                  >
                    <MailIcon size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
         <a href='#'><button className="bg-emerald-600 cursor-pointer hover:text-gray-100 hover:bg-black text-white px-8 py-3 rounded-lg font-medium transition-colors">
            View All Trainers
          </button></a>
        </div>
      </div>
      <div>
      <div className="relative w-full overflow-hidden mb-0">
      {/* Full-width container with intrinsic aspect ratio */}
      <div className="w-full" style={{ paddingBottom: '40%' }}> {/* Adjust 40% to match your image's aspect ratio */}
        <img
          src="studet-group.jpg" // Replace with your image path
          alt="Full-width cover showing our training facilities"
          className="absolute inset-0 w-full h-full  object-center object-scale-down"
          loading="lazy"
        />
      </div>
      </div>
</div>
    </section>
  );
};


export default TrainersSection;