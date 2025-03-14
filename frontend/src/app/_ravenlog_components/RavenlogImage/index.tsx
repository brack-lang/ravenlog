import Image from "next/image";

type Props = {
  src?: string
};

const RavenlogImage = ({ src }: Props) => {
  if (src == null) {
    return;
  }
  return <Image src={src} alt="" />
};

export default RavenlogImage;
