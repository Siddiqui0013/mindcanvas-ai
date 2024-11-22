import { FaBell, FaUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

import { Link } from "react-router-dom";

type NavbarProps = {
  setModal: (state: 'none' | 'create' | 'paste' | 'generate' | 'import') => void;
};


export default function Navbar({ setModal }: NavbarProps) {

  return (
    <>
    
    <div className="nav border-b p-4 border-gray-200 flex space-x-36 items-center">
<div className="">
          <Link to="/home"
          className="text-3xl font-bold">Logo</Link>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex space-x-4">
            <select className="px-4 py-2 text-sm font-medium bg-white border rounded hover:bg-primary/10">
              <option>Workspaces</option>
            </select>
            <select className="px-4 py-2 text-sm font-medium bg-white border rounded hover:bg-primary/10">
              <option>Recent</option>
            </select>
            <select className="px-4 py-2 text-sm font-medium bg-white border rounded hover:bg-primary/10">
              <option>Templates</option>
            </select>
            <button 
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
            onClick={() => setModal("create")}
            >
               Create new
               <span className='ml-2 bg-orange-800 rounded-md p-[3px]'>AI</span>
           </button>
          </div>
</div>
          <div className="last flex items-center space-x-2">
          <div className="relative flex border-2 rounded-lg border-gray-300">
          <input
            type="text"
            placeholder="Search"
            className=" p-2 rounded-3xl pl-10 focus:outline-none"
          />
          <AiOutlineSearch className="absolute top-[10px] left-3 text-gray-500" size={20} />
        </div>
        <div className="flex items-center cursor-pointer space-x-2 ">
          <FaBell size={24} />
          <div className="relative">
            <div
              className="flex items-center gap-2 p-1 cursor-pointer"
            >
              <FaUserCircle size={24} />
            </div>
          </div>
          </div>
          </div>
        </div>
    </>
  )
}
