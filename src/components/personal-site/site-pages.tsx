'use client';

import Link from 'next/link';

import { PageHead, PostList, ProjectCard } from '@/components/personal-site/site-content';
import { SiteShell, useSiteLanguage } from '@/components/personal-site/site-shell';

const posts = {
    en: {
        titles: [
            'Idempotency keys in payment APIs: what actually works',
            'Postgres partial indexes saved us 40% on a hot query',
            'Backfilling production data without downtime',
            'Notes on going from monolith to modular monolith',
            'Rate limiting: token bucket vs sliding window in production',
            'What I learned shipping a webhook delivery system',
            'SQL window functions I reach for every week'
        ],
        minutes: ['9 min', '6 min', '11 min', '8 min', '7 min', '10 min', '5 min']
    },
    vi: {
        titles: [
            'Khóa idempotency trong API thanh toán: điều gì thực sự hiệu quả',
            'Chỉ mục một phần của Postgres tiết kiệm 40% cho một truy vấn nóng',
            'Backfill dữ liệu production không downtime',
            'Ghi chú về việc chuyển từ monolith sang modular monolith',
            'Giới hạn tốc độ: token bucket vs sliding window trong production',
            'Bài học khi ship một hệ thống giao webhook',
            'Các hàm cửa sổ SQL tôi dùng mỗi tuần'
        ],
        minutes: ['9 phút', '6 phút', '11 phút', '8 phút', '7 phút', '10 phút', '5 phút']
    }
};

const postDetails = [
    { date: '2026-05-18', tag: 'payments' },
    { date: '2026-04-02', tag: 'postgres' },
    { date: '2026-02-21', tag: 'data' },
    { date: '2026-01-12', tag: 'architecture' },
    { date: '2025-11-30', tag: 'infra' },
    { date: '2025-10-08', tag: 'infra' },
    { date: '2025-08-14', tag: 'postgres' }
];

export const BlogPage = () => (
    <SiteShell activePath='/blog'>
        <BlogContent />
    </SiteShell>
);

const BlogContent = () => {
    const language = useSiteLanguage();
    const content = posts[language];
    const allPosts = postDetails.map((post, index) => ({
        ...post,
        href: '/post',
        title: content.titles[index],
        minutes: content.minutes[index]
    }));

    return (
        <>
            <PageHead
                title={language === 'vi' ? 'nhật ký' : 'blog'}
                lede={
                    language === 'vi'
                        ? 'Ghi chú từ production: thanh toán, Postgres và hạ tầng. Viết khi có gì đó hỏng, làm tôi bất ngờ, hoặc cả hai.'
                        : 'Notes from production: payments, Postgres, and infrastructure. Written when something broke, surprised me, or both.'
                }
            />
            <section className='section'>
                <h2 className='sec-label'>2026</h2>
                <PostList posts={allPosts.slice(0, 4)} />
            </section>
            <section className='section'>
                <h2 className='sec-label'>2025</h2>
                <PostList posts={allPosts.slice(4)} />
            </section>
        </>
    );
};

const projectCopy = {
    en: {
        title: 'projects',
        lede: 'Tools I built because I needed them. All open source, all maintained, all born from a production incident of some kind.',
        active: 'active',
        perpetual: 'perpetual',
        descriptions: [
            'CLI for tailing and filtering structured JSON logs. jq-style queries, zero config, fast enough for prod incident debugging. Reads from files, stdin, or kubectl.',
            'Postgres schema diff and documentation generator. Point it at two databases and it tells you exactly what drifted — tables, indexes, constraints, grants.',
            'Minimal static site generator — Markdown in, HTML out, nothing else. Powers this site. One binary, no themes, no plugins, builds in 40ms.',
            "Neovim, tmux, zsh, and the scripts I can't work without. Documented, idempotent install, tested on a fresh machine every few months."
        ]
    },
    vi: {
        title: 'dự án',
        lede: 'Công cụ tôi xây vì cần dùng. Tất cả mã nguồn mở, tất cả được duy trì, tất cả sinh ra từ một sự cố production nào đó.',
        active: 'đang hoạt động',
        perpetual: 'liên tục',
        descriptions: [
            'CLI để theo dõi và lọc log JSON có cấu trúc. Truy vấn kiểu jq, không cấu hình, đủ nhanh để gỡ lỗi sự cố production. Đọc từ file, stdin, hoặc kubectl.',
            'Công cụ so sánh schema và tạo tài liệu cho Postgres. Trỏ vào hai cơ sở dữ liệu — cho biết chính xác chỗ khác biệt: bảng, chỉ mục, ràng buộc, quyền.',
            'Trình tạo trang tĩnh tối giản — nhập Markdown, xuất HTML, không gì khác. Cung cấp cho trang này. Một binary, không theme, không plugin, build trong 40ms.',
            'Neovim, tmux, zsh, và những script tôi không thể thiếu. Có tài liệu, cài đặt idempotent, kiểm thử trên máy mới vài tháng một lần.'
        ]
    }
};

export const ProjectsPage = () => (
    <SiteShell activePath='/projects'>
        <ProjectsContent />
    </SiteShell>
);

const ProjectsContent = () => {
    const content = projectCopy[useSiteLanguage()];

    return (
        <>
            <PageHead title={content.title} lede={content.lede} />
            <section className='section'>
                <div className='project-grid'>
                    <ProjectCard
                        name='tailq'
                        language='Go'
                        description={content.descriptions[0]}
                        meta={['★ 1.2k', 'v0.9.3', content.active]}
                        href='/contact'
                    />
                    <ProjectCard
                        name='pgmeta'
                        language='TypeScript'
                        description={content.descriptions[1]}
                        meta={['★ 480', 'v1.2.0', content.active]}
                        href='/contact'
                    />
                    <ProjectCard
                        name='shoki'
                        language='Go'
                        description={content.descriptions[2]}
                        meta={['★ 210', 'v2.1.0', content.active]}
                        href='/contact'
                    />
                    <ProjectCard
                        name='dotfiles'
                        language='Shell'
                        description={content.descriptions[3]}
                        meta={['★ 96', content.perpetual]}
                        href='/contact'
                    />
                </div>
            </section>
        </>
    );
};

export const AboutPage = () => (
    <SiteShell activePath='/about'>
        <AboutContent />
    </SiteShell>
);

const AboutContent = () => {
    const language = useSiteLanguage();
    const vietnamese = language === 'vi';

    return (
        <>
            <PageHead title={vietnamese ? 'giới thiệu' : 'about'} />
            <section className='section'>
                <div className='prose'>
                    {vietnamese ? (
                        <>
                            <p>
                                Tôi là kỹ sư phần mềm tại <Link href='/contact'>Oddle</Link> ở Singapore, làm việc trên
                                hạ tầng thanh toán và dữ liệu đứng sau hàng chục nghìn cửa hàng nhà hàng.
                            </p>
                            <p>
                                Phần hệ thống tôi phụ trách là phần không hào nhoáng: làm cho giao dịch idempotent, giữ
                                Postgres nhanh dưới tải, chuyển dữ liệu giữa các dịch vụ mà không mất mẩu nào, và xây
                                công cụ giúp sự cố ngắn lại. Tôi tin hạ tầng tốt nhất là loại không ai để ý.
                            </p>
                            <p>
                                <span className='dim'>Trước Oddle</span> tôi có ba năm ở một startup logistics xây
                                backend tối ưu lộ trình, và trước đó tôi học khoa học máy tính ở NUS.
                            </p>
                            <p>
                                <span className='dim'>Ngoài công việc</span> tôi duy trì vài công cụ mã nguồn mở, viết ở
                                đây khoảng mỗi tháng một lần, và đang chậm rãi đọc qua mã nguồn SQLite cho vui.
                            </p>
                        </>
                    ) : (
                        <>
                            <p>
                                I&apos;m a software engineer at <Link href='/contact'>Oddle</Link> in Singapore, where I
                                work on the payments and data infrastructure behind tens of thousands of restaurant
                                storefronts.
                            </p>
                            <p>
                                My corner of the system is the unglamorous one: making charges idempotent, keeping
                                Postgres fast under load, moving data between services without losing any, and building
                                the tooling that makes incidents short. I think the best infrastructure is the kind
                                nobody notices.
                            </p>
                            <p>
                                <span className='dim'>Before Oddle</span> I spent three years at a logistics startup
                                building route-optimization backends, and before that I studied computer science at NUS.
                            </p>
                            <p>
                                <span className='dim'>Outside work</span> I maintain a few open-source tools, write here
                                roughly once a month, and am slowly working through the SQLite source code for fun.
                            </p>
                        </>
                    )}
                </div>
            </section>
            <section className='section'>
                <h2 className='sec-label'>{vietnamese ? 'công nghệ' : 'stack'}</h2>
                <DefinitionRow label={vietnamese ? 'thường dùng' : 'daily drivers'}>
                    Go · TypeScript · PostgreSQL · Kafka
                </DefinitionRow>
                <DefinitionRow label={vietnamese ? 'thoải mái' : 'comfortable'}>
                    Python · Terraform · Kubernetes · Redis
                </DefinitionRow>
                <DefinitionRow label={vietnamese ? 'công cụ' : 'tools'}>
                    {vietnamese ? 'Neovim · tmux · Linear · sổ tay giấy' : 'Neovim · tmux · Linear · a paper notebook'}
                </DefinitionRow>
            </section>
        </>
    );
};

export const ContactPage = () => (
    <SiteShell activePath='/contact'>
        <ContactContent />
    </SiteShell>
);

const ContactContent = () => {
    const vietnamese = useSiteLanguage() === 'vi';

    return (
        <>
            <PageHead
                title={vietnamese ? 'liên hệ' : 'contact'}
                lede={
                    vietnamese
                        ? 'Email là tốt nhất. Tôi trả lời trong một hai ngày — nhanh hơn nếu bạn nhắc đến Postgres.'
                        : 'Email is best. I reply within a day or two — faster if you mention Postgres.'
                }
            />
            <section className='section'>
                <DefinitionRow label='email'>
                    <a href='mailto:chris@chrispark.dev'>chris@chrispark.dev</a>
                </DefinitionRow>
                <DefinitionRow label='github'>
                    <a href='https://github.com' target='_blank' rel='noopener noreferrer'>
                        github.com/chrispark
                    </a>
                </DefinitionRow>
                <DefinitionRow label='linkedin'>
                    <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
                        linkedin.com/in/chrispark
                    </a>
                </DefinitionRow>
            </section>
            <section className='section'>
                <a className='btn primary' href='mailto:chris@chrispark.dev'>
                    $ mail chris@chrispark.dev
                </a>
            </section>
        </>
    );
};

export const ResumePage = () => (
    <SiteShell activePath='/resume'>
        <ResumeContent />
    </SiteShell>
);

const ResumeContent = () => {
    const vietnamese = useSiteLanguage() === 'vi';

    return (
        <>
            <div className='page-head'>
                <h1>{vietnamese ? 'lý lịch' : 'resume'}</h1>
                <p className='lede'>
                    {vietnamese
                        ? 'Chris Park — Kỹ sư phần mềm. Singapore. Sẵn sàng in: dùng hộp thoại in của trình duyệt để có PDF gọn gàng.'
                        : "Chris Park — Software Engineer. Singapore. Print-ready: use your browser's print dialog for a clean PDF."}
                </p>
                <p className='no-print print-action'>
                    <button className='btn primary' type='button' onClick={() => window.print()}>
                        {vietnamese ? 'in / lưu thành PDF' : 'print / save as PDF'}
                    </button>
                </p>
            </div>

            <section className='section'>
                <h2 className='sec-label'>{vietnamese ? 'kinh nghiệm' : 'experience'}</h2>
                <ResumeExperience
                    when={vietnamese ? '2023 — nay' : '2023 — now'}
                    role={vietnamese ? 'Kỹ sư Phần mềm · Oddle' : 'Software Engineer · Oddle'}
                    sub={
                        vietnamese
                            ? 'Hạ tầng thanh toán & dữ liệu, Singapore'
                            : 'Payments & data infrastructure, Singapore'
                    }
                    bullets={
                        vietnamese
                            ? [
                                  'Phụ trách dịch vụ thanh toán xử lý giao dịch, hoàn tiền và đối soát qua 4 nhà cung cấp cho ~10k nhà hàng.',
                                  'Thiết kế lớp idempotency và giao webhook; sự cố giao dịch trùng về 0 kể từ khi triển khai.',
                                  'Giảm độ trễ p99 của các truy vấn nóng nhất trên dashboard 40% qua chỉ mục một phần và tái cấu trúc truy vấn.',
                                  'Xây công cụ backfill không downtime, được mọi đội sử dụng cho di trú schema và dữ liệu.'
                              ]
                            : [
                                  'Own the payments service handling charges, refunds, and reconciliation across 4 payment providers for ~10k merchants.',
                                  'Designed the idempotency and webhook-delivery layers; duplicate-charge incidents to zero since rollout.',
                                  "Cut p99 latency of the merchant dashboard's hottest queries by 40% via partial indexes and query restructuring.",
                                  'Built the zero-downtime backfill tooling used by all teams for schema and data migrations.'
                              ]
                    }
                />
                <ResumeExperience
                    when='2020 — 2023'
                    role={vietnamese ? 'Kỹ sư Backend · Trakkr' : 'Backend Engineer · Trakkr'}
                    sub={vietnamese ? 'Startup logistics, Singapore' : 'Logistics startup, Singapore'}
                    bullets={
                        vietnamese
                            ? [
                                  'Xây backend tối ưu lộ trình phục vụ 2k tài xế mỗi ngày; giảm thời gian tính lộ trình trung bình từ 40s xuống 3s.',
                                  'Dẫn dắt việc chuyển từ một instance Postgres sang thiết lập phân vùng khi lượng giao hàng tăng 8×.',
                                  'Nhân sự hạ tầng đầu tiên; thiết lập CI/CD, observability và on-call từ đầu.'
                              ]
                            : [
                                  'Built route-optimization backend serving 2k daily drivers; reduced average route compute time from 40s to 3s.',
                                  'Led migration from a single Postgres instance to a partitioned setup as delivery volume grew 8x.',
                                  'First infra hire; set up CI/CD, observability, and on-call from scratch.'
                              ]
                    }
                />
            </section>

            <section className='section'>
                <h2 className='sec-label'>{vietnamese ? 'mã nguồn mở' : 'open source'}</h2>
                <DefinitionRow label='tailq'>
                    {vietnamese
                        ? 'CLI theo dõi log có cấu trúc bằng Go. 1.2k sao, được vài đội SRE sử dụng.'
                        : 'Structured-log tailing CLI in Go. 1.2k stars, used by several SRE teams.'}
                </DefinitionRow>
                <DefinitionRow label='pgmeta'>
                    {vietnamese
                        ? 'Công cụ so sánh schema & tạo tài liệu cho Postgres bằng TypeScript.'
                        : 'Postgres schema diff & docs generator in TypeScript.'}
                </DefinitionRow>
            </section>

            <section className='section'>
                <h2 className='sec-label'>{vietnamese ? 'học vấn' : 'education'}</h2>
                <div className='def-row'>
                    <span className='k'>2016 — 2020</span>
                    <span className='v'>
                        <strong>
                            {vietnamese
                                ? 'BComp Khoa học Máy tính · Đại học Quốc gia Singapore'
                                : 'BComp Computer Science · National University of Singapore'}
                        </strong>
                        <span className='sub'>
                            {vietnamese
                                ? 'Chuyên: hệ cơ sở dữ liệu & tính toán phân tán'
                                : 'Focus: database systems & distributed computing'}
                        </span>
                    </span>
                </div>
            </section>

            <section className='section'>
                <h2 className='sec-label'>{vietnamese ? 'kỹ năng' : 'skills'}</h2>
                <DefinitionRow label={vietnamese ? 'ngôn ngữ' : 'languages'}>Go, TypeScript, SQL, Python</DefinitionRow>
                <DefinitionRow label={vietnamese ? 'hệ thống' : 'systems'}>
                    PostgreSQL, Kafka, Redis, Kubernetes, Terraform, AWS
                </DefinitionRow>
                <DefinitionRow label={vietnamese ? 'điểm mạnh' : 'strengths'}>
                    {vietnamese
                        ? 'Hệ thống thanh toán, di trú dữ liệu, tối ưu hiệu năng, ứng phó sự cố'
                        : 'Payment systems, data migrations, performance work, incident response'}
                </DefinitionRow>
            </section>
        </>
    );
};

export const PostPage = () => (
    <SiteShell activePath='/blog'>
        <PostContent />
    </SiteShell>
);

const PostContent = () => {
    const vietnamese = useSiteLanguage() === 'vi';
    const title = vietnamese
        ? 'Khóa idempotency trong API thanh toán: điều gì thực sự hiệu quả'
        : 'Idempotency keys in payment APIs: what actually works';

    return (
        <>
            <div className='article-head'>
                <Link className='crumb' href='/blog'>
                    {vietnamese ? '← cd ~/blog' : '← cd ~/blog'}
                </Link>
                <h1>{title}</h1>
                <div className='a-meta'>
                    <span>2026-05-18</span>
                    <span className='tag'>payments</span>
                    <span>{vietnamese ? '9 phút đọc' : '9 min read'}</span>
                </div>
            </div>

            <article className='article-body'>
                <p>
                    Every payment API doc tells you to send an idempotency key. Few tell you what to do with it on the
                    other side. After two years of running a payments service that processes retries from flaky mobile
                    networks, here&apos;s the design that has held up — and the two designs that didn&apos;t.
                </p>

                <h2>The failure mode</h2>
                <p>
                    A client charges a customer. The request succeeds server-side, but the response is lost — a timeout,
                    a dropped connection, a process restart. The client retries. Without idempotency, the customer is
                    charged twice; with naive idempotency, the retry fails in confusing ways instead.
                </p>
                <p>
                    The contract you actually want is: <strong>same key, same response</strong> — byte-for-byte,
                    regardless of when the retry arrives or what state the first attempt is in.
                </p>

                <h2>Design that didn&apos;t work: check-then-insert</h2>
                <p>
                    Our first version looked up the key, and if absent, processed the charge and stored the result. The
                    race is obvious in hindsight — two concurrent retries both pass the lookup, both charge.
                </p>

                <CodeBlock filename='charges.ts' label='the racy version'>
                    <span className='tok-c'>// ✗ two concurrent requests can both reach processCharge()</span>
                    {'\n'}
                    <span className='tok-k'>const</span> existing = <span className='tok-k'>await</span> db.
                    <span className='tok-f'>findByKey</span>(idempotencyKey);{'\n'}
                    <span className='tok-k'>if</span> (existing) <span className='tok-k'>return</span>{' '}
                    existing.response;
                    {'\n\n'}
                    <span className='tok-k'>const</span> result = <span className='tok-k'>await</span>{' '}
                    <span className='tok-f'>processCharge</span>(req);{'\n'}
                    <span className='tok-k'>await</span> db.<span className='tok-f'>saveResult</span>(idempotencyKey,
                    result);
                </CodeBlock>

                <h2>What works: reserve first, atomically</h2>
                <p>
                    Insert the key <em>before</em> doing any work, and let the database arbitrate the race with a unique
                    constraint. The first request wins the insert and proceeds; everyone else either waits or gets the
                    stored response.
                </p>

                <CodeBlock filename='schema.sql' label='postgres'>
                    <span className='tok-k'>CREATE TABLE</span> idempotency_keys ({'\n'} key text{' '}
                    <span className='tok-k'>PRIMARY KEY</span>,{'\n'} status text{' '}
                    <span className='tok-k'>NOT NULL DEFAULT</span> <span className='tok-s'>&apos;pending&apos;</span>,
                    {'\n'} response jsonb,{'\n'} request_sha text <span className='tok-k'>NOT NULL</span>,{'\n'}{' '}
                    created_at timestamptz <span className='tok-k'>NOT NULL DEFAULT</span>{' '}
                    <span className='tok-f'>now</span>(),{'\n'} expires_at timestamptz{' '}
                    <span className='tok-k'>NOT NULL</span>
                    {'\n'});
                </CodeBlock>

                <CodeBlock filename='charges.ts' label='the version that survived'>
                    <span className='tok-k'>const</span> claimed = <span className='tok-k'>await</span> db.
                    <span className='tok-f'>tryInsert</span>({'{'}
                    {'\n'} key: idempotencyKey,{'\n'} request_sha: <span className='tok-f'>sha256</span>(canonicalBody),
                    {'  '}
                    <span className='tok-c'>// reject key reuse w/ different body</span>
                    {'\n'} expires_at: <span className='tok-f'>hours</span>(<span className='tok-n'>24</span>),{'\n'}
                    {'}'});
                    {'\n\n'}
                    <span className='tok-k'>if</span> (!claimed) {'{'}
                    {'\n'} <span className='tok-k'>const</span> row = <span className='tok-k'>await</span> db.
                    <span className='tok-f'>findByKey</span>(idempotencyKey);{'\n'} <span className='tok-k'>if</span>{' '}
                    (row.request_sha !== <span className='tok-f'>sha256</span>
                    (canonicalBody)) <span className='tok-k'>throw new</span> <span className='tok-f'>Conflict409</span>
                    ();{'\n'} <span className='tok-k'>if</span> (row.status ==={' '}
                    <span className='tok-s'>&apos;pending&apos;</span>) <span className='tok-k'>throw new</span>{' '}
                    <span className='tok-f'>Retry425</span>();{'  '}
                    <span className='tok-c'>// still in flight</span>
                    {'\n'} <span className='tok-k'>return</span> row.response;{'  '}
                    <span className='tok-c'>// same key, same response</span>
                    {'\n'}
                    {'}'}
                </CodeBlock>

                <p>Three details matter more than they look:</p>
                <ul>
                    <li>
                        <strong>Hash the request body.</strong> A client bug that reuses a key with a different amount
                        should be a hard 409, not a silent replay of the old charge.
                    </li>
                    <li>
                        <strong>
                            Handle the <code>pending</code> state explicitly.
                        </strong>{' '}
                        A retry that arrives while the first attempt is mid-flight should get &quot;try again
                        shortly&quot;, not a duplicate charge and not a hang.
                    </li>
                    <li>
                        <strong>Expire keys.</strong> 24 hours covers every legitimate retry policy we&apos;ve seen.
                        Unbounded key tables become a real operational problem around month six.
                    </li>
                </ul>

                <h2>What about crashes mid-charge?</h2>
                <p>
                    If the process dies after claiming the key but before storing a response, the key is stuck in{' '}
                    <code>pending</code>. We run a sweeper that re-drives rows older than the upstream provider&apos;s
                    timeout: query the provider for the charge&apos;s true state, then finalize the row either way. This
                    is the part most blog posts skip, and it&apos;s the part that pages you at 3am.
                </p>

                <blockquote>
                    Idempotency isn&apos;t a feature you add to an endpoint. It&apos;s a state machine you commit to
                    operating.
                </blockquote>

                <p>
                    The full reference implementation, including the sweeper, is on <Link href='/contact'>GitHub</Link>.
                </p>
            </article>
        </>
    );
};

const DefinitionRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className='def-row'>
        <span className='k'>{label}</span>
        <span className='v'>{children}</span>
    </div>
);

const ResumeExperience = ({
    when,
    role,
    sub,
    bullets
}: {
    when: string;
    role: string;
    sub: string;
    bullets: string[];
}) => (
    <div className='def-row'>
        <span className='k'>{when}</span>
        <span className='v'>
            <strong>{role}</strong>
            <span className='sub'>{sub}</span>
            <ul>
                {bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                ))}
            </ul>
        </span>
    </div>
);

const CodeBlock = ({ filename, label, children }: { filename: string; label: string; children: React.ReactNode }) => (
    <div className='codeblock'>
        <div className='cb-head'>
            <span>{filename}</span>
            <span>{label}</span>
        </div>
        <pre>{children}</pre>
    </div>
);
