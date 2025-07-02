import React from "react";
import { Separator } from "../ui/separator";

export const Footer = (): JSX.Element => {
  // About links data
  const aboutLinks = [
    "Contact Us",
    "About Us",
    "Careers",
    "Press",
    "Cancellation & Returns",
    "Terms of Use",
  ];

  // Help links data
  const helpLinks = [
    "Payments",
    "Shipping",
    "My Orders",
    "FAQs",
    "Terms of Use",
    "Security",
    "Privacy",
  ];

  // Payment methods data
  const paymentMethods = [
    {
      name: "Visa",
      logo: "https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=80&h=50"
    },
    {
      name: "Mastercard", 
      logo: "https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=80&h=50"
    },
    {
      name: "PayPal",
      logo: "https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=80&h=50"
    },
    {
      name: "bKash",
      logo: "https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=80&h=50"
    },
    {
      name: "Nagad",
      logo: "https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=80&h=50"
    },
  ];

  // Social media icons
  const socialIcons = [
    { 
      name: "Facebook",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      name: "Instagram",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2"/>
          <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="white" strokeWidth="2"/>
          <path d="M17.5 6.5H17.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      name: "Twitter",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.95718 14.8821 3.28445C14.0247 3.61173 13.2884 4.19445 12.773 4.95371C12.2575 5.71297 11.9877 6.61435 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39624C5.36074 6.60667 4.01032 5.43666 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ];

  return (
    <footer className="w-full bg-foundationneutral-900 py-16">
      <div className="container mx-auto px-5">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info column */}
          <div className="flex flex-col gap-8">
            {/* Logo and description */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-foundationprimaryprimary-500-main rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-bold text-white text-5xl leading-[48px] [font-family:'Onest',Helvetica] tracking-[0] whitespace-nowrap">
                  FALCON
                </div>
              </div>

              <p className="text-foundationneutral-100 font-body-md-regular">
                Experience our new platform & Enjoy exciting deals
                and offers on your day to day
              </p>
            </div>

            {/* Contact information */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="w-56 font-body-md-regular text-white">
                  House #64, Road 13, ASA Center, Uttara, Dhaka-1402
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="font-body-md-regular text-white whitespace-nowrap">
                  01729-1497201
                </div>
              </div>

              <div className="flex items-center gap-[9px]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="font-body-md-regular text-white whitespace-nowrap">
                  falcon@gmail.com
                </div>
              </div>
            </div>

            {/* Social media */}
            <div className="flex items-center gap-4">
              <div className="[font-family:'Onest',Helvetica] font-medium text-foundationneutral-200 text-base leading-6 whitespace-nowrap">
                Follow us on
              </div>
              <div className="flex items-start gap-4">
                {socialIcons.map((social, index) => (
                  <button
                    key={index}
                    className="hover:scale-110 transition-transform"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* About column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-body-xl-medium text-foundationneutral-400">
              ABOUT
            </h3>
            <div className="flex flex-col gap-2">
              {aboutLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="[font-family:'Onest',Helvetica] font-medium text-white text-base leading-6 hover:text-foundationprimaryprimary-500-main transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Help column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-body-xl-medium text-foundationneutral-400">
              HELP
            </h3>
            <div className="flex flex-col gap-2">
              {helpLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="[font-family:'Onest',Helvetica] font-medium text-white text-base leading-6 hover:text-foundationprimaryprimary-500-main transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Support and download column */}
          <div className="flex flex-col gap-8">
            {/* Need Support section */}
            <div className="flex flex-col gap-3">
              <h3 className="font-body-xl-medium text-foundationneutral-400">
                Need Support?
              </h3>
              <div className="flex items-center gap-2 px-4 py-2 rounded border border-solid border-slate-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="[font-family:'Onest',Helvetica] font-medium text-white text-base leading-6 whitespace-nowrap">
                  10724-7814XX
                </div>
              </div>
            </div>

            {/* Download app section */}
            <div className="flex flex-col gap-3">
              <h3 className="font-body-xl-medium text-foundationneutral-400">
                DOWNLOAD APP
              </h3>
              <div className="flex flex-col gap-4">
                <div className="w-[180px] h-[54px] bg-black rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 20.5V3.5C3 2.4 3.89 1.5 5 1.5H19C20.1 1.5 21 2.4 21 3.5V20.5L12 15.5L3 20.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-white text-xs">GET IT ON</span>
                    <span className="text-white text-sm font-semibold">Google Play</span>
                  </div>
                </div>
                <div className="w-[180px] h-[54px] bg-black rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5C17.6624 20.48 16.39 21.0017 15.0675 21.0017C13.745 21.0017 12.4726 20.48 11.425 19.5L12.18 18.78C12.9986 19.5153 14.0191 19.9177 15.0675 19.9177C16.1159 19.9177 17.1364 19.5153 17.955 18.78L18.71 19.5ZM5.29 19.5L6.045 18.78C6.86364 19.5153 7.88414 19.9177 8.9325 19.9177C9.98086 19.9177 11.0014 19.5153 11.82 18.78L12.575 19.5C11.5274 20.48 10.255 21.0017 8.9325 21.0017C7.61 21.0017 6.33764 20.48 5.29 19.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-white text-xs">Download on the</span>
                    <span className="text-white text-sm font-semibold">App Store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payments section */}
        <div className="mt-16 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-body-xl-medium text-foundationneutral-400 whitespace-nowrap">
              PAYMENTS ACCEPTED
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="w-16 h-10 bg-white rounded border border-gray-300 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8">
          <Separator className="border-[#ffffff30]" />
          <div className="py-6 text-center">
            <p className="[font-family:'Onest',Helvetica] font-normal text-white text-sm">
              Falcon ©2025. Design by xyz
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};