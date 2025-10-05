const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="#home"
          className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          LGN
        </a>

        <a
          href="mailto:loudettgleacnaboya@gmail.com"
          className="inline-flex items-center justify-center border border-indigo-800 text-sky-500 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-300/10 hover:scale-105"
        >
          Get In Touch
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
