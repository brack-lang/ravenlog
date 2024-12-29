import "./style.css";

type Props = {
  children: React.ReactNode;
};

const Strike = ({ children }: Props) => {
  return <span className="ravenlog_strike">{children}</span>;
};

export default Strike;
