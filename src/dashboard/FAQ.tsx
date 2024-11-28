import { useState } from "react";
import Down from "../assets/landingPage/down.png"
import Up from "../assets/landingPage/up.png"

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState <number | null> (null); 

  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet consectetur.",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Iaculis sapien odio integer faucibus enim nunc etiam risus est.",
    },
    {
      question: "How does the service work?",
      answer:
        "Our service works by providing detailed insights into your needs, tailored to help you succeed.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "You can request a refund within 30 days of purchase, provided the conditions are met.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription anytime through your account settings.",
    },
  ];

  const toggleFAQ = (index : number  ) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-4xl flex bg-[#F7EEDD] justify-center md:flex-row flex-col items-center space-x-2 mx-auto py-12 px-4">
    
    <div className="1st p-4 md:w-1/2">
        <h2 className="text-[32px] md:text-[48px] font-bold md:text-start text-center mb-4">Frequently asked questions</h2>
      <p className="text-gray-600 text-[16px] md:text-start text-center md:text-[24px] mb-6">
        Can't find the answer you are looking for? Reach out to us here.
      </p>
        </div>

      <div className="space-y-4 md:w-1/2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-lg overflow-hidden ${
              activeIndex === index ? "border-orange-500" : "border-gray-300"
            }`}
          >
            <div
              className={`flex justify-between items-center p-4 cursor-pointer ${
                activeIndex === index
                  ? "bg-orange-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="font-semibold">{faq.question}</h3>
              <span className="text-xl">
                {activeIndex === index ? <img src={Up} alt="" /> : <img src={Down} alt="" />}
              </span>
            </div>
            {activeIndex === index && (
              <div className="p-4 text-gray-600 bg-white">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
