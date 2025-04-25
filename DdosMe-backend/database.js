const { MongoClient } = require('mongodb');

let db = null; // This will hold our database connection

// Database connection function
const connect = async (mongoUrl) => {
    try {
        const client = new MongoClient(mongoUrl);
        await client.connect();
        db = client.db(); // Assign the connected database to the 'db' variable
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    return;
};

// Database disconnection function
const disconnect = async () => {
    try {
        if (db) {
            await db.close(); // Close the database connection
            console.log('Disconnected from MongoDB');
        }
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};

// Insert a document into a specific collection
const insert = async (collectionName, data) => {
    if (!data) {
        return;
    }

    try {
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(data);
        return result; // Return the inserted document
    } catch (error) {
        console.error(`Error inserting data into ${collectionName}:`, error);
        throw error;
    }
};

const insertMany = async (collectionName, data) => {
    if (!data || data.length === 0) {
        return;
    }

    try {
        const collection = db.collection(collectionName);
        const result = await collection.insertMany(data);
        return result; // Return the inserted document
    } catch (error) {
        console.error(`Error insertingMany data into ${collectionName}:`, error);
        throw error;
    }
};

// Get documents from a specific collection
const get = async (collectionName, query = {}) => {
    try {
        const collection = db.collection(collectionName);
        const results = await collection.find(query).toArray();
        return results;
    } catch (error) {
        console.error(`Error getting data from ${collectionName}:`, error);
        throw error;
    }
};

// Update a document in a specific collection
const update = async (collectionName, query, updateData) => {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.findOneAndUpdate(
            query,
            { $set: updateData },
            { returnOriginal: false }
        );
        return result; // Return the updated document
    } catch (error) {
        console.error(`Error updating data in ${collectionName}:`, error);
        throw error;
    }
};

const updateMany = async (collectionName, query, updateData) => {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.updateMany(
            query,
            { $set: updateData },
            { returnOriginal: false }
        );
        return result; // Return the updated document
    } catch (error) {
        console.error(`Error updating data in ${collectionName}:`, error);
        throw error;
    }
};

const addToArray = async (collectionName, query, updateData) => {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.findOneAndUpdate(
            query,
            { $push: updateData },
            { returnOriginal: false }
        )
    } catch (error) {
        console.error(`Error updating data in ${collectionName}:`, error);
        throw error;
    }
}

const removeFromArray = async (collectionName, query, updateData) => {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.findOneAndUpdate(
            query,
            { $pull: updateData },
            { returnOriginal: false }
        )
    } catch (error) {
        console.error(`Error updating data in ${collectionName}:`, error);
        throw error;
    }
}

// Delete a document from a specific collection
const deleteData = async (collectionName, query = {}) => {
    try {
        const collection = db.collection(collectionName);
        await collection.deleteOne(query);
        console.log(`Data deleted from ${collectionName}`);
    } catch (error) {
        console.error(`Error deleting data from ${collectionName}:`, error);
        throw error;
    }
};

// Export the functions
module.exports = {
    connect,
    disconnect,
    insert,
    insertMany,
    get,
    update,
    updateMany,
    addToArray,
    removeFromArray,
    delete: deleteData,
};