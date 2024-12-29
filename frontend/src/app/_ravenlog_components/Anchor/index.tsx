import "./style.css";

type Props = {
  href: string;
  children: React.ReactNode;
};

const Anchor = ({ href, children }: Props) => {
  return (
    <a href={href} className="ravenlog_anchor" target="_blank" rel="norefferer">
      {children}
    </a>
  );
};

export default Anchor;
