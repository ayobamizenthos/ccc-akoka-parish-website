import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What time are the Sunday services?",
    answer: "Our Sunday services are held at 8:00 AM (First Service) and 10:30 AM (Second Service). We also have a special Thanksgiving Service at 6:00 PM on the last Sunday of every month."
  },
  {
    question: "Where is the church located?",
    answer: "CCC Akoka Glade Assembly is located at Akoka, Yaba, Lagos, Nigeria. The church is easily accessible and we have ample parking space for worshippers."
  },
  {
    question: "What should I wear to church?",
    answer: "We encourage worshippers to dress modestly and appropriately. White garments (Sutana) are worn during special services and celebrations, but visitors are welcome in any modest attire."
  },
  {
    question: "How can I join the choir or media team?",
    answer: "We welcome new members to our Choir and Media Team! Please speak with any of the coordinators after service or visit the Choir & Media Team section on our website to learn more about our ministries."
  },
  {
    question: "Do you have programs for children and youth?",
    answer: "Yes! We have dedicated Sunday School classes for children and vibrant youth programs. Our children's church runs concurrently with the main service, and youth meetings are held regularly."
  },
  {
    question: "How can I give offerings or tithes?",
    answer: "You can give your offerings and tithes during our services or through our online donation platform. Visit the 'Give' section on our website for bank transfer details and other giving options."
  },
  {
    question: "Can I watch services online?",
    answer: "Yes! We stream our services live on YouTube. Visit our YouTube channel (The Glade Choir) or click the 'Watch Live' button during service times to join us virtually."
  },
  {
    question: "How do I contact the church for prayers or counseling?",
    answer: "You can reach us through the contact form on our website, send an email to info@cccakokagladeassembly.org, or speak with any of our ministers after service. We're here to support you."
  }
];

const FAQ = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our church, services, and community.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-6 bg-card/50"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
