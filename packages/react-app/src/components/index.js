import styled from "styled-components";

export const Body = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  margin-top: 40px;
`;

export const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 8px;
  color: #282c34;
  cursor: pointer;
  font-size: 16px;
  margin: 0px 20px;
  padding: 12px 24px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
`;


export const InputNumber = styled.input.attrs({ 
  type:"number", 
  id: "broker_fees",
  required: "required"
})`
  background-color: white;
  border: none;
  border-radius: 4px;
  color: #282c34;
  font-size: 16px;
  margin: 0px 20px;
  padding: 12px 24px;
  cursor: pointer;
  text-decoration: none;
`;

export const InputText = styled.input.attrs({ 
  type:"text", 
  required: "required"
})`
  background-color: white;
  border: none;
  border-radius: 4px;
  color: #282c34;
  font-size: 16px;
  margin: 0px 20px;
  padding: 12px 24px;
  cursor: pointer;
  text-decoration: none;
`;


export const Submit = styled.input.attrs({ 
  type: 'submit',
})`
  background-color: white;
  border: none;
  border-radius: 8px;
  color: #282c34;
  cursor: pointer;
  font-size: 16px;
  margin: 0px 20px;
  padding: 12px 24px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
`;


export const Container = styled.div`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  height: calc(100vh);
`;

export const Header = styled.header`
  align-items: center;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  min-height: 70px;
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const LinkComp = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  cursor: pointer;
  margin-top: 8px;
  list-style: none;
  list-style-type: none;
  text-decoration: none;

`;
