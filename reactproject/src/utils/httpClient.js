//http://visionmedia.github.io/superagent/
import request from 'superagent'


<<<<<<< HEAD
const LOCAL_SERVER = 'http://10.3.136.164:88';
=======

const LOCAL_SERVER = 'http://10.3.136.56:88';
>>>>>>> 993d50af509300041eac24075004479ad2fc7865


const DEV_SERVER = '';
const PRO_SERVER = '';

function getUrl(path) {
    if (path.startsWith('http') || path.startsWith('https')) {
        return path;
    }
    return `${LOCAL_SERVER}${path}`;
}
const HttpClient = {
    get: (path, query) => new Promise((resolve, reject) => {
        request
            .get(getUrl(path))
            .query(query)
            .end((err, res) => {
                if (err) {

                    reject(err);

<<<<<<< HEAD
                } else { 
=======
                } else {              
>>>>>>> 993d50af509300041eac24075004479ad2fc7865

                    resolve(res);
                }
            });
    }),
    post: (path, formdata, query) => new Promise((resolve, reject) => {
        request
            .post(getUrl(path))
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .query(query)
            .send(formdata)
            .end((err, res) => {
                if (err) {
                    
                    reject(err);
                } else {

                    resolve(res);
                }
            });
    })
};

export default HttpClient;

