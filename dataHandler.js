const source = require('./final.json');
const fs = require('fs');

const newData = []
for (let i = 0; i < source.length; i++) {
  const item = source[i];
  if (item['8'].length === 0) {
    continue;
  }
  const a = {
    email: item['3'],
    name: item['2'],
    type: item['4'],
    member: item['8'],
  }
  newData.push(a);
}

fs.writeFileSync('./handledJSON.json', JSON.stringify(newData))


