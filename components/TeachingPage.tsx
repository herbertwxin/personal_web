export function TeachingPage() {
  const courses = [
    {
      code: 'EC 607',
      title: 'Core Marcoeconomics',
      semester: 'Fall 2025, Winter 2025, Spring 2026',
      description:
        'Core Macroeconomics course for 1st year PhD.',
    },
    {
      code: 'EC 201',
      title: 'Principles of Microeconomics',
      semester: 'Winter 2024, Spring 2025',
      description:
        'Examines how consumers and firms make choices when facing scarce resources, and how those choices are related to government policy and market outcomes, such as prices and output.',
    },
    {
      code: 'EC 101',
      title: 'Contemporary Economic Issues',
      semester: 'Fall 2024',
      description:
        'Examines contemporary public policy using economic principles. Topics may include balanced budgets and tax reform, unemployment, health care, poverty and income redistribution, environmental policy, and international trade policy.',
    },
    {
      code: 'ECON 1002',
      title: 'Introductory Macroeconomics',
      semester: 'Semester 1, 2024',
      description:
        'Addresses the analysis of the level of employment and economic activity in the economy as a whole. The unit examines the main factors that determine the overall levels of production and employment in the economy, including the influence of government policy and international trade. This analysis enables an exploration of money, interest rates and financial markets, and a deeper examination of inflation, unemployment and economic policy.',
    },
  ]

  return (
    <div className='min-h-screen pb-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h1
            className='font-serif text-5xl font-medium text-tx-primary tracking-tight mb-4'
            style={{ lineHeight: '1.1' }}
          >
            Teaching
          </h1>
          <p className='text-lg text-tx-muted max-w-2xl mx-auto leading-relaxed'>
            Courses taught at the University of Oregon and the University of Sydney.
          </p>
        </div>

        <div className='space-y-8'>
          {courses.map((course, index) => (
            <div key={index} className='border-b border-bd-subtle pb-8 last:border-b-0'>
              <div className='flex items-baseline gap-3 mb-1'>
                <span className='text-xs font-mono text-tx-faint uppercase tracking-widest'>
                  {course.code}
                </span>
                <span className='text-xs text-tx-faint'>{course.semester}</span>
              </div>
              <h2 className='font-serif text-2xl font-medium text-tx-primary mb-3'>
                {course.title}
              </h2>
              <p className='text-base text-tx-secondary leading-relaxed'>
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
