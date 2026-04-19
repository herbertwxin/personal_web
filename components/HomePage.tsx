import { MapPin, Clock, ExternalLink } from 'lucide-react'
import { useMemo } from 'react'
import { publications } from '../lib/publications'
import { blogPosts } from '../lib/blogPosts'

interface HomePageProps {
  isDark: boolean
  onNavigateToBlogPost: (id: number) => void
}

export function HomePage({ isDark, onNavigateToBlogPost }: HomePageProps) {
  const recentPublications = useMemo(
    () => [...publications].sort((a, b) => parseInt(b.year) - parseInt(a.year)).slice(0, 3),
    []
  )

  const recentBlogPosts = useMemo(
    () =>
      [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3),
    []
  )

  return (
    <div className='min-h-screen pb-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Hero Section */}
        <div className='mb-16'>
          <div className='flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16'>
            {/* Left Column */}
            <div className='flex-1'>
              <h1
                className='font-serif text-5xl font-medium text-tx-primary tracking-tight leading-tight mb-4'
                style={{ lineHeight: '1.1' }}
              >
                Herbert W. Xin
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

              {/* Office Hours */}
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

            {/* Profile Sketch */}
            <div className='flex-shrink-0 w-full lg:w-[21rem] lg:min-w-[21rem]'>
              <div className='relative flex justify-center h-full'>
                <img
                  src={isDark ? '/downloadable/profile.jpeg' : '/downloadable/profile-sketch.png'}
                  alt='Herbert Xin'
                  className='w-full object-contain'
                  style={isDark ? {
                    maxHeight: '26rem',
                  } : {
                    maxHeight: '26rem',
                    maskImage:
                      'radial-gradient(ellipse 88% 88% at 50% 44%, black 20%, transparent 72%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 88% 88% at 50% 44%, black 20%, transparent 72%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Publications */}
        <div className='mb-14'>
          <h2 className='font-serif text-2xl font-medium text-tx-primary mb-6 pb-2 border-b border-bd-subtle'>
            Recent Publications
          </h2>
          <ul className='space-y-5'>
            {recentPublications.map(pub => (
              <li key={pub.doi}>
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-start gap-2 hover:opacity-80 transition-opacity'
                >
                  <span className='flex-1 text-base font-medium text-tx-primary group-hover:text-ac-brand transition-colors'>
                    {pub.title}
                  </span>
                  <ExternalLink className='w-3.5 h-3.5 text-tx-faint mt-1 flex-shrink-0' />
                </a>
                <p className='text-sm text-tx-faint mt-0.5'>
                  {pub.journal} · {pub.year}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Blog Posts */}
        <div>
          <h2 className='font-serif text-2xl font-medium text-tx-primary mb-6 pb-2 border-b border-bd-subtle'>
            Recent Posts
          </h2>
          <ul className='space-y-5'>
            {recentBlogPosts.map(post => (
              <li key={post.id}>
                <button
                  onClick={() => onNavigateToBlogPost(post.id)}
                  className='group text-left w-full'
                >
                  <span className='text-base font-medium text-tx-primary group-hover:text-ac-brand transition-colors'>
                    {post.title}
                  </span>
                </button>
                <p className='text-sm text-tx-faint mt-0.5'>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  · {post.readTime}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
