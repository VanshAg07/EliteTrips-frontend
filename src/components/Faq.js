import React, { useState } from 'react';
import './Faq.css';

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index); 
  };

  const faqs = [
    {
      question: "Q: Which is the best honeymoon package in India?",
      answer: "A: The best honeymoon packages in India include a romantic escapade to Kashmir, a honeymoon tour to God’s own Country, Kerala, and a fabulous honeymoon on the island of Andaman to make your honeymoon the most memorable time of your life."
    },
    {
      question: "Q: How to book a honeymoon package?",
      answer: "A: There are various agencies that you can check out. You can also visit our official website, choose the destination of your choice, and book your dream honeymoon package. Whether it's a domestic honeymoon destination or an international honeymoon tour, we have got you covered."
    },
    {
      question: "Q: Which is the best site to book honeymoon packages?",
      answer: "A: The best honeymoon packages can be booked through WanderOn’s official website, where you can choose from a plethora of destinations and honeymoon packages so you can book the one that suits your budget."
    },
    {
      question: "Q: Can honeymoon packages be customised?",
      answer: "A: Yes, you can choose the destination of your choice and get it customised according to your preferences. You can add more days to your trip. You can also add or remove a particular place to your customised honeymoon packages."
    },
    {
      question: "Q: When is the best time to book a honeymoon package?",
      answer: "A: The best time to book your honeymoon package is when there are some offers and discounts available because you can do some cost-cutting there and spend more on the experiences that you can have at the destination of your choice."
    }
  ];

  return (
    <div className="faq-section">
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div
            className="faq-question"
            onClick={() => toggleFaq(index)}
          >
            {faq.question}
          </div>
          {openFaq === index && (
            <div className="faq-answer">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqSection;
