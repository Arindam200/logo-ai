"use client";

import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Faq from "@/components/landing/faq";

const Index = () => {
  return (
    <>
      <div className="overflow-hidden">
        <div className="bg-red-400">
          <Navbar />
        </div>
        <Hero />
        <main className="max-w-6xl mx-auto">
          <div className="px-4">
            <Features />
            <Faq />
          </div>
        </main>
        <Footer />
      </div>
      {/* <div className="top-[15rem] md:top-[5rem] left-[20%] z-[-1] absolute bg-gradient-to-t opacity-50 dark:opacity-100 from-primary to-purple-800/20 blur-[8em] rounded-xl transition-all translate-x-[-50%] duration-700 ease-out w-[10rem] md:w-[10rem] h-[20rem] md:h-[60rem] rotate-[54deg]"></div> */}
    </>
    // <div className="min-h-screen bg-background">
    //   <Navigation />

    //   <main className="pt-16">
    //     {/* Hero Section */}
    //     <section className="relative overflow-hidden px-6 lg:px-8 py-24 sm:py-32">
    //       <div className="mx-auto max-w-7xl text-center">
    //         <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6">
    //           Create stunning logos with
    //           <br />
    //           <span className="bg-gradient-to-r from-[#8B5CF6] to-[#1EAEDB] bg-clip-text text-transparent">
    //             AI-powered design
    //           </span>
    //         </h1>
    //         <p className="mx-auto max-w-2xl text-lg text-gray-500 mb-8">
    //           Generate unique, professional logos in seconds. Perfect for businesses, startups, and personal brands.
    //         </p>
    //         <div className="flex max-sm:flex-col-reverse justify-center gap-4">
    //           <Link href="/generate" className="px-6 py-3 bg-primary  text-white rounded-lg hover:bg-primary/90 transition-colors">
    //             Generate Your Logo
    //           </Link>
    //           <Link href="/gallery" className="px-6 py-3 glass rounded-lg justify-center hover:bg-white/20 hover:border hover:border-gray-500 transition-colors flex items-center gap-2">
    //             View Examples <ArrowRight className="w-4 h-4" />
    //           </Link>
    //         </div>
    //       </div>

    //       {/* Hero Image */}
    //       {/* <div className="relative mt-16">
    //         <div className="flex justify-center">
    //           <img
    //             src="https://antimetal.com/images/hero/preview.png"
    //             alt="AI Logo Generator Preview"
    //             className="rounded-3xl shadow-2xl max-w-[90%] w-auto h-auto"
    //           />
    //         </div>
    //       </div> */}
    //     </section>

    //     <section className="py-24 bg-surface px-6 lg:px-8">
    //       <div className="mx-auto max-w-7xl">
    //         <h2 className="text-3xl font-bold text-center mb-16">Why choose our AI Logo Generator?</h2>
    //         <div className="grid md:grid-cols-3 gap-8">
    //           {[
    //             {
    //               title: "Lightning Fast",
    //               description: "Generate professional logos in seconds, not days",
    //               icon: "⚡",
    //             },
    //             {
    //               title: "Unique Designs",
    //               description: "Every logo is one-of-a-kind, tailored to your brand",
    //               icon: "🎨",
    //             },
    //             {
    //               title: "Unlimited Options",
    //               description: "Generate as many variations as you need",
    //               icon: "🔄",
    //             },
    //           ].map((feature, index) => (
    //             <div
    //               key={index}
    //               className="p-6 rounded-2xl bg-background border border-border hover:border-accent transition-colors"
    //             >
    //               <div className="text-4xl mb-4">{feature.icon}</div>
    //               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
    //               <p className="text-gray-500">{feature.description}</p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </section>

    //     {/* FAQ Section */}
    //     <section className="py-24 px-6 lg:px-8">
    //       <div className="mx-auto max-w-3xl">
    //         <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
    //         <div className="space-y-4">
    //           {[
    //             {
    //               question: "How does the AI logo generator work?",
    //               answer: "Our AI analyzes your brand requirements and generates unique logos using advanced machine learning algorithms.",
    //             },
    //             {
    //               question: "Can I customize the generated logos?",
    //               answer: "Yes! You can adjust colors, fonts, layouts, and other elements to match your brand perfectly.",
    //             },
    //             {
    //               question: "Do I own the rights to my generated logo?",
    //               answer: "Absolutely! Once you download your logo, you have full commercial rights to use it however you want.",
    //             },
    //           ].map((faq, index) => (
    //             <div
    //               key={index}
    //               className="border border-border rounded-lg overflow-hidden"
    //             >
    //               <button
    //                 className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-background/50"
    //                 onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
    //               >
    //                 <span className="font-medium">{faq.question}</span>
    //                 <ChevronDown
    //                   className={`w-5 h-5 transition-transform ${
    //                     activeAccordion === index ? "transform rotate-180" : ""
    //                   }`}
    //                 />
    //               </button>
    //               {activeAccordion === index && (
    //                 <div className="px-6 py-4 bg-background/50">
    //                   <p className="text-gray-500">{faq.answer}</p>
    //                 </div>
    //               )}
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </section>

    //     {/* CTA Section */}
    //     <section className="py-24 bg-primary text-white px-6 lg:px-8">
    //       <div className="mx-auto max-w-7xl text-center">
    //         <h2 className="text-3xl sm:text-5xl font-bold mb-8">Create your perfect logo today</h2>
    //         <p className="text-white/80 mb-8 max-w-2xl mx-auto">
    //           Join thousands of satisfied customers who have created stunning logos with our AI generator.
    //         </p>
    //         <button className="px-8 py-4 bg-accent text-primary rounded-full font-semibold hover:bg-accent/90 transition-colors">
    //           Start Generating
    //         </button>
    //       </div>
    //     </section>
    //   </main>

    //   <Footer />
    // </div>
  );
};

export default Index;
