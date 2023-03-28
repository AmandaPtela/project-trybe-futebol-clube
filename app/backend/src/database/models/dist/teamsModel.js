"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var _1 = require(".");
var Teams = /** @class */ (function (_super) {
    __extends(Teams, _super);
    function Teams() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Teams;
}(sequelize_1.Model));
Teams.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    teamName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: _1["default"],
    modelName: 'teams',
    timestamps: false,
    underscored: true
});
exports["default"] = Teams;
