const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <h2 className="text-xl font-bold">নতুন প্রভাত</h2>
          <p className="text-sm">নির্ভীক সত্যের দৈনিক প্রতিশ্রুতি</p>
          <a
          href="https://admin.natunprovat.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Admin
        </a>
        </div>
        <div>
          <p className="text-sm">📍 ২য় তলা, রেলস্টেশন মার্কেট, রাজশাহী</p>
          <p className="text-sm">📞 01921512040</p>
        </div>
        <div>
          <a
            href="https://www.facebook.com/dailynatunprovat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            আমাদের ফেসবুক পেজ →
          </a>
     
        </div>
        
      </div>
      <div className="text-center text-sm mt-4 border-t border-gray-700 pt-2">
        &copy; {new Date().getFullYear()} নতুন প্রভাত | সর্বস্বত্ব সংরক্ষিত
      </div>
    </footer>
  );
};

export default Footer;
