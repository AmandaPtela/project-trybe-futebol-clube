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
var teamsModel_1 = require("./teamsModel");
var Matches = /** @class */ (function (_super) {
    __extends(Matches, _super);
    function Matches() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Matches;
}(sequelize_1.Model));
Matches.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    homeTeam: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    homeTeamGoals: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    awayTeam: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    awayTeamGoals: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    inProgress: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    sequelize: _1["default"],
    modelName: 'matches',
    timestamps: false,
    underscored: true
});
teamsModel_1["default"].hasMany(Matches, {
    foreignKey: 'homeTeam',
    as: 'homeTeam'
});
Matches.belongsTo(teamsModel_1["default"], {
    foreignKey: 'homeTeam',
    as: 'home_team_id'
});
exports["default"] = Matches;
