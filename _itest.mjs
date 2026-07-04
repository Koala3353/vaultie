import * as I from './insights.js';
const S={weeklyAllowance:200000,currencySymbol:'₱',weekStartDay:1,spendDaysPerWeek:5};
const DAY=86400000;
// pick a fixed "now": Thursday
const now=new Date('2026-06-04T13:00:00').getTime();
const cats=[{id:'food',name:'Food',icon:'🍜'},{id:'coffee',name:'Coffee',icon:'☕'},{id:'fun',name:'Fun',icon:'🧗'}];
const tx=[];let n=0;const add=(amt,cat,ts)=>tx.push({id:'t'+n++,amount:amt,categoryId:cat,note:'',ts});
// current week (Mon Jun1..): today Thu
add(20000,'food',now-2*3600000); // today ₱200
add(60000,'fun',now-DAY);         // yesterday ₱600
add(15000,'coffee',now-2*DAY);    // Tue ₱150  -> week spent 9500? 20000+60000+15000=95000 = ₱950
// last week (under budget): ₱1200
add(70000,'food',now-8*DAY); add(50000,'coffee',now-9*DAY);
// 2 wks ago over budget: ₱2300
add(150000,'fun',now-16*DAY); add(80000,'food',now-17*DAY);
// 3 wks ago under: ₱800
add(80000,'food',now-23*DAY);
const o={};
console.log('today', I.todaySpend(tx,now)); // 20000
console.log('pace', I.paceInfo(tx,S,o,now));
console.log('proj', I.projection(tx,S,o,now));
console.log('avgDaily', I.avgDaily(tx,S,now));
console.log('lastWeekDelta', I.lastWeekDelta(tx,S,o,now));
console.log('month', I.monthTotal(tx,now));
console.log('noSpendDays', I.noSpendDays(tx,S,now));
console.log('streaks', I.streaks(tx,S,o,now));   // last wk under, 2wk over -> current 1
console.log('leftover', I.leftover(tx,S,o,now));
console.log('recap', I.lastWeekRecap(tx,S,o,cats,now));
console.log('trend', I.categoryTrend(tx,cats,S,now));
const h=I.dowHeatmap(tx,S,now); console.log('heatmap labels',h.labels,'avg',h.avg,'max',h.max);
console.log('biggest', I.biggest(tx.filter(t=>t.ts>=I.paceInfo(tx,S,o,now)&&false))); // skip
