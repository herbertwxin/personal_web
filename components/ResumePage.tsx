import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

export function ResumePage() {

  const education = [
    {
      degree: 'Ph.D. in Economics',
      institution: 'Harvard University',
      year: '2015-2020',
      details: "Dissertation: 'Dynamic Models in Macroeconomic Analysis'",
      advisor: 'Prof. Jane Smith',
    },
    {
      degree: 'M.A. in Economics',
      institution: 'Stanford University',
      year: '2013-2015',
      details: 'Concentration in Mathematical Economics',
    },
    {
      degree: 'B.A. in Economics & Mathematics',
      institution: 'MIT',
      year: '2009-2013',
      details: 'Summa Cum Laude, Phi Beta Kappa',
    },
  ]

  const experience = [
    {
      position: 'Professor of Economics',
      institution: 'University of Excellence',
      period: '2023-Present',
      details: [
        'Teaching graduate and undergraduate courses in macroeconomics',
        'Conducting research in mathematical macroeconomics and DSGE modeling',
        'Supervising PhD students and postdoctoral researchers',
        'Serving on university committees and editorial boards',
      ],
    },
    {
      position: 'Associate Professor',
      institution: 'Economic Research Institute',
      period: '2020-2023',
      details: [
        'Led research initiatives in monetary policy and financial stability',
        'Published 8 peer-reviewed articles in top economics journals',
        'Received teaching excellence award for innovative course design',
        'Collaborated with central banks on policy analysis projects',
      ],
    },
    {
      position: 'Assistant Professor',
      institution: 'State University Economics Department',
      period: '2020-2022',
      details: [
        'Taught principles of macroeconomics and advanced econometrics',
        'Developed new curriculum for mathematical economics courses',
        'Secured $150,000 in research funding from NSF',
        'Mentored undergraduate research students',
      ],
    },
  ]

  const skills = [
    {
      category: 'Programming',
      items: ['MATLAB', 'Python', 'R', 'Stata', 'Dynare'],
    },
    {
      category: 'Modeling',
      items: [
        'DSGE Models',
        'VAR Analysis',
        'Bayesian Estimation',
        'Machine Learning',
      ],
    },
    {
      category: 'Software',
      items: ['LaTeX', 'Mathematica', 'EViews', 'GAUSS', 'Git'],
    },
    {
      category: 'Languages',
      items: ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'],
    },
  ]

  const awards = [
    {
      title: 'Excellence in Teaching Award',
      institution: 'University of Excellence',
      year: '2023',
      description:
        'Recognized for innovative teaching methods in advanced macroeconomics',
    },
    {
      title: 'Best Paper Award',
      institution: 'Economic Theory Conference',
      year: '2022',
      description: 'Outstanding contribution to dynamic equilibrium theory',
    },
    {
      title: 'Young Economist Award',
      institution: 'American Economic Association',
      year: '2021',
      description:
        'Recognizing promising early-career research in macroeconomics',
    },
    {
      title: 'Dissertation Fellowship',
      institution: 'Harvard University',
      year: '2019',
      description: 'Competitive fellowship for outstanding doctoral research',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='min-h-screen pb-12 px-6'
    >
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <h1 className='text-3xl font-normal text-black mb-2'>Curriculum Vitae</h1>
          <p className='text-lg text-black mb-6'>
            Dr. Academic Researcher, Professor of Economics
          </p>
          <Button 
            variant="outline" 
            className='border-gray-300 text-gray-700 hover:bg-gray-50'
          >
            <Download className='w-4 h-4 mr-2' />
            Download PDF
          </Button>
        </div>

        {/* Education Section */}
        <section className='mb-12'>
          <h2 className='text-xl font-medium text-black mb-6 pb-2 border-b border-gray-200'>
            Education
          </h2>
          <div className='space-y-4'>
            {education.map((edu, index) => (
              <div key={index} className='flex justify-between items-start'>
                <div className='flex-1'>
                  <div className='font-medium text-black'>{edu.degree}</div>
                  <div className='text-black'>{edu.institution}</div>
                  <div className='text-sm text-gray-600 mt-1'>{edu.details}</div>
                  {edu.advisor && (
                    <div className='text-sm text-gray-600'>Advisor: {edu.advisor}</div>
                  )}
                </div>
                <div className='text-sm text-gray-600 ml-4 flex-shrink-0'>
                  {edu.year}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className='mb-12'>
          <h2 className='text-xl font-medium text-black mb-6 pb-2 border-b border-gray-200'>
            Professional Experience
          </h2>
          <div className='space-y-6'>
            {experience.map((exp, index) => (
              <div key={index}>
                <div className='flex justify-between items-start mb-2'>
                  <div className='flex-1'>
                    <div className='font-medium text-black'>{exp.position}</div>
                    <div className='text-black'>{exp.institution}</div>
                  </div>
                  <div className='text-sm text-gray-600 ml-4 flex-shrink-0'>
                    {exp.period}
                  </div>
                </div>
                <ul className='mt-2 space-y-1 text-sm text-gray-700'>
                  {exp.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className='ml-4'>
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className='mb-12'>
          <h2 className='text-xl font-medium text-black mb-6 pb-2 border-b border-gray-200'>
            Skills & Expertise
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            {skills.map((skillSet, index) => (
              <div key={index}>
                <h3 className='font-medium text-black mb-2'>
                  {skillSet.category}
                </h3>
                <div className='text-sm text-gray-700'>
                  {skillSet.items.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards Section */}
        <section className='mb-12'>
          <h2 className='text-xl font-medium text-black mb-6 pb-2 border-b border-gray-200'>
            Awards & Recognition
          </h2>
          <div className='space-y-4'>
            {awards.map((award, index) => (
              <div key={index} className='flex justify-between items-start'>
                <div className='flex-1'>
                  <div className='font-medium text-black'>{award.title}</div>
                  <div className='text-black'>{award.institution}</div>
                  <div className='text-sm text-gray-600 mt-1'>{award.description}</div>
                </div>
                <div className='text-sm text-gray-600 ml-4 flex-shrink-0'>
                  {award.year}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <div className='pt-8 border-t border-gray-200'>
          <h3 className='text-lg font-medium text-black mb-3'>Contact</h3>
          <p className='text-gray-700 mb-4 max-w-2xl'>
            Interested in collaboration, speaking engagements, or consulting
            opportunities? I'd love to hear from you.
          </p>
          <Button
            variant='outline'
            className='border-gray-300 text-gray-700 hover:bg-gray-50'
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
