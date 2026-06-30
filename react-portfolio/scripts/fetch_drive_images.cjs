const https = require('https');
const fs = require('fs');

// Usage: node fetch_drive_images.cjs <folderId>
const folderId = process.argv[2];
if (!folderId) {
  console.error('Usage: node fetch_drive_images.cjs <folderId>');
  process.exit(1);
}

const url = `https://drive.google.com/drive/folders/${folderId}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const ids = new Set();
    const reFile = /\/file\/d\/([a-zA-Z0-9_-]{10,})/g;
    let m;
    while ((m = reFile.exec(data)) !== null) ids.add(m[1]);
    const reDataId = /data-id="([a-zA-Z0-9_-]{10,})"/g;
    while ((m = reDataId.exec(data)) !== null) ids.add(m[1]);
    const reJsonId = /"id":"([a-zA-Z0-9_-]{10,})"/g;
    while ((m = reJsonId.exec(data)) !== null) ids.add(m[1]);

    const arr = Array.from(ids).map(id => `https://drive.google.com/uc?export=view&id=${id}`);

    if (arr.length === 0) {
      console.error('No file IDs detected. Folder may be private or content is loaded dynamically.');
      process.exit(2);
    }

    const outPath = __dirname + '/../public/drive-photos.json';
    fs.writeFileSync(outPath, JSON.stringify(arr, null, 2));
    console.log('Wrote', outPath, 'with', arr.length, 'images');
  });
}).on('error', (e) => {
  console.error('Request error', e.message);
  process.exit(1);
});
