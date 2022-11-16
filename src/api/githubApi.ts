import axios from 'axios'


export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        // Authorization: 'Bearer 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'
    }
})