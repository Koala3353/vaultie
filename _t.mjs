import { getWeekRange, weekKey, getAllowanceForWeek, computeHistory, weekTransactions } from './budget.js';
const settings={weeklyAllowance:150000, currencySymbol:'₱', weekStartDay:1};
const now=new Date('2026-06-04T12:00:00').getTime(); // Thursday
const r=getWeekRange(now,1);
console.log('week start', new Date(r.start).toDateString(), '-> end', new Date(r.end).toDateString(), 'span(days)', (r.end-r.start)/86400000);
console.log('weekKey', weekKey(now,1));
const ov={[weekKey(now,1)]:200000};
console.log('allowance default', getAllowanceForWeek('x',settings,{}), 'override', getAllowanceForWeek(weekKey(now,1),settings,ov));
const txns=[
 {id:1,amount:50000,categoryId:'food',ts:now-1*3600000}, // this week
 {id:2,amount:30000,categoryId:'coffee',ts:now-8*86400000}, // last week
 {id:3,amount:20000,categoryId:'fun',ts:now-40*86400000}, // ~6 wk ago
];
console.log('thisWeekTx count', weekTransactions(txns,r).length);
for(const m of ['week','month','3m','year']){
 const h=computeHistory(txns,m,settings,{},now);
 console.log(m,'buckets',h.buckets.length,'totalSpent',h.buckets.reduce((s,b)=>s+b.spent,0),'ref',h.refLine);
}
