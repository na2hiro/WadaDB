(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{QeBL:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s})),n.d(t,"query",(function(){return i}));n("Vd3H");var a=n("q1tI"),o=n.n(a),r=n("soUV"),l=n("nQb1"),c=n("ofer"),u=n("hlFM");function s(e){var t=e.data;return o.a.createElement(r.a,{title:"WadaDB: 情報開示データベース"},o.a.createElement(u.a,{my:2},o.a.createElement(c.a,{variant:"h5",component:"h1"},"WadaDB: 情報開示データベース"),o.a.createElement("p",null,"WadaDBは、行政文書の情報開示請求により得られた知見を蓄積するデータベースを目指す有志のプロジェクトです。"),o.a.createElement(c.a,{variant:"h6",component:"h2"},"最新の開示"),o.a.createElement("ul",null,t.latest.nodes.map((function(e){return o.a.createElement("li",null,o.a.createElement(l.a,{to:"/disclosures/"+e.id},e.disclosure_description))}))),o.a.createElement(c.a,{variant:"h6",component:"h2"},"被開示請求者一覧"),o.a.createElement("ul",null,t.targets.group.sort((function(e,t){return t.totalCount-e.totalCount})).map((function(e,t){return o.a.createElement("li",null,o.a.createElement(l.a,{to:"/targets/"+encodeURIComponent(e.nodes[0].disclosure_target)},e.nodes[0].disclosure_target)," (",e.totalCount,")")}))),o.a.createElement(c.a,{variant:"h6",component:"h2"},"開示請求者一覧"),o.a.createElement("ul",null,t.actors.group.sort((function(e,t){return t.totalCount-e.totalCount})).map((function(e,t){return o.a.createElement("li",null,o.a.createElement(l.a,{to:"/actors/"+encodeURIComponent(e.nodes[0].disclosure_actor)},e.nodes[0].disclosure_actor)," (",e.totalCount,")")})))))}var i="614357974"}}]);
//# sourceMappingURL=component---src-pages-index-tsx-98399007b8517255cf7f.js.map