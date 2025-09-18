import { blogPosts } from '../lib/blogPosts'
import { Button } from './ui/button'

interface BlogPageProps {
  onReadPost: (blogId: number) => void
}

export function BlogPage({ onReadPost }: BlogPageProps) {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className='min-h-screen pb-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <h1
            className='text-black mb-4'
            style={{
              fontSize: 'var(--academic-font-size-page-title)',
              fontWeight: 'var(--academic-font-weight-page-title)',
              lineHeight: 'var(--academic-line-height-tight)'
            }}
          >
            Academic Blog
          </h1>
          <p
            className='text-black max-w-3xl'
            style={{
              fontSize: 'var(--academic-font-size-body)',
              fontWeight: 'var(--academic-font-weight-body)',
              lineHeight: 'var(--academic-line-height-normal)',
              marginBottom: 'var(--academic-spacing-xl)'
            }}
          >
            Insights, thoughts, and discussions on mathematical macroeconomics,
            economic modeling, and academic research methodologies.
          </p>
        </div>

        {/* Academic Article List */}
        <div className='space-y-8'>
          {sortedPosts.map((post, index) => (
            <article
              key={post.id}
              className='cursor-pointer group'
              onClick={() => onReadPost(post.id)}
              style={{
                paddingLeft: 'var(--academic-hanging-indent)',
                textIndent: 'calc(-1 * var(--academic-hanging-indent))',
                marginBottom: 'var(--academic-list-item-spacing)'
              }}
            >
              {/* Entry Number and Title */}
              <div className='inline'>
                <span
                  className='text-black mr-2'
                  style={{
                    fontSize: 'var(--academic-font-size-metadata)',
                    fontWeight: 'var(--academic-font-weight-metadata)',
                    color: 'var(--academic-text-secondary)'
                  }}
                >
                  [{index + 1}]
                </span>
                <h2
                  className='inline text-black group-hover:text-[var(--academic-text-accent)] transition-colors duration-200'
                  style={{
                    fontSize: 'var(--academic-font-size-entry-title)',
                    fontWeight: 'var(--academic-font-weight-entry-title)',
                    lineHeight: 'var(--academic-line-height-normal)'
                  }}
                >
                  {post.title}
                </h2>
              </div>

              {/* Inline Metadata */}
              <div
                className='mt-1'
                style={{
                  paddingLeft: 'var(--academic-hanging-indent)',
                  textIndent: '0'
                }}
              >
                <span
                  className='text-black'
                  style={{
                    fontSize: 'var(--academic-font-size-metadata)',
                    fontWeight: 'var(--academic-font-weight-metadata)',
                    color: 'var(--academic-text-secondary)'
                  }}
                >
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

              {/* Abstract/Excerpt */}
              <div
                className='mt-2'
                style={{
                  paddingLeft: 'var(--academic-hanging-indent)',
                  textIndent: '0'
                }}
              >
                <p
                  className='text-black leading-relaxed'
                  style={{
                    fontSize: 'var(--academic-font-size-body)',
                    fontWeight: 'var(--academic-font-weight-body)',
                    lineHeight: 'var(--academic-line-height-relaxed)',
                    color: 'var(--academic-text-primary)'
                  }}
                >
                  {post.excerpt}
                </p>
              </div>

              {/* Read More Link */}
              <div
                className='mt-2'
                style={{
                  paddingLeft: 'var(--academic-hanging-indent)',
                  textIndent: '0'
                }}
              >
                <span
                  className='text-[var(--academic-text-accent)] group-hover:underline'
                  style={{
                    fontSize: 'var(--academic-font-size-metadata)',
                    fontWeight: 'var(--academic-font-weight-metadata)'
                  }}
                >
                  Read full article →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup - Academic Style */}
        <div
          className='mt-16 pt-8'
          style={{
            borderTop: '1px solid var(--academic-border-subtle)',
            marginTop: 'var(--academic-spacing-3xl)'
          }}
        >
          <h3
            className='text-black mb-4'
            style={{
              fontSize: 'var(--academic-font-size-section-header)',
              fontWeight: 'var(--academic-font-weight-section-header)',
              lineHeight: 'var(--academic-line-height-tight)'
            }}
          >
            Subscribe to Updates
          </h3>
          <p
            className='text-black mb-6 max-w-2xl'
            style={{
              fontSize: 'var(--academic-font-size-body)',
              fontWeight: 'var(--academic-font-weight-body)',
              lineHeight: 'var(--academic-line-height-normal)',
              color: 'var(--academic-text-secondary)'
            }}
          >
            Receive notifications about new research articles, methodological insights,
            and developments in mathematical macroeconomics.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md'>
            <input
              type='email'
              placeholder='your.email@university.edu'
              className='flex-1 px-4 py-2 bg-white border text-black placeholder-gray-400 focus:outline-none focus:ring-1'
              style={{
                borderColor: 'var(--academic-border-subtle)',
                borderRadius: '2px'
              }}
            />
            <Button
              className='text-white'
              style={{
                backgroundColor: 'var(--academic-text-accent)',
                borderRadius: '2px'
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
