const baseurl = 'http://localhost:3030'

export default function useFetch() {
    const request = async (url, method, data) => {
        let options = {};

        if (method) {
            options.method = method;
        }

        if (data) {
            options.headers = {
                'content-type': 'application/json'
            };
            options.body = JSON.stringify(data)
        }

        const response = await fetch(`${baseurl}${url}`, options);

        if (!response.ok) {
            throw response.statusText;
        }

        const result = await response.json();

        return result;
    }

    return {
        request,
    }
};