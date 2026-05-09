const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function main() {
    // Load original texture to get size and keep as background
    const bg = await loadImage('public/models/lanyard.png');
    const cvs = createCanvas(bg.width, bg.height);
    const ctx = cvs.getContext('2d');
    
    // Draw original background
    ctx.drawImage(bg, 0, 0);

    // Darken the background to make it look premium
    ctx.fillStyle = 'rgba(10, 10, 10, 0.85)';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // Let's draw the profile pic in a few probable spots to make sure it hits the front face!
    // Often it's in the center, or taking up the whole square (e.g. 250x250 chunks).
    // We will draw it at x = 125, y = 125 (left chunk) and x = 512, y = 125 (center chunk)
    
    try {
        const profile = await loadImage('public/logo/profile.jpg');
        
        // Function to draw an ID card layout at a given x-center
        const drawCard = (centerX) => {
            const width = 200;
            const height = 240;
            const startX = centerX - width / 2;
            const startY = 5;
            
            // Draw a glass border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 2;
            ctx.strokeRect(startX, startY, width, height);
            
            // Draw gradient header
            const grad = ctx.createLinearGradient(startX, startY, startX + width, startY);
            grad.addColorStop(0, '#2563eb');
            grad.addColorStop(1, '#9333ea');
            ctx.fillStyle = grad;
            ctx.fillRect(startX, startY, width, 60);

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
            ctx.lineWidth = 3;
            ctx.stroke();

            // Text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 24px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Radit', centerX, startY + 140);
            
            ctx.fillStyle = '#60a5fa';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText('SOFTWARE ENGINEER', centerX, startY + 160);
            
            // Barcode area
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.fillRect(startX + 10, startY + 190, width - 20, 40);
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px monospace';
            ctx.fillText('ID: RDT-2024-001', centerX, startY + 205);
            
            // draw lines for barcode
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            for(let i=0; i<30; i++){
                ctx.fillRect(startX + 15 + i*5.5, startY + 210, Math.random()*3 + 1, 15);
            }
        };

        // If 1025x250, it could be 4 panels.
        // Let's draw it in panel 1 (center x = 125)
        drawCard(125);
        // Let's draw it in panel 3 (center x = 625)
        drawCard(625);
        // Let's draw it in center just in case
        drawCard(512);

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
