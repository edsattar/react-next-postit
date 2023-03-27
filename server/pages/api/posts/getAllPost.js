"use strict";
(() => {
var exports = {};
exports.id = 955;
exports.ids = [955];
exports.modules = {

/***/ 9379:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7488);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

async function handler(req, res) {
    if (req.method === "GET") {
        //Fetch all Post
        try {
            const result = await _prisma_client__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post.findMany */ .Z.post.findMany({
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            // place result in res state
            res.status(200).json(result);
            await _prisma_client__WEBPACK_IMPORTED_MODULE_0__/* ["default"].$disconnect */ .Z.$disconnect();
        } catch (err) {
            res.status(403).json({
                err: "Error Fetching"
            });
            await _prisma_client__WEBPACK_IMPORTED_MODULE_0__/* ["default"].$disconnect */ .Z.$disconnect();
        }
    }
}


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
var __webpack_exports__ = (__webpack_exec__(9379));
module.exports = __webpack_exports__;

})();