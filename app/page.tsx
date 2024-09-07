"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Importing Image from next/image for image optimization
import { screens } from './data';

interface SliderProps {
  idx: number;
}

// Function to determine slider thumb color based on index
const commonSliderThumb = (idx: number, baseClass: string) =>
  `${idx === 5 ? "bg-slider-green" : "bg-slider-blue"} ${baseClass}`;

// Mobile slider component
const MobileSlider: React.FC<SliderProps> = ({ idx }) => (
  <div className='min-h-[60px] w-full md:hidden flex-center p-2'>
    <div className='w-full max-w-[400px] bg-slider-bg h-[3px] rounded-full'>
      <div 
        className={`${commonSliderThumb(idx, "relative h-full transition-all ease-out rounded-full")}`} 
        style={{ width: screens[idx]?.slider || '0%' }} // Safe access for slider width
      >
        <div className={`${commonSliderThumb(idx, "sliderthumb -translate-y-1/2 top-1/2 right-0")}`}></div>
      </div>
    </div>
  </div>
);

// Desktop slider component
const DesktopSlider: React.FC<SliderProps> = ({ idx }) => (
  <div className='h-full w-full max-w-[300px] max-md:hidden flex-center p-2'>
    <div className='h-full max-h-[400px] bg-slider-bg w-[3px] rounded-full'>
      <div 
        className={`${commonSliderThumb(idx, "relative h-full transition-all ease-out rounded-full")}`} 
        style={{ height: screens[idx]?.slider || '0%' }} // Safe access for slider height
      >
        <div className={`${commonSliderThumb(idx, "sliderthumb -translate-x-1/2 left-1/2 bottom-0")}`}></div>
      </div>
    </div>
  </div>
);

// Content component displaying title and description
const Content: React.FC<SliderProps> = ({ idx }) => (
  <div className='flex-col-center w-full max-w-[380px] md:max-w-[422px]'>
    <div className='flex-col-start gap-y-[16px] md:gap-y-[48px] p-4 py-2 w-full'>
      <h1 className='text-header md:text-header-lg md:leading-[64px] text-header-gray font-medium max-w-[283px]'>
        {screens[idx]?.title || 'Title'}  {/* Safe access with fallback for title */}
      </h1>
      <span className='h-[2px] bg-line-blue w-[85px] rounded-full'></span>
      <div className='w-full text-description md:text-description-lg md:leading-[28px]'>
        {screens[idx]?.description || 'Description'}  {/* Safe access with fallback for description */}
      </div>
    </div>
  </div>
);

// Image and arrow component
const ImageAndArrow: React.FC<SliderProps> = ({ idx }) => (
  <div className='h-[calc(100%-206px)] w-fit md:h-full relative md:max-h-screen md:w-fit min-w-[340px] max-w-[350px] flex-shrink'>
    <Image  
      src={screens[idx]?.image || ''}  // Safe access with fallback for image src
      alt="onboarding image" 
      layout="fill"
      objectFit="contain"
      className={`h-full max-md:mx-auto md:w-full md:h-auto flex-shrink md:flex-shrink-0 md:absolute transition-all duration-300 ease-out ${screens[idx]?.img_layout || ''}`} 
    />
    {screens[idx]?.arrow && (
      <Image 
        src='/arrow.svg' 
        alt="indication arrow" 
        layout="fill"
        objectFit="contain"
        className={`max-md:hidden w-full h-auto absolute transition-all duration-300 ${screens[idx].arrow}`} 
        style={screens[idx]?.arrow_additional || {}}  // Optional inline styling for arrow
      />
    )}
  </div>
);

// Main Home component
export default function Home() {
  const [idx, setIdx] = useState(0); // State for tracking the current slide index
  const [toggle, setToggle] = useState(false); // State for toggling auto-scroll

  // Keydown listener to toggle auto-scroll on spacebar press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ' && !event.repeat) {
        setToggle(prevToggle => !prevToggle); // Toggle auto-scroll
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Clean up listener
    };
  }, []);

  const screenKeys = Object.keys(screens); // Get the keys of the screens data

  // Effect for auto-advancing the slider unless paused
  useEffect(() => {
    if (!toggle) {
      const interval = setInterval(() => {
        setIdx((prev) => (prev === screenKeys.length - 1 ? 0 : prev + 1)); // Cycle through screens
      }, 2000);
      return () => clearInterval(interval); // Clear interval on toggle or unmount
    }
  }, [toggle]);

  return (
    <section className="w-full flex-col-center md:flex-row-reverse md:items-center md:justify-center h-screen relative bg-[#1B1B1B] overflow-hidden">
      <div className="top-[-190px] left-[-400px] w-[1103px] h-[1017px] hidden md:block absolute bg-[radial-gradient(35.19%_35.19%_at_50%_50%,rgba(59,149,255,0.17)_0%,rgba(28,106,197,0)_100%)] overflow-clip"></div>
      <div className="container relative z-10 flex-col-center md:flex-row-reverse items-center justify-center h-full">
        <MobileSlider idx={idx} />
        <DesktopSlider idx={idx} />
        <div className='flex-col-center md:flex-row w-full md:w-[calc(100%-300px)] z-10 h-[calc(100%-60px)] md:h-full gap-y-5 md:gap-x-[80px] items-center justify-center'>
          <Content idx={idx} />
          <ImageAndArrow idx={idx} />
        </div>
      </div>
      {/* Pause/Play indicator */}
      <div className='text-neutral-400 hidden md:flex bg-black/20 rounded-full px-4 py-2 absolute bottom-2 left-2 items-center shadow-[#3B95FF]/70 shadow'>
        {toggle ? <span className='bg-[#3B95FF] text-white rounded-lg text-xs p-1'>Paused</span> : <span>Click <span className='bg-[#3B95FF] text-neutral-300 mx-1 text-xs p-1 rounded-sm border-b'>space</span> to Pause</span>}
      </div>
      <div className='bg-black/20 w-full h-[10%] absolute right-0 bottom-0 md:top-0 md:w-[40%] md:h-full'></div>
    </section>
  );
}
