(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"6kgx":function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return o})),a.d(t,"query",(function(){return m}));var r=a("q1tI"),n=a.n(r),l=a("soUV"),c=a("ofer"),s=a("nQb1"),i=a("hlFM"),u=(a("KKXr"),function(e){var t=e.split("-"),a=t[0],r=t[1],n=t[2];return parseInt(a)+"年"+parseInt(r)+"月"+parseInt(n)+"日"});function o(e){var t=e.data.allWadaDbDisclosureTsv.nodes[0],a=null;switch(t.result){case"不開示":var r=null;(t.result_article_url||t.explanation)&&(r=n.a.createElement(n.a.Fragment,null,n.a.createElement(c.a,{variant:"h6",component:"h2"},"解説"),n.a.createElement(c.a,{variant:"body1"},t.explanation&&n.a.createElement("p",null,t.explanation),t.result_article_url&&n.a.createElement("p",null,n.a.createElement("a",{href:t.result_article_url,target:"_blank",rel:"noreferrer noopener"},"元記事"))))),a=n.a.createElement(n.a.Fragment,null,n.a.createElement(c.a,{variant:"body1"},"不開示"===t.result?n.a.createElement("p",null,t.reason_of_no_disclosure):"",t.result_img_url&&n.a.createElement("p",null,n.a.createElement("img",{src:t.result_img_url,style:{width:"100%",maxWidth:"800px"}}))),r)}return n.a.createElement(l.a,{title:"WadaDB 開示請求: "+t.disclosure_description,description:"開示請求: "+t.disclosure_description},n.a.createElement(i.a,{my:2},n.a.createElement(c.a,{variant:"h5",component:"h1"},"開示請求: ",t.disclosure_description),n.a.createElement(c.a,{variant:"h6",component:"h2"},"開示請求詳細"),n.a.createElement(c.a,{variant:"body1"},n.a.createElement("ul",null,n.a.createElement("li",null,"開示請求人: ",n.a.createElement(s.b,{to:"/actors/"+t.disclosure_actor},t.disclosure_actor)),n.a.createElement("li",null,"主な請求対象: ",n.a.createElement(s.b,{to:"/targets/"+t.disclosure_target},t.disclosure_target)),t.submission_date&&n.a.createElement("li",null,"開示請求日時: ",u(t.submission_date)),t.result_date&&n.a.createElement("li",null,"開示・不開示日時: ",u(t.result_date)))),n.a.createElement(c.a,{variant:"h6",component:"h2"},"結果: ",t.result),a))}var m="2050106549"}}]);
//# sourceMappingURL=component---src-templates-disclosure-tsx-2afa8803e212ab8050fc.js.map