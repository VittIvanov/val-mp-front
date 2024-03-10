import styled from "styled-components";
import colors from "../../consts/colors";

export const PaginationWrapper = styled.div`
display: flex;
justify-content: space-between;

button{
  background-color: ${colors.primary};
  color: #fff;
  padding: 5px;
  border: none;
  border-radius: 5px;
}
`
