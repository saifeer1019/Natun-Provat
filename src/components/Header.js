"use client";
import Image from "next/image";
import { Home, Globe, MapPin, Building, Trophy, Film, Users, Flag, Facebook, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const router = useRouter();

  const banglaDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navigationItems = [
    { name: 'জাতীয়', link: '/search?category=জাতীয়', icon: Flag },
    { name: 'আন্তর্জাতিক', link: '/search?category=আন্তর্জাতিক', icon: Globe },
    { name: 'রাজশাহী', link: '/search?category=রাজশাহী', icon: MapPin },
    { name: 'রাজধানী', link: '/search?category=রাজধানী', icon: Building },
    { name: 'খেলাধুলা', link: '/search?category=খেলাধুলা', icon: Trophy },
    { name: 'বিনোদন', link: '/search?category=বিনোদন', icon: Film },
    { name: 'রাজনীতি', link: '/search?category=রাজনীতি', icon: Users },
  ];
  
  const socialItems = [
    { name: 'Facebook', link: 'https://www.facebook.com/dailynatunprovat', icon: Facebook },
  ];

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear input after search
    }
  };

  return (
    <header className="bg-white shadow-md py-2">
      {/* Mobile Header */}
      <div className="flex justify-between items-center px-4 md:hidden">
        <a href="/" className="flex justify-start">
          <Image src="/logo.jpg" width={120} height={30} alt="Logo" className="w-auto h-auto object-cover" />
        </a>

        <button className="text-gray-700 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 py-2 bg-gray-50">
          <div className="flex flex-col space-y-3">
            {navigationItems.map((item, index) => (
              <a key={index} href={item.link} className="flex items-center gap-1 hover:text-red-600 text-sm" onClick={() => setMenuOpen(false)}>
                {item.icon && <item.icon size={16} />}
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-200">
            <span className="text-gray-600 text-xs">{banglaDate}</span>
            <div className="flex gap-4">
              {socialItems.map((item, index) => (
                <a key={index} href={item.link} title={item.name}>
                  {item.icon && <item.icon size={16} className="text-blue-500" />}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <nav className="hidden md:flex md:flex-row md:justify-between md:items-end md:px-4 lg:px-8">
        {/* Logo */}
        <a href="/" className="md:w-1/4 lg:w-1/5 flex justify-start">
          <Image src="/logo.jpg" width={150} height={40} alt="Logo" className="w-auto h-auto object-cover" />
        </a>

        {/* Navigation with Icons */}
        <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-6 md:w-2/3 lg:w-3/5 justify-center">
          {navigationItems.map((item, index) => (
            <a key={index} href={item.link} className="flex items-center gap-1 hover:text-red-600 text-sm md:text-base font-bold">
              {item.icon && <item.icon size={16} />}
              {item.name}
            </a>
          ))}
        </div>

        {/* Search & Social Icons */}
        <div className="md:w-1/4 lg:w-1/5 flex justify-end items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="অনুসন্ধান করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-32 md:w-48 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
              <Search size={16} />
            </button>
          </form>

          {/* Date */}
          <span className="text-gray-600 text-xs md:text-sm font-bold hidden md:inline">{banglaDate}</span>

          {/* Social Icons */}
          <div className="flex gap-3">
            {socialItems.map((item, index) => (
              <a key={index} href={item.link} title={item.name}>
                {item.icon && <item.icon size={18} className="text-blue-500" />}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
