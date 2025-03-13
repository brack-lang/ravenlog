import type { ReactNode } from "react";
import "./style.css";

type Props = {
  children?: ReactNode;
};

const Stmt = ({ children }: Props) => {
  return <div className="ravenlog_stmt">{children}</div>;
};

export default Stmt;
