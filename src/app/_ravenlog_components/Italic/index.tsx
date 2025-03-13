import "./style.css";

type Props = {
  children?: React.ReactNode;
};

const Italic = ({ children }: Props) => {
  return <span className="ravenlog_italic">{children}</span>;
};

export default Italic;
