import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState,useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../userContext";

type NavbarProps = {
	setModal: ( state: "none" | "create" | "paste" | "generate" | "import" ) => void;
}

export default function Navbar({ setModal }: NavbarProps) {

	const navigate = useNavigate();

	const { user, setUser } = useUser();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [userModal, setuserModal] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
		  setuserModal(false);
		}
	  };
	
	  useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	  }, [])

	  const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setUser(null);
		navigate("/login");
		setuserModal(false);
	  };

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	return (
		<div className="nav border-b py-4 border-gray-200 flex justify-between items-center px-6">
			<div>
				<Link to="/home" className="text-3xl font-bold">
					Logo
				</Link>
			</div>
			<div className="md:hidden z-[51]">
				<button onClick={toggleMenu} className="p-2 text-2xl text-gray-600">
					{isMenuOpen ? <FaTimes /> : <FaBars />}
				</button>
			</div>

      <div className="btns hidden md:block">
      <div className=" py-4 md:py-0">
						<button className="block w-full px-4 py-2 font-medium bg-white rounded-lg hover:bg-primary/10 md:inline-block md:w-auto">
							AI Images
						</button>
						<button className="block w-full px-4 py-2 font-medium bg-white rounded-lg hover:bg-primary/10 md:inline-block md:w-auto">
							Themes
						</button>
						<button className="block w-full px-4 py-2 font-medium bg-white rounded-lg hover:bg-primary/10 md:inline-block md:w-auto">
							Templates
						</button>
					</div>
      </div>

			<div
				className={`fixed top-0 right-0 w-[60%] h-full bg-white z-50 transition-transform duration-300 ease-in-out transform ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				} md:static md:w-auto md:h-auto md:bg-transparent md:translate-x-0`}
			>
				<div className="flex flex-col md:flex-row md:space-x-6 md:mt-0 md:mr-0 mt-20 mr-6 items-end md:items-center">
					<div className="md:hidden py-4 md:py-0">
						<button className="block w-full px-4 py-2 font-medium bg-white rounded-lg hover:bg-primary/10 md:inline-block md:w-auto">
							AI Images
						</button>
						<button className="block w-full px-4 py-2 font-medium bg-white rounded-lg hover:bg-primary/10 md:inline-block md:w-auto">
							Themes
						</button>
						<button className="block w-full px-4 py-2 font-medium bg-white rounded-lg hover:bg-primary/10 md:inline-block md:w-auto">
							Templates
						</button>
					</div>

					<div className="mt-8 hidden md:block md:mt-0 py-4 md:py-0 md:ml-auto">
						<div className="flex items-center relative flex-col md:flex-row space-x-3">
							<button
								className="px-4 py-2 text-sm font-medium text-white bg-[#DD6236] rounded-lg"
								onClick={() => setModal("create")}
							>
								Create new
								<span className="ml-2 bg-orange-800 rounded-md p-[3px]">
									AI
								</span>
							</button>

							<div 
            className="user flex cursor-pointer flex-row items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            onClick={() => setuserModal(!userModal)}
          >
            <span className="font-medium">{user?.name}</span>
            <FaUserCircle size={24} className="text-gray-600" />
          </div>

          {userModal && (
            <div 
              ref={modalRef}
              className="modal absolute top-12 right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 py-2"
            >
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500">{user?.email || "Email"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
