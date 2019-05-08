export default async function syncDBStructure(connection) {

    const driver = connection;
    const qi = driver.queryInterface;

    const safeChanges = [];
    const unSafeChanges = [];

    const serviceFields = ["id", "droped", "isFolder",
        "booked", "Date", "parentId", "ownerId",
        "createdAt", "updatedAt", "deletedAt", "order"
    ];

    function changeColumn(model, tableName, modelCol, dbCol, rows) {

        let type;
        let length;
        if (dbCol.type.includes("CHARACTER VARYING")) {
            type = "STRING";
            const start = dbCol.type.indexOf("(") + 1;
            const end = dbCol.type.indexOf(")");
            length = parseInt(dbCol.type.substring(start, end));
        } else if (dbCol.type === "DATE") {
            type = "DATEONLY";
        } else if (dbCol.type === "TIMESTAMP WITH TIME ZONE") {
            type = "DATE";
        } else {
            type = dbCol.type;
        }

        if (type === "STRING" && modelCol.type.key === "STRING") {
            if (length === modelCol.type._length) {
                // nothing to change
            } else if (length < modelCol.type._length) {
                safeChanges.push({
                    action: "changeColumn",
                    message: "Object attribute modified (" + modelCol.field + ")",
                    tableName: tableName,
                    key: modelCol.field,
                    attribute: {
                        type: modelCol.type
                    },
                    model: model
                });
            } else {
                if (!rows) {
                    // table doesn't have rows, so we can change column without data loss
                    safeChanges.push({
                        action: "changeColumn",
                        message: "Object attribute modified (" + modelCol.field + ")",
                        tableName: tableName,
                        key: modelCol.field,
                        attribute: {
                            type: modelCol.type
                        },
                        model: model
                    });
                } else {
                    unSafeChanges.push({
                        action: "changeColumn",
                        message: "Object attribute modified (" + modelCol.field + ")",
                        tableName: tableName,
                        key: modelCol.field,
                        attribute: {
                            type: modelCol.type
                        },
                        model: model
                    });
                }
            }
        } else if (type === "REAL" && modelCol.type.key === "FLOAT") {
            // nothing to change
        } else if (type === "REAL" && modelCol.type.key === "DECIMAL") {
            // nothing to change
        } else if (type === modelCol.type.key) {
            // nothing to change
        } else {
            if (!rows) {
                // table doesn't have rows, so we can change column without data loss
                safeChanges.push({
                    action: "changeColumn",
                    message: "Object attribute modified (" + modelCol.field + ")",
                    tableName: tableName,
                    key: modelCol.field,
                    attribute: {
                        type: modelCol.type
                    },
                    model: model
                });
            } else {
                unSafeChanges.push({
                    action: "changeColumn",
                    message: "Object attribute modified (" + modelCol.field + ")",
                    tableName: tableName,
                    key: modelCol.field,
                    attribute: {
                        type: modelCol.type
                    },
                    model: model
                });
            }
        }
    }

    async function compareColumns(model, tableName, description, dbStructure) {
        model.fieldRawAttributesMap.forEach(async (modelCol) => {
            if (!description[modelCol.field]) {
                // table doesn't have such a column, so let's add it
                safeChanges.push({
                    action: "addColumn",
                    message: "Object attribute added (" + modelCol.field + ")",
                    tableName: tableName,
                    key: modelCol.field,
                    attribute: {
                        type: modelCol.type
                    },
                    model: model
                });
                // delete column from the list - it will allow us to detect those columns we need to delete
                try {
                    delete dbStructure[tableName][modelCol.field];
                } catch (err) {
                    Logger.debug("Error while comparing columns: " + err.message);
                }
            } else {
                // table in DB has such a column
                if (serviceFields.includes(modelCol.field)) {
                    // no needs to change service fields
                } else {
                    const dbCol = description[modelCol.field];
                    const rows = await model.count();
                    changeColumn(model, tableName, modelCol, dbCol, rows);
                    // delete column from the list - it will allow us to detect those columns we need to delete
                    try {
                        delete dbStructure[tableName][modelCol.field];
                    } catch (err) {
                        Logger.debug("Error while comparing columns: " + err.message);
                    }
                }
            }
        })
    }

    async function compareTables(driver, dbStructure) {
        driver.models.forEach(async (model) => {
            const tableName = model.tableName;
            if (!dbStructure[tableName]) {
                // DB doesn't have such a table, so let's create it
                safeChanges.push({
                    action: "createTable",
                    message: "New object added (" + model.tableName + ")",
                    tableName: model.tableName,
                    attributes: model.attributes,
                    options: model.options,
                    model: model
                });
            } else {
                const description = await qi.describeTable(tableName);
                // delete table from the list - it will allow us to detect those table we need to drop
                delete dbStructure[tableName];
                return compareColumns(model, tableName, description, dbStructure);
            }
        });
    }

    async function askChanges() {
        function log(message) {
            console.log(message);
        }

        const mainFunction = function (callback) {
            if (!safeChanges.length && !unSafeChanges.length) {
                return callback(null, 3);
            }

            log("----------------------------------------------------");
            log("Unsaved changes in application structure:".toUpperCase());
            log("----------------------------------------------------");

            if (safeChanges.length) {
                log("\x1b[32m" + "Safe changes:");
                safeChanges.forEach(change => {
                    log("  " + change.message + ": " + change.tableName);
                })
            }

            log(" ");

            if (unSafeChanges.length) {
                log("\x1b[31m" + "Unsafe changes (data loss possible):");
                unSafeChanges.forEach(change => {
                    log("  " + change.message + ": " + change.tableName);
                })
            }
            log("\x1b[0m" + "----------------------------------------------------");
            log(" ");

            const readline = require('readline');

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            function wrongAnswer() {
                rl.question("Please, type 'Y' or 'N':  ", (answer) => {
                    if (answer.toUpperCase() === "Y") {
                        rl.close();
                        callback(null, 1);
                    } else if (answer.toUpperCase() === "N") {
                        rl.close();
                        callback(null, 2);
                    } else {
                        wrongAnswer();
                    }
                });
            }

            rl.question('Do you want to execute listed changes? [Y/N]: ', (answer) => {
                if (answer.toUpperCase() === "Y") {
                    rl.close();
                    callback(null, 1);
                } else if (answer.toUpperCase() === "N") {
                    rl.close();
                    callback(null, 2);
                } else {
                    wrongAnswer();
                }
            });
        }

        return new Promise(function (resolve, reject) {
            mainFunction(function (error, result) {
                error ? reject(error) : resolve(result);
            });
        });
    }

    async function executeChanges() {

        var changes = safeChanges.concat(unSafeChanges);
        changes.forEach(async (change) => {
            switch (change.action) {
                case "createTable":
                    try {
                        await qi.createTable(change.tableName, change.attributes, change.options, change.model);
                        Logger.debug('Created object ' + change.model.name);
                    } catch (error) {
                        return Logger.error("Unsuccessful attempt to create object " + change.model.name);
                    }
                    break;
                case "addColumn":
                    try {
                        await qi.addColumn(change.tableName, change.key, change.attribute);
                        Logger.debug('Added attribute ' + change.key + ' to object ' + change.model.name);
                    } catch (error) {
                        return Logger.error("Unsuccessful attempt to add attribute " + change.key + " to object " + change.model.name);
                    }
                    break;
                case "changeColumn":
                    try {
                        await qi.changeColumn(change.tableName, change.key, change.attribute);
                        Logger.debug('Changed attribute ' + change.key + ' in object ' + change.model.name);
                    } catch (error) {
                        return Logger.error("Unsuccessful attempt to change attribute " + change.key + " in object " + change.model.name);
                    }
                    break;
            }
        })
    }

    const dbStructure = await connection.getDbStructure();
    await compareTables(driver, dbStructure);
    const result = await askChanges();
    if (result === 1) {
        await executeChanges();
        return;
    } else if (result === 2) {
        console.log(" ");
        console.log("\x1b[33m" + "Application starting without sincronizing database structure!" + "\x1b[0m");
        return;
    } else {
        // NOTHING TO DO
        return;
    }
}