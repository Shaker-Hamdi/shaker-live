$(document).ready(function() {

    (function() {
        var backToTop = $('a.backToTop');

        backToTop.on('click', function(event) {
            $('html, body').animate({
                scrollTop: 0
            }, 300);

            event.preventDefault();
        });

        $(window).on('scroll', function() {
            var self = $(this),
                height = self.height() / 8,
                top = self.scrollTop();

            if (top > height) {
                if (!backToTop.hasClass("show")) {
                    backToTop.addClass("show");
                }
            } else {
                backToTop.removeClass("show");
            }
        });
    })();
	//Back to top button
	
	(function() {
        if ($("a.toggle-mobile-nav").length) {
            $("a.toggle-mobile-nav").on("click", function(event) {
                event.preventDefault();
                event.stopPropagation();

                $("body").toggleClass("show-mobile-nav");
                $("html").toggleClass("show-mobile-nav");
            });
        }
    })();
    //toggle Mobile Nav

    (function() {
        if ($("div.videoButton").length) {
            $("div.videoButton a").magnificPopup({
                type: "iframe"
            });
        }
    })();
    //magnificPopup (iframe)

    (function() {
        if ($("div.photosGrid").length) {
            $("div.photosGrid a.galleryItem").magnificPopup({
                type: "image",
                gallery: {
                    enabled: true
                }
            });
        }
    })();
	//magnificPopup (Photo Gallery)

	(function() {
        if ($("a.gallery").length) {
			$('a.gallery').on('click', function(event) {
				event.preventDefault();
				
				var gallery = $(this).attr('href');
			
				$(gallery).magnificPopup({
					delegate: 'a',
					type:'image',
					gallery: {
						enabled: true
					}
				}).magnificPopup('open');
			});
        }
    })();
	//magnificPopup (Photo Gallery)

    (function() {
        if ($(".cv a.open-popup").length) {
            $(".cv a.open-popup").magnificPopup({
                type: 'inline',
                preloader: false,
                focus: '#name',

                removalDelay: 500, //delay removal by X to allow out-animation

                // When elemened is focused, some mobile browsers in some cases zoom in
                // It looks not nice, so we disable it:
                callbacks: {
					open: function() {
						if(!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)) {
							$('html').css('margin-right', 17);
						} else {
							$('html').css('margin-right', 0);
						}
					},
					close: function() {
						$('html').css('padding-right', 0);
					},
                    beforeOpen: function() {

                        if ($(window).width() < 700) {
                            this.st.focus = false;
                        } else {
                            this.st.focus = '#name';
                        }

                        this.st.mainClass = this.st.el.attr('data-effect');
                    }
                },

                midClick: true // allow opening popup on middle mouse click. Always set
            });
        }
    })();
    //magnificPopup (Form)

    (function() {
        if(window.location.hash != "") {
            var element = window.location.hash;

        	if (element.indexOf("#_=_") >= 0) {
        		return false;
        	} else {
        		if($(element).length && $(element).hasClass("mfp-with-anim")) {

	                openMagnificPopup(window.location.hash, false);
	            }
        	}
        }
    })();
	//Open the popup if the hashtag is not empty and the popup exist
	
	(function() {
		$(".mobile-nav a").on("click", function(event) {
			event.preventDefault();

			if(!$(this).hasClass("active")) {
				var sectionName = $(this).data("target");
				$(".content > section").hide();
				$(sectionName).show();
				portfolioLayout();

				$(".mobile-nav a").removeClass("active");
				$(this).addClass("active");
			}
		});
    })();
	//Mobile Tabs
});

function openMagnificPopup(element, checker) {

    var source,
        hasEffect;

    // console.log(element);

    if (checker === true) {
        // console.log("link");
        source = element.attr('href');
        hasEffect = true;
    } else {
        // console.log("not alink");
        source = element;
        hasEffect = false;
    }

    $.magnificPopup.open({
        items: {
            src: source
        },
        type: 'inline',
        preloader: false,
        focus: '#name',

        removalDelay: 500, //delay removal by X to allow out-animation

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
			open: function() {
				if(!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)) {
					$('html').css('margin-right', 17);
				} else {
					$('html').css('margin-right', 0);
				}
			},
			close: function() {
				$('html').css('padding-right', 0);
			},
            beforeOpen: function() {

                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }

                if (hasEffect) {
                    this.st.mainClass = element.attr('data-effect');
                }
            }
        },

        midClick: true // allow opening popup on middle mouse click. Always set
    });
}
//openMagnificPopup

$(window).load(function () {
	(function () {
		if ($(".portfolio-filter").length) {
			portfolioLayout();
		}
	})();
	//portfolio-filter
});

function portfolioLayout() {
	var portfolioList = $(".portfolio-list > ul");
	// initialize isotope
	portfolioList.isotope({
		itemSelector: '.portfolio-list > ul > li',
		layoutMode: 'fitRows'
	});

	// filters
	$(".portfolio-filter").find('a').on("click", function (event) {
		event.preventDefault();
		var selector = $(this).attr('data-filter');
		portfolioList.isotope({ filter: selector });
		$(".portfolio-filter a").removeClass("selected");
		$(this).addClass("selected");
	});
}
