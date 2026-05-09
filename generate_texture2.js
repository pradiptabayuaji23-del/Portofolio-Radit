const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function main() {
    const bg = await loadImage('public/models/lanyard.png');
    const cvs = createCanvas(bg.width, bg.height);
    const ctx = cvs.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#111'; // dark background
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    try {
        const profile = await loadImage('public/logo/profile.jpg');
        
        // Draw card in the center (x=512), but rotate it 180 degrees because the UV is inverted
        ctx.save();
        ctx.translate(512, 125); // move to center of the 1024x250 image
        ctx.rotate(Math.PI);     // rotate 180 degrees
        ctx.translate(-512, -125); // move back
        
        const centerX = 512;
        const width = 200;
        const height = 240;
        const startX = centerX - width / 2;
        const startY = 5;
        
        // Draw a glass border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, width, height);
        
        // Draw gradient header
        const grad = ctx.createLinearGradient(startX, startY, startX + width, startY);
        grad.addColorStop(0, '#2563eb');
        grad.addColorStop(1, '#9333ea');
        ctx.fillStyle = grad;
        ctx.fillRect(startX, startY, width, 80);

        // Draw profile image (circle)
        const imgSize = 80;
        const imgX = centerX - imgSize / 2;
        const imgY = startY + 20;
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, imgY + imgSize/2, imgSize/2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(profile, imgX, imgY, imgSize, imgSize);
        ctx.restore();
        
        // Draw border for profile
        ctx.beginPath();
        ctx.arc(centerX, imgY + imgSize/2, imgSize/2, 0, Math.PI * 2, true);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 26px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Radit', centerX, startY + 140);
        
        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('SOFTWARE ENGINEER', centerX, startY + 160);
        
        // Barcode area
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(startX + 10, startY + 190, width - 20, 40);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('ID: RDT-2024-001', centerX, startY + 205);
        
        // draw lines for barcode
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        for(let i=0; i<30; i++){
            ctx.fillRect(startX + 15 + i*5.5, startY + 212, Math.random()*3 + 1.5, 12);
        }
        
        ctx.restore();

        // Also draw one for the back (maybe it's at x=125 or x=896)
        // We can just leave the rest dark, or copy the front to other places without rotation just in case
        
        // Save
        const out = fs.createWriteStream('public/models/lanyard.png');
        const stream = cvs.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => console.log('Texture generated!'));
        
    } catch (e) {
        console.error(e);
    }
}
main();
