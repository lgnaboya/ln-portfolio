import { Globe, Handshake, Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
        {/* Heading */}
        <div className="flex justify-center items-center gap-2">
          <Handshake className="w-8 h-8 text-primary" />
          <h2 className="text-4xl font-extrabold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Let’s Connect
            </span>
          </h2>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          Always eager to collaborate on innovative projects and explore
          emerging technologies that make a real-world impact.
        </p>

        {/* Contact Info */}
        <div className="space-y-4 text-sm md:text-base text-foreground font-medium">
          <div className="flex items-center justify-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <span>
              <strong className="text-gray-500">Email:</strong>{" "}
              <a
                href="mailto:loudettenaboya@gmail.com"
                className="text-white hover:underline"
              >
                loudettgleacnaboya@gmail.com
              </a>
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <span>
              <strong className="text-gray-500">Phone:</strong>{" "}
              <a
                href="tel:+639214489298"
                className="text-white hover:underline"
              >
                +63 921 448 9298
              </a>
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Globe className="w-5 h-5 text-gray-500" />
            <span>
              <strong className="text-gray-500">Location:</strong> Available
              Worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
