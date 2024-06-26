import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../redux/adverts/advertsSlice";
import { selectFavorites } from "../../redux/adverts/selectors";
import svg from "../../assets/icons.svg";
import Modal from "../Modal/Modal";
import {
  ContainerCard,
  TitleCard,
  RevLocWraper,
  Rating,
  Location,
  Price,
  ContainerInfo,
  Description,
  ImgContainer,
  ImgPrewiev,
  Button,
  DetailsContainer,
  DetailsList,
  TopWrap,
  FavoriteButton,
  PriceWrap,
} from "./CamperCardStyled";

export const CamperCard = ({ data }) => {
  const {
    name,
    gallery,
    price,
    location,
    reviews,
    rating,
    kitchen,
    description,
    adults,
    details,
    engine,
    transmission,
  } = data;
  const dispatch = useDispatch();
  const favorite = useSelector(selectFavorites);
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addFavorite = useCallback(
    (advert) => {
      const isFavorites = favorite.some((item) => item._id === advert._id);
      if (!isFavorites) {
        dispatch(addToFavorite(advert));
      }
    },
    [dispatch, favorite]
  );

  const removeFavorite = useCallback(
    (advert) => {
      dispatch(removeFromFavorite(advert));
    },
    [dispatch]
  );

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(data);
    } else {
      addFavorite(data);
    }
  };

  useEffect(() => {
    setIsFavorite(favorite.some((item) => item._id === data._id));
  }, [data, favorite]);

  return (
    <ContainerCard>
      <ImgContainer>
        <ImgPrewiev src={gallery[0]} alt={`${name} camper image`}></ImgPrewiev>
      </ImgContainer>
      <ContainerInfo>
        <TopWrap>
          <TitleCard>{name} </TitleCard>
          <PriceWrap>
            <Price>€{price}</Price>
            <FavoriteButton onClick={handleFavoriteToggle}>
              <svg
                style={{
                  fill: isFavorite ? "#E44848" : "",
                  stroke: isFavorite ? "#E44848" : "#101828",
                }}
              >
                <use href={`${svg}#icon-heart`}></use>
              </svg>
            </FavoriteButton>
          </PriceWrap>
        </TopWrap>
        <RevLocWraper>
          <Rating>
            <svg>
              <use href={`${svg}#icon-star`}></use>
            </svg>
            {rating}({reviews.length} Reviews)
          </Rating>
          <Location>
            <svg>
              <use href={`${svg}#icon-map-pin`}></use>
            </svg>
            {location}
          </Location>
        </RevLocWraper>

        <Description>{description}</Description>
        <DetailsContainer>
          <DetailsList>
            <li>
              <svg>
                <use href={`${svg}#icon-users`}></use>
              </svg>
              {adults} adults
            </li>

            <li>
              <svg>
                <use href={`${svg}#icon-engine`}></use>
              </svg>
              {transmission}
            </li>
            <li>
              <svg>
                <use href={`${svg}#icon-transm`}></use>
              </svg>
              {engine}
            </li>
            <li>
              <svg>
                <use href={`${svg}#icon-beds`}></use>
              </svg>
              {details.beds} beds
            </li>

            {kitchen > 0 ? (
              <li>
                <svg>
                  <use href={`${svg}#icon-kitchen`}></use>
                </svg>
                kitchen
              </li>
            ) : null}
            {details.microwave > 0 ? (
              <li>
                <svg>
                  <use href={`${svg}#icon-microwave`}></use>
                </svg>
                Microwave
              </li>
            ) : null}
            {details.radio > 0 ? (
              <li>
                <svg>
                  <use href={`${svg}#icon-radio`}></use>
                </svg>
                Radio
              </li>
            ) : null}
          </DetailsList>
        </DetailsContainer>

        <Button type="button" onClick={toggleModal}>
          Show more
        </Button>
      </ContainerInfo>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={toggleModal} data={data}></Modal>
      )}
    </ContainerCard>
  );
};
