// brownJacket-container 높이 조정 함수
function adjustBrownJacketHeight() {
    const container = document.querySelector('.brownJacket-container');
    const backgroundImage = container.querySelector('.backgroundImage');
    const subImages = container.querySelector('.subImages');

    // 이미지들이 로드된 후 높이 계산
    function calculateHeight() {
        // backgroundImage 높이
        const bgHeight = backgroundImage.offsetHeight;

        // subImages 높이
        const subImagesHeight = subImages.offsetHeight;

        // subImages의 top 위치 (현재 CSS에서 calc(100vw * 0.75)로 설정됨)
        const subImagesTop = window.innerWidth * 0.75;

        // 전체 높이 계산: backgroundImage 높이 + subImages top 위치 + subImages 높이 + 여백
        const totalHeight = bgHeight + subImagesHeight; // 50px 여백

        // 컨테이너 높이 설정
        container.style.height = totalHeight + 'px';

        console.log('Background height:', bgHeight);
        console.log('SubImages height:', subImagesHeight);
        console.log('SubImages top:', subImagesTop);
        console.log('Total height:', totalHeight);
    }

    // 모든 이미지가 로드된 후 실행
    const allImages = [backgroundImage, ...subImages.querySelectorAll('img')];
    let loadedImages = 0;

    allImages.forEach(img => {
        if (img.complete) {
            loadedImages++;
            if (loadedImages === allImages.length) {
                calculateHeight();
            }
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === allImages.length) {
                    calculateHeight();
                }
            });
        }
    });
}

// IntersectionObserver를 사용한 스크롤 기반 애니메이션
function initScrollAnimations() {
    // theFlow h1 애니메이션
    const theFlowH1 = document.querySelector('.theFlow h1');

    if (theFlowH1) {
        // 초기 상태 설정
        theFlowH1.style.transform = `translateY(${window.innerWidth * 0.7}px)`;
        theFlowH1.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';

        // Intersection Observer 설정
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    theFlowH1.style.opacity = '1';
                    theFlowH1.style.transform = 'translateY(0)';

                    console.log('theFlow h1 애니메이션 시작');

                    // 한 번만 실행되도록 observer 해제
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3, // 30% 보일 때 트리거
            rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
        });
        observer.observe(theFlowH1);
    }

    // imageSlider 애니메이션 추가
    const imageSlider = document.querySelector('.theFlow .imageSlider');
    const imageSliderImgs = document.querySelectorAll('.theFlow .imageSlider img');

    if (imageSlider && imageSliderImgs.length > 0) {
        // imageSlider는 고정, img들만 오른쪽으로 숨김
        imageSliderImgs.forEach(img => {
            img.style.transform = 'translateX(100%)';
            img.style.opacity = '0';
            img.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
        });

        // Intersection Observer 설정
        const imageSliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 img들 애니메이션 실행
                    imageSliderImgs.forEach(img => {
                        img.style.opacity = '1';
                        img.style.transform = 'translateX(0)';
                    });

                    console.log('imageSlider img 애니메이션 시작');

                    // 한 번만 실행되도록 observer 해제
                    imageSliderObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
        });
        imageSliderObserver.observe(imageSlider);
    }

    // descriptionImage 애니메이션 추가
    const descriptionImage = document.querySelector('.theFlow .descriptionImage');
    const descriptionImageImg = document.querySelector('.theFlow .descriptionImage img');

    if (descriptionImage && descriptionImageImg) {
        // descriptionImage는 고정, img만 왼쪽으로 숨김
        descriptionImageImg.style.transform = 'translateX(-100%)';
        descriptionImageImg.style.opacity = '0';
        descriptionImageImg.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';

        // Intersection Observer 설정
        const descriptionImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 0.3초 후에 애니메이션 실행
                    setTimeout(() => {
                        descriptionImageImg.style.opacity = '1';
                        descriptionImageImg.style.transform = 'translateX(0)';

                        console.log('descriptionImage img 애니메이션 시작');
                    }, 500); // 0.3초 지연

                    // 한 번만 실행되도록 observer 해제
                    descriptionImageObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
        });
        descriptionImageObserver.observe(descriptionImage);
    }

    // grayImageSlider 애니메이션 추가
    const grayImageSlider = document.querySelector('.grayImageSlider');
    const grayImageSliderImgs = document.querySelectorAll('.grayImageSlider .imageSlider img');
    const grayImageSliderDescription = document.querySelector('.grayImageSlider .description');

    if (grayImageSlider) {
        // grayImageSlider는 고정, 내부 요소들만 왼쪽으로 숨김
        grayImageSlider.style.transform = 'translateX(-10px)'; // 왼쪽으로 10px 이동
        grayImageSlider.style.opacity = '0';
        grayImageSlider.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
        
        // Intersection Observer 설정
        const grayImageSliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    grayImageSlider.style.opacity = '1';
                    grayImageSlider.style.transform = 'translateX(0)'; // 원래 위치로
                    
                    console.log('grayImageSlider 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    grayImageSliderObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
        });   
        grayImageSliderObserver.observe(grayImageSlider);
    }

    // grayCoatImage3 애니메이션 추가
    const grayCoatImage2 = document.querySelector('.grayCoatImage2');
    const grayCoatImage3 = document.querySelector('.grayCoatImage3');

    if (grayCoatImage3) {
        // grayCoatImage3는 고정, 오른쪽으로 5px 이동한 상태

        grayCoatImage2.style.transform = 'translateX(5px)'; // 오른쪽으로 5px 이동
        grayCoatImage2.style.opacity = '0';
        grayCoatImage2.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';

        grayCoatImage3.style.transform = 'translateX(5px)'; // 오른쪽으로 5px 이동
        grayCoatImage3.style.opacity = '0';
        grayCoatImage3.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
        
        // Intersection Observer 설정
        const grayCoatImage3Observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    grayCoatImage3.style.opacity = '1';
                    grayCoatImage3.style.transform = 'translateX(0)'; // 원래 위치로

                    grayCoatImage2.style.opacity = '1';
                    grayCoatImage2.style.transform = 'translateX(0)'; // 원래 위치로
                    
                    console.log('grayCoatImage3 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    grayCoatImage3Observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
        });   
        grayCoatImage3Observer.observe(grayCoatImage3);
    }

    // blackCoatHeaderImage backgroundImage 애니메이션 추가
    const blackCoatHeaderImage = document.querySelector('.blackCoatHeaderImage');
    const blackCoatHeaderBackgroundImage = document.querySelector('.blackCoatHeaderImage .backgroundImage img');

    if (blackCoatHeaderImage && blackCoatHeaderBackgroundImage) {
        // backgroundImage는 검은색 배경에서 블러 효과로 시작
        // blackCoatHeaderBackgroundImage.style.filter = 'blur(10px) brightness(0.3)'; // 블러 + 어둡게
        blackCoatHeaderBackgroundImage.style.transition = 'filter 2s ease-out'; // 2초 애니메이션
        
        // Intersection Observer 설정
        const blackCoatHeaderImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    // blackCoatHeaderBackgroundImage.style.filter = 'blur(0px) brightness(1)'; // 선명하게 + 밝게
                    
                    console.log('blackCoatHeaderImage backgroundImage 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    blackCoatHeaderImageObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
        });   
        blackCoatHeaderImageObserver.observe(blackCoatHeaderImage);
    }

    // blackCoatHeaderImageSlider 애니메이션 추가
    const blackCoatHeaderImageSlider = document.querySelector('.blackCoatHeaderImage .blackCoatHeaderImageSlider');
    const rightBottomImage = document.querySelector('.blackCoatHeaderImage .rightBottomImage');

    if (blackCoatHeaderImageSlider) {
        // blackCoatHeaderImageSlider는 투명한 상태로 시작
        blackCoatHeaderImageSlider.style.opacity = '0';
        blackCoatHeaderImageSlider.style.transform = 'translateY(10px)';
        rightBottomImage.style.opacity = '0';
        rightBottomImage.style.transform = 'translateY(10px)';
        blackCoatHeaderImageSlider.style.transition = 'opacity 3s ease-out, transform 3s ease-out'; // 1.5초 애니메이션
        rightBottomImage.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out'; // 1.5초 애니메이션
        
        // Intersection Observer 설정
        const blackCoatHeaderImageSliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    blackCoatHeaderImageSlider.style.opacity = '1';
                    blackCoatHeaderImageSlider.style.transform = 'translateY(0)';
                    rightBottomImage.style.opacity = '1';
                    rightBottomImage.style.transform = 'translateY(0)';
                    console.log('blackCoatHeaderImageSlider 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    blackCoatHeaderImageSliderObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
        });   
        blackCoatHeaderImageSliderObserver.observe(blackCoatHeaderImageSlider);
    }

    // blackCoatHeaderImageDescription 애니메이션 추가
    const blackCoatHeaderImageDescription = document.querySelector('.blackCoatHeaderImageDescription');

    if (blackCoatHeaderImageDescription) {
        // blackCoatHeaderImageDescription은 100px 아래에서 시작
        blackCoatHeaderImageDescription.style.transform = 'translateY(150px)';
        blackCoatHeaderImageDescription.style.transition = 'transform 1s ease-out'; // 1.5초 애니메이션
        
        // Intersection Observer 설정
        const blackCoatHeaderImageDescriptionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    blackCoatHeaderImageDescription.style.transform = 'translateY(0)'; // 원래 위치로
                    
                    console.log('blackCoatHeaderImageDescription 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    blackCoatHeaderImageDescriptionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
        });   
        blackCoatHeaderImageDescriptionObserver.observe(blackCoatHeaderImageDescription);
    }

    // blackCoatHeaderTitle 애니메이션 추가
    const blackCoatHeaderTitle = document.querySelector('.blackCoatHeaderTitle');

    if (blackCoatHeaderTitle) {
        // blackCoatHeaderTitle은 화면 너비의 1/3만큼 아래에서 시작
        blackCoatHeaderTitle.style.transform = `translateY(${window.innerWidth}px)`; // 화면 너비의 1/3
        blackCoatHeaderTitle.style.transition = 'transform 1s ease-out'; // 1.5초 애니메이션
        
        // Intersection Observer 설정
        const blackCoatHeaderTitleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    blackCoatHeaderTitle.style.transform = 'translateY(0)'; // 원래 위치로
                    
                    console.log('blackCoatHeaderTitle 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    blackCoatHeaderTitleObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
        });   
        blackCoatHeaderTitleObserver.observe(blackCoatHeaderTitle);
    }

    const blackCoatLeftImg = document.querySelector('.blackCoat .blackCoatLeft img');
    const blackCoatRight = document.querySelector('.blackCoat .blackCoatRight');

    if (blackCoatLeftImg) {
        // blackCoatLeft img 초기 상태 설정
        blackCoatLeftImg.style.opacity = '0';
        blackCoatLeftImg.style.transform = 'translateY(10px)'; // 10px 아래로 이동
        blackCoatLeftImg.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const blackCoatLeftImgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    blackCoatLeftImg.style.opacity = '1';
                    blackCoatLeftImg.style.transform = 'translateY(0)'; // 원래 위치로
                    
                    console.log('blackCoatLeft img 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    blackCoatLeftImgObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        blackCoatLeftImgObserver.observe(blackCoatLeftImg);
    }

    if (blackCoatRight) {
        // blackCoatRight 초기 상태 설정
        blackCoatRight.style.opacity = '0';
        blackCoatRight.style.transform = 'translateY(10px)'; // 10px 아래로 이동
        blackCoatRight.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const blackCoatRightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    blackCoatRight.style.opacity = '1';
                    blackCoatRight.style.transform = 'translateY(0)'; // 원래 위치로
                    
                    console.log('blackCoatRight 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    blackCoatRightObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        blackCoatRightObserver.observe(blackCoatRight);
    }

    const creamCoatImgs = document.querySelectorAll('.creamCoat img');

    if (creamCoatImgs.length > 0) {
        // 모든 이미지 초기 상태 설정
        creamCoatImgs.forEach((img, index) => {
            img.style.opacity = '0';
            img.style.transform = 'translateX(5px)'; // 5px 오른쪽으로 이동
            img.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        });
        
        // Intersection Observer 설정
        const creamCoatObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 마지막 이미지부터 0.3초 간격으로 애니메이션 실행
                    creamCoatImgs.forEach((img, index) => {
                        const reverseIndex = creamCoatImgs.length - 1 - index; // 마지막부터 시작
                        setTimeout(() => {
                            img.style.opacity = '1';
                            img.style.transform = 'translateX(0)'; // 원래 위치로
                            
                            console.log(`creamCoat img ${reverseIndex + 1} 애니메이션 시작`);
                        }, reverseIndex * 300); // 마지막 요소부터 0.3초 간격으로 지연
                    });
                    
                    // 한 번만 실행되도록 observer 해제
                    creamCoatObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // creamCoat 섹션을 관찰
        const creamCoatSection = document.querySelector('.creamCoat');
        if (creamCoatSection) {
            creamCoatObserver.observe(creamCoatSection);
        }
    }

    const creamCoatShopLinkImg = document.querySelector('.creamCoatShopLink img');

    if (creamCoatShopLinkImg) {
        // creamCoatShopLink img 초기 상태 설정
        creamCoatShopLinkImg.style.opacity = '0';
        creamCoatShopLinkImg.style.transform = 'translateX(10px)'; // 10px 오른쪽으로 이동
        creamCoatShopLinkImg.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const creamCoatShopLinkObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    creamCoatShopLinkImg.style.opacity = '1';
                    creamCoatShopLinkImg.style.transform = 'translateX(0)'; // 원래 위치로
                    
                    console.log('creamCoatShopLink img 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    creamCoatShopLinkObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // creamCoatShopLink 섹션을 관찰
        const creamCoatShopLinkSection = document.querySelector('.creamCoatShopLink');
        if (creamCoatShopLinkSection) {
            creamCoatShopLinkObserver.observe(creamCoatShopLinkSection);
        }
    }

    const creamCoatShopLinkText = document.querySelector('.creamCoatShopLink .text');

    if (creamCoatShopLinkText) {
        // creamCoatShopLink text 초기 상태 설정
        creamCoatShopLinkText.style.opacity = '0';
        creamCoatShopLinkText.style.transform = 'translateX(5px)'; // 5px 오른쪽으로 이동
        creamCoatShopLinkText.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const creamCoatShopLinkTextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    creamCoatShopLinkText.style.opacity = '1';
                    creamCoatShopLinkText.style.transform = 'translateX(0)'; // 원래 위치로
                    
                    console.log('creamCoatShopLink text 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    creamCoatShopLinkTextObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // creamCoatShopLink 섹션을 관찰
        const creamCoatShopLinkSection = document.querySelector('.creamCoatShopLink');
        if (creamCoatShopLinkSection) {
            creamCoatShopLinkTextObserver.observe(creamCoatShopLinkSection);
        }
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    adjustBrownJacketHeight();
    initScrollAnimations();
    theFlowSectionAnimations();
});

// 창 크기 변경 시 실행 (반응형 대응)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustBrownJacketHeight, 100);
});