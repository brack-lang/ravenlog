type Props = {
  src?: string,
  alt?: string,
  caption?: string,
};

const RavenlogImage = ({ src, alt, caption }: Props) => {
  if (src == null) {
    return;
  }
  return (
    <figure>
      <img src={src} alt={alt} style={{ width: "100%" }} />
      <figcaption style={{ textAlign: "center" }}>{caption}</figcaption>
    </figure>
  )
};

export default RavenlogImage;
