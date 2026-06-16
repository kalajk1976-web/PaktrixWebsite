import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, FileText, Clock, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  published: boolean;
  published_at: string;
  tags?: string[];
  read_time?: number;
  meta_title?: string;
  meta_description?: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center text-brand-green font-semibold hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-[#1b5e20] font-semibold hover:underline mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            {post.author && (
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{post.author}</span>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            {post.read_time && (
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{post.read_time} min read</span>
              </div>
            )}
          </div>

          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full rounded-lg shadow-lg mb-8"
            />
          )}

          <div className="prose prose-lg max-w-none">
            {post.excerpt && (
              <div className="text-xl text-gray-700 mb-8 leading-relaxed">
                {post.excerpt}
              </div>
            )}
            <div
              className="blog-content text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <style>{`
            .blog-content h1, .blog-content h2, .blog-content h3,
            .blog-content h4, .blog-content h5, .blog-content h6 {
              font-weight: 700;
              margin-top: 1.5em;
              margin-bottom: 0.75em;
              line-height: 1.25;
              color: #111827;
            }
            .blog-content h1 { font-size: 2.25em; }
            .blog-content h2 { font-size: 1.875em; }
            .blog-content h3 { font-size: 1.5em; }
            .blog-content h4 { font-size: 1.25em; }
            .blog-content h5 { font-size: 1.125em; }
            .blog-content h6 { font-size: 1em; }
            .blog-content p {
              margin-bottom: 1em;
              line-height: 1.75;
            }
            .blog-content ul, .blog-content ol {
              margin: 1em 0;
              padding-left: 2em;
            }
            .blog-content li {
              margin-bottom: 0.5em;
            }
            .blog-content blockquote {
              border-left: 4px solid brand-green;
              padding-left: 1em;
              margin: 1.5em 0;
              font-style: italic;
              color: #4b5563;
            }
            .blog-content table {
              border-collapse: collapse;
              width: 100%;
              margin: 1.5em 0;
              overflow-x: auto;
              display: block;
            }
            .blog-content table th,
            .blog-content table td {
              border: 1px solid #e5e7eb;
              padding: 0.75em;
              text-align: left;
              min-width: 100px;
            }
            .blog-content table th {
              background-color: #f9fafb;
              font-weight: 600;
            }
            .blog-content table tbody {
              display: table;
              width: 100%;
            }
            .blog-content table thead {
              display: table;
              width: 100%;
            }
            .blog-content img {
              max-width: 100%;
              height: auto;
              border-radius: 0.5em;
              margin: 1.5em 0;
            }
            .blog-content a {
              color: brand-green;
              text-decoration: underline;
            }
            .blog-content a:hover {
              color: brand-teal;
            }
            .blog-content code {
              background-color: #f3f4f6;
              padding: 0.2em 0.4em;
              border-radius: 0.25em;
              font-size: 0.9em;
            }
            .blog-content pre {
              background-color: #1f2937;
              color: #f9fafb;
              padding: 1em;
              border-radius: 0.5em;
              overflow-x: auto;
              margin: 1.5em 0;
            }
            .blog-content pre code {
              background-color: transparent;
              padding: 0;
              color: inherit;
            }
            .blog-content strong {
              font-weight: 600;
            }
            .blog-content em {
              font-style: italic;
            }
          `}</style>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="h-5 w-5 text-gray-400" />
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-brand-green text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in Our Products?
          </h2>
          <p className="text-gray-600 mb-6">
            Discover our range of premium acetate packaging solutions
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-brand-teal transition-colors"
          >
            View Products
          </Link>
        </div>
      </section>
    </div>
  );
}
