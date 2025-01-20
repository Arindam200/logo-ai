import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";
import { IconBrandLine, IconCrown } from "@tabler/icons-react";

export default function Faq() {
  const faqItems = [
    {
      question: "How does the AI logo generator work?",
      answer:
        "Our AI analyzes your brand's needs and uses advanced algorithms to generate unique logo designs tailored to your preferences.",
    },
    {
      question: "Can I customize the generated logos?",
      answer:
        "Absolutely! You can edit fonts, colors, layouts, and more to make your logo truly yours.",
    },
    {
      question: "Do I own the rights to my logo?",
      answer:
        "Yes, you get full commercial rights to use your logo however you like after downloading it.",
    },
    {
      question: "How much does it cost?",
      answer:
        "You can explore designs for free. Pricing applies only when you decide to download a high-resolution file.",
    },
  ];

  return (
    <>
      <div className="bg-background py-10 mt-20">
        <div className="flex flex-col">
          <Badge className="w-fit px-4 py-2 flex items-center mb-4 gap-2">
            <IconBrandLine className="text-white size-4" />
            FAQs
          </Badge>
          <div className="text-4xl md:text-6xl font-medium">
            Recently raised
            <span className="bg-gradient-to-tr mx-2 from-white via-primary to-white bg-clip-text text-transparent">
              queries
            </span>
            <br />{" "}
            <span className="text-muted-foreground/40 text-3xl md:text-5xl">
              about LogoAI
            </span>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full mt-10">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={`item-${index + 1}`}
              value={`item-${index + 1}`}
              className="text-lg border-2 border-accent/40 mt-2 px-4 rounded-xl"
            >
              <AccordionTrigger className="text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-neutral-500">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
