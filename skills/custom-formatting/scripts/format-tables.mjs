import fs from 'fs/promises';
import path from 'path';

async function processFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  const newLines = [];
  
  let i = 0;
  let changed = false;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Check if this line looks like a table header
    if (line.trim().startsWith('|') && line.includes('|') && i + 1 < lines.length) {
      const nextLine = lines[i + 1].trim();
      
      // Is it a separator row?
      if (nextLine.startsWith('|') && nextLine.includes('-') && /^[|\s:-]+$/.test(nextLine)) {
        // Collect entire table
        let j = i;
        const tableLines = [];
        
        while (j < lines.length && lines[j].trim().startsWith('|')) {
          tableLines.push(lines[j]);
          j++;
        }
        
        // Parse table
        const rows = tableLines.map(row => {
          return row.split('|').slice(1, -1).map(cell => cell.trim());
        });
        
        // Find max widths per column
        const maxCols = 0;
        let numCols = 0;
        for (const row of rows) {
            if (row.length > numCols) numCols = row.length;
        }

        const colWidths = Array(numCols).fill(0);
        
        for (let r = 0; r < rows.length; r++) {
          if (r === 1) continue; // skip separator row for measuring
          for (let c = 0; c < numCols; c++) {
            const cellText = rows[r][c] || '';
            const visualLen = cellText.length; // Simplified, assumes ascii character width
            if (visualLen > colWidths[c]) {
              colWidths[c] = visualLen;
            }
          }
        }
        
        // Format rows
        const formattedRows = [];
        for (let r = 0; r < rows.length; r++) {
          let formattedRow = '|';
          for (let c = 0; c < numCols; c++) {
            if (r === 1) {
              const dashes = '-'.repeat(colWidths[c] || 3);
              // Handle alignment colons if present in original
              let orig = rows[r][c] || '';
              let start = orig.startsWith(':') ? ':' : '-';
              let end = orig.endsWith(':') ? ':' : '-';
              
              if (orig.startsWith(':') && orig.endsWith(':')) {
                formattedRow += ` ${start}${'-'.repeat(Math.max(colWidths[c] - 2, 1))}${end} |`;
              } else if (orig.startsWith(':')) {
                formattedRow += ` ${start}${'-'.repeat(Math.max(colWidths[c] - 1, 2))} |`;
              } else if (orig.endsWith(':')) {
                formattedRow += ` ${'-'.repeat(Math.max(colWidths[c] - 1, 2))}${end} |`;
              } else {
                 formattedRow += ` ${'-'.repeat(Math.max(colWidths[c], 3))} |`;
              }
            } else {
              const cellText = rows[r][c] || '';
              formattedRow += ` ${cellText.padEnd(colWidths[c] || 3, ' ')} |`;
            }
          }
          formattedRows.push(lines[i + r].startsWith(' ') || lines[i + r].startsWith('\t') 
            ? lines[i + r].match(/^\s+/)[0] + formattedRow.trim() 
            : formattedRow.trim());
        }
        
        newLines.push(...formattedRows);
        i = j - 1; // loop will increment next
        changed = true;
      } else {
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
    i++;
  }
  
  if (changed) {
    await fs.writeFile(filePath, newLines.join('\n'));
    console.log(`Formatted tables in ${filePath}`);
  }
}

async function run(dir) {
    const stat = await fs.stat(dir);
    if (stat.isFile()) {
        if (dir.endsWith('.md')) await processFile(dir);
        return;
    }
    
    if (dir.includes('node_modules') || dir.includes('.next')) return;
    
    const entries = await fs.readdir(dir);
    for (const e of entries) {
        await run(path.join(dir, e));
    }
}

run(process.argv[2] || '.').catch(console.error);
