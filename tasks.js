// module.exports = function(orders) {
function findOrders(orders) {
    if (!orders) {
        return 0;
    }

    orders.sort((a, b) => a.executionTime - b.executionTime)
    console.log(orders)
    let currentTime = 0

    return orders.filter(order => {
        if (currentTime + order.executionTime > order.expiredAt) {
            return false;
        }

        currentTime += order.executionTime;
        return true;
    }).length
}

const orders1 = [
    { "index": "0000", "executionTime": 100, "expiredAt": 200 }, // 0
    { "index": "0001", "executionTime": 1000, "expiredAt": 1250 }, // 100
    { "index": "0002", "executionTime": 200, "expiredAt": 1300 }, // 1100
    { "index": "0003", "executionTime": 2000, "expiredAt": 3200 } // 1300
]
const orders2 = [{ "index": "0000", "executionTime": 1, "expiredAt": 2 }]
const orders3 = [{ "index": "0000", "executionTime": 3, "expiredAt": 2 }, { "index": "0001", "executionTime": 4, "expiredAt": 3 }]


console.log(findOrders(orders1))
// console.log(findOrders(orders2))
// console.log(findOrders(orders3))


