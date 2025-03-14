import "./style.css";

type Props = {
  children?: React.ReactNode;
};

export const Heading1 = ({ children }: Props) => {
  return <h1 className="ravenlog_heading1">
    <span className="sharp">#</span>
    {children}
  </h1>;
};

export const Heading2 = ({ children }: Props) => {
  return <h2 className="ravenlog_heading2">
    <span className="sharp">##</span>
    {children}
  </h2>;
};

export const Heading3 = ({ children }: Props) => {
  return <h3 className="ravenlog_heading3">
    <span className="sharp">###</span>
    {children}
  </h3>;
}

export const Heading4 = ({ children }: Props) => {
  return <h4 className="ravenlog_heading4">
    <span className="sharp">####</span>
    {children}
  </h4>;
}

export const Heading5 = ({ children }: Props) => {
  return <h5 className="ravenlog_heading5">
    <span className="sharp">#####</span>
    {children}
  </h5>;
}

export const Heading6 = ({ children }: Props) => {
  return <h6 className="ravenlog_heading6">
    <span className="sharp">######</span>
    {children}
  </h6>;
}
