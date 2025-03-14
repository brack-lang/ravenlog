import Link from "next/link";
import "./style.css";
import BlogSettings from "@/app/_assets/blog_settings.json";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div>©︎ {BlogSettings.footer.admin} {BlogSettings.footer.period}</div>
      <div className="links">
        <Link href="/">Top</Link>|
        {BlogSettings.footer.links.map((link) => (
          <React.Fragment key={`${link.href}-${link.text}`}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.text}
            </a>|
          </React.Fragment>
        ))}
        <Link href="/feed">RSS</Link>
      </div>
    </footer>
  );
};

export default Footer;
