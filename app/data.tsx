import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Importing optimized Image component from Next.js

// Define the interface for individual screens
interface Screen {
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
  slider: string;
  img_layout: string;
  arrow?: string;
  arrow_additional?: {
    transform: string;
  };
}

// Type definition for the screens object
type Screens = {
  [key: number]: Screen;
};

// Function to render a step title with a specific color class
const stepTitle = (stepNumber: string, colorClass: string) => (
  <span>Step <span className={colorClass}>{stepNumber}</span></span>
);

// Function to render a step description with optional bullet list
const stepDescription = (heading: string, details: string[], list = false) => (
  <div className='flex flex-col gap-y-2'>
    <h1 className='text-description-heading'>{heading}</h1>
    {list ? (
      <ul className='text-description-white list-disc pl-3'>
        {details.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    ) : (
      details.map((detail, idx) => <h1 key={idx} className='text-description-white'>{detail}</h1>)
    )}
  </div>
);

// Define the screens object with steps and associated content
export const screens: Screens = {
  0: {
    title: <span>How does it <span className='text-header-white'>Work</span> <span className='text-header-blue'>?</span></span>,
    description: <h1 className='text-description-white'>We make it possible in a quick and easy few steps process, takes max 5 mins</h1>,
    image: '/screenShot0.png',
    slider: '5%',
    img_layout: 'top-[8%] md:scale-[1.1] transition-all duration-1000 ease-in-out',
  },
  1: {
    title: stepTitle('1', 'text-header-white'),
    description: stepDescription('Tenant selects the property', [
      'Tenant selects flexible rent tenure & corresponding amount',
    ]),
    image: '/screenShot1.png',
    slider: '20%',
    img_layout: 'top-1/3 md:scale-[1.4] max-md:scale-[1.2] max-md:translate-y-1/4 transition-all duration-1000 ease-in-out',
    arrow: 'top-1/4 right-[80%]',
  },
  2: {
    title: stepTitle('1', 'text-header-white'),
    description: stepDescription('Tenant selects flexible rent tenure & corresponding amount', [
      'Tenant selects the property',
    ]),
    image: '/screenShot2.png',
    slider: '30%',
    img_layout: 'top-[15%] md:scale-[1.5] transition-all duration-1000 ease-in-out',
    arrow: 'top-[38%] right-[48%]',
    arrow_additional: { transform: 'rotateX(180deg)' },
  },
  3: {
    title: stepTitle('2', 'text-header-white'),
    description: stepDescription('Tenant selects the property', [
      'Zero security deposit move-in',
      'Reduced rent offer',
      '3 months salary cover',
    ], true),
    image: '/screenShot3.png',
    slider: '60%',
    img_layout: 'md:-translate-y-[21%] md:scale-[1.5] transition-all duration-1000 ease-in-out',
    arrow: 'top-[40%] right-[70%] md-scale-[1.1]',
    arrow_additional: { transform: 'rotateX(180deg) rotateZ(-40deg)' },
  },
  4: {
    title: stepTitle('3', 'text-header-white'),
    description: <h1 className='text-description-heading'>Smooth Onboarding for the Tenant begins</h1>,
    image: '/screenShot4.png',
    slider: '80%',
    img_layout: '-top-[4%] md:scale-[1.1] transition-all duration-1000 ease-in-out',
    arrow: 'top-[52%] right-[70%]',
    arrow_additional: { transform: 'rotateX(180deg) rotateZ(-40deg)' },
  },
  5: {
    title: stepTitle('4', 'text-header-white'),
    description: stepDescription('Tenant gets approved to move-in', [
      'Gets Zero-security deposit approval',
      'Zero cost EMI = Monthly Rent',
    ], true),
    image: '/screenShot5.png',
    slider: '100%',
    img_layout: '-top-[1%] md:scale-[1.1] transition-all duration-1000 ease-in-out',
    arrow: 'top-[58%] right-[73%]',
    arrow_additional: { transform: 'rotateX(180deg) rotateZ(-40deg)' },
  },
};

const SliderComponent: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide
  const totalSlides = Object.keys(screens).length; // Total number of slides

  // Function to handle the next slide, wraps around to the beginning
  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  // Function to handle the previous slide, wraps around to the end
  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  // Auto slide effect that changes the slide every 5 seconds
  useEffect(() => {
    const autoSlide = setInterval(handleNextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(autoSlide); // Cleanup interval on component unmount
  }, []);

  const currentScreen = screens[currentSlide]; // Get current screen details

  return (
    <div className="relative">
      {/* Display the current screen's title, description, and image */}
      <div className="text-center transition-opacity duration-1000 ease-in-out">
        <div className="title">{currentScreen.title}</div>
        <div className="description">{currentScreen.description}</div>
        
        {/* Optimized image loading with next/image */}
        <Image 
          src={currentScreen.image} 
          alt={`Slide ${currentSlide}`} 
          className={`absolute ${currentScreen.img_layout}`}
          layout="fill"
          objectFit="contain" 
          quality={75} 
          priority 
        />
      </div>

      {/* Progress bar indicating the slider progress */}
      <div className="slider-container relative w-full bg-gray-200 h-2 mt-4">
        <div
          className="slider-progress absolute top-0 left-0 h-full bg-blue-500"
          style={{ width: currentScreen.slider }} // Dynamically adjust width based on the current screen
        ></div>
      </div>

      {/* Navigation buttons for previous and next slide */}
      <button onClick={handlePrevSlide} className="absolute left-0">Previous</button>
      <button onClick={handleNextSlide} className="absolute right-0">Next</button>

      {/* Conditionally render the arrow if it exists for the current screen */}
      {currentScreen.arrow && (
        <div
          className={`absolute ${currentScreen.arrow} transition-transform`}
          style={currentScreen.arrow_additional || {}}
        >
          <span>➡️</span>
        </div>
      )}
    </div>
  );
};

export default SliderComponent;
