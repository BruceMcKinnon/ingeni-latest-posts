!function(){"use strict";var e,t={974:function(e,t,n){var o=window.wp.blocks,l=window.wp.element,a=(window.wp.i18n,window.wp.serverSideRender),r=n.n(a),s=window.wp.blockEditor,c=(window.wp.data,window.wp.coreData),i=window.wp.components,u=JSON.parse('{"u2":"ingeni/ingeni-latest-posts"}');(0,o.registerBlockType)(u.u2,{edit:function({attributes:e,setAttributes:t}){const{wrapperClass:n,postsType:o,postsCategory:a,notinCategory:u,postsCount:g,postsTag:p,notinTag:w,showImage:h,ignoreSticky:m,showExcerpt:C,showCategory:E,showDate:b,showButton:d,buttonLabel:y,templateFile:f}=e,{useSelect:v}=wp.data,T=v((e=>e(c.store).getPostTypes({per_page:-1})),[]);var k=Array.isArray(T)?T.filter((e=>1==e.viewable)).map((e=>({label:e.labels.singular_name,value:e.slug}))):T;const P=v((e=>e("core").getEntityRecords("taxonomy","category"))),x=0;let R=[],S=[];P?P.forEach((e=>{R.push({value:e.id,label:e.name}),{postsCategory:a}==e.id&&(x=e.id)})):R.push({value:0,label:"Loading..."});const{tags:O}=v((e=>{const{getEntityRecords:t}=e("core");return{tags:t("taxonomy","post_tag")}}));let B=[];return O&&(B=O.map((e=>e.name))),(0,l.createElement)("div",{...(0,s.useBlockProps)()},(0,l.createElement)(s.InspectorControls,null,(0,l.createElement)(i.PanelBody,{title:"Settings",initialOpen:!0},(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.TextControl,{label:"Class",value:n,onChange:e=>t({wrapperClass:e})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.SelectControl,{label:"Post Type",options:k,value:o,onChange:e=>t({postsType:e})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.SelectControl,{multiple:!0,label:"Post Categories",options:R,value:a,onChange:e=>(e=>{S=[...a];let n=S.indexOf(e);n>-1?S.splice(n,1):S.push(e),t({postsCategory:S})})(Number.parseInt(e))})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.ToggleControl,{label:"Exclude Categories",checked:e.notinCategory,onChange:()=>t({notinCategory:!e.notinCategory})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.RangeControl,{label:"Number of posts",value:g,onChange:e=>t({postsCount:Number.parseInt(e)}),min:1,max:12})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.FormTokenField,{label:"Tags",value:p,suggestions:B,onChange:e=>{t({postsTag:e})}})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.ToggleControl,{label:"Exclude Tags",checked:e.notinTag,onChange:()=>t({notinTag:!e.notinTag})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.ToggleControl,{label:"Show Feature Image",checked:e.showImage,onChange:()=>t({showImage:!e.showImage})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.ToggleControl,{label:"Ignore Sticky Posts",checked:e.ignoreSticky,onChange:()=>t({ignoreSticky:!e.ignoreSticky})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.ToggleControl,{label:"Show Excerpt",checked:e.showExcerpt,onChange:()=>t({showExcerpt:!e.showExcerpt})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.ToggleControl,{label:"Show Category",checked:e.showCategory,onChange:()=>t({showCategory:!e.showCategory})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.ToggleControl,{label:"Show Date",checked:e.showDate,onChange:()=>t({showDate:!e.showDate})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.ToggleControl,{label:"Show Button",checked:e.showButton,onChange:()=>t({showButton:!e.showButton})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.TextControl,{label:"Button Label",value:y,onChange:e=>t({buttonLabel:e})})),(0,l.createElement)(i.PanelRow,null,(0,l.createElement)(i.TextControl,{label:"Custom Template",value:f,onChange:e=>t({templateFile:e})})))),(0,l.createElement)(r(),{block:"ingeni/ingeni-latest-posts",attributes:{wrapperClass:n,postsType:o,postsCategory:a,notinCategory:u,postsCount:g,postsTag:p,notinTag:w,showImage:h,ignoreSticky:m,showExcerpt:C,showCategory:E,showDate:b,showButton:d,buttonLabel:y,templateFile:f}}))},save:function(){return null}})}},n={};function o(e){var l=n[e];if(void 0!==l)return l.exports;var a=n[e]={exports:{}};return t[e](a,a.exports,o),a.exports}o.m=t,e=[],o.O=function(t,n,l,a){if(!n){var r=1/0;for(u=0;u<e.length;u++){n=e[u][0],l=e[u][1],a=e[u][2];for(var s=!0,c=0;c<n.length;c++)(!1&a||r>=a)&&Object.keys(o.O).every((function(e){return o.O[e](n[c])}))?n.splice(c--,1):(s=!1,a<r&&(r=a));if(s){e.splice(u--,1);var i=l();void 0!==i&&(t=i)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,l,a]},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var l,a,r=n[0],s=n[1],c=n[2],i=0;if(r.some((function(t){return 0!==e[t]}))){for(l in s)o.o(s,l)&&(o.m[l]=s[l]);if(c)var u=c(o)}for(t&&t(n);i<r.length;i++)a=r[i],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(u)},n=self.webpackChunkingeni_latest_posts=self.webpackChunkingeni_latest_posts||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var l=o.O(void 0,[431],(function(){return o(974)}));l=o.O(l)}();