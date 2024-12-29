import "./style.css";

type Props = {
  children: React.ReactNode;
};

const TextBody = ({ children }: Props) => {
  return (
    <div className="text-body">
      <div className="wrapper">{children}</div>
    </div>
  );
};

export default TextBody;
