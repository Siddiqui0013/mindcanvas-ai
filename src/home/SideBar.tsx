import ai_img from "../assets/home/ai-images.png"

import { 
    RiSettings4Line, RiUserLine, RiShareLine, RiPaletteLine, RiText, 
    RiLayoutLine, RiArrowDownSLine
  } from 'react-icons/ri';

export default function SideBar() {
  return (
    <>
    
    <div className="w-64 border-r p-4">
          
          <div className="border-b py-2 mb-4 top">
          <div className="">
            <button className="flex items-center justify-between w-full p-2 text-sm text-gray-700 hover:bg-primary/10 rounded">
              <span>MindCanvas Workspace</span>
              <RiArrowDownSLine />
            </button>
          </div>
            
            <button className="flex items-center w-full p-2 text-sm rounded text-gray-700 hover:bg-primary/10">
              <RiUserLine size={18} />
              <span className="ml-2">Members</span>
            </button>
            
            <button className="flex items-center w-full p-2 text-sm rounded text-gray-700 hover:bg-primary/10">
              <RiSettings4Line size={18} />
              <span className="ml-2">Settings</span>
            </button>

          </div>

  
          <div className="border-b mb-4 py-2 space-y-1">
            <button className="flex items-center w-full p-2 text-sm rounded text-gray-700 hover:bg-primary/10">
              <RiShareLine size={18} />
              <span className="ml-2">Shared with you</span>
            </button>
            
            <button className="flex items-center w-full p-2 text-sm rounded text-gray-700 hover:bg-primary/10">
              <img src={ai_img} className='w-[20px]' />
              <span className="ml-2">AI Images</span>
            </button>
            </div>
            
            <div>
            <button className="flex items-center w-full p-2 text-sm rounded text-gray-700 hover:bg-primary/10">
              <RiLayoutLine size={18} />
              <span className="ml-2">Templates</span>
            </button>
            
            <button className="flex items-center w-full p-2 text-sm rounded text-gray-700 hover:bg-primary/10">
              <RiPaletteLine size={18} />
              <span className="ml-2">Themes</span>
            </button>
            
            <button className="flex items-center w-full p-2 text-sm rounded text-gray-700 hover:bg-primary/10">
              <RiText size={18} />
              <span className="ml-2">Custom Fonts</span>
            </button>
          </div>

        </div>
    
    </>
  )
}
