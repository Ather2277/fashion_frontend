import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Linkedin, Instagram } from "lucide-react";

const teamMembers = [
  {
    name: "Prashant Singh",
    role: "AI Engineer, Cofounder",
    linkedin: "https://www.linkedin.com/in/prashant-singh-118604230",
    instagram: "https://instagram.com/prashant_singh_8084",
    email: "prashantsingh2277@gmail.com",
  },
  {
    name: "Kanhaiya Kumar Jha",
    role: "Data Scientist, Cofounder",
    linkedin: "https://linkedin.com/in/kanhaiya-jha-b86491244",
    instagram: "https://instagram.com/kn77.97",
    email: "knj9304@gmail.com",
  },
  
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />

      <main className="flex flex-col items-center py-20 px-4 mt-16">
        <h1 className="text-4xl font-bold mb-6 text-center animate-fade-in">
          About Modamorph Tech Pvt Ltd
        </h1>
        <p className="text-gray-600 text-md mb-12 text-center max-w-3xl">
          <strong>Modamorph Tech Pvt Ltd</strong> is an AI-first innovation studio focused on developing intelligent, easy-to-use applications that improve everyday experiences. From fashion to productivity, we build tools that make daily life more exciting, personalized, and efficient.
        </p>

        <h2 className="text-3xl font-semibold mb-6 text-center">Meet the Team</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl w-full animate-fade-in">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-black mb-4">
                {member.name.split(" ")[0][0]}
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{member.role}</p>
              <div className="flex gap-4">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-blue-600 hover:scale-110 transition-transform" />
                </a>
                <a href={`https://${member.instagram}`} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-pink-500 hover:scale-110 transition-transform" />
                </a>
                <a href={`mailto:${member.email}`}>
                  <Mail className="h-5 w-5 text-gray-700 hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
