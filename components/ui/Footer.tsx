import Link from "next/link";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Security", "Updates"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Press"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Help Center", "Contact", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "Cookies"],
    },
  ];

  return (
    <footer className="bg-primary text-white py-16 px-6">
      
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            © 2024 BankApp. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      {/* </div> */}
    </footer>
  );
};

export default Footer;