import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineArrowUpTray } from 'react-icons/hi2';
import { TbTemplate } from 'react-icons/tb';
import Create from './createNew/CreateNew';
import PasteTextModal from './createNew/PasteText';
import Generate from './createNew/Generate';
import Import from './createNew/Import';
import aibtn from "../assets/landingPage/create ai.png"


type ProjectDashboardProps = {
    modal: 'none' | 'create' | 'paste' | 'generate' | 'import';
    setModal: (state: 'none' | 'create' | 'paste' | 'generate' | 'import') => void;
  };

const ProjectDashboard = ({ modal, setModal }: ProjectDashboardProps ) => {

    const projects = [
      { title: 'Untitled', folder: 'Private', lastViewed: '2 days ago', creator: 'User' },
      { title: 'Untitled', folder: 'Private', lastViewed: '2 days ago', creator: 'User' },
      { title: 'Untitled', folder: 'Private', lastViewed: '2 days ago', creator: 'User' }
    ];
  
    return (
      <div className="p-6 bg-gray-200 min-h-screen w-full">

              {modal === 'create' &&  <Create setModal={(setModal)}/>  }
              {modal === 'paste' && <PasteTextModal setModal={(setModal)}/>}
              {modal === 'generate' && <Generate setModal={(setModal)}/>}
              {modal === 'import' && <Import setModal={(setModal)}/>}


        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Start creating</h2>
          <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
            <button className="flex flex-col items-center justify-center md:p-6 p-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300">
              <AiOutlinePlus className="w-6 h-6 text-[#DD6236] mb-2" />
              <span className="text-sm">New blank Project</span>
            </button>
            <button 
            onClick={() => setModal("create")} 
            className="flex flex-col items-center justify-center md:p-6 p-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300">
              <img src={aibtn} className="w-6 h-6 mb-2" />
              <span 
              className="text-sm">Create new with AI</span>
            </button>
            <button 
            onClick={() => setModal("import")}
            className="flex flex-col items-center justify-center md:p-6 p-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300">
              <HiOutlineArrowUpTray className="w-6 h-6 text-[#DD6236] mb-2" />
              <span className="text-sm">Import</span>
            </button>
            <button className="flex flex-col items-center justify-center md:p-6 p-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300">
              <TbTemplate className="w-6 h-6 text-[#DD6236] mb-2" />
              <span className="text-sm">Start from Template</span>
            </button>
          </div>
        </div>
  
        <div className="flex items-center space-x-6 mb-6">
          <button className="text-gray-600 hover:text-gray-900">All</button>
          <button className="text-gray-600 hover:text-gray-900">Recently Viewed</button>
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

export default ProjectDashboard