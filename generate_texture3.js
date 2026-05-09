const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function main() {
    const cvs = createCanvas(1024, 256);
    const ctx = cvs.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#0a0a0a'; // very dark background
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    try {
        const profile = await loadImage('public/logo/profile.jpg');
        
        const drawCard = (centerX, isUpsideDown) => {
            ctx.save();
            
            if (isUpsideDown) {
                ctx.translate(centerX, 128);
                ctx.rotate(Math.PI);
                ctx.translate(-centerX, -128);
            }

            const width = 220;
            const height = 256;
            const startX = centerX - width / 2;
            const startY = 0;
            
            // Draw gradient header
            const grad = ctx.createLinearGradient(startX, startY, startX + width, startY);
            grad.addColorStop(0, '#2563eb');
            grad.addColorStop(1, '#7c3aed');
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
            ctx.font = 'bold 30px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Radit', centerX, startY + 145);
            
            ctx.fillStyle = '#60a5fa';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText('SOFTWARE ENGINEER', centerX, startY + 165);
            
            // Barcode area
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            ctx.fillRect(startX + 10, startY + 195, width - 20, 50);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px monospace';
            ctx.fillText('ID: RDT-2024-001', centerX, startY + 215);
            
            // draw lines for barcode
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            for(let i=0; i<30; i++){
                ctx.fillRect(startX + 15 + i*6.3, startY + 225, Math.random()*3 + 1.5, 15);
            }
            
            ctx.restore();
        };

        // Front Face (usually around 896, upright)
        drawCard(896, false);
        
        // Back Face (usually around 128, upside down)
        drawCard(128, true);

        // Just in case PMNDRS changed it, let's draw on 384 and 640 as well
        drawCard(384, false);
        drawCard(640, true);

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
