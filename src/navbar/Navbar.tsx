import { useNavigate } from "react-router-dom";

const Navbar = () => {

const nav = useNavigate()

  return (
    <nav className="bg-[#2C2C2C] text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="text-xl font-bold">Logo</div>
        <div className="space-x-6">
          <a href="#price" className="">Price</a>
          <a href="#about" className="">About Us</a>
        </div>
        <div className="space-x-6">
          <button className=""
          onClick={() => nav("/login")}
          >Login</button>
          <button 
          className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600">
            Try for free
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
