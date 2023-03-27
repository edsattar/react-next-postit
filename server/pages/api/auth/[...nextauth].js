"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 3227:
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ 4952:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "authOptions": () => (/* binding */ authOptions),
  "default": () => (/* binding */ _nextauth_)
});

// EXTERNAL MODULE: external "next-auth"
var external_next_auth_ = __webpack_require__(3227);
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_);
;// CONCATENATED MODULE: external "next-auth/providers/google"
const google_namespaceObject = require("next-auth/providers/google");
var google_default = /*#__PURE__*/__webpack_require__.n(google_namespaceObject);
;// CONCATENATED MODULE: external "@next-auth/prisma-adapter"
const prisma_adapter_namespaceObject = require("@next-auth/prisma-adapter");
// EXTERNAL MODULE: ./prisma/client.ts + 1 modules
var client = __webpack_require__(7488);
;// CONCATENATED MODULE: ./pages/api/auth/[...nextauth].js




const authOptions = {
    // Configure one or more authentication providers
    adapter: (0,prisma_adapter_namespaceObject.PrismaAdapter)(client/* default */.Z),
    providers: [
        google_default()({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ]
};
/* harmony default export */ const _nextauth_ = (external_next_auth_default()(authOptions));


/***/ }),

/***/ 7488:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ client)
});

;// CONCATENATED MODULE: external "@prisma/client"
const client_namespaceObject = require("@prisma/client");
;// CONCATENATED MODULE: ./prisma/client.ts

const prisma = global.prisma || new client_namespaceObject.PrismaClient();
if (true) global.prisma = prisma;
/* harmony default export */ const client = (prisma);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4952));
module.exports = __webpack_exports__;

})();