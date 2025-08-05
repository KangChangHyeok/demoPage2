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

    const stikcyProducts2Header = document.querySelector('.stikcyProducts2Header');

    if (stikcyProducts2Header) {
        // stikcyProducts2Header 초기 상태 설정
        stikcyProducts2Header.style.opacity = '0';
        stikcyProducts2Header.style.transform = 'translateY(10px)'; // 아래로 10px 이동
        stikcyProducts2Header.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const stikcyProducts2HeaderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    stikcyProducts2Header.style.opacity = '1';
                    stikcyProducts2Header.style.transform = 'translateY(0)'; // 원래 위치로
                    
                    console.log('stikcyProducts2Header 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    stikcyProducts2HeaderObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // stikcyProducts2Header 요소를 직접 관찰
        stikcyProducts2HeaderObserver.observe(stikcyProducts2Header);
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

    const halfCoatElements = [
        '.halfCoat .top',
        '.halfCoat .top .imageSlider',
        '.halfCoat .title',
        '.halfCoat .leftImageSlider',
        '.halfCoat .rightBottomImageSlider',
        '.halfCoat .productLink'
    ];

    // 모든 요소 초기 상태 설정
    halfCoatElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(10px)'; // 10px 아래로 이동
            element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        }
    });
    
    // Intersection Observer 설정
    const halfCoatObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 화면에 나타나면 순차적으로 애니메이션 실행
                halfCoatElements.forEach((selector, index) => {
                    const element = document.querySelector(selector);
                    if (element) {
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)'; // 원래 위치로
                            
                            console.log(`${selector} 애니메이션 시작 (${index + 1}번째)`);
                        }, index * 300); // 0.3초 간격으로 지연
                    }
                });
                
                // 한 번만 실행되도록 observer 해제
                halfCoatObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });   
    
    // halfCoat 섹션을 관찰
    const halfCoatSection = document.querySelector('.halfCoat');
    if (halfCoatSection) {
        halfCoatObserver.observe(halfCoatSection);
    }

    const theFlowImageImg = document.querySelector('.theFlowImage img');

    if (theFlowImageImg) {
        // theFlowImage img 초기 상태 설정
        theFlowImageImg.style.opacity = '0';
        theFlowImageImg.style.transform = 'scale(1.2)'; // 1.2배 크기
        theFlowImageImg.style.filter = 'blur(10px)'; // 블러 처리
        theFlowImageImg.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out, filter 1.5s ease-out';
        
        // Intersection Observer 설정
        const theFlowImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    theFlowImageImg.style.opacity = '1';
                    theFlowImageImg.style.transform = 'scale(1)'; // 원래 크기로
                    theFlowImageImg.style.filter = 'blur(0px)'; // 선명하게
                    
                    console.log('theFlowImage img 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    theFlowImageObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // theFlowImage 섹션을 관찰
        const theFlowImageSection = document.querySelector('.theFlowImage');
        if (theFlowImageSection) {
            theFlowImageObserver.observe(theFlowImageSection);
        }
    }

    const theFlowImageP = document.querySelector('.theFlowImage p');

    if (theFlowImageP) {
        // theFlowImage p 초기 상태 설정
        theFlowImageP.style.opacity = '0';
        theFlowImageP.style.transform = 'translateY(10px)'; // 10px 아래로 이동
        theFlowImageP.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const theFlowImageTextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    theFlowImageP.style.opacity = '1';
                    theFlowImageP.style.transform = 'translateY(0)'; // 원래 위치로
                    
                    console.log('theFlowImage p 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    theFlowImageTextObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // theFlowImage 섹션을 관찰
        const theFlowImageSection = document.querySelector('.theFlowImage');
        if (theFlowImageSection) {
            theFlowImageTextObserver.observe(theFlowImageSection);
        }
    }

    const woolJacketH1 = document.querySelector('.woolJacket h1');

    if (woolJacketH1) {
        // woolJacket h1 초기 상태 설정
        woolJacketH1.style.opacity = '0';
        woolJacketH1.style.transform = 'translateX(-10px)'; // 왼쪽으로 10px 이동
        woolJacketH1.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const woolJacketObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    woolJacketH1.style.opacity = '1';
                    woolJacketH1.style.transform = 'translateX(0)'; // 원래 위치로
                    
                    console.log('woolJacket h1 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    woolJacketObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // woolJacket 섹션을 관찰
        const woolJacketSection = document.querySelector('.woolJacket');
        if (woolJacketSection) {
            woolJacketObserver.observe(woolJacketSection);
        }
    }

    const woolJacketImages = document.querySelectorAll('.woolJacket .images img');

    if (woolJacketImages.length > 0) {
        // 모든 이미지 초기 상태 설정
        woolJacketImages.forEach((img, index) => {
            img.style.opacity = '0';
            img.style.transform = 'translateX(10px)'; // 10px 오른쪽으로 이동
            img.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        });
        
        // Intersection Observer 설정
        const woolJacketImagesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 순차적으로 애니메이션 실행
                    woolJacketImages.forEach((img, index) => {
                        let delay = 0;
                        
                        if (index === 0) {
                            delay = 0; // 첫 번째 이미지: 바로 실행
                        } else if (index === 1) {
                            delay = 300; // 두 번째 이미지: 0.3초 후
                        } else if (index === 2) {
                            delay = 500; // 세 번째 이미지: 0.5초 후 (0.3 + 0.2)
                        }
                        
                        setTimeout(() => {
                            img.style.opacity = '1';
                            img.style.transform = 'translateX(0)'; // 원래 위치로
                            
                            console.log(`woolJacket img ${index + 1} 애니메이션 시작 (${delay}ms 지연)`);
                        }, delay);
                    });
                    
                    // 한 번만 실행되도록 observer 해제
                    woolJacketImagesObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // woolJacket 섹션을 관찰
        const woolJacketSection = document.querySelector('.woolJacket');
        if (woolJacketSection) {
            woolJacketImagesObserver.observe(woolJacketSection);
        }
    }

    const brownJacketBackgroundImage = document.querySelector('.brownJacket-container .backgroundImage');

    if (brownJacketBackgroundImage) {
        // brownJacket backgroundImage 초기 상태 설정
        brownJacketBackgroundImage.style.opacity = '0';
        brownJacketBackgroundImage.style.transform = 'translateY(10px)'; // 10px 아래로 이동
        brownJacketBackgroundImage.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const brownJacketBackgroundObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    brownJacketBackgroundImage.style.opacity = '1';
                    brownJacketBackgroundImage.style.transform = 'translateY(0)'; // 원래 위치로
                    
                    console.log('brownJacket backgroundImage 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    brownJacketBackgroundObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // brownJacket-container 섹션을 관찰
        const brownJacketContainer = document.querySelector('.brownJacket-container');
        if (brownJacketContainer) {
            brownJacketBackgroundObserver.observe(brownJacketContainer);
        }
    }

    const brownJacketShopLink = document.querySelector('.brownJacket-container .shopLink');

    if (brownJacketShopLink) {
        // brownJacket shopLink 초기 상태 설정
        brownJacketShopLink.style.opacity = '0';
        brownJacketShopLink.style.transform = 'translateX(-10px)'; // 왼쪽으로 10px 이동
        brownJacketShopLink.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const brownJacketShopLinkObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    brownJacketShopLink.style.opacity = '1';
                    brownJacketShopLink.style.transform = 'translateX(0)'; // 원래 위치로
                    
                    console.log('brownJacket shopLink 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    brownJacketShopLinkObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // brownJacket-container 섹션을 관찰
        const brownJacketContainer = document.querySelector('.brownJacket-container');
        if (brownJacketContainer) {
            brownJacketShopLinkObserver.observe(brownJacketContainer);
        }
    }

    const brownJacketSubImages = document.querySelector('.brownJacket-container .subImages');

    if (brownJacketSubImages) {
        // brownJacket subImages 초기 상태 설정
        brownJacketSubImages.style.opacity = '0';
        brownJacketSubImages.style.transform = 'translateX(10px)'; // 오른쪽으로 10px 이동
        brownJacketSubImages.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const brownJacketSubImagesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    brownJacketSubImages.style.opacity = '1';
                    brownJacketSubImages.style.transform = 'translateX(0)'; // 원래 위치로
                    
                    console.log('brownJacket subImages 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    brownJacketSubImagesObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // brownJacket-container 섹션을 관찰
        const brownJacketContainer = document.querySelector('.brownJacket-container');
        if (brownJacketContainer) {
            brownJacketSubImagesObserver.observe(brownJacketContainer);
        }
    }

    const theFlowBlackH1 = document.querySelector('.theFlowBlack h1');

    if (theFlowBlackH1) {
        // theFlowBlack h1 초기 상태 설정
        theFlowBlackH1.style.opacity = '0';
        theFlowBlackH1.style.transform = 'translateY(-10px)'; // 위로 10px 이동
        theFlowBlackH1.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const theFlowBlackH1Observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    theFlowBlackH1.style.opacity = '1';
                    theFlowBlackH1.style.transform = 'translateY(0)'; // 원래 위치로
                    
                    console.log('theFlowBlack h1 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    theFlowBlackH1Observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // theFlowBlack 섹션을 관찰
        const theFlowBlackSection = document.querySelector('.theFlowBlack');
        if (theFlowBlackSection) {
            theFlowBlackH1Observer.observe(theFlowBlackSection);
        }
    }

    const theFlowBlackImageSlider = document.querySelector('.theFlowBlack .imageSlider');
    const theFlowBlackDescription = document.querySelector('.theFlowBlack .description');

    // imageSlider 애니메이션
    if (theFlowBlackImageSlider) {
        theFlowBlackImageSlider.style.opacity = '0';
        theFlowBlackImageSlider.style.transform = 'translateY(-10px)'; // 위로 10px 이동
        theFlowBlackImageSlider.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    }

    // description 애니메이션
    if (theFlowBlackDescription) {
        theFlowBlackDescription.style.opacity = '0';
        theFlowBlackDescription.style.transform = 'translateY(-10px)'; // 위로 10px 이동
        theFlowBlackDescription.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    }
    
    // Intersection Observer 설정
    const theFlowBlackElementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // imageSlider 애니메이션 실행
                if (theFlowBlackImageSlider) {
                    theFlowBlackImageSlider.style.opacity = '1';
                    theFlowBlackImageSlider.style.transform = 'translateY(0)'; // 원래 위치로
                    console.log('theFlowBlack imageSlider 애니메이션 시작');
                }

                // description 애니메이션 실행
                if (theFlowBlackDescription) {
                    theFlowBlackDescription.style.opacity = '1';
                    theFlowBlackDescription.style.transform = 'translateY(0)'; // 원래 위치로
                    console.log('theFlowBlack description 애니메이션 시작');
                }
                
                // 한 번만 실행되도록 observer 해제
                theFlowBlackElementsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });   
    
    // theFlowBlack 섹션을 관찰
    const theFlowBlackSection = document.querySelector('.theFlowBlack');
    if (theFlowBlackSection) {
        theFlowBlackElementsObserver.observe(theFlowBlackSection);
    }

    const theFlowBlackSubImages = document.querySelectorAll('.theFlowBlack .subImages .left img');

    if (theFlowBlackSubImages.length > 0) {
        // 모든 이미지 초기 상태 설정
        theFlowBlackSubImages.forEach((img, index) => {
            img.style.opacity = '0';
            
            if (index === 0) {
                // 첫 번째 이미지: 왼쪽으로 10px 이동
                img.style.transform = 'translateX(-10px)';
            } else if (index === 1) {
                // 두 번째 이미지: 오른쪽으로 10px 이동
                img.style.transform = 'translateX(10px)';
            }
            
            img.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        });
        
        // Intersection Observer 설정
        const theFlowBlackSubImagesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 모든 이미지 애니메이션 실행
                    theFlowBlackSubImages.forEach((img, index) => {
                        img.style.opacity = '1';
                        img.style.transform = 'translateX(0)'; // 원래 위치로
                        
                        console.log(`theFlowBlack subImages img ${index + 1} 애니메이션 시작`);
                    });
                    
                    // 한 번만 실행되도록 observer 해제
                    theFlowBlackSubImagesObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // theFlowBlack 섹션을 관찰
        const theFlowBlackSection = document.querySelector('.theFlowBlack');
        if (theFlowBlackSection) {
            theFlowBlackSubImagesObserver.observe(theFlowBlackSection);
        }
    }

    const theFlowBlackSubImagesRight = document.querySelector('.theFlowBlack .subImages .right');

    if (theFlowBlackSubImagesRight) {
        // theFlowBlack subImages right 초기 상태 설정
        theFlowBlackSubImagesRight.style.opacity = '0';
        theFlowBlackSubImagesRight.style.transform = 'translateY(10px)'; // 아래로 10px 이동
        theFlowBlackSubImagesRight.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Intersection Observer 설정
        const theFlowBlackSubImagesRightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 화면에 나타나면 애니메이션 실행
                    theFlowBlackSubImagesRight.style.opacity = '1';
                    theFlowBlackSubImagesRight.style.transform = 'translateY(0)'; // 원래 위치로
                    
                    console.log('theFlowBlack subImages right 애니메이션 시작');
                    
                    // 한 번만 실행되도록 observer 해제
                    theFlowBlackSubImagesRightObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });   
        
        // theFlowBlack 섹션을 관찰
        const theFlowBlackSection = document.querySelector('.theFlowBlack');
        if (theFlowBlackSection) {
            theFlowBlackSubImagesRightObserver.observe(theFlowBlackSection);
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