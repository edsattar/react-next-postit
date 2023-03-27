"use strict";
(() => {
var exports = {};
exports.id = 139;
exports.ids = [139,748];
exports.modules = {

/***/ 3227:
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 8922:
/***/ ((module) => {

module.exports = require("react-hot-toast");

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

/***/ 6367:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3227);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth_nextauth___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4952);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7488);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8922);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hot_toast__WEBPACK_IMPORTED_MODULE_4__);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction





async function handler(req, res) {
    if (req.method === "POST") {
        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(req, res, _auth_nextauth___WEBPACK_IMPORTED_MODULE_1__.authOptions);
        // Check if user is logged in
        if (!session?.user?.email) {
            //If user is not logged in alert user, return error
            //TODO: redirect to sign-in page
            react_hot_toast__WEBPACK_IMPORTED_MODULE_4___default().error("Please sign-in to create a post.");
            return res.status(401).json({
                message: "Please sign-in to create a post."
            });
        } else {
            //Get User
            const active_user = await _prisma_client__WEBPACK_IMPORTED_MODULE_3__/* ["default"].user.findUnique */ .Z.user.findUnique({
                where: {
                    email: session.user.email
                }
            });
            // Check if user is found in DB
            if (!active_user) {
                //If user is not found, sign out
                await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signOut)({
                    redirect: false,
                    callbackUrl: "/"
                });
                return res.status(403).json({
                    message: "Something went wrong"
                });
            } else {
                //Add to DB
                try {
                    const result = await _prisma_client__WEBPACK_IMPORTED_MODULE_3__/* ["default"].comment.create */ .Z.comment.create({
                        data: {
                            text: req.body.text,
                            postId: req.body.postId,
                            userId: active_user.id
                        }
                    });
                    res.status(200).json(result);
                    await _prisma_client__WEBPACK_IMPORTED_MODULE_3__/* ["default"].$disconnect */ .Z.$disconnect();
                } catch (err) {
                    res.status(401).json({
                        err: "Error"
                    });
                    await _prisma_client__WEBPACK_IMPORTED_MODULE_3__/* ["default"].$disconnect */ .Z.$disconnect();
                }
            }
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
var __webpack_exports__ = (__webpack_exec__(6367));
module.exports = __webpack_exports__;

})();