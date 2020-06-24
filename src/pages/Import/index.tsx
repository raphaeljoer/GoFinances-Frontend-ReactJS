import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  const handleUpload = useCallback(async (): Promise<void> => {
    const dataFile = new FormData();

    if (!uploadedFiles.length) return;

    uploadedFiles.map(file => {
      return dataFile.append('file', file.file, file.name);
    });

    try {
      await api.post('/transactions/import', dataFile);
      history.push('/');
    } catch (err) {
      console.log(err.response.error);
    }
  }, [uploadedFiles, history]);

  const submitFile = useCallback((files: File[]): void => {
    const newUploadedFiles = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    console.log(newUploadedFiles);

    setUploadedFiles(newUploadedFiles);
  }, []);

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar transações</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
