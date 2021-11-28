const request = {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    post() {}
}

export default request
