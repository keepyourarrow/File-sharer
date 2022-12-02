const customFetch = async (endpoint, method, onSuccess, onError, signal=null, body=null) => {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
    };

    if ( body ) {
        options.body = JSON.stringify(body);
    }

    if ( signal ) {
        options.signal = signal;
    }

    const url = `http://192.168.0.179:8000/${endpoint}`;
    console.log('url', url,options,);

    try {
        const response = await fetch(url, {
            ...options,
        });
        const data = await response.json();

        if ( onSuccess ) {
            onSuccess(data);
        }

    } catch (err) {
        onError(err)
    }
};

export default customFetch;