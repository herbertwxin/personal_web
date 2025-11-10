import { motion } from 'framer-motion'
import {
  AcademicSectionHeader
} from './ui/academic-list'

import {
  MapPin,
  Clock,
} from 'lucide-react'

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
        <motion.div variants={itemVariants} className='mb-16'>
          <div className='flex flex-col lg:flex-row items-start gap-12 lg:gap-16'>
            {/* Left Column - Text Content and Office Hours */}
            <div className='flex-1'>
              {/* Hero Text */}
              <h1
                className='text-[2.5rem] leading-tight font-normal text-white mb-4'
                style={{ fontSize: 'var(--academic-font-size-page-title)', fontWeight: 'var(--academic-font-weight-page-title)' }}
              >
                Herbert Xin
              </h1>

              <div
                className='text-[1.75rem] font-medium text-white mb-1'
                style={{ fontSize: 'var(--academic-font-size-section-header)', fontWeight: 'var(--academic-font-weight-section-header)' }}
              >
                PhD Candidate in Economics
              </div>

              <div
                className='text-[1.75rem] font-medium text-white mb-6'
                style={{ fontSize: 'var(--academic-font-size-section-header)', fontWeight: 'var(--academic-font-weight-section-header)' }}
              >
                University of Oregon
              </div>

              <p
                className='text-lg text-white/80 max-w-2xl mb-8 leading-relaxed'
                style={{ fontSize: 'var(--academic-font-size-body)', lineHeight: 'var(--academic-line-height-relaxed)' }}
              >
                My current research focuses on interaction between monetary and fiscal policy.
                This website also serves as a blog and repo for my personal project Model Stack,
                a directory for macroeconomics models.
              </p>

              {/* Office Hours Section - Now under hero text */}
              <div className='mt-12'>
                <AcademicSectionHeader
                  level={2}
                  className='mb-4 flex items-center gap-2'
                  style={{ fontSize: 'var(--academic-font-size-body)', fontWeight: 'var(--academic-font-weight-section-header)' }}
                >
                  <Clock className='w-4 h-4 text-[var(--academic-text-accent)]' />
                  Office Hours
                </AcademicSectionHeader>

                <div>
                  <div className='mb-3'>
                    <p className='text-base text-white font-medium' style={{ fontSize: '0.95rem' }}>
                      By appointment for Fall 2025
                    </p>
                  </div>

                  <div className='flex items-start gap-3'>
                    <MapPin className='w-4 h-4 text-white/70 mt-0.5 flex-shrink-0' />
                    <div>
                      <p className='text-base text-white font-medium' style={{ fontSize: '0.95rem' }}>Office Location</p>
                      <p className='text-sm text-white/70' style={{ fontSize: '0.875rem' }}>Prince Lucien Campbell Hall (PLC), Room 522</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Image - Right Side */}
            <div className='flex-shrink-0 w-full lg:w-[24rem] lg:min-w-[24rem]'>
              <div className='relative flex justify-center'>
                <img
                  src='/downloadable/profile.jpeg'
                  alt='Herbert Xin Profile'
                  className='w-full h-auto rounded-lg object-cover'
                  style={{ maxWidth: '24rem' }}
                />
              </div>
            </div>
          </div>
        </motion.div>


      </div>
    </motion.div>
  )
}
