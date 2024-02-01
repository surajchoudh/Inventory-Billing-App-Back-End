const username = 'surajchoudhary604';
const password = 'Kgfrocky@12345678';
const cluster = 'cluster0.oqccybg';
const database = 'InventoryBilling';
// mongodb + srv://:Kgfrocky@12345678@cluster0.oqccybg.mongodb.net/?retryWrites=true&w=majority
// Encode the components of the URI
const encodedUsername = encodeURIComponent(username);
const encodedPassword = encodeURIComponent(password);
const encodedCluster = encodeURIComponent(cluster);
const encodedDatabase = encodeURIComponent(database);

// Construct the MongoDB URI
const uri = `mongodb+srv://${encodedUsername}:${encodedPassword}@${encodedCluster}.mongodb.net/${encodedDatabase}?retryWrites=true&w=majority`;


module.exports = {
    "development": "mongodb://127.0.0.1:27017/InventoryBilling",
    "production": uri
}
