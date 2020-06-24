import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #363f5f;
  padding: 40px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        padding-bottom: 10px;
        border-bottom: 2px solid #ff872c;
        transition: all 0.4s;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          border-bottom: 2px solid #fff;
        }
      }
    }
  }
`;
