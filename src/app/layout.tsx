import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import '@/app/globals.css';

export const metadata: Metadata = {
    title: 'Chris Park — Software Engineer',
    description: 'Software engineer building payments, infrastructure, and Postgres systems.'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html suppressHydrationWarning data-theme='light' data-accent='cyan' lang='en'>
            <body>{children}</body>
        </html>
    );
};

export default Layout;
