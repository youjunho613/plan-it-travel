import { SurveyTemplate } from "components/Survey";
import { styled } from "styled-components";

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
