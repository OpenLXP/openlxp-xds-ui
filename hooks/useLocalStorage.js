
export default function getLovalStorageValue(key) {
    return (window.localStorage.getItem(key));
}

export default function setLocalStorageValue(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}
