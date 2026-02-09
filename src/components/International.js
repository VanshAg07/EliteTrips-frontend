import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function App() {
    const myRef = useRef(null);
    const [loadedImages, setLoadedImages] = useState([]);
    const [loadingError, setLoadingError] = useState(null);

    const { scrollYProgress } = useScroll({
        target: myRef.current,
        offset: ['center end', 'start start'],
    });

    const images = useMemo(() => {
        const imagePromises = [];

        for (let i = 4; i <= 102; i++) {
            const img = new Image();
            img.src = `../TRAVEL/travel10/src/images/travel${i}.webp`;
            imagePromises.push(
                new Promise((resolve, reject) => {
                    img.onload = () => resolve(img);
                    img.onerror = (error) => {
                        console.error(`Error loading image: ../TRAVEL/travel10/public/images/travel${i}.webp`, error);
                        reject(error);
                    };
                })
            );
        }

        return Promise.all(imagePromises);
    }, []);

    useEffect(() => {
        images.then((imgs) => {
            setLoadedImages(imgs);
        }).catch((err) => {
            setLoadingError('Error loading images');
            console.error('Error loading images:', err);
        });
    }, [images]);

    const render = useCallback(
        (index) => {
            if (loadedImages[index - 1] && myRef.current) {
                const context = myRef.current.getContext('2d');
                if (context) {
                    context.clearRect(0, 0, myRef.current.width, myRef.current.height);
                    context.drawImage(loadedImages[index - 1], 0, 0);
                }
            }
        },
        [loadedImages]
    );

    const currentIndex = useTransform(scrollYProgress, [0, 4], [4, 102]);

    useMotionValueEvent(currentIndex, 'change', (latest) => {
        render(Math.round(latest));
    });

    useEffect(() => {
        if (loadedImages.length > 0) {
            render(1);
        }
    }, [render, loadedImages]);

    return (
        <div
            style={{
                height: '6000px',
                backgroundColor: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ height: '3000px' }} />
            <canvas width={1000} height={1000} ref={myRef} />
            {loadingError && <p style={{ color: 'red' }}>{loadingError}</p>}
        </div>
    );
}

export default App;
