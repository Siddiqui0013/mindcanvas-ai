import { Link } from "react-router-dom";

import TestimonialCarousel from "./Testimonials";
import Footer from "../footer/Footer";
import FAQ from "./FAQ";

import Navbar from "../navbar/Navbar";

import bg from "../assets/landingPage/background pattern.png";
import frameTop from "../assets/landingPage/Frame.png";
import frameBottom from "../assets/landingPage/Frame (1).png";
import group from "../assets/landingPage/Group 33733.png";
import sec2img from "../assets/landingPage/sec2.png";
import sec3img from "../assets/landingPage/sec3.png";
import sec4img from "../assets/landingPage/sec4.png";
import sec5img from "../assets/landingPage/sec5.png";
import sec6img from "../assets/landingPage/sec6.png";
import bg2 from "../assets/landingPage/section2-bg.png";

const HeroSection = () => {

	return (
        <>
		<Navbar />
		<header className="pt-4 pb-6 bg-white">
			<div>
				<div
					style={{ backgroundImage: `url(${bg})` }}
					className="relative mx-auto text-center pt-24 pb-12 px-12"
				>
					<img
						src={frameTop}
						width={80}
						className="absolute top-0 left-0"
						alt=""
					/>
					<img
						src={frameBottom}
						width={80}
						className="absolute bottom-0 right-0"
						alt=""
					/>
					<img
						src={group}
						width={300}
						className="hidden md:block absolute top-0 right-0"
						alt=""
					/>

					<h1 className="text-[48px] md:text-[90px] bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-900 font-bold leading-tight">
						Transform Your Ideas into Stunning Visuals with AI
					</h1>
					<p className="text-gray-600 md:px-20 mt-4">
						Lorem ipsum dolor sit amet consectetur. Congue justo at eu felis
						urna purus ut scelerisque. Cursus quam non purus gravida commodo at
						gravida. Aliquet ut et nisi ipsum in. Faucibus eu bibendum turpis.
					</p>
				</div>

				<div
					style={{ backgroundImage: `url(${bg2})` }}
					className="Section-2 h-60 bg-center bg-cover"
				>
					<div className="flex justify-center space-x-6 mt-8">

						<Link to = "/home">
						<button className="px-6 py-3 md:w-60 bg-gray-900 text-white rounded hover:bg-gray-800">
							Get Started
						</button>
						</Link>
						
						<button className="px-6 py-3 md:w-60 bg-primary text-white rounded hover:bg-orange-600">
							Request a Demo
						</button>
					</div>
				</div>
			</div>

            <div className="Section-2 flex flex-col md:flex-row justify-between p-6">
  <div className="flex justify-center flex-col items-start p-10 w-full md:w-1/2">
    <h1 className="text-[48px] font-bold mb-4">
      AI-Powered Visual Content Creation
    </h1>
    <p className="text-[22px]">
      Automatically generate visually appealing presentations from your ideas.
    </p>
  </div>
  <div className="w-full md:w-1/2">
    <img src={sec2img} width={650} className="mx-auto" alt="" />
  </div>
</div>


			<div className="Section-3 flex flex-col md:flex-row justify-between p-6">
				<div className="order-2 md:order-1">
					<img src={sec6img} width={650} className="" alt="" />
				</div>
				<div className="flex order-1 md:order-2 justify-center items-center flex-col md:items-start p-6 md:p-10 md:w-1/2">
					<h1 className="md:text-[48px] text-[32px] font-bold mb-4 text-center">
						Interactive Brainstorming and Mind Mapping
					</h1>
					<p className="md:text-[22px] text-[16px] text-center">
						Transform quick ideas into structured visual mind maps with
						real-time linking.
					</p>
				</div>
			</div>

            <div className="Section-4 flex flex-col md:flex-row justify-between p-6">
  <div className="flex justify-center flex-col items-start p-10 w-full md:w-1/2">
    <h1 className="text-[48px] font-bold mb-4">
      AI-Assisted Storytelling and Idea Structuring
    </h1>
    <p className="text-[22px]">
      Refine and organize your ideas into structured narratives.
    </p>
  </div>
  <div className="w-full md:w-1/2">
    <img src={sec5img} width={650} className="mx-auto" alt="" />
  </div>
</div>

<div className="Section-5 flex flex-col md:flex-row justify-between p-6">
  <div className="flex order-1 md:order-2 justify-center flex-col items-start p-10 w-full md:w-1/2">
    <h1 className="text-[48px] font-bold mb-4">
      Seamless Conversion to Presentations
    </h1>
    <p className="text-[22px]">
      One-click transformation of mind maps into polished presentations.
    </p>
  </div>
  <div className="w-full order-2 md:order-1 md:w-1/2">
    <img src={sec4img} width={650} className="mx-auto" alt="" />
  </div>
</div>

<div className="Section-6 flex flex-col md:flex-row justify-between p-6">
  <div className="flex justify-center flex-col items-start p-10 w-full md:w-1/2">
    <h1 className="text-[48px] font-bold mb-4">
      Real-Time Collaboration
    </h1>
    <p className="text-[22px]">
      Collaborate with others in real-time, with instant feedback visibility.
    </p>
  </div>
  <div className="w-full md:w-1/2">
    <img src={sec3img} width={650} className="mx-auto" alt="" />
  </div>
</div>


			<div className="Section-7 flex justify-between p-6"></div>

			<div className="Section-8"></div>

			<div className="Section-9"></div>
		</header>

		<TestimonialCarousel />

		<FAQ/>

		<div className="info py-16 flex flex-col items-center">
			<h1 className="md:text-[48px] font-bold">Get Started for Free</h1>
			<p className="md:text-[22px] md:px-40">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus alias saepe blanditiis eum quas error at, velit, exercitationem quod officia ad voluptates quae? Aliquam officiis tempora harum provident est cum?</p>
			<div className="btns flex items-center justify-center pt-4 space-x-4">
				<button className="bg-black text-white p-4 rounded-2xl">Learn More</button>
				<button className="bg-[#FF7F50] text-white p-4 rounded-2xl">Sign Up for Free {' '} → </button>
			</div>
		</div>

        <Footer />

        </>
	);
};

export default HeroSection;
