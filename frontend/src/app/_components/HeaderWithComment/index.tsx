import RandomComment from "@/app/_components/RandomComment";
import "./style.css";

type Props = {
  title: string;
  show_goto_top_link: boolean;
};

const HeaderWithComment = ({ title, show_goto_top_link }: Props) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <RandomComment />
      {show_goto_top_link && (
        <div className="link">
          <a href="/">トップページに戻る</a>
        </div>
      )}
    </header>
  );
};

export default HeaderWithComment;
