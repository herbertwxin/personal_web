import { motion } from 'framer-motion'
import { 
  AcademicList,
  AcademicSectionHeader,
  AcademicInlineMetadata
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
            <div className='lg:w-80 flex-shrink-0'>
              <div className='relative'>
                <img 
                  src='/downloadable/profile.jpeg'
                  alt='Herbert Xin'
                  className='w-72 h-72 lg:w-80 lg:h-80 rounded-lg object-cover border border-[var(--academic-border-subtle)]'
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Office Hours Section */}
        <motion.div variants={itemVariants} className='mt-12'>
          <div className='max-w-2xl'>
            {/* Office Hours */}
            <div>
              <AcademicSectionHeader 
                level={2} 
                className='mb-4 flex items-center gap-2'
                style={{ fontSize: 'var(--academic-font-size-section-header)', fontWeight: 'var(--academic-font-weight-section-header)' }}
              >
                <Clock className='w-5 h-5 text-[var(--academic-text-accent)]' />
                Office Hours
              </AcademicSectionHeader>
              
              <AcademicList variant='compact' className='space-y-2'>
                <div className='flex justify-between py-2 border-b border-[var(--academic-border-subtle)]'>
                  <span className='text-[var(--academic-text-primary)]'>Monday</span>
                  <AcademicInlineMetadata>2:00 - 4:00 PM</AcademicInlineMetadata>
                </div>
                <div className='flex justify-between py-2 border-b border-[var(--academic-border-subtle)]'>
                  <span className='text-[var(--academic-text-primary)]'>Wednesday</span>
                  <AcademicInlineMetadata>10:00 - 12:00 PM</AcademicInlineMetadata>
                </div>
                <div className='flex justify-between py-2 border-b border-[var(--academic-border-subtle)]'>
                  <span className='text-[var(--academic-text-primary)]'>Friday</span>
                  <AcademicInlineMetadata>1:00 - 3:00 PM</AcademicInlineMetadata>
                </div>
              </AcademicList>
              
              <div className='mt-4 pt-3 border-t border-[var(--academic-border-subtle)]'>
                <div className='flex items-center gap-2 text-[var(--academic-text-secondary)]'>
                  <MapPin className='w-4 h-4' />
                  <span>Economics Building, Room 304</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


      </div>
    </motion.div>
  )
}
