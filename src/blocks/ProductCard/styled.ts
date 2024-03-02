import styled from "styled-components";
import colors from "../../consts/colors";

export const Wrapper = styled.div`
position: relative;
display: block;
max-width: 100%;
padding: 0 10px;
`

export const LikeWrapper = styled.div`
cursor: pointer;
width: 30px;
height: 30px;
position: absolute;
top: 0;
right: 10px;
display: flex;
justify-content: center;
align-items: center;
svg{
  pointer-events: none;
  width: 30px;
  height: 30px;
  opacity: 0.5;
}
`

export const Image = styled.img`
margin-bottom: 10px;
width: 100%;
height: 165px;
border-radius: 4px;
object-fit: scale-down;
`

export const PriceWrapper = styled.div`
display: flex;
justify-content: left;
align-items: flex-end ; //flex-end flex-start
margin-bottom: 10px;
width:100%;
`

export const PriceRegular = styled.div`
font-size: 18px;
font-weight: 700;
margin-right: 10px;
color: ${colors.primary};
width:100%;


`

export const PriceRegularWhenDiscounted = styled.div`
text-decoration: line-through;
color: #999;
font-size: 15px;
`
export const PriceDiscounted = styled.div`
font-size: 18px;
font-weight: 700;
margin-right: 10px;
color: ${colors.primary};

`

export const Title = styled.h3`
width: 100%;
margin-bottom: 5px;
height: 50px;
overflow: hidden;
`
export const Desc = styled.div`
margin-bottom:10px;
width: 100%;
margin: 10px;
height: 100px;
overflow: hidden;
`
export const BtnsWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
margin-bottom: 0;
* + * {
    margin-top: 10px;
  }

  button{
    display: flex;
    width: 100%;
    justify-content: center; /* Выравнивание текста по центру по горизонтали */
    align-items: center; /* Выравнивание текста по центру по вертикали */
    margin-bottom: 0;
  }
`
