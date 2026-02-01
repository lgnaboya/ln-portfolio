import { useState } from "react";

const Navigation = () => {
  const [copied, setCopied] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="#home"
          className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          LGN
        </a>

        <div className="relative flex flex-col items-end">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText("loudettgleacnaboya@gmail.com");
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="inline-flex items-center justify-center border border-gray-500 text-gray-500 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-300/10 hover:scale-105"
          >
            Get In Touch
          </a>

          {copied && (
            <span className="absolute -bottom-5 text-xs text-green-700">
              ✓ Email Copied
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
