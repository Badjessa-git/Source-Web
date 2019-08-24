const PROD = "https://us-central1-source-d3c30.cloudfunctions.net/app";
const DEV = "http://localhost:5000/source-d3c30/us-central1/app";
export default class DataFetcher {
    static grabRequestData(type) {
        return fetch(`${DEV}/getAllRequest/${type}`,{
            method: 'GET',
        }).then((res) =>{
            if (res.status === 200) {
                return res.json().then(data => {
                    return data;
                })
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
}