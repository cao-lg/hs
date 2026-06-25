const fs = require('fs');
const content = fs.readFileSync('data/schools-anhui.js', 'utf8');
try {
    eval(content);
    console.log('Total schools:', SchoolsAnhui.length);
    let totalMajors = 0;
    SchoolsAnhui.forEach(s => { 
        if(s.majorScores) { 
            totalMajors += s.majorScores.length; 
        } 
    });
    console.log('Total major entries:', totalMajors);
    console.log('First school name:', SchoolsAnhui[0].name);
    console.log('First school major count:', SchoolsAnhui[0].majorScores.length);
    console.log('Sample major:', JSON.stringify(SchoolsAnhui[0].majorScores[0], null, 2));
    console.log('Sample scoreHistory:', JSON.stringify(SchoolsAnhui[0].scoreHistory, null, 2));
} catch(e) {
    console.log('Error:', e.message);
    const lines = content.split('\n');
    const lineNum = parseInt(e.message.match(/<anonymous>:(\d+)/)?.[1] || 0);
    if (lineNum) {
        console.log(`Error near line ${lineNum}:`);
        for (let i = Math.max(0, lineNum - 3); i < Math.min(lines.length, lineNum + 3); i++) {
            console.log(`${i+1}: ${lines[i]}`);
        }
    }
}
