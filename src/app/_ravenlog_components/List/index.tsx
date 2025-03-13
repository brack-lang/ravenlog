import "./style.css";

type Props = {
  children?: React.ReactNode;
};

export const UnorderedList = ({ children }: Props) => {
  return <ul className="ravenlog_unordered_list">{children}</ul>;
};

export const OrderedList = ({ children }: Props) => {
  return <ol className="ravenlog_ordered_list">{children}</ol>;
};

export const ListItem = ({ children }: Props) => {
  return <li className="ravenlog_list_item">{children}</li>;
};
