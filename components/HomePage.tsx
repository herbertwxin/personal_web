import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'

export function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      className='min-h-screen pb-12 px-6'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='max-w-4xl mx-auto'>
        {/* Hero Section */}
        <motion.div variants={itemVariants} className='mb-8'>
          <div className='flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16'>
            {/* Left Column - Text Content and Office Hours */}
            <div className='flex-1'>
              {/* Hero Text */}
              <h1 className='text-5xl font-bold text-white tracking-tighter mb-4'>
                Herbert Xin
              </h1>

              <div className='text-2xl font-semibold text-white tracking-tight mb-2'>
                PhD Candidate in Economics
              </div>

              <div className='text-2xl font-semibold text-white tracking-tight mb-8'>
                University of Oregon
              </div>

              <p className='text-lg text-white/90 max-w-2xl mb-12 leading-normal'>
                My current research focuses on interaction between monetary and fiscal policy.
                This website also serves as a blog and repo for my personal project Model Stack,
                a directory for macroeconomics models.
              </p>

              {/* Office Hours Section */}
              <div className='mt-12'>
                <h2 className='mb-4 flex items-center gap-3 text-lg font-semibold text-white tracking-tight'>
                  <Clock className='w-5 h-5 text-white/70' />
                  Office Hours
                </h2>

                <div>
                  <div className='mb-4'>
                    <p className='text-base text-white/90 font-medium'>
                      By appointment for Fall 2025
                    </p>
                  </div>

                  <div className='flex items-start gap-3'>
                    <MapPin className='w-5 h-5 text-white/70 mt-0.5 flex-shrink-0' />
                    <div>
                      <p className='text-base text-white/90 font-medium'>Office Location</p>
                      <p className='text-sm text-white/70'>
                        Prince Lucien Campbell Hall (PLC), Room 522
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Image - Right Side */}
            <div className='flex-shrink-0 w-full lg:w-[24rem] lg:min-w-[24rem]'>
              <div className='relative flex justify-center h-full'>
                <img
                  src='/downloadable/profile.jpeg'
                  alt='Herbert Xin Profile'
                  className='w-full h-full rounded-lg object-cover border-4 border-white/10'
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
