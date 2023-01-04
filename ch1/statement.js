function amoutFor(performance, play) {
  let result = 0;
  switch (play.type) {
    case 'tragedy':
      result = 40000;
      if (performance.audience > 30) {
        result += 1000 * (performance.audience - 30);
      }
      break;
    case 'comedy':
      result = 30000;
      if (performance.audience > 20) {
        result += 10000 + 500 * (performance.audience - 20);
      }
      result += 300 * performance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }
  return result;
}

function statement(invoices, plays) {
  let totalAmout = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoices[0].customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format;

  for (let performance of invoices[0].performances) {
    const play = plays[performance.playID];
    let thisAmout = amoutFor(performance, play);

    volumeCredits += Math.max(performance.audience - 30, 0);
    if ('comedy' === play.type) {
      volumeCredits += Math.floor(performance.audience / 5);
    }

    result += `${play.name}: ${format(thisAmout / 100)} (${
      performance.audience
    }석)\n`;
    totalAmout += thisAmout;
  }
  result += `총액: ${format(totalAmout / 100)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

module.exports = statement;
