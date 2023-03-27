"use strict";
(() => {
var exports = {};
exports.id = 855;
exports.ids = [855];
exports.modules = {

/***/ 4485:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7488);

async function handler(req, res) {
    if (req.method === "GET" && typeof req.query.details === "string") {
        // GET /api/posts/123
        try {
            const post = await _prisma_client__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post.findUnique */ .Z.post.findUnique({
                where: {
                    id: req.query.details
                },
                include: {
                    user: true,
                    comments: {
                        include: {
                            user: true
                        },
                        orderBy: {
                            createdAt: "desc"
                        }
                    }
                }
            });
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({
                error: "error"
            });
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
var __webpack_exports__ = (__webpack_exec__(4485));
module.exports = __webpack_exports__;

})();