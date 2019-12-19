import axios from 'axios'
import config from "../util/config";

export const ELASTIC_URL = config.elasticUrl
export const ELASTIC_CREDENTIALS = config.elasticCredentials ? config.elasticCredentials : ''

class OersApi {

    getDocument(id) {
        return axios.get(
            `${ELASTIC_URL}/oers/_source/${id}`,
            {
                'Authorization': ELASTIC_CREDENTIALS ? 'Basic ' + btoa(ELASTIC_CREDENTIALS) : ''
            }
        )
    }

    updateDocumentViews(id) {
        return axios.post(
            `${ELASTIC_URL}/oers/_update/${id}`,
            {
                script: {
                    source: "ctx._source.views += params.ttl",
                    lang: "painless",
                    params: {
                        ttl: 1
                    }
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ELASTIC_CREDENTIALS ? 'Basic ' + btoa(ELASTIC_CREDENTIALS) : ''
                }

            })
    }
}

export default new OersApi()
