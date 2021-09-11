import React from 'react';
import styled from 'styled-components';
import Title from '../common/Title';

// Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  animation: fadeIn 0.5s forwards;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const EditorBox = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Wrapper = styled.div`
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const TagBox = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

interface Props {
  title: string;
  body: string;
  thumbnail?: string;
  tags: string[];
  onChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeBody: (text: string) => void;
  onChangeTags: (nextTags: string[]) => void;
  onBack: () => void;
  onAddNotice: (e: React.MouseEvent) => void;
}

const AddNotice: React.FC<Props> = ({
  title,
  body,
  thumbnail,
  tags,
  onChangeTitle,
  onChangeBody,
  onChangeTags,
  onBack,
  onAddNotice,
}) => {
  return (
    <Container>
      <EditorBox>
        <Wrapper>
          <Title value={title} onChange={onChangeTitle} placeholder="제목을 입력하세요" />
        </Wrapper>
      </EditorBox>
    </Container>
  );
};

export default AddNotice;
