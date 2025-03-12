import "./style.css";

type Props = {
  children?: React.ReactNode;
};

const Bold = ({ children }: Props) => {
  return <span className="ravenlog_bold">{children}</span>;
};

export default Bold;
