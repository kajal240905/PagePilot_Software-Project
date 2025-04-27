import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../compo/Navbar";
import Footer from "../compo/Footer";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <>
      <Navbar />

      {/* Parallax Hero Section */}
      <div className="relative h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center text-white px-4"
        style={{ backgroundImage: "url('src/assets/book-shelves.webp')" }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-bold font-serif drop-shadow-xl">
            About NIT Uttarakhand Library
          </h1>
        </div>
      </div>

      {/* Wave Divider SVG */}
      <div className="-mt-1">
        <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none">
          <path fill="#ccffcc" d="M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* ✅ Electric Green Background Behind All Sections */}
      <div className="bg-gradient-to-br from-[#ccffcc] via-[#b2ff66] to-[#ccffcc] px-6 pt-12 pb-20 text-[#1a1a1a] bg-[url('/backgrounds/bookshelf-faint.png')] bg-no-repeat bg-center bg-contain">


        {/* ✅ Overview Section */}
        <section className="bg-gradient-to-br from-[#b2ff66] via-[#ccffcc] to-[#a8ff78] shadow-2xl rounded-2xl p-10 mb-16 max-w-5xl mx-auto" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center">📚 Overview</h2>
          <p className="leading-relaxed text-[#1a1a1a]">
            The Central Library of <strong>NIT Uttarakhand</strong> plays a vital role in academic enrichment, 
            offering access to a diverse collection of technical, scientific, and general literature. 
            It supports students, faculty, and researchers through journals, books, digital resources, 
            and a calm space for learning.
            <br /><br />
            With structured policies and extended hours, the library fosters an accessible 
            and disciplined knowledge space for the institute community.
          </p>
        </section>

        {/* ✅ Borrowing Rules Section */}
        <section className="bg-gradient-to-br from-[#b2ff66] via-[#ccffcc] to-[#a8ff78] shadow-2xl rounded-2xl p-10 mb-16 max-w-5xl mx-auto" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center">📖 Borrowing Rules</h2>
          <ul className="list-disc list-inside space-y-2 text-[#1a1a1a]">
            <li>Return unused books to the corridor table.</li>
            <li>Inspect books before borrowing – users are liable for damage.</li>
            <li>Late returns attract fines; return books in original condition.</li>
            <li>ID card is mandatory for borrowing.</li>
            <li>Dues must be cleared each semester.</li>
            <li>Fiction books are issued for 7 days only.</li>
          </ul>
        </section>

        {/* ✅ Library Hours Section */}
        <section className="bg-gradient-to-br from-[#b2ff66] via-[#ccffcc] to-[#a8ff78] shadow-2xl rounded-2xl p-10 mb-16 max-w-5xl mx-auto" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center">⏰ Library Hours</h2>
          <p className="text-[#1a1a1a] leading-relaxed">
            Open on all weekdays except national/social holidays like Holi, Diwali, Republic Day, etc.
            <br /><br />
            <strong>Timings:</strong><br />
            🗓 Monday to Friday: 08:00 AM – 08:00 PM<br />
            🗓 Saturday & Sunday: 09:00 AM – 06:00 PM
          </p>
        </section>

        {/* ✅ Membership Section */}
        <section className="bg-gradient-to-br from-[#b2ff66] via-[#ccffcc] to-[#a8ff78] shadow-2xl rounded-2xl p-10 max-w-5xl mx-auto" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center">🧾 Membership Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-300">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-3 px-4">Members</th>
                  <th className="py-3 px-4">Books</th>
                  <th className="py-3 px-4">Duration</th>
                </tr>
              </thead>
              <tbody className="bg-white text-[#2e2e2e]">
                <tr className="border-t"><td className="py-3 px-4">Faculty</td><td className="py-3 px-4">10</td><td className="py-3 px-4">1 Semester</td></tr>
                <tr className="border-t"><td className="py-3 px-4">Students</td><td className="py-3 px-4">5</td><td className="py-3 px-4">15 Days</td></tr>
                <tr className="border-t"><td className="py-3 px-4">Scholars</td><td className="py-3 px-4">4</td><td className="py-3 px-4">1 Month</td></tr>
                <tr className="border-t"><td className="py-3 px-4">Staff</td><td className="py-3 px-4">2</td><td className="py-3 px-4">1 Month</td></tr>
              </tbody>
            </table>
            <p className="text-sm mt-3 text-[#555]">
              * Reference books: Faculty can issue for 15 days.<br />
              ** Student count excludes book bank books.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}