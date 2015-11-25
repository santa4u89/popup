var Popup = function() {
    this.popupCreate();
    $('body').on('click', 'a[data-popup]', $.proxy(this.popupShow, this));
    $('body').on('click', '.close, .popup-overlay', $.proxy(this.popupClose, this));

    // Global variables for calculating dimensions of the popup banner
    this.windowObject = $(window);
    this.windowWidth = this.windowObject.width();
    this.windowHeight = this.windowObject.height();

    // $(window).on('resize', $.proxy(this.popupResize, this));
};

Popup.prototype.popupCreate = function() {
    this.popupOverlay = $('<div class="popup-overlay"><div class="popup"><img class="popup-image" src=""></div><a class="close" href="#"><i class="material-icons">clear</i></a></div>');
    this.container = this.popupOverlay.find('.popup');
    $('body').append(this.popupOverlay);
    this.popupOverlay.css('display', 'none');
};

Popup.prototype.popupCalculate = function() {
    this.popupImageWidth = this.popupImage.width();
    this.popupImageHeight = this.popupImage.height();

    // Calculate ratio and adjust image container dimensions
    var ratioWidth = this.windowWidth / this.popupImageWidth;
    var ratioHeight = this.windowHeight / this.popupImageHeight;
    var minRatio = Math.min(ratioWidth, ratioHeight);
    if (minRatio < 1) {
        this.popupImageHeight = this.popupImageHeight * minRatio;
    }

    this.popupApplyStyles();

    // console.log('windowWidth: ' + this.windowWidth);
    // console.log('imageWidth: ' + this.popupImageWidth);
    // console.log('windowHeight: ' + this.windowHeight);
    // console.log('imageHeight: ' + this.popupImageHeight);
    // console.log('ratio: ' + minRatio);
    // console.log('top: ' + this.container.css('top'));
};

Popup.prototype.popupApplyStyles = function() {
    this.container.css({
        height: this.popupImageHeight + 'px',
        top: ((this.windowHeight - this.popupImageHeight) / 2) + 'px'
    });
};

// Popup.prototype.popupResize = function() {
//     this.popupCalculate();
//     this.popupApplyStyles();
// };

Popup.prototype.popupImageShow = function(e) {
    this.popupImage = this.popupOverlay.find('.popup-image');
    this.popupImageSource = $(e.currentTarget).attr('href');
    this.popupImage.attr('src', this.popupImageSource);
    this.popupImage.unbind('load');
    this.popupImage.load($.proxy(this.popupCalculate, this));
};

Popup.prototype.popupShow = function(e) {
    e.preventDefault();
    this.popupImageShow(e);
    this.popupOverlay.fadeIn(400);
    $(document).on('keyup === 27', $.proxy(this.popupClose, this));
};

Popup.prototype.resetValues = function() {
    this.container.removeAttr('style');
};

Popup.prototype.popupClose = function(e) {
    e.preventDefault();
    this.popupOverlay.fadeOut('400', $.proxy(this.resetValues, this));
    $(document).off('keyup');
};
