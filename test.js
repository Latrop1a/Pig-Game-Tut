class Person {
  constructor(name, bills, marginsFromTop, percents) {
    this.name = name;
    this.bills = bills;
    this.marginsFromTop = marginsFromTop;
    this.percents = percents;
  }
  calcTip() {
    this.allTips = [];
    this.billsWTips = [];
    let bill, tip, billTotal;
    for (let i = 0; i < this.bills.length; i++) {
      bill = this.bills[i];
      [tip, billTotal] = checkMarginsAndCalc(bill, this);
      this.allTips.push(tip);
      this.billsWTips.push(billTotal);
    }
  }
  calcAvg() {
    let sum = 0;
    this.allTips.forEach((tip) => {
      sum += tip;
    });
    this.avgTip = sum / this.allTips.length;
  }
}

john = new Person("John", [124, 48, 268, 180, 42], [200, 50, 0], [10, 15, 20]);
mark = new Person("Mark", [77, 375, 110, 45], [300, 100, 0], [25, 10, 20]);


/**
 * Iterates through the margins and percantages
 * @param bill to be used for tip calc
 * @param person what object
 * @returns array of tip and billTotal
 */
const checkMarginsAndCalc = (bill, person) => {
  let billTotal, tip;
  for (let i = 0; i < person.marginsFromTop.length; i++) {
    if (bill > person.marginsFromTop[i]) {
      tip = (bill * person.percents[i]) / 100;
      billTotal = bill + tip;
      return [tip, billTotal];
    }
  }
};

john.calcTip();
john.calcAvg();
mark.calcTip();
mark.calcAvg();

console.log(john.allTips);
console.log(john.billsWTips);
console.log(john.avgTip);
console.log(mark.allTips);
console.log(mark.billsWTips);
console.log(mark.avgTip);

console.log(mark.avgTip > john.avgTip ? "Mark tips higher" : "John tips higher");
