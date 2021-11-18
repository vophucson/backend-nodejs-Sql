const sql = require("mssql");
const { RoleConnection, noLoginConnection } = require("../auth/auth_dbms");
module.exports = {
    getShipServiceModel: async() => {
        let pool = await sql.connect(noLoginConnection());
        try {
            let res = await pool.request().query("select * from Ship");
            return res.recordset;
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    createShipServiceModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            let id = 0;
            let resId = await pool.request().query("select MAX(Id) as id from Ship");
            if (resId.recordset[0]["id"] == null) {
                id = 0;
            } else {
                id = resId.recordset[0]["id"];
            }
            await pool
                .request()
                .input("Id", sql.Int, id + 1)
                .input("shipName", sql.NVarChar(50), data.shipName)
                .input("shipDay", sql.Int, data.shipDay)
                .input("ShipPrice", sql.Int, data.ShipPrice)
                .execute("createshipservice");
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    deleteShipServiceModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            await pool
                .request()
                .input("Id", sql.Int, data)
                .execute("deleteshipservice");

        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
    updateShipServiceModel: async(data, token) => {
        let pool = await sql.connect(RoleConnection(token));
        try {
            await pool
                .request()
                .input("Id", sql.Int, data.Id)
                .input("shipName", sql.NVarChar(50), data.shipName)
                .input("shipDay", sql.Int, data.shipDay)
                .input("ShipPrice", sql.Int, data.ShipPrice)
                .execute("updateshipservice");
        } catch (error) {
            console.log(" mathus-error :" + error);
        } finally {
            await pool.close();
        }
    },
};