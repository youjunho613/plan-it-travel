import { styled } from "styled-components";

import SurveyTemplate from "components/SurveyTemplate";
export const Survey = () => {
  return (
    <Layout>
      <SurveyTemplate />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
