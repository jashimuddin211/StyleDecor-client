import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import {
  Mail,
  Phone,
  MapPin,
  Clock3,
} from 'lucide-react';

const Footer = () => {

  return (

    <footer className="bg-neutral text-neutral-content mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>

          <div className="flex items-center gap-3 mb-4">

            <img
              src="logo.png"
              alt="StyleDecor"
              className="w-16 h-16 object-contain"
            />

            <div>

              <h2 className="text-2xl font-bold">

                <span className="text-primary">
                  Style
                </span>

                <span className="text-secondary">
                  Decor
                </span>

              </h2>

              <p className="text-sm opacity-70">
                Home & Ceremony Decoration
              </p>

            </div>

          </div>

          <p className="text-sm leading-7 opacity-80">

            We provide premium home and ceremony decoration
            services with modern designs, experienced decorators,
            and seamless booking solutions.

          </p>

        </div>

        {/* Contact Details */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Contact Details
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <MapPin
                size={18}
                className="text-primary"
              />

              <p>
                Kaliganj, Bangladesh
              </p>

            </div>

            <div className="flex items-center gap-3">

              <Phone
                size={18}
                className="text-primary"
              />

              <p>
                +880 1234-567890
              </p>

            </div>

            <div className="flex items-center gap-3">

              <Mail
                size={18}
                className="text-primary"
              />

              <p>
                support@styledecor.com
              </p>

            </div>

          </div>

        </div>

        {/* Working Hours */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Working Hours
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <Clock3
                size={18}
                className="text-primary"
              />

              <div>

                <p>
                  Saturday - Thursday
                </p>

                <p className="text-sm opacity-70">
                  9:00 AM - 10:00 PM
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Clock3
                size={18}
                className="text-primary"
              />

              <div>

                <p>
                  Friday
                </p>

                <p className="text-sm opacity-70">
                  Closed
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Social Media */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4">

            <a
              href="/"
              className="w-11 h-11 rounded-full bg-base-100 text-primary flex items-center justify-center hover:scale-110 duration-300"
            >

              <FaFacebookF size={18} />

            </a>

            <a
              href="/"
              className="w-11 h-11 rounded-full bg-base-100 text-primary flex items-center justify-center hover:scale-110 duration-300"
            >

              <FaInstagram size={18} />

            </a>

            <a
              href="/"
              className="w-11 h-11 rounded-full bg-base-100 text-primary flex items-center justify-center hover:scale-110 duration-300"
            >

              <FaTwitter size={18} />

            </a>

            <a
              href="/"
              className="w-11 h-11 rounded-full bg-base-100 text-primary flex items-center justify-center hover:scale-110 duration-300"
            >

              <FaYoutube size={18} />

            </a>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm opacity-80">

          <p>
            © 2026 StyleDecor. All Rights Reserved.
          </p>

          <p>
            Designed & Developed by Muhammad Jashim
          </p>

        </div>

      </div>

    </footer>

  );
};

export default Footer;