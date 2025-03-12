import katex from "katex";
import "katex/dist/katex.min.css";
import "./style.css";

type Props = {
  math?: string;
};

export const InlineMath = ({ math }: Props) => {
  if (!math) {
    return null;
  }
  return (
    <span className="ravenlog_italic"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(math, { displayMode: true }),
      }}
    />
  );
}

export const BlockMath = ({ math }: Props) => {
  if (!math) {
    return null;
  }
  return (
    <div className="ravenlog_block_math"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(math, { displayMode: true }),
      }}
    />
  );
};
