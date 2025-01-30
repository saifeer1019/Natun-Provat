import Image from "next/image"
export default function Header() {
    return (
      <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row justify-between items-center">
        <a href="/">
          <Image
          src='/logo.jpg'
          width={400}
          height={20}
          alt='Logo'
          className="text-2xl font-bold text-red-600 mb-4 md:mb-0"
          />
        </a>
        <div className="flex space-x-4">
          <a href="/" className="hover:text-red-600">Home</a>
          <a href="#national" className="hover:text-red-600">National</a>
          <a href="#rajshahi" className="hover:text-red-600">Rajshahi</a>
          <a href="/admin" className="hover:text-red-600">Admin</a>
        </div>
        </div>
      </nav>
      </header>
    )
  }