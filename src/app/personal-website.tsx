'use client';

import Link from 'next/link';

import { PostList, ProjectCard } from '@/components/personal-site/site-content';
import { SiteShell, useSiteLanguage } from '@/components/personal-site/site-shell';

const copy = {
    en: {
        experience: 'experience',
        writing: 'recent writing',
        projects: 'selected projects',
        tagline: (
            <>
                Software engineer at <strong>Oddle</strong>. I build backend systems for restaurant commerce — payments,
                data pipelines, and the infrastructure that keeps them honest. I write about what breaks and how we fix
                it.
            </>
        ),
        locationKey: 'loc:',
        focusKey: 'focus:',
        focusValue: 'payments · infra · postgres',
        statusKey: 'status:',
        statusValue: 'writing & shipping',
        firstRole: 'Software Engineer',
        firstSummary:
            'Own the payments service handling charges, refunds, and reconciliation across 4 providers for ~10k merchants. Designed the idempotency and webhook-delivery layers.',
        secondRole: 'Backend Engineer',
        secondSummary:
            'First infra hire at a logistics startup. Built the route-optimization backend serving 2k daily drivers and led the partitioned-Postgres migration through 8× volume growth.',
        fullHistory: 'cat resume.md → full history',
        allPosts: 'cat blog/* → all posts',
        allProjects: 'ls projects/ → all projects',
        posts: [
            'Idempotency keys in payment APIs: what actually works',
            'Postgres partial indexes saved us 40% on a hot query',
            'Backfilling production data without downtime'
        ],
        minutes: ['9 min', '6 min', '11 min'],
        tailq: 'CLI for tailing and filtering structured JSON logs. jq-style queries, zero config, fast enough for prod incident debugging.',
        pgmeta: 'Postgres schema diff and documentation generator. Points at two databases, tells you exactly what drifted.'
    },
    vi: {
        experience: 'kinh nghiệm',
        writing: 'bài viết gần đây',
        projects: 'dự án tiêu biểu',
        tagline: (
            <>
                Kỹ sư phần mềm tại <strong>Oddle</strong>. Tôi xây dựng hệ thống backend cho thương mại nhà hàng — thanh
                toán, đường dẫn dữ liệu, và hạ tầng giữ cho chúng minh bạch. Tôi viết về những gì hỏng và cách chúng tôi
                sửa.
            </>
        ),
        locationKey: 'vị trí:',
        focusKey: 'chuyên môn:',
        focusValue: 'thanh toán · hạ tầng · postgres',
        statusKey: 'trạng thái:',
        statusValue: 'đang viết & ship',
        firstRole: 'Kỹ sư Phần mềm',
        firstSummary:
            'Phụ trách dịch vụ thanh toán xử lý giao dịch, hoàn tiền và đối soát qua 4 nhà cung cấp cho ~10k nhà hàng. Thiết kế các lớp idempotency và giao webhook.',
        secondRole: 'Kỹ sư Backend',
        secondSummary:
            'Nhân sự hạ tầng đầu tiên tại một startup logistics. Xây backend tối ưu lộ trình phục vụ 2k tài xế/ngày và dẫn dắt việc chuyển sang Postgres phân vùng qua 8× tăng trưởng.',
        fullHistory: 'cat resume.md → lịch sử đầy đủ',
        allPosts: 'cat blog/* → tất cả bài viết',
        allProjects: 'ls projects/ → tất cả dự án',
        posts: [
            'Khóa idempotency trong API thanh toán: điều gì thực sự hiệu quả',
            'Chỉ mục một phần của Postgres tiết kiệm 40% cho một truy vấn nóng',
            'Backfill dữ liệu production không downtime'
        ],
        minutes: ['9 phút', '6 phút', '11 phút'],
        tailq: 'CLI để theo dõi và lọc log JSON có cấu trúc. Truy vấn kiểu jq, không cấu hình, đủ nhanh để gỡ lỗi sự cố production.',
        pgmeta: 'Công cụ so sánh schema và tạo tài liệu cho Postgres. Trỏ vào hai cơ sở dữ liệu, cho biết chính xác chỗ khác biệt.'
    }
};

const PersonalWebsite = () => (
    <SiteShell>
        <HomeContent />
    </SiteShell>
);

const HomeContent = () => {
    const content = copy[useSiteLanguage()];
    const posts = [
        { date: '2026-05-18', tag: 'payments', href: '/post', title: content.posts[0], minutes: content.minutes[0] },
        { date: '2026-04-02', tag: 'postgres', href: '/post', title: content.posts[1], minutes: content.minutes[1] },
        { date: '2026-02-21', tag: 'data', href: '/post', title: content.posts[2], minutes: content.minutes[2] }
    ];

    return (
        <>
            <section className='hero'>
                <p className='prompt-line'>
                    <span className='accent'>$</span> whoami
                </p>
                <h1>
                    Chris Park
                    <span className='cursor' />
                </h1>
                <p className='tagline'>{content.tagline}</p>
                <div className='hero-meta'>
                    <span>
                        <b>{content.locationKey}</b> Singapore
                    </span>
                    <span>
                        <b>{content.focusKey}</b> {content.focusValue}
                    </span>
                    <span>
                        <b>{content.statusKey}</b> {content.statusValue}
                    </span>
                </div>
            </section>

            <section className='section'>
                <h2 className='sec-label'>{content.experience}</h2>
                <div className='xp-list'>
                    <Experience
                        when='2023 — now'
                        role={content.firstRole}
                        company='Oddle'
                        summary={content.firstSummary}
                        stack={['Go', 'TypeScript', 'PostgreSQL', 'Kafka']}
                    />
                    <Experience
                        when='2020 — 2023'
                        role={content.secondRole}
                        company='Trakkr'
                        summary={content.secondSummary}
                        stack={['Python', 'PostgreSQL', 'Redis', 'AWS']}
                    />
                </div>
                <Link className='more-link' href='/resume'>
                    {content.fullHistory}
                </Link>
            </section>

            <section className='section'>
                <h2 className='sec-label'>{content.writing}</h2>
                <PostList posts={posts} />
                <Link className='more-link' href='/blog'>
                    {content.allPosts}
                </Link>
            </section>

            <section className='section'>
                <h2 className='sec-label'>{content.projects}</h2>
                <div className='project-grid'>
                    <ProjectCard name='tailq' language='Go' description={content.tailq} meta={['★ 1.2k', 'v0.9.3']} />
                    <ProjectCard
                        name='pgmeta'
                        language='TypeScript'
                        description={content.pgmeta}
                        meta={['★ 480', 'v1.2.0']}
                    />
                </div>
                <Link className='more-link' href='/projects'>
                    {content.allProjects}
                </Link>
            </section>
        </>
    );
};

const Experience = ({
    when,
    role,
    company,
    summary,
    stack
}: {
    when: string;
    role: string;
    company: string;
    summary: string;
    stack: string[];
}) => (
    <div className='xp-row'>
        <span className='when'>{when}</span>
        <div className='what'>
            <span className='role'>
                {role} <span className='at'>@</span> <span className='co'>{company}</span>
            </span>
            <p className='summary'>{summary}</p>
            <div className='stack'>
                {stack.map((item) => (
                    <span key={item}>{item}</span>
                ))}
            </div>
        </div>
    </div>
);

export default PersonalWebsite;
