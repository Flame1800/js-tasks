function onionWrapper(stringOrFunction) {
    let cities = []
    let taxFn = null

    cities.push(stringOrFunction)

    const superWrapper = (nextCity) => {
        if (!nextCity) {
            const uniqueArray = [...new Set(cities)];
            return taxFn(uniqueArray)
        }

        cities = cities.filter(city => city !== nextCity)
        return superWrapper
    }

    const wrapper = (nextCity) => {
        if (typeof nextCity === 'function') {
            taxFn = nextCity;
            return superWrapper;
        }

        cities.push(nextCity)
        return wrapper;
    }

    return wrapper
}

const taxFunc = (cities) => console.log('taxes cities: ', cities)
const superOnion = onionWrapper('city1')('city2')('city3')(taxFunc)

superOnion('city1')()


module.exports = onionWrapper;