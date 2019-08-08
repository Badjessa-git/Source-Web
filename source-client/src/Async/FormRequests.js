
const PROD = "https://us-central1-source-d3c30.cloudfunctions.net/app";
const DEV = "http://localhost:5000/source-d3c30/us-central1/app";
const GRAPHIC_REQUEST_TYPE = 'gRequest';
const LOAN_REQUEST_TYPE = 'lRequest';
export default class FormRequest {
    static uploadFile(file) {
        let data = new FormData();
        data.append('file', file);
        return fetch(`${PROD}/upload`, {
            method: 'POST',
            body: data,
        }).then((res) => {
            if (res.status === 200) {
                return res.json().then((data) => {
                    return data.downloadUrl;
                })
            }
        });
    }
    
    static submitFormWithUpload(type, formData) {
        return this.uploadFile(formData.selectedFile).then((downloadUrl) => {
            delete formData['selectedFile'];
            formData['downloadUrl'] = downloadUrl;
            return this.submitForm(type, formData)
            .then((success) => {return success;})
            .catch(err => {throw new Error(err)});
        }).catch(err => {throw new Error(err);});
    }

    static submitForm(type, formData) {
        return fetch(`${PROD}/request/${type}`, {
            method: 'POST',
            body: JSON.stringify(formData),
        }).then((res) => { 
            if (res.status === 200) {
                console.log("Success");
                return true;
            }
        }).catch((err) => { 
            console.error(err);
            return false;
        });
    }

    static buildAndSubmitRequestForm(formData) {
        if (formData.request === GRAPHIC_REQUEST_TYPE) {
            delete formData['rItem'];
            delete formData['request'];
            return this.submitFormWithUpload(GRAPHIC_REQUEST_TYPE, formData);
        } else {
            delete formData['notes'];;
            delete formData['request'];
            delete formData['selectedFile'];
            return this.submitForm(LOAN_REQUEST_TYPE, formData);
        }
    }
}
