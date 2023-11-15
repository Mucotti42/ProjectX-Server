const functionCoordinator = require('./functionCoordinator')
const messageHandlers = functionCoordinator.GetHandlers();

function handleMessage(messageType,client,data) {
    const handlerFunction = messageHandlers.get(messageType);
    if (handlerFunction) {
        handlerFunction(client,data);
    } else {
        console.log('Not identified message type:', messageType);
    }
}

module.exports = {
    handleMessage
};