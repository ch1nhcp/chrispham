import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';

export const metadata: Metadata = {
    title: 'Chris Park — Software Engineer',
    description: 'Software engineer building payments, infrastructure, and Postgres systems.'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning data-theme='light' data-accent='cyan' lang='en'>
            <body>
                <ThemeProvider attribute='class'>
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
