export const getBreed = className => className.split('_').map(p => {
    return p.charAt(0).toUpperCase() + p.slice(1)
}).join(' ');

export const getBreedImg = className => {
    const breed = className.split('_').map(p => {
        return p.charAt(0).toLowerCase() + p.slice(1)
    }).join('_')
    return `${process.env.PUBLIC_URL}/images/${breed}.jpg`
};

export const wait = ms => new Promise((res, rej) => {
    global.setTimeout(() => res(), ms)
});