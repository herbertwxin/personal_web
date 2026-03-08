import { blogPosts } from '../lib/blogPosts'
import { Button } from './ui/button'
import { useMemo } from 'react'

interface BlogPageProps {
  onReadPost: (blogId: number) => void
}

export function BlogPage({ onReadPost }: BlogPageProps) {
  const sortedPosts = useMemo(() => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [])

  return (
    <div className='min-h-screen pb-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <h1 className='text-5xl font-bold text-white tracking-tighter mb-4'>
            Academic Blog
          </h1>
          <p className='text-lg text-white/70 max-w-3xl'>
            Insights, thoughts, and discussions on mathematical macroeconomics,
            economic modeling, and academic research methodologies.
          </p>
        </div>

        {/* Academic Article List */}
        <div className='space-y-8'>
          {sortedPosts.map((post) => (
            <article
              key={post.id}
              className='cursor-pointer group'
              onClick={() => onReadPost(post.id)}
            >
              <h2 className='text-2xl font-bold text-white/90 group-hover:text-white transition-colors duration-200'>
                {post.title}
              </h2>

              <div className='mt-1'>
                <span className='text-sm text-white/50'>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {' • '}
                  {post.readTime}
                  {post.tags.length > 0 && (
                    <>
                      {' • '}
                      {post.tags.join(', ')}
                    </>
                  )}
                </span>
              </div>

              <div className='mt-2'>
                <p className='text-base text-white/70 leading-relaxed'>
                  {post.excerpt}
                </p>
              </div>

              <div className='mt-2'>
                <span className='text-[#B19EEF] group-hover:underline text-sm font-medium'>
                  Read full article →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup - Academic Style */}
        <div className='mt-16 pt-8 border-t border-white/10'>
          <h3 className='text-2xl font-bold text-white mb-4'>
            Subscribe to Updates
          </h3>
          <p className='text-white/70 mb-6 max-w-2xl'>
            Receive notifications about new research articles, methodological insights,
            and developments in mathematical macroeconomics.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md'>
            <input
              type='email'
              placeholder='your.email@university.edu'
              className='flex-1 px-4 py-2 bg-black/20 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#B19EEF]'
            />
            <Button
              className='text-white bg-[#B19EEF] hover:bg-[#a18ee8] rounded-md'
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
