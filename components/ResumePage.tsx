import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

export function ResumePage() {

  const education = [
    {
      degree: 'Doctor of Philosophy (Economics)',
      institution: 'University of Oregon, Eugene',
      year: 'Sep 2024 - Jun 2029',
      details: 'Research field in Macroeconomics',
    },
    {
      degree: 'Master of Economic Analysis',
      institution: 'The University of Sydney, Sydney',
      year: 'Jun 2022 - Dec 2023',
      details: 'Thesis on Monetary, Fiscal Policy and Disinflation',
      advisor: 'Prof. Christopher G. Gibbs',
    },
    {
      degree: 'Bachelor of Economics (Economics) & Bachelor of Science (Statistics)',
      institution: 'University of New South Wales, Sydney',
      year: 'Feb 2018 - Dec 2021',
      details: 'Distinction',
    },
  ]

  const experience = [
    {
      position: 'Graduate Employee',
      institution: 'University of Oregon',
      period: 'Sep 2024 - Present',
      details: [
        'Class taught: EC101 - Intro. Econ; EC201 - Intro. Micro',
      ],
    },
    {
      position: 'Casual Academic',
      institution: 'The University of Sydney',
      period: 'Feb 2024 - Present',
      details: [
        'Teaching tutorials for ECON1002 Introductory Macroeconomics',
        'Hold consultation hours to answer questions from students',
        'Teaching Assistant for Prof. Marinao Kulish',
      ],
    },
    {
      position: 'Research Assistant',
      institution: 'The University of Sydney',
      period: 'Dec 2023 - July 2024',
      details: [
        'Research assistant for Dr. Jordi Vidal-Robert',
        'Use STATA to clean up the raw data gathered from various sources',
        'Use R to plot relevant informations on maps',
        'Produce plots and tables working papers',
      ],
    },
    {
      position: 'Commercial Operation',
      institution: 'Albaugh LLC',
      period: 'January 2022 - April 2022',
      details: [
        'Managed order requests from the globe and prepared documentations for customs and transportation',
        'Managed order forecast and sent purchasing request to central planning',
        'Analyzed the flaws in current order processing system',
        'Streamlined the order fulfillment process by reducing process steps by 30%',
      ],
    },
    {
      position: 'Industry Project Consultant',
      institution: 'Accenture Australia',
      period: 'September 2019 - November 2019',
      details: [
        'Winner of Industry Consulting Project Pitch Fest 2019',
        'Given the requirement of the current client of Accenture in the telecommunication industry, helped the client to find a new business model to cater disruptive technologies',
        'Conducted broad background researches on the telecommunication industry and built a smart MU-MIMO antenna system',
        'Analyzed and predicted the potential financial impact of the solution by utilizing data collected during researches',
        'Demonstrated great problem solving, data analysis, research, and communication skills during the project',
      ],
    },
  ]

  const skills = [
    {
      category: 'Programming Languages',
      items: ['R', 'Dynare', 'MATLAB', 'STATA', 'Python', 'Julia', 'LaTeX', 'Mathematica', 'Linux', 'Markdown', 'Fortran'],
    },
    {
      category: 'Languages',
      items: ['English', 'Chinese', 'Japanese'],
    },
  ]

  const projects = [
    {
      title: 'Macromim',
      description: 'Creating animated introductory macroeconomics courses with animation engine Manim (The engine used by 3B1B)',
      details: [
        'https://www.youtube.com/channel/UC-yDi0dCtK-pceROXmp5pyg',
        'The goal is to give students an intuitive way to understand macroeconomics with a set of animations showing the moving of lines and equilibriums',
        'Written in Python and LaTeX',
      ],
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
            Wei (Herbert) Xin
          </p>
          <div className='text-sm text-gray-600 mb-6 space-y-1'>
            <div>📧 hxin@uoregon.edu</div>
            <div>🔗 <a href="https://www.linkedin.com/in/herbert-xin-24170aa3/" className="text-blue-600 hover:underline">LinkedIn Profile</a></div>
          </div>
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



        {/* Projects Section */}
        <section className='mb-12'>
          <h2 className='text-xl font-medium text-black mb-6 pb-2 border-b border-gray-200'>
            Personal Projects
          </h2>
          <div className='space-y-6'>
            {projects.map((project, index) => (
              <div key={index}>
                <div className='flex justify-between items-start mb-2'>
                  <div className='flex-1'>
                    <div className='font-medium text-black'>{project.title}</div>
                    <div className='text-black'>{project.description}</div>
                  </div>
                </div>
                <ul className='mt-2 space-y-1 text-sm text-gray-700'>
                  {project.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className='ml-4'>
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>



        {/* Contact CTA */}
        <div className='pt-8 border-t border-gray-200'>
          <h3 className='text-lg font-medium text-black mb-3'>Contact</h3>
          <p className='text-gray-700 mb-4 max-w-2xl'>
            Interested in collaboration, research opportunities, or academic discussions? 
            I'd love to hear from you.
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
