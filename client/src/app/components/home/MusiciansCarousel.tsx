'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';

const musicians = [
  { id: 1, name: 'John Doe', instrument: 'Guitar' },
  { id: 2, name: 'Jane Smith', instrument: 'Drums' },
  { id: 3, name: 'Alex Ray', instrument: 'Keyboard' },
  { id: 4, name: 'Carlos Mendoza', instrument: 'Bass' },
  { id: 5, name: 'Emily Tan', instrument: 'Violin' },
  { id: 6, name: 'Marcus Lee', instrument: 'Saxophone' },
  { id: 7, name: 'Fatima Gomez', instrument: 'Vocals' },
  { id: 8, name: 'Daniel Kim', instrument: 'Trumpet' },
  { id: 9, name: 'Aisha Mohammed', instrument: 'Cello' },
  { id: 10, name: 'Liam Carter', instrument: 'Electric Guitar' },
  { id: 11, name: 'Sofia Rivas', instrument: 'Piano' },
  { id: 12, name: 'Haruto Sato', instrument: 'Percussion' },
  { id: 13, name: 'Maya Singh', instrument: 'Flute' },
  { id: 14, name: 'Noah Davis', instrument: 'Harmonica' },
  { id: 15, name: 'Zara Khan', instrument: 'Synthesizer' }
];

const MusiciansCarousel = () => {
  return (
    <section className="relative w-screen min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* Fading edges */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured <span className='text-[#0FAC7D]'>Musicians</span></h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1, disableOnInteraction: false }}
          loop={true}
          speed={3000}
          grabCursor={true}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {musicians.map((musician) => (
            <SwiperSlide key={musician.id}>
              <div className="bg-[#1e1e1e] text-white p-6 rounded-xl shadow-md min-w-[220px]">
                <h3 className="text-lg font-semibold">{musician.name}</h3>
                <p>{musician.instrument}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default MusiciansCarousel;