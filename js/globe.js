 const track1 = document.getElementById('track1');
        const track2 = document.getElementById('track2');
        const wrapper = document.getElementById('wrapper');
        
        const logos = [
            '../images/misc/meti-logo1.jpeg',
            '../images/misc/meti-logo2.jpeg',
            '../images/misc/meti-logo3.jpeg',
            '../images/misc/meti-logo4.jpeg',
            '../images/misc/meti-logo5.jpeg',
            '../images/misc/meti-logo6.jpeg',
            '../images/misc/meti-logo7.jpeg'
        ];

        function createSlide(src, i) {
            const slide = document.createElement('div');
            slide.className = 'logo-slide';
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Logo ${i + 1}`;
            slide.appendChild(img);
            return slide;
        }

        // Fill both tracks
        logos.forEach((src, i) => {
            track1.appendChild(createSlide(src, i));
            track2.appendChild(createSlide(src, i));
        });

        // Pause on hover
        wrapper.addEventListener('mouseenter', () => {
            wrapper.style.animationPlayState = 'paused';
        });

        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.animationPlayState = 'running';
        });