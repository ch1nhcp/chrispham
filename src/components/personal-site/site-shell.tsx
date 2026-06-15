'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';

export type Language = 'en' | 'vi';
type Theme = 'dark' | 'light';

const navItems = [
    { label: '~/blog', href: '/blog' },
    { label: '~/projects', href: '/projects' },
    { label: '~/about', href: '/about' },
    { label: '~/resume', href: '/resume' },
    { label: '~/contact', href: '/contact' }
];

const LanguageContext = createContext<Language>('en');

export const useSiteLanguage = () => useContext(LanguageContext);

export const SiteShell = ({ children, activePath }: { children: React.ReactNode; activePath?: string }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [language, setLanguage] = useState<Language>('en');
    const [languageOpen, setLanguageOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const languageMenu = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('cp-theme') as Theme | null;
        const savedLanguage = localStorage.getItem('cp-lang') as Language | null;

        if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme);
        if (savedLanguage === 'en' || savedLanguage === 'vi') setLanguage(savedLanguage);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-accent', 'cyan');
    }, [theme]);

    useEffect(() => {
        const closeMenu = (event: MouseEvent) => {
            if (!languageMenu.current?.contains(event.target as Node)) setLanguageOpen(false);
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setLanguageOpen(false);
        };

        document.addEventListener('click', closeMenu);
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('click', closeMenu);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        localStorage.setItem('cp-theme', nextTheme);
    };

    const selectLanguage = (nextLanguage: Language) => {
        setLanguage(nextLanguage);
        setLanguageOpen(false);
        localStorage.setItem('cp-lang', nextLanguage);
    };

    return (
        <LanguageContext.Provider value={language}>
            <div className='personal-site' data-theme={theme} data-accent='cyan'>
                <div className='shell'>
                    <header className={clsx('site-head', navOpen && 'nav-open')}>
                        <Link className='brand' href='/'>
                            chris<span className='dim'>@</span>park<span className='accent'>:~$</span>
                        </Link>

                        <div className='head-actions'>
                            <button
                                className='head-btn theme-btn'
                                type='button'
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                                title='Toggle theme'
                                onClick={toggleTheme}>
                                {theme === 'dark' ? <Moon aria-hidden='true' /> : <Sun aria-hidden='true' />}
                            </button>

                            <div className={clsx('lang-dd', languageOpen && 'open')} ref={languageMenu}>
                                <button
                                    className='head-btn lang-dd-btn'
                                    type='button'
                                    aria-haspopup='menu'
                                    aria-expanded={languageOpen}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setLanguageOpen((open) => !open);
                                    }}>
                                    <span>{language.toUpperCase()}</span>
                                    <span className='hb-caret' aria-hidden='true'>
                                        ▾
                                    </span>
                                </button>
                                <ul className='lang-dd-menu' role='menu'>
                                    {(['en', 'vi'] as const).map((item) => (
                                        <li key={item}>
                                            <button
                                                className={language === item ? 'active' : ''}
                                                type='button'
                                                role='menuitem'
                                                onClick={() => selectLanguage(item)}>
                                                {item.toUpperCase()}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className='head-btn nav-toggle'
                                type='button'
                                aria-expanded={navOpen}
                                aria-controls='site-nav'
                                onClick={() => setNavOpen((open) => !open)}>
                                {navOpen ? 'close' : 'menu'}
                            </button>
                        </div>

                        <nav className='site-nav' id='site-nav'>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={activePath === item.href ? 'page' : undefined}
                                    onClick={() => setNavOpen(false)}>
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </header>

                    <main>{children}</main>

                    <footer className='site-foot'>
                        <span>© 2026 Chris Park</span>
                        <div className='links'>
                            <a href='mailto:chris@chrispark.dev'>email</a>
                            <a href='https://github.com' target='_blank' rel='noopener noreferrer'>
                                github
                            </a>
                            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
                                linkedin
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </LanguageContext.Provider>
    );
};
