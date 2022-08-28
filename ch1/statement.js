const plays = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like it', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

const invoices = [
  {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  },
];

function statement(invoices, plays) {
  let totalAmout = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoices[0].customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format;

  for (let perf of invoices[0].performances) {
    const play = plays[perf.playID];
    let thisAmout = 0;

    switch (play.type) {
      case 'tragedy':
        thisAmout = 40000;
        if (perf.audience > 30) {
          thisAmout += 1000 * (perf.audience - 30);
        }
        break;
      case 'comedy':
        thisAmout = 30000;
        if (perf.audience > 20) {
          thisAmout += 10000 + 500 * (perf.audience - 20);
        }
        thisAmout += 300 * perf.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    volumeCredits += Math.max(perf.audience - 30, 0);
    if ('comedy' === play.type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    result += `${play.name}: ${format(thisAmout / 100)} (${perf.audience}석)\n`;
    totalAmout += thisAmout;
  }
  result += `총액: ${format(totalAmout / 100)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

console.log(statement(invoices, plays));
