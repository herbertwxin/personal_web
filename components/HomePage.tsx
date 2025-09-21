import { motion } from 'framer-motion'
import {
  AcademicSectionHeader
} from './ui/academic-list'

import {
  MapPin,
  Clock,
} from 'lucide-react'
import Lanyard from './lanyard/Lanyard'

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
            {/* Text Content - Left Side */}
            <div className='flex-1'>
              <motion.h1 
                className='text-[2.5rem] leading-tight font-normal text-black mb-4'
                style={{ fontSize: 'var(--academic-font-size-page-title)', fontWeight: 'var(--academic-font-weight-page-title)' }}
              >
                Herbert Xin
              </motion.h1>
              
              <motion.div
                className='text-[1.75rem] font-medium text-black mb-6'
                style={{ fontSize: 'var(--academic-font-size-section-header)', fontWeight: 'var(--academic-font-weight-section-header)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                PhD Candidate in Economics
              </motion.div>

              <motion.div
                className='text-lg font-medium text-black mb-6'
                style={{ fontSize: 'var(--academic-font-size-body)' }}
              >
                University of Oregon
              </motion.div>

              <motion.p 
                className='text-lg text-black max-w-2xl mb-8 leading-relaxed'
                style={{ fontSize: 'var(--academic-font-size-body)', lineHeight: 'var(--academic-line-height-relaxed)' }}
              >
                My current research focuses on interaction between monetary and fiscal policy. 
                This website also serves as a blog and repo for my personal project Model Stack, 
                a directory for macroeconomics models.
              </motion.p>


            </div>

            {/* Profile Image - Right Side */}
            <div className='flex-shrink-0 w-full lg:w-[24rem] lg:min-w-[24rem]'>
              <div className='relative flex justify-center'>
                <Lanyard position={[0, 0, 9.5]} gravity={[0, -40, 0]} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Office Hours Section */}
        <motion.div variants={itemVariants} className='mt-12'>
          <div className='max-w-2xl'>
            <AcademicSectionHeader
              level={2}
              className='mb-6 flex items-center gap-2'
              style={{ fontSize: 'var(--academic-font-size-section-header)', fontWeight: 'var(--academic-font-weight-section-header)' }}
            >
              <Clock className='w-5 h-5 text-[var(--academic-text-accent)]' />
              Office Hours
            </AcademicSectionHeader>

            <div className='bg-gray-50/80 rounded-lg p-6 border border-gray-100'>
              <div className='mb-4'>
                <p className='text-lg text-black font-medium mb-2' style={{ fontSize: 'var(--academic-font-size-body)' }}>
                  TBD for Fall 2025
                </p>
                <p className='text-gray-600 text-sm'>
                  Office hours will be announced at the beginning of the semester.
                </p>
              </div>

              <div className='pt-4 border-t border-gray-200'>
                <div className='flex items-start gap-3'>
                  <MapPin className='w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0' />
                  <div>
                    <p className='text-gray-800 font-medium'>Office Location</p>
                    <p className='text-gray-600'>Prince Lucien Campbell Hall (PLC)</p>
                    <p className='text-gray-600'>Room 522</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


      </div>
    </motion.div>
  )
}
