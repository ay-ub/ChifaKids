module.exports = (db, type) => {
    return db.define("waitingRoom", {
        arrivalTime: {
            type: type.DATE,
            allowNull: false,
        },
    })};