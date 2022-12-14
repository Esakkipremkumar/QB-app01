import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  EpisodeNumber,
  Title,
} from "../../../Info/Episodes/Episode/Episode.styles";
import { CardBg, Container, CardContent } from "./Chapter.styles";

const Chapter = (props) => {
  const navigation = useNavigation();

  const title = props?.title?.toLowerCase();
  const id = props?.id?.toLowerCase();
  const chapter = title.split("chapter ")[1] || id?.split("-chapter-")[1];

  return (
    <Container>
      <CardBg>
        <CardContent>
          <Title numberOfLines={1}>{props.title || `Chapter ${chapter}`}</Title>
          <EpisodeNumber numberOfLines={1}>Chapter {chapter}</EpisodeNumber>
        </CardContent>
      </CardBg>
    </Container>
  );
};

export default Chapter;
