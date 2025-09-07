import { User } from "@typeDefs/user";
import Avvvatars from "avvvatars-react";
import styled from "styled-components";
import Image from "@components/Image";
import Skeleton from "@components/Layout/Skeleton";

interface Props {
  user: User | undefined;
  size?: number;
}

const Avatar: React.FC<Props> = ({ user, size = 25 }: Props) => {
  const hasAvatar = false;

  return (
    <Container size={size} as={user ? "div" : Skeleton}>
      {user &&
        (hasAvatar ? (
          <ThumbnailImage
            src={"https://picsum.photos/200"}
            alt={`${user.firstName} ${user.lastName}`}
            width={size}
            height={size}
          />
        ) : (
          <Avvvatars
            value={`${user.firstName} ${user.lastName}`
              .split(" ")
              .map((word: string) => word.charAt(0))
              .join("")}
            radius={5}
            size={size}
          />
        ))}
    </Container>
  );
};

const ThumbnailImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const Container = styled.div<{ size: number }>`
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 5px;
  overflow: hidden;

  div {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }
`;

export default Avatar;
