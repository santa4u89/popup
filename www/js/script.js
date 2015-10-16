var Popup = function (container) {

    // Main variables
    this.container = container;
    this.windowObject = $(window);
    this.popupWrapper = $('.popup-wrapper');
    // this.popupWrapper = this.container.wrap('<div class="popup-wrapper"></div>');

    // Variables for calculating dimensions of the popup banner
    this.windowWidth = this.windowObject.width();
    this.windowHeight = this.windowObject.height();
    this.containerWidth = this.container.width();
    this.containerHeight = this.container.height();
    this.containerMargin = 50;
    // this.popupRatio = this.containerWidth / this.containerHeight;
    this.maxWidth = this.windowWidth - this.containerMargin;
    this.maxHeight = this.windowHeight - this.containerMargin;

    // Calculating dimensions to center popup banner
    this.container.css({
        left: (this.windowWidth - containerWidth) / 2 + 'px',
        top: (this.windowHeight - containerHeight) / 2 + 'px',
    });

    // If image is wider than window's width, set up the width of the window
    if (this.containerWidth >= this.maxWidth) {
        console.log('pocitam sirku');
        this.popupRatio = this.maxWidth / this.containerWidth;
        this.containerHeight = this.containerHeight * this.popupRatio;
        this.containerWidth = this.containerWidth * this.popupRatio;

        this.container.css({
            width: maxWidth + 'px',
            height: this.containerHeight + 'px',
            left: containerMargin / 2 + 'px',
            top: (this.windowHeight - containerHeight) / 2 + 'px'
        });
    }

    // If image is higher than window's height, set up the height of the window
    if (this.containerHeight >= this.maxHeight) {
        console.log('pocitam vysku');
        this.popupRatio = this.maxHeight / this.containerHeight;
        this.containerHeight = this.containerHeight * this.popupRatio;
        this.containerWidth = this.containerWidth * this.popupRatio;

        this.container.css({
            height: this.maxHeight + 'px',
            width: this.containerWidth + 'px',
            left: (this.windowWidth - this.containerWidth) / 2 + 'px',
            top: (this.windowHeight - containerHeight) / 2 + 'px'
        });
    }

    console.log('windowWidth: ' + windowWidth);
    console.log('containerWidth: ' + containerWidth);
    console.log('windowHeight: ' + windowHeight);
    console.log('containerHeight: ' + containerHeight);
    console.log('ratio: ' + this.popupRatio);
    console.log('top: ' + this.container.css('top'));
    console.log('left: ' + this.container.css('left'));

    // Initialize popup banner
    this.container.fadeIn(400);

    // Close popup banner
    this.popupWrapper.on('click', '.close', function(e) {
        e.preventDefault();
        $('.popup-wrapper').fadeOut(400);
    });



};
