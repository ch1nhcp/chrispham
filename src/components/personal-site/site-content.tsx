import Link from 'next/link';

export type Post = {
    date: string;
    href?: string;
    minutes: string;
    tag: string;
    title: string;
};

export const PostList = ({ posts }: { posts: Post[] }) => (
    <div className='post-list'>
        {posts.map((post) => (
            <Link className='post-row' href={post.href ?? '/post'} key={`${post.date}-${post.title}`}>
                <span className='date'>{post.date}</span>
                <span className='title'>{post.title}</span>
                <span className='meta'>
                    <span className='tag'>{post.tag}</span>
                    <span>{post.minutes}</span>
                </span>
            </Link>
        ))}
    </div>
);

export const ProjectCard = ({
    name,
    language,
    description,
    meta,
    href = '/projects'
}: {
    name: string;
    language: string;
    description: string;
    meta: string[];
    href?: string;
}) => (
    <Link className='project-card' href={href}>
        <div className='p-head'>
            <span className='p-name'>{name}</span>
            <span className='p-lang'>{language}</span>
        </div>
        <p className='p-desc'>{description}</p>
        <div className='p-meta'>
            {meta.map((item) => (
                <span key={item}>{item}</span>
            ))}
        </div>
    </Link>
);

export const PageHead = ({ title, lede }: { title: string; lede?: string }) => (
    <div className='page-head'>
        <h1>{title}</h1>
        {lede && <p className='lede'>{lede}</p>}
    </div>
);
