import{c as n,j as a,s as u,E as m,t as x,C as y,m as j,n as f,p as v}from"./index-BqIKENOg.js";import{W as C,T as k,a as H,P as S}from"./PortfolioCharts-Bvb87zJo.js";import{S as t}from"./SummaryCard-DYJ0JQTf.js";import{H as p}from"./HoldingForm-7CXncuSa.js";import{s as b,u as T,L,H as M}from"./HoldingsTable-4rOQUFcU.js";import{u as G,a as P,b as E,f as i}from"./usePortfolioQueries-CcxoKZmt.js";import"./proxy-DAzM4RxM.js";import"./label-BsR7c1I_.js";import"./badge-qK8w96VI.js";import"./select-Cg0Z8LsW.js";import"./index-ezowYEk8.js";import"./api-Cip_qa-s.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=n("BadgeIndianRupee",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"M8 8h8",key:"1bis0t"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"m13 17-5-1h1a4 4 0 0 0 0-8",key:"nu2bwa"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=n("ChartLine",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"m19 9-5 5-4-4-3 3",key:"2osh9i"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=n("CircleDollarSign",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 18V6",key:"zqpxq5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=n("WalletCards",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2",key:"4125el"}],["path",{d:"M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",key:"1dpki6"}]]),J=()=>{var c,h;const g=b(T(l=>l.selected)),o=G(g.map(l=>l.holdingId)),r=P(),d=E();if(o.isLoading||r.isLoading)return a.jsx(u,{});if(o.isError||r.isError)return a.jsx(m,{message:((c=o.error??r.error)==null?void 0:c.message)??"Unable to load the dashboard.",onRetry:()=>{o.refetch(),r.refetch()}});const e=o.data,s=(e==null?void 0:e.currency)??"inr";return(h=r.data)!=null&&h.length?a.jsxs("div",{className:"space-y-6",children:[a.jsxs("section",{className:"dashboard-grid",children:[a.jsx(t,{title:"Portfolio Value",value:i(e.portfolioValue,s),icon:C}),a.jsx(t,{title:"Today's Gain",value:i(e.todayGain,s),icon:D,tone:e.todayGain>=0?"success":"danger"}),a.jsx(t,{title:"Total Gain",value:i(e.totalGain,s),icon:k,tone:"success"}),a.jsx(t,{title:"Total Loss",value:i(e.totalLoss,s),icon:H,tone:"danger"}),a.jsx(t,{title:"Potential Tax Savings",value:i(e.potentialTaxSavings,s),icon:w,tone:"warning"}),a.jsx(t,{title:"Harvest Opportunities",value:String(e.harvestOpportunities),icon:L,tone:"info"}),a.jsx(t,{title:"Selected Holdings",value:String(e.selectedHoldings),icon:N,helper:"Persisted locally"}),a.jsx(t,{title:"Realised Capital Gains",value:i(e.realisedCapitalGains,s),icon:I})]}),a.jsxs("section",{className:"grid gap-6 xl:grid-cols-[1fr_420px]",children:[a.jsxs(y,{children:[a.jsx(j,{children:a.jsx(f,{children:"Harvest Watchlist"})}),a.jsx(v,{children:a.jsx(M,{holdings:r.data,compact:!0})})]}),a.jsx(p,{})]}),d.data?a.jsx(S,{charts:d.data,currency:s}):null]}):a.jsxs("div",{className:"grid gap-6 xl:grid-cols-[1fr_420px]",children:[a.jsx(x,{title:"No holdings yet",description:"Import your first crypto holding to calculate gains, losses, harvest opportunities and chart analytics."}),a.jsx(p,{})]})};export{J as default};
