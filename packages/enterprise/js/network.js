function networkModule() {
  function setRequestLister(resolve, reject, xhr) {
    return function requestListener() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const obj = JSON.parse(xhr.responseText);
        resolve(obj)
      }
    }
  }

  function run() {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = setRequestLister(resolve, reject, xhr);
      xhr.onerror = function (e) { reject('error') }
      xhr.open('GET', 'https://63ef1aa7271439b7fe683af3.mockapi.io/news');
      xhr.send();
    });

    return promise;
  }

  return {
    run,
  };
}

window.networkModule = networkModule();
