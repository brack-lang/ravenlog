import Image from "next/image";
import Footer from "./_components/Footer";
import Header from "./_components/HeaderWithComment";
import TextBody from "./_components/TextBody";
import BlogSettings from "./_assets/blog_settings.json";
import "./not-found.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Header
        title={BlogSettings.title}
        show_goto_top_link={false}
      />
      <TextBody>
        <div className="flex_center">
          <Image
            src="/not-found.webp"
            alt="not-found"
            width={150}
            height={150}
          />
          <p style={{ fontSize: "16pt" }}>404 Not Found</p>
          <p style={{ marginTop: "10px" }}>ページが見つかりませんでした</p>
          <a
            href="/"
            style={{
              marginTop: "10px",
              color: "black",
              textDecoration: "none",
              borderBottom: "1px solid black",
            }}
          >
            トップページに戻る
          </a>
        </div>
      </TextBody>
      <Footer />
    </div>
  );
};

export default NotFound;
