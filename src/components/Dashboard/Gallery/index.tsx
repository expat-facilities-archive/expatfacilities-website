import styled from "styled-components";

type Images = {
  id: string;
  thumbnail: string;
};
type Props = {
  list: Images[];
};

const Gallery: React.FC<Props> = ({ list }: Props) => {
  const HandleClickShowModal = (url: string) => {
    console.log(url);
  };
  return (
    <Container>
      {list.map((image, index) => (
        <ItemGallery
          key={image.id}
          gridArea={`img${index + 1}`}
          imageUrl={image.thumbnail}
          onClick={() => {
            HandleClickShowModal(image.thumbnail);
          }}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas:
    "img1 img1 img2 img3 img6"
    "img1 img1 img4 img5 img6";
  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "img1 img1 img2 img3"
      "img1 img1 img4 img5";
    & > *:nth-child(6) {
      display: none;
    }
  }
`;

const ItemGallery = styled.div<{ gridArea?: string; imageUrl?: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  border-radius: 10px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 100%;
`;

export default Gallery;
