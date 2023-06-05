import React, { FunctionComponent } from "react";

import "./style.css";
import styled from "styled-components";

interface NameHeaderProps {
  name: string;
  role: string;
}

const Container = styled.div`
  position: fixed;
  top: 100px;
  margin: 0;
  z-index: -5; // TODO: Move to style prop

  h1 {
    color: white;
    margin: 0;
  }
  p {
    color: #aaa;
    margin: 0;
  }
`;

const NameHeader: FunctionComponent<NameHeaderProps> = (
  props: NameHeaderProps
) => {
  return (
    <Container>
      <h1>{props.name}</h1>
      <p>{props.role}</p>
    </Container>
  );
};

export default NameHeader;
