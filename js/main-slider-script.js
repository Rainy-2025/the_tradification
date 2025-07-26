var tpj = jQuery;
var revapi486;

function initRevSlider() {
    if (tpj("#rev_slider_one").revolution == undefined) {
        revslider_showDoubleJqueryError("#rev_slider_one");
    } else {
        revapi486 = tpj("#rev_slider_one").show().revolution({
            sliderType: "standard",
            jsFileLocation: "plugins/revolution/js/",
            sliderLayout: "auto",
            dottedOverlay: "on",
            delay: 10000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "off",
                touch: {
                    touchenabled: "on",
                    touchOnDesktop: "off",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
                arrows: {
                    style: "gyges",
                    enable: true,
                    hide_onmobile: true,
                    hide_under: 600,
                    hide_onleave: true,
                    tmp: '',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    }
                }
            },
            responsiveLevels: [1200, 1040, 802, 480],
            visibilityLevels: [1200, 1040, 802, 480],
            gridwidth: [1200, 1040, 800, 480],
            gridheight: [820, 750, 750, 750],
            lazyType: "none",
            parallax: {
                type: "mouse",
                origo: "enterpoint",
                speed: 1000,
                levels: [1, 2, 3, 4, 5]
            },
            shadow: 0,
            spinner: "off",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false,
            },
            transition: "slidehorizontal",
            transitionDuration: 1000,
            easing: "easeInOutQuad"
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    function loadBannerWebinars() {
        if (typeof revapi486 !== 'undefined' && revapi486 !== null) {
            revapi486.revkill(); // Destroy existing slider instance if exists
        }

        fetch('backend/fetch_banner_webinars.php')
            .then(response => response.json())
            .then(data => {
                const sliderList = document.getElementById('sliderList');
                sliderList.innerHTML = '';

                data.forEach((webinar, index) => {
                    const li = document.createElement('li');
                    li.setAttribute('data-index', 'rs-' + (index + 1));
                    li.setAttribute('data-transition', 'slidehorizontal');
                    li.style.cursor = 'pointer';
                    li.addEventListener('click', () => {
                        window.location.href = 'page-webinar-details.html?id=' + webinar.id;
                    });

                    const img = document.createElement('img');
                    img.src = webinar.thumbnail ? 'project-settings/backend/uploads/' + webinar.thumbnail : 'images/resource/course-5.jpg';
                    img.alt = webinar.name;
                    img.className = 'rev-slidebg';
                    img.style.width = '100%';
                    img.style.height = 'auto';

                    li.appendChild(img);
                    sliderList.appendChild(li);
                });

                // Initialize slider AFTER slides are in the DOM
                setTimeout(() => {
                    console.log("Slides loaded:", document.querySelectorAll('#sliderList li').length);
                    initRevSlider();
                }, 100);
            })
            .catch(error => {
                console.error('Error loading banner webinars:', error);
            });
    }

    loadBannerWebinars(); // Call on DOM ready
});
