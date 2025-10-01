import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-primary bg-clip-text text-transparent">Get in Touch</span>
        </h2>
        
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>

        <a
          href="mailto:loudettgleacnaboya@gmail.com"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-medium text-lg hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 group"
        >
          <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          loudettgleacnaboya@gmail.com
        </a>
      </div>
    </section>
  );
};

export default Contact;
