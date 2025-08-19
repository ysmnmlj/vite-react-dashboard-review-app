import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#284E4C] text-white px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="col-span-1">
          <h2 className="font-bold text-xl mb-4">Join The Flex</h2>
          <p className="text-sm text-gray-200 mb-6 leading-relaxed">
            Sign up now and stay up to date on our latest news and exclusive
            deals — including <strong>5% off</strong> your first stay!
          </p>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-2">The Flex</h2>
          <p className="text-sm text-gray-300">
            Professional property management services for landlords, flexible
            corporate lets for businesses and quality accommodations for
            short-term and long-term guests.
          </p>
          <div className="flex gap-4 mt-4">
            <Facebook className="w-5 h-5" />
            <Instagram className="w-5 h-5" />
            <Linkedin className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-2">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Blog</li>
            <li>Careers</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-2">Locations</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>London</li>
            <li>Paris</li>
            <li>Algiers</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-2">Contact Us</h2>
          <p className="text-sm mb-1 flex items-center gap-2">
            <Phone className="w-4 h-4" /> <strong>Support Numbers</strong>
          </p>
          <ul className="text-sm text-gray-300 space-y-1 mb-2">
            <li>
              <span className="font-bold">GB</span> United Kingdom
              <br />
              +44 77 2374 5646
            </li>
            <li>
              <span className="font-bold">DZ</span> Algeria
              <br />
              +33 7 57 59 22 41
            </li>
            <li>
              <span className="font-bold">FR</span> France
              <br />
              +33 6 44 64 57 17
            </li>
          </ul>
          <p className="text-sm flex items-center gap-2">
            <Mail className="w-4 h-4" /> info@theflex.global
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-300">
        © 2025 The Flex. All rights reserved.
      </div>
    </footer>
  );
}
