import styled from "styled-components";

const StyledWidget = styled.div`
  border: 1px solid #f4f4f4;
  border-radius: 4px;
  width: ${({ width }) => width || "100%"};
  padding: 24px;
  flex-grow: ${({ grow }) => grow || "1"};
`;

const Widget = ({ width, grow, children }) => {
  return (
    <StyledWidget width={width} grow={grow}>
      {children}
    </StyledWidget>
  );
};

export default Widget;
