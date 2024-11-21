import { useState } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import { BsStar } from 'react-icons/bs';
import { HiOutlineArrowUpTray } from 'react-icons/hi2';
import { TbTemplate } from 'react-icons/tb';

import Create from './createNew/CreateNew';

import Navbar from './Navbar';
import SideBar from './SideBar';



const HomePage = () => {
    return (
        <>
        <Navbar />
        <div className="section flex w-full">
        <SideBar />
        <ProjectDashboard/>
        </div>
        </>
    )
}

export default HomePage;

const ProjectDashboard = () => {

  const [modal, setModal] = useState(false)

    const projects = [
      { title: 'Untitled', folder: 'Private', lastViewed: '2 days ago', creator: 'User' },
      { title: 'Untitled', folder: 'Private', lastViewed: '2 days ago', creator: 'User' },
      { title: 'Untitled', folder: 'Private', lastViewed: '2 days ago', creator: 'User' }
    ];
  
    return (
      <div className="p-6 bg-gray-200 min-h-screen w-full">
              {modal && 
              (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                  <div className="relative overlay">
                  <Create/>      
                  <button 
            onClick={() => setModal(false)}
            className="absolute top-4 right-4 text-lg  hover:text-gray-700"
          >
            ✕
          </button>          
                  </div>
                </div>
              )
              }
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Start creating</h2>
          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300">
              <AiOutlinePlus className="w-6 h-6 text-orange-500 mb-2" />
              <span className="text-sm">New blank Project</span>
            </button>
            <button 
            onClick={() => setModal(true)} 
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300">
              <BsStar className="w-6 h-6 text-orange-500 mb-2" />
              <span 
              className="text-sm">Create new with AI</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300">
              <HiOutlineArrowUpTray className="w-6 h-6 text-orange-500 mb-2" />
              <span className="text-sm">Import</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300">
              <TbTemplate className="w-6 h-6 text-orange-500 mb-2" />
              <span className="text-sm">Start from Template</span>
            </button>
          </div>
        </div>
  
        <div className="flex items-center space-x-6 mb-6">
          <button className="text-gray-600 hover:text-gray-900">All</button>
          <button className="text-gray-600 hover:text-gray-900">Recently Viewed</button>
          <button className="text-gray-600 hover:text-gray-900">Created by you</button>
          <button className="text-gray-600 hover:text-gray-900">Favorites</button>
        </div>
  
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div>Title</div>
            <div>Folders</div>
            <div>Last viewed</div>
            <div>Creator</div>
          </div>
          {projects.map((project, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 text-sm hover:bg-gray-50">
              <div className="text-gray-900">{project.title}</div>
              <div className="text-gray-600">{project.folder}</div>
              <div className="text-gray-600">{project.lastViewed}</div>
              <div className="text-gray-900">{project.creator}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };