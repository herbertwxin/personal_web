import { blogPosts } from '../lib/blogPosts'
import { Button } from './ui/button'
import { useMemo, useState } from 'react'

interface BlogPageProps {
  onReadPost: (blogId: number) => void
}

export function BlogPage({ onReadPost }: BlogPageProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const sortedPosts = useMemo(
    () =>
      [...blogPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  )

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags).sort((a, b) => a.localeCompare(b))
  }, [])

  // OR filtering: no tags selected → show all; otherwise show any post that
  // shares at least one tag with the selection.
  const visiblePosts = useMemo(() => {
    if (selectedTags.length === 0) {return sortedPosts}
    return sortedPosts.filter(post =>
      post.tags.some(tag => selectedTags.includes(tag))
    )
  }, [sortedPosts, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className='min-h-screen pb-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <h1
            className='font-serif text-5xl font-medium text-tx-primary tracking-tight mb-4'
            style={{ lineHeight: '1.1' }}
          >
            Blog
          </h1>
          <p className='text-lg text-tx-muted max-w-3xl leading-relaxed'>
            Insights, thoughts, and discussions on mathematical macroeconomics,
            economic modeling, and academic research methodologies.
          </p>
        </div>

        {/* Tag Filter */}
        <div className='mb-10 flex flex-wrap items-center gap-2'>
          <button
            type='button'
            onClick={() => setSelectedTags([])}
            aria-pressed={selectedTags.length === 0}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-200 ${
              selectedTags.length === 0
                ? 'border-ac-brand bg-ac-brand text-ac-fg'
                : 'border-bd-strong text-tx-muted hover:border-ac-brand hover:text-tx-primary'
            }`}
          >
            All
          </button>
          {allTags.map(tag => {
            const active = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                type='button'
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? 'border-ac-brand bg-ac-brand text-ac-fg'
                    : 'border-bd-strong text-tx-muted hover:border-ac-brand hover:text-tx-primary'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>

        {/* Academic Article List */}
        <div className='space-y-8'>
          {visiblePosts.length === 0 && (
            <p className='text-tx-muted'>No posts match the selected tags.</p>
          )}
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              className='cursor-pointer group border-b border-bd-subtle pb-8 last:border-b-0'
              onClick={() => onReadPost(post.id)}
            >
              <h2 className='text-2xl font-serif font-medium text-tx-primary group-hover:text-ac-brand transition-colors duration-200' style={{ lineHeight: '1.2' }}>
                {post.title}
              </h2>

              <div className='mt-2'>
                <span className='text-sm text-tx-faint'>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {' · '}
                  {post.readTime}
                  {post.tags.length > 0 && (
                    <>
                      {' · '}
                      {post.tags.join(', ')}
                    </>
                  )}
                </span>
              </div>

              <div className='mt-3'>
                <p className='text-base text-tx-muted leading-relaxed'>
                  {post.excerpt}
                </p>
              </div>

              <div className='mt-3'>
                <span className='text-ac-brand group-hover:underline text-sm font-medium'>
                  Read full article →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className='mt-16 pt-8 border-t border-bd-subtle'>
          <h3 className='font-serif text-2xl font-medium text-tx-primary mb-4'>
            Subscribe to Updates
          </h3>
          <p className='text-tx-muted mb-6 max-w-2xl leading-relaxed'>
            Receive notifications about new research articles, methodological insights,
            and developments in mathematical macroeconomics.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md'>
            <input
              type='email'
              placeholder='your.email@university.edu'
              className='flex-1 px-4 py-2 bg-sf-raised border border-bd-strong rounded-lg text-tx-primary placeholder-tx-faint focus:outline-none focus:ring-2 focus:ring-ac-brand focus:border-ac-brand'
            />
            <Button
              className='text-ac-fg bg-ac-brand hover:bg-ac-hover rounded-lg'
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
