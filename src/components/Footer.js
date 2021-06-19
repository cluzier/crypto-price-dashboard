import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center p-4 gap-4">
      <div>
          &copy; {new Date().getFullYear()} Copyright
        </div>
    </footer>
  );
};

const Link = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-blue-400 hover:underline hover:text-blue-600 visited:text-purple-600"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default React.memo(Footer);
