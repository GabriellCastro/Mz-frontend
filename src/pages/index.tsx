import Layout from '../components/Layout'
import React from 'react'
import { api } from '../services/api'
import styles from './styles.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const IndexPage = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [sale, setSale] = React.useState([]);
  const router = useRouter();

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setErrorMessage('Please select a file');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      await api.post('/sale/upload', formData);
      setFile(null);
      setErrorMessage(null);
      alert('File uploaded successfully');
      router.push('/list');
    } catch (error) {
      setErrorMessage('An error occurred while uploading the file');
    }
  };

  React.useEffect(() => {
    api.get(`/sale`).then(response => {
      setSale(response.data);
    })
  }, []);

  return (
    <Layout title="Home | Mz Teste">
      <div
        className={styles.container}
        >
        <h2>Exclusive area to upload a file of the transactions made in the sale of products by our customers.</h2>
        <form onSubmit={handleSubmit}
          className={styles['form-container']}
        >
          <div>
            <label
              className={styles['label-file']}
            >
              Select file to upload:
              <input
                type="file" accept=".txt" onChange={handleFileInputChange} 
                className={styles['input-file']}
              />
            </label>
          </div>
          {errorMessage && <div className={styles['error-message']}>{errorMessage}</div>}
          <button type="submit" className={styles['button-submit']}>Upload</button>
        </form>
        {
          sale.length > 0 && (
            <Link href="/list">
              <button
                className={styles['button-submit']}
              >
                View file data {sale.length > 0 && `(${sale.length})`}
              </button>
            </Link>
          )
        }
      </div>
    </Layout>
  )

}


export default IndexPage
