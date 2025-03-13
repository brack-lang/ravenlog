import "./style.css";

type Props = {
  title: string;
  description: string;
  show_goto_top_link: boolean;
};

const Header = ({ title, description, show_goto_top_link }: Props) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p>{description}</p>
      {show_goto_top_link && (
        <div className="link">
          <a href="/">トップページに戻る</a>
        </div>
      )}
    </header>
  );
};

export default Header;
