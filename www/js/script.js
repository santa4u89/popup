var Popup = function() {
    $(window).on('load', $.proxy(this.popupCreate, this));
    $('body').on('click', 'a[data-popup]', $.proxy(this.popupShow, this));
    $('body').on('click', '.close', $.proxy(this.popupClose, this));
};

Popup.prototype.popupCreate = function() {
    this.popupOverlay = $('<div class="popup-overlay"><div class="popup"><img class="popup-image" src=""></div><a class="close" href="#"><i class="material-icons">clear</i></a></div>');
    this.container = this.popupOverlay.find('.popup');
    $('body').append(this.popupOverlay);
    this.popupOverlay.css('display', 'none');
};

Popup.prototype.popupCalculate = function() {
    // Main variables
    this.container = $('body').find('.popup');
    this.windowObject = $(window);

    // Variables for calculating dimensions of the popup banner
    this.windowWidth = this.windowObject.width();
    this.windowHeight = this.windowObject.height();
    this.containerWidth = this.container.width();
    this.containerHeight = this.container.height();
    this.containerMargin = 50;
    this.maxWidth = this.windowWidth - this.containerMargin;
    this.maxHeight = this.windowHeight - this.containerMargin;

    // Calculating dimensions to center popup banner
    this.container.css({
        left: (this.windowWidth - this.containerWidth) / 2 + 'px',
        top: (this.windowHeight - this.containerHeight) / 2 + 'px',
    });

    // If image is wider than window's width, set up the width of the window
    if (this.containerWidth >= this.maxWidth) {
        console.log('pocitam sirku');
        this.popupRatio = this.maxWidth / this.containerWidth;
        this.containerHeight = this.containerHeight * this.popupRatio;
        this.containerWidth = this.containerWidth * this.popupRatio;

        this.container.css({
            width: this.maxWidth + 'px',
            height: this.containerHeight + 'px',
            left: this.containerMargin / 2 + 'px',
            top: (this.windowHeight - this.containerHeight) / 2 + 'px'
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
            top: (this.windowHeight - this.containerHeight) / 2 + 'px'
        });
    }

    console.log('windowWidth: ' + this.windowWidth);
    console.log('containerWidth: ' + this.containerWidth);
    console.log('windowHeight: ' + this.windowHeight);
    console.log('containerHeight: ' + this.containerHeight);
    console.log('ratio: ' + this.popupRatio);
    console.log('top: ' + this.container.css('top'));
    console.log('left: ' + this.container.css('left'));
};

Popup.prototype.popupImageShow = function(e) {
    this.popupImage = this.popupOverlay.find('.popup-image');
    this.popupImageSource = $(e.currentTarget).attr('href');
    this.popupImage.load(this.popupCalculate);
    this.popupImage.attr('src', this.popupImageSource);
};

Popup.prototype.popupShow = function(e) {
    this.popupImageShow(e);
    this.popupOverlay.fadeIn(400);
    return false;
};

Popup.prototype.resetValues = function() {
    this.container.removeAttr('style');
};

Popup.prototype.popupClose = function(){
    this.popupOverlay.fadeOut('400', $.proxy(this.resetValues, this));
    return false;
};
