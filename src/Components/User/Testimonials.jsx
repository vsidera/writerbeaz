import FeedbackCard from "./FeedbackCard";
import { feedback } from "../constants";

const Testimonials = () => (
  <section className="bg-gray-100 py-16" id="clients">
    <div className="container mx-auto">

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 pb-5" id="testimony">
        What People are Saying About Us
      </h1>

      {/* Description (You can add a description here if needed) */}
      <p className="text-center text-gray-600 mb-8">
        Hear from our satisfied customers and their experiences with our services.
      </p>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        {feedback.map((card) => <FeedbackCard key={card.id} {...card} />)}
      </div>
    </div>
  </section>
);

export default Testimonials;
