
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import "./Upload.css";


const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT ;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY; 
const authenticator =  async () => {
    try {
        const response = await fetch("http://localhost:3000/api/upload");

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};




const Upload = () => {

    fetch('http://localhost:3000/api/upload', {
        mode: 'no-cors',
        method: 'POST',
        body: authenticator,
      });

    const onError = (err) => {
        console.log("Error", err);
    };

    const onSuccess = (res) => {
        console.log("Sucess", res);
    };

    const onUploadProgress = (progress) => {
        console.log("Progress", progress);
    };

    const onUploadStart = (evt) => {
        console.log("Start", evt);
    };



    return (
        <>
        <IKContext 
        publicKey={publicKey} 
        urlEndpoint={urlEndpoint} 
        authenticator={authenticator} 
      >
        
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
        />
      </IKContext>
        </>
    );
}

export default Upload;