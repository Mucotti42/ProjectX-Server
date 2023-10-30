const fs = require('fs');
const path = require('path');

const methodFiles = [];

const directoryPath = path.join(__dirname, 'functions');

fs.readdirSync(directoryPath).forEach((file) => {
    if (path.extname(file) === '.js') {
        methodFiles.push(file);
    }
});

exports.GetHandlers = function() {
    let messageHandlers = new Map;
    for (const methodFile of methodFiles) {
        const file = require(`./functions/${methodFile}`);
        for (const methodName in file) {
            if (typeof file[methodName] === 'function') {
                const method = file[methodName];
                messageHandlers.set(methodName, method);
            }
        }
    }
    return messageHandlers;
}