import { React, useContext } from "react";

import { DataContext } from "../context/DataProvider";

import { Box, Typography, styled } from "@mui/material";

const Text = styled(Typography)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;

const Home = () => {
  const { account } = useContext(DataContext);
  return (
    <CenteredBox>
      <text>Hello {account.name}</text>
      <br />
      <text>Username: {account.username}</text>
    </CenteredBox>
  );
};

export default Home;
