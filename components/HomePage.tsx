import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { 
  AcademicList,
  AcademicSectionHeader,
  AcademicInlineMetadata
} from './ui/academic-list'

import {
  ArrowRight,
  MapPin,
  Clock,
  BookOpen,
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

  const selectedPublications = [
    {
      title: 'Dynamic Equilibrium Models in Modern Macroeconomics',
      journal: 'Journal of Economic Theory',
      year: '2024',
      citations: 12,
      type: 'Research',
    },
    {
      title: 'Stochastic Growth Models: Theory and Applications',
      journal: 'Economic Review',
      year: '2023',
      citations: 28,
      type: 'Research',
    },
    {
      title: 'Monetary Policy in New Keynesian Framework',
      journal: 'Macroeconomic Dynamics',
      year: '2023',
      citations: 35,
      type: 'Policy',
    },
  ]

  return (
    <motion.div
      className='min-h-screen pb-12 px-6'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='max-w-6xl mx-auto'>
        {/* Hero Section */}
        <motion.div variants={itemVariants} className='mb-16'>
          <div className='flex flex-col lg:flex-row items-start gap-12 lg:gap-16'>
            {/* Text Content - Left Side */}
            <div className='flex-1'>
              <motion.h1 
                className='text-[2.5rem] leading-tight font-normal text-black mb-4'
                style={{ fontSize: 'var(--academic-font-size-page-title)', fontWeight: 'var(--academic-font-weight-page-title)' }}
              >
                Dr. Academic Researcher
              </motion.h1>
              
              <motion.div
                className='text-[1.75rem] font-medium text-black mb-6'
                style={{ fontSize: 'var(--academic-font-size-section-header)', fontWeight: 'var(--academic-font-weight-section-header)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Professor of Economics
              </motion.div>

              <motion.p 
                className='text-lg text-black max-w-2xl mb-8 leading-relaxed'
                style={{ fontSize: 'var(--academic-font-size-body)', lineHeight: 'var(--academic-line-height-relaxed)' }}
              >
                Advancing the frontiers of macroeconomic theory through
                mathematical modeling, empirical analysis, and policy research.
                Specializing in dynamic equilibrium models and their
                applications to modern economic challenges.
              </motion.p>

              <motion.div className='flex flex-col sm:flex-row gap-3'>
                <Button
                  size='lg'
                  className='bg-[var(--academic-text-accent)] hover:bg-[#5a4fcf] text-white border-0'
                >
                  <BookOpen className='w-4 h-4 mr-2' />
                  View Publications
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='border-[var(--academic-border-subtle)] text-[var(--academic-text-accent)] hover:bg-[var(--academic-background-subtle)]'
                >
                  Download CV
                  <ArrowRight className='w-4 h-4 ml-2' />
                </Button>
              </motion.div>
            </div>

            {/* Profile Image - Right Side */}
            <div className='lg:w-80 flex-shrink-0'>
              <div className='relative'>
                <div className='w-72 h-72 lg:w-80 lg:h-80 rounded-lg bg-gray-100 flex items-center justify-center border border-[var(--academic-border-subtle)]'>
                  <div className='text-gray-400 text-center'>
                    <div className='w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-full'></div>
                    <p className='text-sm'>Profile Photo</p>
                  </div>
                </div>
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

        {/* Selected Publications Section */}
        <motion.div variants={itemVariants} className='mt-12'>
          <AcademicSectionHeader 
            level={2} 
            className='mb-6'
            style={{ fontSize: 'var(--academic-font-size-section-header)', fontWeight: 'var(--academic-font-weight-section-header)' }}
          >
            Selected Publications
          </AcademicSectionHeader>

          <AcademicList className='space-y-6'>
            {selectedPublications.map((pub, index) => (
              <motion.div
                key={index}
                className='academic-list-item flex gap-3'
                whileHover={{ x: 2 }}
              >
                <div className='flex-shrink-0 w-6 text-[var(--academic-text-secondary)] text-sm font-medium'>
                  {index + 1}.
                </div>
                
                <div className='flex-1 space-y-2'>
                  <h3 
                    className='text-[var(--academic-text-primary)] leading-tight'
                    style={{ fontSize: 'var(--academic-font-size-entry-title)', fontWeight: 'var(--academic-font-weight-entry-title)' }}
                  >
                    {pub.title}
                  </h3>
                  
                  <div className='text-[var(--academic-text-secondary)]'>
                    <AcademicInlineMetadata>
                      <em>{pub.journal}</em>, {pub.year} • {pub.citations} citations
                    </AcademicInlineMetadata>
                  </div>
                  
                  <div className='flex items-center'>
                    <span className='inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium'>
                      {pub.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AcademicList>

          <div className='mt-6'>
            <Button
              variant='outline'
              className='border-[var(--academic-text-accent)] text-[var(--academic-text-accent)] hover:bg-[var(--academic-background-subtle)]'
            >
              View All Publications
              <ArrowRight className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
