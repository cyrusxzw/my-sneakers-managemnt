(this["webpackJsonpmy-sneakers"]=this["webpackJsonpmy-sneakers"]||[]).push([[0],{418:function(e,t,a){},422:function(e,t,a){},424:function(e,t,a){},449:function(e,t,a){},470:function(e,t,a){},543:function(e,t,a){},554:function(e,t,a){},555:function(e,t,a){},556:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(55),s=a.n(i),r=(a(418),a(189),a(75)),o=(a(190),a(47)),l=a(183),d=a(61),u=(a(304),a(76)),h=a(91),j=a(92),b=a(112),f=a(110),p=(a(422),a.p+"static/media/logo.01ef544c.svg"),m=a(10),O=function(){return Object(m.jsx)("div",{className:"logo-container",children:Object(m.jsx)("img",{src:p,alt:"logo"})})},x=(a(424),a(565)),y=a(566),v=a(567),g=function(e){Object(b.a)(a,e);var t=Object(f.a)(a);function a(){for(var e,n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return Object(h.a)(this,a),(e=t.call.apply(t,[this].concat(c))).state={theme:"dark",collapsed:!1},e.onReSize=function(){window.innerWidth<1180?e.setState({collapsed:!0}):e.setState({collapsed:!1})},e.debounce=function(e,t){var a=null;return function(){var n=arguments,c=this;a&&clearTimeout(a),a=setTimeout((function(){e(c,n),a=null}),t)}},e}return Object(j.a)(a,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.debounce(this.onReSize,500)),this.onReSize()}},{key:"render",value:function(){return Object(m.jsxs)("div",{children:[Object(m.jsx)(O,{}),Object(m.jsxs)(u.a,{mode:"inline",inlineCollapsed:this.state.collapsed,className:"menu-container",theme:this.state.theme,style:{height:"100vh"},children:[Object(m.jsx)(u.a.Item,{className:"menu-title",icon:Object(m.jsx)(x.a,{}),children:Object(m.jsx)(l.b,{to:"/",children:"\u9996\u9875"})},"1"),Object(m.jsx)(u.a.Item,{className:"menu-title",icon:Object(m.jsx)(y.a,{}),children:Object(m.jsx)(l.b,{to:"/managment",children:"\u6570\u636e\u7edf\u8ba1"})},"2"),Object(m.jsx)(u.a.Item,{className:"menu-title",icon:Object(m.jsx)(v.a,{}),children:Object(m.jsx)(l.b,{to:"/report",children:"\u6570\u636e\u5206\u6790"})},"3")]})]})}}]),a}(c.a.Component),w=(a(383),a(140)),S=(a(432),a(157)),k=(a(287),a(62)),D=(a(307),a(104)),_=(a(557),a(398)),Y=(a(143),a(51)),I=(a(295),a(103)),C=(a(309),a(35)),M=(a(446),a(141)),R=(a(310),a(156)),F=a(40),N=a(188),P=(a(449),a(388)),V=a.n(P),T=a(45),A=a.n(T),z=a(114),B=a.n(z),L=(a(470),function(){function e(){Object(h.a)(this,e)}return Object(j.a)(e,null,[{key:"ajax",value:function(e){var t=document.getElementById("ajaxLoading");return e.isShowLoading&&(t.style.display="block"),new Promise((function(a,n){B()({url:e.url,method:e.method,timeout:5e3,data:e.data,headers:e.headers}).then((function(e){t.style.display="none",200===e.status||201===e.status?a(e):n(new Error("\u8fde\u63a5\u9519\u8bef\uff0c\u65e0\u6cd5\u8bbf\u95ee\u6570\u636e\uff01"))})).catch((function(){return console.log("\u51fa\u9519\u5566")}))}))}}]),e}()),q={getTotalPages:function(e){for(var t=[],a=1;a<=e;a++)t.push(a);return t},pagination:function(e,t,a,n){return{onChange:function(e){n(e)},pageSizeOptions:[10],current:e,pageSize:10,total:t,showTotal:function(){return"\u5171".concat(a,"\u6761")},showQuickJumper:!0}}},K=function(e){Object(b.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).formRef=c.a.createRef(),e.onReset=function(){var t=e.formRef.current.getFieldsValue();console.log(t),e.props.request(),e.formRef.current.resetFields()},e.handleMatch=function(){var t=e.props.dataSource,a=e.formRef.current.getFieldValue("keywords"),n=e.formRef.current.getFieldValue("stock"),c=e.formRef.current.getFieldValue("start"),i=e.formRef.current.getFieldValue("end"),s=[];a||c||i||"all"!==n?("all"!==n?a&&c||a&&i?s=t.filter((function(e){return e.title.rendered.includes(a)&&n===e.acf.status&&c.isSameOrBefore(A()(e.acf.buy_date,"DD-MM-YYYY"),"day")&&A()(e.acf.buy_date,"DD-MM-YYYY").isBefore(i)})):a?(s=t.filter((function(e){return e.title.rendered.includes(a)&&n===e.acf.status})),console.log(s)):s=c||i?t.filter((function(e){return n===e.acf.status&&c.isSameOrBefore(A()(e.acf.buy_date,"DD-MM-YYYY"),"day")&&A()(e.acf.buy_date,"DD-MM-YYYY").isBefore(i)})):t.filter((function(e){return n===e.acf.status})):a&&c||a&&i?s=t.filter((function(e){return e.title.rendered.includes(a)&&c.isSameOrBefore(A()(e.acf.buy_date,"DD-MM-YYYY"),"day")&&A()(e.acf.buy_date,"DD-MM-YYYY").isBefore(i)})):a?(s=t.filter((function(e){return e.title.rendered.includes(a)})),console.log(s)):(c||i)&&(s=t.filter((function(e){return c.isSameOrBefore(A()(e.acf.buy_date,"DD-MM-YYYY"),"day")&&A()(e.acf.buy_date,"DD-MM-YYYY").isBefore(i)}))),0===s.length?R.a.error({title:"\u5bf9\u4e0d\u8d77\uff0c\u67e5\u65e0\u6b64\u978b\uff01",okText:"\u8fd4\u56de",onOk:function(){e.onReset()}}):e.props.handleSearch(s)):e.props.handleSearch(t)},e}return Object(j.a)(a,[{key:"render",value:function(){return Object(m.jsx)(I.a,{children:Object(m.jsxs)(C.a,Object(F.a)(Object(F.a)({},this.formItemLayout),{},{layout:"inline",ref:this.formRef,initialValues:{stock:"all"},children:[Object(m.jsx)(C.a.Item,{label:"\u5173\u952e\u5b57",name:"keywords",children:Object(m.jsx)(D.a,{placeholder:"\u8bf7\u8f93\u5165\u978b\u6b3e\u540d\u79f0"})}),Object(m.jsxs)(C.a.Item,{label:"\u4e70\u5165\u65f6\u95f4",children:[Object(m.jsx)(C.a.Item,{style:{display:"inline-block",marginRight:0},name:"start",children:Object(m.jsx)(w.a,{placeholder:"\u8d77\u59cb\u65f6\u95f4",style:{width:130}})}),Object(m.jsx)("span",{style:{display:"inline-block",width:"24px",lineHeight:"32px",textAlign:"center"},children:" - "}),Object(m.jsx)(C.a.Item,{style:{display:"inline-block",marginRight:0},name:"end",children:Object(m.jsx)(w.a,{placeholder:"\u7ec8\u6b62\u65f6\u95f4",style:{width:130}})})]}),Object(m.jsx)(C.a.Item,{label:"\u5e93\u5b58",name:"stock",children:Object(m.jsxs)(k.a,{style:{width:100},children:[Object(m.jsx)(k.a.Option,{value:"all",children:"\u5168\u90e8"}),Object(m.jsx)(k.a.Option,{value:"\u5df2\u5356",children:"\u5df2\u5356"}),Object(m.jsx)(k.a.Option,{value:"\u5df2\u6536\u5b9a\u91d1",children:"\u5df2\u6536\u5b9a\u91d1"}),Object(m.jsx)(k.a.Option,{value:"\u672a\u5356",children:"\u672a\u5356"})]})}),Object(m.jsx)(C.a.Item,{children:Object(m.jsx)(Y.a,{type:"primary",onClick:this.handleMatch,children:"\u67e5\u8be2"})}),Object(m.jsx)(C.a.Item,{children:Object(m.jsx)(Y.a,{onClick:this.onReset,children:"\u91cd\u7f6e"})})]}))})}}]),a}(c.a.Component),E=function(e){Object(b.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).state={dataSource:[],totalPage:null,currentPage:1,totalRecords:null,authenticKey:null,selectedRowKeys:[],selectedRows:[],visible:!1,editVisible:!1,addVisible:!1,deleteConfirmVisible:!1,buttonDisabled:!0,hiddenDeposit:!0,disabled:!0,bounds:{left:0,top:0,bottom:0,right:0}},e.draggleRef=c.a.createRef(),e.onStart=function(t,a){var n,c,i,s,r=null===(n=window)||void 0===n||null===(c=n.document)||void 0===c?void 0:c.documentElement,o=r.clientWidth,l=r.clientHeight,d=null===(i=e.draggleRef)||void 0===i||null===(s=i.current)||void 0===s?void 0:s.getBoundingClientRect();e.setState({bounds:{left:-(null===d||void 0===d?void 0:d.left)+(null===a||void 0===a?void 0:a.x),right:o-((null===d||void 0===d?void 0:d.right)-(null===a||void 0===a?void 0:a.x)),top:-(null===d||void 0===d?void 0:d.top)+(null===a||void 0===a?void 0:a.y),bottom:l-((null===d||void 0===d?void 0:d.bottom)-(null===a||void 0===a?void 0:a.y))}}),console.log("123")},e.formItemLayout={labelCol:{span:8},wrapperCol:{span:16}},e.selectedLayout={span:12},e.request=function(){L.ajax({url:"https://solegood.com.au/wp-json/wp/v2/posts",method:"get",isShowLoading:!0}).then((function(t){var a=q.getTotalPages(t.headers["x-wp-totalpages"]),n=t.headers["x-wp-total"],c=a.map((function(e){return L.ajax({url:"https://solegood.com.au/wp-json/wp/v2/posts?page=".concat(e),method:"get",isShowLoading:!0})}));B.a.all(c).then(B.a.spread((function(){for(var t=arguments.length,a=new Array(t),c=0;c<t;c++)a[c]=arguments[c];var i=a.every((function(e){return 200===e.status}));if(i){var s=Object(N.a)(a.map((function(e){return e.data}))),r=s.flat(),o=r.length,l=r.map((function(e,t){return e.key=t,e=Object(F.a)(Object(F.a)({},e),{},{newId:o-t})}));e.setState({totalRecords:n,selectedRowKeys:[],selectedRows:[],dataSource:l,buttonDisabled:!0,deleteConfirmVisible:!1})}else R.a.error({visible:e.state.visible,title:"\u9519\u8bef",content:"\u8fde\u63a5\u9519\u8bef\uff0c\u65e0\u6cd5\u8bbf\u95ee\u6570\u636e\uff01",okText:"\u53d6\u6d88"})}))).catch((function(e){return new Error("\u6570\u636e\u65e0\u6cd5\u52a0\u8f7d\uff01\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458\uff01---".concat(e))}))}))},e.authentic=function(){L.ajax({url:"https://solegood.com.au/wp-json/jwt-auth/v1/token",method:"post",isShowLoading:!1,data:{username:"cyrusxzw",password:"P@55word!@#"},headers:{"Content-Type":"application/json",accept:"application/json"}}).then((function(e){return e.data})).then((function(t){e.setState({authenticKey:t.token})}))},e.formUpdate=c.a.createRef(),e.onOpenAdd=function(){e.setState({addVisible:!0,hiddenDeposit:!0})},e.onFinish=function(t){e.addNewSneaker(t)},e.addNewSneaker=function(t){var a=e.state.authenticKey;L.ajax({url:"https://solegood.com.au/wp-json/wp/v2/posts",method:"post",isShowLoading:!1,headers:{"Content-Type":"application/json",accept:"application/json",Authorization:"Bearer ".concat(a)},data:{title:t.sneaker,content:"",status:"publish",acf_fields:{size:t.size,buy_price:t.buyPrice,buy_date:t.buyDate,buyer:t.buyer,status:t.status,deposit_amount:t.depositAmount,sold_date:t.soldDate,sold_price:t.soldPrice,remarks:t.remarks}}}).then((function(t){var a=t.data.title.rendered;e.setState({addVisible:!1}),e.request(),M.b.success("\u978b\u6b3e: ".concat(a,"\uff0c\u5df2\u7ecf\u6210\u529f\u6dfb\u52a0!"))}))},e.onOpenDelete=function(){e.setState({deleteConfirmVisible:!0})},e.onDelete=function(){var t=e.state,a=t.selectedRows,n=t.authenticKey,c=a.map((function(e){return e.id})),i=a.map((function(e){return e.newId})),s=c.map((function(e){return L.ajax({url:"https://solegood.com.au/wp-json/wp/v2/posts/".concat(e,"?force=true"),isShowLoading:!0,method:"delete",headers:{"Content-Type":"application/json",accept:"application/json",Authorization:"Bearer ".concat(n)}})}));B.a.all(s).then(B.a.spread((function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];var c=a.every((function(e){return 200===e.status}));c?(e.setState({selectedRowKeys:[],selectedRows:[],buttonDisabled:!0}),e.request(),M.b.success("\u8bb0\u5f55:".concat(i,"\u5df2\u7ecf\u6210\u529f\u5220\u9664\uff01"))):M.b.error("\u5220\u9664\u5931\u8d25\u4e86\uff01")}))).catch((function(e){return new Error("\u5931\u8d25\u4e86\uff01\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458\uff01---".concat(e))}))},e.onOpenEdit=function(){var t=e.state,a=t.selectedRowKeys,n=t.selectedRows;if(a.length>1)M.b.error("\u53ea\u80fd\u9009\u62e9\u4e00\u884c\u8fdb\u884c\u7f16\u8f91\uff01");else{e.setState({editVisible:!0});var c=e.formUpdate.current,i=n[0].acf,s={sneaker:n[0].title.rendered,size:i.size,status:i.status,buyPrice:i.buy_price,soldPrice:i.sold_price,buyDate:A()(i.buy_date,"DD-MM-YYYY"),soldDate:i.sold_date?A()(i.sold_date,"DD-MM-YYYY"):"",buyer:i.buyer,remarks:i.remarks},r=null;"\u5df2\u6536\u5b9a\u91d1"===i.status?(r=Object(F.a)(Object(F.a)({},s),{},{depositAmount:i.deposit_amount}),e.setState({hiddenDeposit:!1})):(r=Object(F.a)(Object(F.a)({},s),{},{depositAmount:""}),e.setState({hiddenDeposit:!0})),e.setState({initialValues:r}),c&&("\u5df2\u6536\u5b9a\u91d1"===i.status?(e.formUpdate.current.setFieldsValue(Object(F.a)(Object(F.a)({},s),{},{depositAmount:i.deposit_amount})),e.setState({hiddenDeposit:!1})):(e.formUpdate.current.setFieldsValue(Object(F.a)(Object(F.a)({},s),{},{depositAmount:""})),e.setState({hiddenDeposit:!0})))}},e.editSneakerForm=function(t){var a=e.state,n=a.authenticKey,c=a.selectedRows[0].id;t.buyDate&&t.buyDate.add(1,"day"),t.soldDate&&t.soldDate.add(1,"day"),e.setState({editVisible:!1}),L.ajax({url:"https://solegood.com.au/wp-json/wp/v2/posts/".concat(c),method:"put",isShowLoading:!1,headers:{"Content-Type":"application/json",accept:"application/json",Authorization:"Bearer ".concat(n)},data:{title:t.sneaker,content:"",acf_fields:{size:t.size,buy_price:t.buyPrice,buy_date:t.buyDate,buyer:t.buyer,status:t.status,deposit_amount:t.depositAmount,sold_date:t.soldDate,sold_price:t.soldPrice,remarks:t.remarks}}}).then((function(t){e.request(),M.b.success("\u5df2\u7ecf\u6210\u529f\u7f16\u8f91!")}))},e.onSelectChange=function(t,a){console.log(t.length),0===t.length?e.setState({selectedRowKeys:t,selectedRows:a,buttonDisabled:!0}):e.setState({selectedRowKeys:t,selectedRows:a,buttonDisabled:!1})},e.onRowClick=function(t){var a=Object(N.a)(e.state.selectedRowKeys),n=Object(N.a)(e.state.selectedRows);a.indexOf(t.key)>=0?(a.splice(a.indexOf(t.key),1),n.splice(n.indexOf(t),1)):(a.push(t.key),n.push(t));var c=!(a.length>0);e.setState({selectedRowKeys:a,selectedRows:n,buttonDisabled:c})},e.onStatusChange=function(t){"\u5df2\u6536\u5b9a\u91d1"===t?e.setState({hiddenDeposit:!1}):e.setState({hiddenDeposit:!0})},e.handleSearch=function(t){e.setState({dataSource:t})},e}return Object(j.a)(a,[{key:"componentDidMount",value:function(){this.request(),this.authentic()}},{key:"render",value:function(){var e=this,t=this.state,a=t.selectedRowKeys,n=t.selectedRows,c=t.dataSource,i=[{title:"id",dataIndex:"newId",key:"newId"},{title:"\u978b\u6b3e",dataIndex:"title",key:"sneaker",render:function(e){return e.rendered}},{title:"\u5c3a\u7801",dataIndex:"acf",key:"size",render:function(e){return e.size}},{title:"\u72b6\u6001",dataIndex:"acf",key:"status",render:function(e){return"\u5df2\u6536\u5b9a\u91d1"===e.status?"".concat(e.status,": ").concat(e.deposit_amount):e.status}},{title:"\u4e70\u5165\u4ef7",dataIndex:"acf",key:"buyPrice",render:function(e){return e.buy_price}},{title:"\u5356\u51fa\u4ef7",dataIndex:"acf",key:"soldPrice",render:function(e){return e.sold_price}},{title:"\u4e70\u5165\u65f6\u95f4",dataIndex:"acf",key:"buyDate",render:function(e){return e.buy_date},sorter:function(e,t){return A()(e.acf.buy_date,"DD-MM-YYYY").unix()-A()(t.acf.buy_date,"DD-MM-YYYY").unix()}},{title:"\u5356\u51fa\u65f6\u95f4",dataIndex:"acf",key:"soldDate",render:function(e){return e.sold_date}},{title:"\u4e70\u5bb6",dataIndex:"acf",key:"buyer",render:function(e){return e.buyer}},{title:"\u5229\u6da6",dataIndex:"acf",key:"profit",sorter:function(e,t){return("undefined"==typeof e.acf.sold_price?0-e.acf.buy_price:e.acf.sold_price-e.acf.buy_price)-("undefined"==typeof t.acf.sold_price?0-t.acf.buy_price:t.acf.sold_price-t.acf.buy_price)},render:function(e){return e.sold_price?e.sold_price-e.buy_price:0-e.buy_price}},{title:"\u5907\u6ce8",dataIndex:"acf",key:"remarks",render:function(e){return e.remarks}}],s={selectedRowKeys:a,onChange:this.onSelectChange},l=n.map((function(t,a){var n={title:"\u6240\u9009\u978b\u6b3e id: ".concat(t.newId)};return Object(m.jsx)("div",{className:"confrim-delete",children:Object(m.jsx)(I.a,Object(F.a)(Object(F.a)({},n),{},{children:Object(m.jsx)(C.a,{children:Object(m.jsxs)(r.a,{children:[Object(m.jsx)(o.a,Object(F.a)(Object(F.a)({},e.selectedLayout),{},{children:Object(m.jsx)(C.a.Item,{label:"\u978b\u6b3e",children:t.title.rendered})})),Object(m.jsx)(o.a,Object(F.a)(Object(F.a)({},e.selectedLayout),{},{children:Object(m.jsx)(C.a.Item,{label:"\u5c3a\u7801",children:t.acf.size})})),Object(m.jsx)(o.a,Object(F.a)(Object(F.a)({},e.selectedLayout),{},{children:Object(m.jsx)(C.a.Item,{label:"\u4e70\u5165\u4ef7\u683c",children:t.acf.buy_price})})),Object(m.jsx)(o.a,Object(F.a)(Object(F.a)({},e.selectedLayout),{},{children:Object(m.jsx)(C.a.Item,{label:"\u662f\u5426\u5356\u51fa",children:t.acf.status})}))]})})}))},a)})),d={disabled:this.state.buttonDisabled?"disabled":""};return Object(m.jsxs)("div",{className:"table-container",children:[Object(m.jsx)(K,{dataSource:this.state.dataSource,handleSearch:this.handleSearch,request:this.request}),Object(m.jsxs)(I.a,{className:"inner-table",children:[Object(m.jsxs)("div",{className:"btn-container",children:[Object(m.jsx)(Y.a,{type:"primary",onClick:this.onOpenAdd,children:"\u6dfb\u52a0\u8bb0\u5f55"}),Object(m.jsx)(Y.a,Object(F.a)(Object(F.a)({danger:!0,onClick:this.onOpenDelete},d),{},{children:"\u5220\u9664\u8bb0\u5f55"})),Object(m.jsx)(Y.a,Object(F.a)(Object(F.a)({type:"primary",ghost:!0,onClick:this.onOpenEdit},d),{},{children:"\u7f16\u8f91\u8bb0\u5f55"}))]}),Object(m.jsx)(_.a,{columns:i,dataSource:c,rowSelection:s,pagination:q.pagination(this.state.currentPage,this.state.totalPage,this.state.totalRecords,(function(t){e.setState({currentPage:t})})),onRow:function(t){return{onClick:function(){e.onRowClick(t)}}}})]}),Object(m.jsx)(R.a,{visible:this.state.addVisible,title:Object(m.jsx)("div",{style:{width:"100%",cursor:"move"},onMouseOver:function(){d&&e.setState({disabled:!1})},onMouseOut:function(){e.setState({disabled:!0})},onFocus:function(){},onBlur:function(){},children:"\u6dfb\u52a0\u8bb0\u5f55"}),onCancel:function(){e.setState({addVisible:!1})},footer:[Object(m.jsx)(Y.a,{onClick:function(){e.setState({addVisible:!1})},children:"\u53d6\u6d88"},"cancel"),Object(m.jsx)(Y.a,{form:"addSneakerForm",htmlType:"submit",children:"\u786e\u5b9a"},"submit")],modalRender:function(t){return Object(m.jsx)(V.a,{disabled:e.state.disabled,bounds:e.state.bounds,onStart:function(t,a){return e.onStart(t,a)},children:Object(m.jsx)("div",{ref:e.draggleRef,children:t})})},children:Object(m.jsx)("div",{className:"add-content-container",children:Object(m.jsxs)(C.a,{id:"addSneakerForm",onFinish:this.onFinish,children:[Object(m.jsx)(C.a.Item,{label:"\u978b\u6b3e",name:"sneaker",rules:[{required:!0,message:"\u4ea7\u54c1\u540d\u5fc5\u987b\u586b\u5199!"}],children:Object(m.jsx)(D.a,{})}),Object(m.jsx)(C.a.Item,{label:"\u5c3a\u7801",name:"size",children:Object(m.jsx)(D.a,{})}),Object(m.jsx)(C.a.Item,{label:"\u72b6\u6001",name:"status",children:Object(m.jsxs)(k.a,{placeholder:"\u8bf7\u9009\u62e9",onChange:this.onStatusChange,children:[Object(m.jsx)(k.a.Option,{value:"\u5df2\u5356",children:"\u5df2\u5356"}),Object(m.jsx)(k.a.Option,{value:"\u5df2\u6536\u5b9a\u91d1",children:"\u5df2\u6536\u5b9a\u91d1"}),Object(m.jsx)(k.a.Option,{value:"\u672a\u5356",children:"\u672a\u5356"})]})}),Object(m.jsx)(C.a.Item,{hidden:this.state.hiddenDeposit,label:"\u4ed8\u4e86\u591a\u5c11\u5b9a\u91d1?",name:"depositAmount",children:Object(m.jsx)(S.a,{min:0,style:{width:"100%"}})}),Object(m.jsx)(C.a.Item,{label:"\u4e70\u5165\u4ef7",name:"buyPrice",rules:[{required:!0,message:"\u4e70\u5165\u4ef7\u5fc5\u987b\u586b\u5199!"}],children:Object(m.jsx)(S.a,{min:0,style:{width:"100%"}})}),Object(m.jsx)(C.a.Item,{label:"\u5356\u51fa\u4ef7",name:"soldPrice",children:Object(m.jsx)(S.a,{min:0,style:{width:"100%"}})}),Object(m.jsx)(C.a.Item,{label:"\u4e70\u5165\u65f6\u95f4",name:"buyDate",rules:[{required:!0,message:"\u4e70\u5165\u4ef7\u5fc5\u987b\u586b\u5199!"}],children:Object(m.jsx)(w.a,{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u65f6\u95f4"})}),Object(m.jsx)(C.a.Item,{label:"\u5356\u51fa\u65f6\u95f4",name:"soldDate",children:Object(m.jsx)(w.a,{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u65f6\u95f4"})}),Object(m.jsx)(C.a.Item,{label:"\u4e70\u5bb6",name:"buyer",children:Object(m.jsx)(D.a,{})}),Object(m.jsx)(C.a.Item,{label:"\u5907\u6ce8",name:"remarks",children:Object(m.jsx)(D.a,{})})]})})}),Object(m.jsx)(R.a,{title:"\u5220\u9664\u8bb0\u5f55",visible:this.state.deleteConfirmVisible,onCancel:function(){e.setState({deleteConfirmVisible:!1})},okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:this.onDelete,children:Object(m.jsx)("div",{className:"delect-content-container",children:l})}),Object(m.jsx)(R.a,{title:"\u7f16\u8f91\u8bb0\u5f55",visible:this.state.editVisible,onCancel:function(){e.setState({editVisible:!1})},footer:[Object(m.jsx)(Y.a,{onClick:function(){e.setState({editVisible:!1})},children:"\u53d6\u6d88"},"cancel"),Object(m.jsx)(Y.a,{form:"editSneakerForm",htmlType:"submit",children:"\u786e\u5b9a"},"submit")],children:Object(m.jsx)("div",{className:"edit-content-container",children:Object(m.jsxs)(C.a,{id:"editSneakerForm",ref:this.formUpdate,initialValues:this.state.initialValues,onFinish:this.editSneakerForm,children:[Object(m.jsx)(C.a.Item,{label:"\u978b\u6b3e",name:"sneaker",rules:[{required:!0,message:"\u4ea7\u54c1\u540d\u5fc5\u987b\u586b\u5199!"}],children:Object(m.jsx)(D.a,{})}),Object(m.jsx)(C.a.Item,{label:"\u5c3a\u7801",name:"size",children:Object(m.jsx)(D.a,{})}),Object(m.jsx)(C.a.Item,{label:"\u72b6\u6001",name:"status",children:Object(m.jsxs)(k.a,{placeholder:"\u8bf7\u9009\u62e9",onChange:this.onStatusChange,children:[Object(m.jsx)(k.a.Option,{value:"\u5df2\u5356",children:"\u5df2\u5356"}),Object(m.jsx)(k.a.Option,{value:"\u5df2\u6536\u5b9a\u91d1",children:"\u5df2\u6536\u5b9a\u91d1"}),Object(m.jsx)(k.a.Option,{value:"\u672a\u5356",children:"\u672a\u5356"})]})}),Object(m.jsx)(C.a.Item,{hidden:this.state.hiddenDeposit,label:"\u4ed8\u4e86\u591a\u5c11\u5b9a\u91d1?",name:"depositAmount",children:Object(m.jsx)(S.a,{min:0,style:{width:"100%"}})}),Object(m.jsx)(C.a.Item,{label:"\u4e70\u5165\u4ef7",name:"buyPrice",rules:[{required:!0,message:"\u4e70\u5165\u4ef7\u5fc5\u987b\u586b\u5199!"}],children:Object(m.jsx)(S.a,{min:0,style:{width:"100%"}})}),Object(m.jsx)(C.a.Item,{label:"\u5356\u51fa\u4ef7",name:"soldPrice",children:Object(m.jsx)(S.a,{min:0,style:{width:"100%"}})}),Object(m.jsx)(C.a.Item,{label:"\u4e70\u5165\u65f6\u95f4",name:"buyDate",rules:[{required:!0,message:"\u4e70\u5165\u4ef7\u5fc5\u987b\u586b\u5199!"}],children:Object(m.jsx)(w.a,{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u65f6\u95f4"})}),Object(m.jsx)(C.a.Item,{label:"\u5356\u51fa\u65f6\u95f4",name:"soldDate",children:Object(m.jsx)(w.a,{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u65f6\u95f4"})}),Object(m.jsx)(C.a.Item,{label:"\u4e70\u5bb6",name:"buyer",children:Object(m.jsx)(D.a,{})}),Object(m.jsx)(C.a.Item,{label:"\u5907\u6ce8",name:"remarks",children:Object(m.jsx)(D.a,{})})]})})})]})}}]),a}(c.a.Component),U=a(149),$=a(402),W=a(401),J=a(561),G=a(563),H=a(564),Q=(a(543),function(e){Object(b.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(e=t.call.apply(t,[this].concat(c))).state={data:[]},e.asyncGet=function(){L.ajax({url:"https://solegood.com.au/wp-json/wp/v2/posts",method:"get",isShowLoading:!0}).then((function(t){var a=q.getTotalPages(t.headers["x-wp-totalpages"]).map((function(e){return L.ajax({url:"https://solegood.com.au/wp-json/wp/v2/posts?page=".concat(e),method:"get",isShowLoading:!0})}));B.a.all(a).then(B.a.spread((function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];var c=a.every((function(e){return 200===e.status}));if(c){var i=Object(N.a)(a.map((function(e){return e.data}))),s=i.flat(),r=s.map((function(e,t){return e.key=t,e=Object(F.a)(Object(F.a)({},e),{},{newId:t+1})}));e.setState({data:r})}}))).catch((function(e){return console.log("fetch data failed",e)}))}))},e.totalSale=function(e){for(var t="",a=0;a<e.length;a++)e[a].acf.sold_price&&(t=+t+ +e[a].acf.sold_price);return t},e.averageSale=function(t){var a=e.totalSale(t),n=(new Date).getMonth()+1;return Math.round(a/n)||""},e.currentMonthSale=function(e){var t,a=e.map((function(e){return e.acf.sold_date&&A()(e.acf.sold_date,"DD-MM-YYYY").isSame(A()(),"month")?e.acf.sold_price:"0"})),n=0,c=Object(U.a)(a);try{for(c.s();!(t=c.n()).done;){n=+n+ +t.value}}catch(i){c.e(i)}finally{c.f()}return n},e.monthCompare=function(t){var a,n=t.map((function(e){return e.acf.sold_date&&A()(e.acf.sold_date,"DD-MM-YYYY").isSame(A()().subtract(1,"months").endOf("month"),"month")?e.acf.sold_price:"0"})),c=0,i=Object(U.a)(n);try{for(i.s();!(a=i.n()).done;){c=+c+ +a.value}}catch(o){i.e(o)}finally{i.f()}var s=e.currentMonthSale(t);if(0!==c&&0!==s){var r=s/c-1;return Math.round(100*r)}return""},e.totalProfit=function(e){for(var t="",a=0;a<e.length;a++){t=+t+ +(+(e[a].acf.sold_price?e[a].acf.sold_price:0)-+e[a].acf.buy_price)}return t},e.currentMonthProfit=function(e){for(var t=e.filter((function(e){return A()(e.acf.buy_date,"DD-MM-YYYY").isSame(A()(),"month")?e:null})).map((function(e){return e.acf.sold_price?e.acf.sold_price-e.acf.buy_price:-e.acf.buy_price})),a="",n=0;n<t.length;n++)a=+a+ +t[n];return a},e.totalBuy=function(e){var t=e.length;return e.length>0?t:""},e.totalSold=function(e){var t=e.filter((function(e){return!!e.acf.sold_date}));return 0!==t.length?t.length:""},e.dataForTotalBuyChart=function(e){if(e.length>0){var t=e.map((function(e){return A()(e.acf.buy_date,"DD-MM-YYYY").format("M")}));t.sort();for(var a=[],n=0;n<t.length;n++){for(var c=0,i=0;i<t.length;i++)t[n]===t[i]&&c++;a.push([t[n],c])}return a.map((function(e){return{"\u6708\u4efd":e[0],"\u8d2d\u4e70\u6570\u91cf":e[1]}}))}return console.log("\u6682\u65f6\u65e0\u6570\u636e\uff01"),""},e.dataForTotalSoldChart=function(e){if(e.length>0){var t=e.map((function(e){return A()(e.acf.sold_date,"DD-MM-YYYY").format("M")}));(t=t.filter((function(e){return"Invalid date"!==e}))).sort();for(var a=[],n=0;n<t.length;n++){for(var c=0,i=0;i<t.length;i++)t[n]===t[i]&&c++;a.push([t[n],c])}return a.map((function(e){return{"\u6708\u4efd":e[0],"\u5356\u51fa\u6570\u91cf":e[1]}}))}return""},e.dataForProfitChart=function(e){if(e.length>0){var t=e.map((function(e){return e.acf.buy_price?e={month:A()(e.acf.buy_date,"DD-MM-YYYY").format("M"),profit:e.acf.sold_price?e.acf.sold_price-e.acf.buy_price:0-e.acf.buy_price}:(console.log("\u68c0\u67e5\u4e70\u5165\u4ef7\u662f\u5426\u4e3a\u7a7a\uff01"),"")}));t.sort((function(e,t){return e.month-t.month}));var a={};t.forEach((function(e){a.hasOwnProperty(e.month)?a[e.month]=a[e.month]+e.profit:a[e.month]=e.profit}));var n=[];for(var c in a)n.push({"\u6708\u4efd":c,"\u5229\u6da6":a[c]});return n}return console.log("\u6682\u65f6\u65e0\u6570\u636e\uff01"),""},e}return Object(j.a)(a,[{key:"componentDidMount",value:function(){this.asyncGet()}},{key:"render",value:function(){var e=this.state.data,t={percent:this.currentMonthProfit(e)/this.totalProfit(e)||0,outline:{border:4,distance:8},wave:{length:128},statistic:{title:{formatter:function(){return"\u5360\u603b\u5229\u6da6"}}}},a={height:150,tooltip:{customContent:function(e,t){return"<div>".concat(e,"\u6708, \u8d2d\u4e70\u4e86").concat(t[0]?t[0].value:"","\u53cc</div>")}},data:this.dataForTotalBuyChart(e)||[],xField:"\u6708\u4efd",yField:"\u8d2d\u4e70\u6570\u91cf",label:{position:"middle",style:{fill:"#FFFFFF",opacity:.6}}},n={height:150,tooltip:{customContent:function(e,t){return"<div>".concat(e,"\u6708, \u5356\u51fa\u4e86").concat(t[0]?t[0].value:"","\u53cc</div>")}},data:this.dataForTotalSoldChart(e)||[],xField:"\u6708\u4efd",yField:"\u5356\u51fa\u6570\u91cf",label:{position:"middle",style:{fill:"#FFFFFF",opacity:.6}}},c={data:this.dataForProfitChart(e)||[],xField:"\u6708\u4efd",yField:"\u5229\u6da6",tooltip:{customContent:function(e,t){return"<div>\u5229\u6da6\uff1a$".concat(t[0]?t[0].value:"","</div>")}},point:{visible:!0,size:5,shape:"diamond",style:{fill:"white",stroke:"#2593fc",lineWidth:2}},label:{position:"middle",style:{fill:"#000000"}}};return Object(m.jsxs)("div",{className:"report-container",children:[Object(m.jsxs)(r.a,{className:"top",children:[Object(m.jsx)(o.a,{span:6,children:Object(m.jsxs)(I.a,{title:"\u603b\u9500\u552e\u989d",children:[Object(m.jsx)("div",{className:"total",children:"$ ".concat(this.totalSale(e))}),Object(m.jsx)("div",{className:"monthSale",children:"\u672c\u6708\u9500\u552e\u989d $".concat(this.currentMonthSale(e))}),Object(m.jsxs)("div",{className:"monthCompare",children:["\u6bd4\u4e0a\u6708 \xa0\xa0 ".concat(this.monthCompare(e),"%"),Object(m.jsx)($.a,{className:"statusIcon",style:{display:this.monthCompare(e)<0?"none":"inline-block",color:"red"}}),Object(m.jsx)(W.a,{className:"statusIcon",style:{display:this.monthCompare(e)>=0?"none":"inline-block",color:"green"}})]}),Object(m.jsx)("div",{className:"average",children:"\u6708\u5747\u9500\u552e\u989d $".concat(this.averageSale(e))})]})}),Object(m.jsx)(o.a,{span:6,children:Object(m.jsxs)(I.a,{title:"\u603b\u5229\u6da6",children:[Object(m.jsx)("div",{className:"total",children:"$ ".concat(this.totalProfit(e))}),Object(m.jsxs)("div",{className:"profit-month",children:[Object(m.jsx)("p",{children:"\u672c\u6708\u5229\u6da6 $".concat(this.currentMonthProfit(e))}),Object(m.jsx)(J.a,Object(F.a)({},t))]})]})}),Object(m.jsx)(o.a,{span:6,children:Object(m.jsxs)(I.a,{title:"\u8d2d\u4e70\u603b\u91cf",children:[Object(m.jsx)("div",{className:"total",children:"".concat(this.totalBuy(e))}),Object(m.jsx)(G.a,Object(F.a)({},a))]})}),Object(m.jsx)(o.a,{span:6,children:Object(m.jsxs)(I.a,{title:"\u5356\u51fa\u603b\u91cf",children:[Object(m.jsx)("div",{className:"total",children:"".concat(this.totalSold(e))}),Object(m.jsx)(H.a,Object(F.a)({},n))]})})]}),Object(m.jsx)(r.a,{className:"middle",children:Object(m.jsx)(o.a,{span:24,children:Object(m.jsx)(I.a,{title:"\u5229\u6da6\u8d8b\u52bf\u7edf\u8ba1",children:Object(m.jsx)(H.a,Object(F.a)({},c))})})})]})}}]),a}(c.a.Component)),X=(a(558),a(399)),Z=(a(554),function(e){Object(b.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(e=t.call.apply(t,[this].concat(c))).state={picUrl:"",weather:"",temperature:""},e}return Object(j.a)(a,[{key:"componentDidMount",value:function(){}},{key:"getWeatherAPIData",value:function(){var e=this;L.ajax({url:"https://api.weatherstack.com/current?access_key=a8503431d7eeae0100eb9f9439f07018&query=".concat("melbourne")}).then((function(t){if(window.data=t,200===t.status){var a=t.data.current;e.setState({picUrl:a.weather_icons[0],weather:a.weather_descriptions[0],temperature:a.temperature})}}))}},{key:"render",value:function(){return Object(m.jsxs)("div",{className:"header",children:[Object(m.jsx)("hr",{style:{border:"1px solid #1890ff",marginTop:50}}),Object(m.jsxs)(r.a,{children:[Object(m.jsx)(o.a,{span:"4",children:Object(m.jsx)(X.a,{className:"site-page-header",title:"\u7403\u978b\u7ba1\u7406",subTitle:"v2.1.1"})}),Object(m.jsxs)(o.a,{span:"20",className:"weather",children:[Object(m.jsx)("span",{className:"weather-img",children:Object(m.jsx)("img",{src:this.state.picUrl,alt:""})}),Object(m.jsx)("span",{className:"weather-detail",children:this.state.weather}),Object(m.jsx)("span",{className:"weather-temperature"})]})]})]})}}]),a}(c.a.Component));a(555);var ee=function(){return Object(m.jsx)(l.a,{children:Object(m.jsxs)(r.a,{children:[Object(m.jsx)(o.a,{span:3,style:{backgroundColor:"#002140"},children:Object(m.jsx)(g,{})}),Object(m.jsxs)(o.a,{span:21,children:[Object(m.jsx)(Z,{}),Object(m.jsx)(d.a,{exact:!0,path:"/",render:function(){return Object(m.jsx)("div",{className:"home-container",children:Object(m.jsx)("h1",{children:"\u6b22\u8fce\u6765\u5230\u8bb8\u589e\u5a01\u7684\u7403\u978b\u7ba1\u7406\u7cfb\u7edf\uff01"})})}}),Object(m.jsx)(d.a,{exact:!0,path:"/managment",component:E}),Object(m.jsx)(d.a,{exact:!0,path:"/report",component:Q})]})]})})},te=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,568)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),i(e),s(e)}))};s.a.render(Object(m.jsx)(ee,{}),document.getElementById("sneakerRoot")),te()}},[[556,1,2]]]);
//# sourceMappingURL=main.a88f4de4.chunk.js.map