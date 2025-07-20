

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const gigs = [
  { id: 1, name: "Jazz Night at The Lounge" },
  { id: 2, name: "Open Mic @ Makati" },
  { id: 3, name: "Acoustic Thursdays" },
  { id: 4, name: "Band Battle Finals" },
  { id: 5, name: "Sunset Sessions" },
];

const GigsCarousel = () => {
  return (
    
    <section className="relative w-screen min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden border-1 border-red-800 ">

    
      {/* Fading sides */}
      <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className='relative z-20 w-full px-4 sm:px-8 lg:px-16'>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold text-gray-300 text-center">Featured <span className='text-[#0FAC7D]'>Gigs</span></h2>
        <h1 className="text-2xl font-bold text-[#0FAC7D] mb-4 text-center">Discover Your Next Performance</h1>
      </div>
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
        {gigs.map((gig) => (
          <SwiperSlide key={gig.id}>
            <div className="bg-[#1a1a1a] text-gray-300 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{gig.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  );
}

export default GigsCarousel;