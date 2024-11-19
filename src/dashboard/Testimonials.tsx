import { useState, useEffect } from "react";

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setvisibleTest] = useState(3)

  const testimonials = [
    {
      title: "It's just incredible! 1",
      content:
        "Lorem ipsum dolor sit amet consectetur. At suspendisse hendrerit et massa iaculis. Posuere varius lectus velit quisque at tortor consectetur morbi. Augue tortor est suscipit arcu orci quis.",
      name: "Jimmy Bartney",
      position: "Product Manager at Picko Lab",
      image: "https://via.placeholder.com/40",
    },
    {
      title: "It's just incredible! 2",
      content:
        "Lorem ipsum dolor sit amet consectetur. At suspendisse hendrerit et massa iaculis. Posuere varius lectus velit quisque at tortor consectetur morbi. Augue tortor est suscipit arcu orci quis.",
      name: "Jimmy Bartney",
      position: "Product Manager at Picko Lab",
      image: "https://via.placeholder.com/40",
    },
    {
      title: "It's just incredible! 3",
      content:
        "Lorem ipsum dolor sit amet consectetur. At suspendisse hendrerit et massa iaculis. Posuere varius lectus velit quisque at tortor consectetur morbi. Augue tortor est suscipit arcu orci quis.",
      name: "Jimmy Bartney",
      position: "Product Manager at Picko Lab",
      image: "https://via.placeholder.com/40",
    },
    {
      title: "It's just incredible! 4",
      content:
        "Lorem ipsum dolor sit amet consectetur. At suspendisse hendrerit et massa iaculis. Posuere varius lectus velit quisque at tortor consectetur morbi. Augue tortor est suscipit arcu orci quis.",
      name: "Jimmy Bartney",
      position: "Product Manager at Picko Lab",
      image: "https://via.placeholder.com/40",
    },
    {
      title: "It's just incredible! 5",
      content:
        "Lorem ipsum dolor sit amet consectetur. At suspendisse hendrerit et massa iaculis. Posuere varius lectus velit quisque at tortor consectetur morbi. Augue tortor est suscipit arcu orci quis.",
      name: "Jimmy Bartney",
      position: "Product Manager at Picko Lab",
      image: "https://via.placeholder.com/40",
    },
  ];

  useEffect(() => {
    const setCount = () => {
        if (window.innerWidth < 768) {
          setvisibleTest(1);
        } else if (window.innerWidth < 1024) {
          setvisibleTest(2);
        } else {
          setvisibleTest(3);
        }
      }

    setCount()
    window.addEventListener("resize", setCount);
    return () => {
        window.removeEventListener("resize", setCount);
    }
  }, [])
  

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - visibleCount : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - visibleCount ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="py-6">
        <div className="box md:px-40">
        <h2 className=" text-3xl md:text-[48px] font-bold text-center mb-4">
        Discover what others think
      </h2>
      <p className="text-center text-gray-600 text-lg md:text-[22px] mb-8">
        Lorem ipsum dolor sit amet consectetur. Felis neque sodales phasellus
        tellus commodo aenean. Urna volutpat quis diam leo ut purus magna.
      </p>

        </div>
      <div className="flex justify-center items-center space-x-4">

        <div className="flex space-x-4 justify-center flex-wrap overflow-hidden  ">
          {testimonials.slice(currentIndex, currentIndex + visibleCount).map((testimonial, index) => (
            <div
              key={index}
              className="bg-black text-white rounded-lg p-6 shadow-lg w-80 md:w-[30%]"
            >
              <h3 className="text-lg font-bold mb-2">{testimonial.title}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {testimonial.content}
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-bold">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
      <button
          className="bg-gray-900 p-4 text-white rounded-3xl hover:bg-[#FF7F50] transition"
          onClick={handlePrev}
          aria-label="Previous"
        >
          ←
        </button>

        <button
          className="bg-gray-900 text-white p-4 rounded-3xl  hover:bg-[#FF7F50] transition"
          onClick={handleNext}
          aria-label="Next"
        >
          →
        </button>

      </div>
    </div>
  );
};

export default TestimonialCarousel;
