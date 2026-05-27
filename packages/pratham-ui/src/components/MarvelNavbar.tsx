import React, { useState } from 'react';

export interface NavbarLink {
  label: string;
  href: string;
}

export interface MarvelNavbarProps {
  brandName?: string;
  logo?: React.ReactNode;
  links: NavbarLink[];
  rightElement?: React.ReactNode;
}

export const MarvelNavbar: React.FC<MarvelNavbarProps> = ({
  brandName = 'PrathamUI',
  logo,
  links,
  rightElement,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#0D0D0D]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            {logo && <span className="flex-shrink-0 flex items-center justify-center">{logo}</span>}
            <span className="font-marvel text-xl font-bold tracking-widest text-[#F5F5F5] uppercase">
              {brandName}
            </span>
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="font-marvel font-semibold text-sm tracking-wider uppercase text-[#A8A9AD] hover:text-white hover:border-b-2 hover:border-[#E62429] pb-1 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {rightElement}
          </div>

          {/* Hamburger (Mobile) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#A8A9AD] hover:text-white focus:outline-none cursor-pointer"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#141414] border-b border-white/10 px-4 pt-2 pb-4 space-y-2">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="block font-marvel font-semibold text-sm tracking-wider uppercase text-[#A8A9AD] hover:text-white py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          {rightElement && <div className="pt-2">{rightElement}</div>}
        </div>
      )}
    </nav>
  );
};
export default MarvelNavbar;
