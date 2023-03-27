(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[702],{5557:function(e,t,s){Promise.resolve().then(s.bind(s,7633)),Promise.resolve().then(s.bind(s,5064)),Promise.resolve().then(s.bind(s,5002)),Promise.resolve().then(s.bind(s,4765)),Promise.resolve().then(s.bind(s,5974))},79:function(e,t,s){"use strict";s.d(t,{Z:function(){return x}});var l=s(9268),n=s(6394),r=s.n(n),o=s(5846),i=s.n(o),a=s(8919);function d(e){let{deletePost:t,setToggle:s}=e;return(0,l.jsx)("div",{onClick:e=>{e.stopPropagation(),s(!1)},className:"fixed bg-black/30 w-full h-full z-20 left-0 top-0 ",children:(0,l.jsxs)("div",{className:"absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6",children:[(0,l.jsx)("h2",{className:"text-xl",children:"Are you sure you want to delete this post? \uD83D\uDE25"}),(0,l.jsx)("h3",{className:"text-red-600 text-sm",children:"Pressing the delete button will permenantly delete your post"}),(0,l.jsx)("button",{onClick:t,className:"bg-red-600 text-sm text-white py-2 px-4 rounded-md",children:"Delete Post"})]})})}var c=s(6006),u=s(5194),m=s(8867),h=s(4214);function x(e){var t;let{post:s,allowEdit:n}=e,[o,x]=(0,c.useState)(!1),p=(0,u.NL)(),{mutate:f}=(0,m.D)(async e=>await h.Z.delete("/api/posts/deletePost",{data:e}),{onSuccess:()=>{a.Am.remove(),a.Am.success("Post Deleted"),console.log("deleted"),p.invalidateQueries(["userPosts"]),p.invalidateQueries(["allPosts"]),p.invalidateQueries(["postDetail"])},onError:e=>{console.log("ERROR!!!")}}),g=()=>{a.Am.loading("Deleting Post..."),f(s.id)};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"bg-white my-8 p-8 rounded-lg ",children:[(0,l.jsxs)("div",{className:"flex items-center gap-2",children:[(0,l.jsx)(r(),{className:"rounded-full",width:32,height:32,src:s.user.image,alt:"avatar"}),(0,l.jsx)("h3",{className:"font-bold text-gray-700",children:s.user.name})]}),(0,l.jsx)("div",{className:"my-8 ",children:(0,l.jsx)("p",{className:"break-all",children:s.title})}),(0,l.jsxs)("div",{className:"flex gap-4 cursor-pointer items-center",children:[(0,l.jsx)(i(),{href:{pathname:"/post/".concat(s.id)},children:(0,l.jsxs)("p",{className:" text-sm font-bold text-gray-700",children:[null===(t=s.comments)||void 0===t?void 0:t.length," Comments"]})}),n&&(0,l.jsx)("button",{onClick:e=>x(!0),className:" text-sm font-bold text-red-500",children:"Delete"})]})]}),o&&(0,l.jsx)(d,{deletePost:g,setToggle:x})]})}},5974:function(e,t,s){"use strict";s.r(t),s.d(t,{UserPosts:function(){return i}});var l=s(9268),n=s(4214),r=s(79),o=s(9677);let i=()=>{let e=async()=>{let{data:e}=await n.Z.get("/api/posts/getUserPosts");return e},{data:t,isLoading:s,isError:i}=(0,o.a)(["userPosts"],e);return s?(0,l.jsx)("p",{children:"Loading..."}):i?(0,l.jsx)("p",{children:"Error"}):(0,l.jsx)("div",{children:null==t?void 0:t.map(e=>(0,l.jsx)(r.Z,{post:e,allowEdit:!0},e.id))})}},4765:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.suspense=function(){let e=Error(l.NEXT_DYNAMIC_NO_SSR_CODE);throw e.digest=l.NEXT_DYNAMIC_NO_SSR_CODE,e},t.NoSSR=function(e){let{children:t}=e;return t},(0,s(8644).Z)(s(6006));var l=s(4414)}},function(e){e.O(0,[951,160,455,744],function(){return e(e.s=5557)}),_N_E=e.O()}]);