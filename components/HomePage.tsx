import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
} as const

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
} as const

export function HomePage() {
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
              <h1 className='font-serif text-5xl font-medium text-tx-primary tracking-tight leading-tight mb-4'
                style={{ lineHeight: '1.1' }}>
                Herbert Xin
              </h1>

              <div className='text-xl font-medium text-tx-muted tracking-tight mb-1'>
                PhD Candidate in Economics
              </div>

              <div className='text-xl font-medium text-tx-muted tracking-tight mb-8'>
                University of Oregon
              </div>

              <p className='text-lg text-tx-muted max-w-2xl mb-12 leading-relaxed'>
                My current research focuses on computational economics, monetary and fiscal policy.
                This website also serves as a blog and repo for my personal projects.
              </p>

              {/* Office Hours Section */}
              <div className='mt-12'>
                <h2 className='mb-4 flex items-center gap-3 text-base font-medium text-tx-secondary tracking-tight'>
                  <Clock className='w-4 h-4 text-tx-faint' />
                  Office Hours
                </h2>

                <div>
                  <div className='mb-4'>
                    <p className='text-base text-tx-secondary'>
                      Wednesdays 10:00-12:00 AM for Spring 2026
                    </p>
                  </div>

                  <div className='flex items-start gap-3'>
                    <MapPin className='w-4 h-4 text-tx-faint mt-0.5 flex-shrink-0' />
                    <div>
                      <p className='text-base text-tx-secondary'>Office Location</p>
                      <p className='text-sm text-tx-faint'>
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
                  className='w-full h-full rounded-xl object-cover'
                  style={{ boxShadow: 'rgba(20,20,19,0.06) 0 4px 24px, 0 0 0 1px #f0eee6' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
