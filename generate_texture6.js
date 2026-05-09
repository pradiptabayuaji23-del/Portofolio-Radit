const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function main() {
    const cvs = createCanvas(1400, 1000);
    const ctx = cvs.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#0f172a'; // sleek dark blue/gray
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    try {
        const profile = await loadImage('public/logo/profile.jpg');
        
        ctx.save();
        
        // Apply the magic transformation to perfectly map the UVs!
        ctx.translate(1400, 0);
        ctx.rotate(Math.PI / 2);

        // Now we draw as if we are drawing a 1000 x 1400 ID card
        const cardW = 1000;
        const cardH = 1400;

        // Gradient header
        const grad = ctx.createLinearGradient(0, 0, cardW, 0);
        grad.addColorStop(0, '#2563eb');
        grad.addColorStop(1, '#9333ea');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cardW, 300);

        // Profile Image (circle)
        const imgSize = 400;
        const imgX = cardW / 2 - imgSize / 2;
        const imgY = 150;
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(cardW / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(profile, imgX, imgY, imgSize, imgSize);
        ctx.restore();
        
        // Border for profile
        ctx.beginPath();
        ctx.arc(cardW / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2, true);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 15;
        ctx.stroke();

        // Glow
        ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
        ctx.shadowBlur = 40;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 120px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Radit', cardW / 2, 750);
        
        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 50px sans-serif';
        ctx.fillText('SOFTWARE ENGINEER', cardW / 2, 850);
        
        // Barcode area
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(50, 1100, cardW - 100, 200);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 45px monospace';
        ctx.fillText('ID: RDT-2024-001', cardW / 2, 1280);
        
        // draw lines for barcode
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for(let i=0; i < 40; i++){
            ctx.fillRect(100 + i * 20, 1130, Math.random() * 10 + 4, 80);
        }

        ctx.restore();
        
        // Save
        const out = fs.createWriteStream('public/models/lanyard.png');
        const stream = cvs.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => console.log('Perfect texture generated!'));
        
    } catch (e) {
        console.error(e);
    }
}
main();
