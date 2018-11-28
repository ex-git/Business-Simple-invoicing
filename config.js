'use strict'

exports.PORT = process.env.PORT || 8080;
exports.DATABASE_URL = process.env.DATABASE || "mongodb://localhost/business";
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE || "mongodb://localhost/business-test";