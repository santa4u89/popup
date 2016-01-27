var Popup = function() {
    this.popupCreate();

    $('body').on('click', 'a[data-popup]', $.proxy(this.popupShow, this));
    $('body').on('click', '.close, .popup-overlay', $.proxy(this.popupClose, this));

    // Global variables for calculating dimensions of the popup banner
    this.windowObject = $(window);
    this.popupMargin = 20;

    $(window).on('resize', $.proxy(this.popupResize, this));

    // this.popupAlbum();
};

Popup.prototype.popupCreate = function() {
    this.popupOverlay = $('<div class="popup-overlay"><div class="popup-container"><div class="image-container"><img class="popup-image" src=""><div class="popup-nav"><a class="popup-next"><i class="material-icons">keyboard_arrow_right</i></a><a class="popup-prev"><i class="material-icons">keyboard_arrow_left</i></a></div></div></div><a class="close" href="#"><i class="material-icons">clear</i></a></div>');
    this.popupContainer = this.popupOverlay.find('.popup-container');
    this.popupImageContainer = this.popupContainer.find('.image-container');
    this.popupNextImage = this.popupImageContainer.find('.popup-next');
    this.popupPrevImage = this.popupImageContainer.find('.popup-prev');
    $('body').append(this.popupOverlay);
    this.popupOverlay.css('display', 'none');
};

Popup.prototype.popupShow = function(event) {
    event.preventDefault();
    this.popupImageShow(event);
    this.popupOverlay.fadeIn(400);
    this.enableKeyboard();
};

Popup.prototype.popupImageShow = function(event) {
    this.targetImage = $(event.currentTarget);
    this.popupImage = this.popupOverlay.find('.popup-image');
    this.popupImageSource = this.targetImage.attr('href');
    this.popupImageData = this.targetImage.data('popup');
    this.popupImage.attr('src', this.popupImageSource);
    this.popupImage.unbind('load');
    this.popupImage.load($.proxy(this.popupCalculate, this));
    this.popupAlbum();
};

Popup.prototype.popupAlbum = function() {
    var allImages = $('a[data-popup]');
    this.currentImageIndex = 0;

    // get all data-popup names
    var albumNames = [];
    $.each(allImages, function(index, val) {
         albumNames.push($(val).data('popup'));
    });

    // delete duplicates
    $.unique(albumNames);
    // console.log(albumNames);

    // albums object of data-popup attributes
    var albums = {};
    $.each(albumNames, function(index, val) {
        albums[val] = allImages.filter('[data-popup="' + val + '"]');
    });
    // console.log(albums);

    this.albumLength = albums[this.popupImageData].length;
    this.currentImage = albums[this.popupImageData][this.currentImageIndex];
    this.imageLink = this.currentImage.getAttribute('href');
    console.log(this.imageLink);

    /**

        TODO:
        - Finish albums next/prev image

     */


};

Popup.prototype.showNavArrows = function() {
    if (this.currentImageIndex > 1) {
        this.popupPrevImage.show();
        console.log('prev arrow show');
    } else if (this.currentImageIndex < this.albumLength) {
        this.popupNextImage.show();
        console.log('next arrow show');
    } else {
        this.popupPrevImage.hide();
        this.popupNextImage.hide();
        console.log('hide arrows');
    }
};

Popup.prototype.popupChangeImage = function() {
};

Popup.prototype.popupCalculate = function() {
    this.windowWidth = this.windowObject.width();
    this.windowHeight = this.windowObject.height();
    this.popupImageWidth = this.popupImage.width();
    this.popupImageHeight = this.popupImage.height();

    // Calculate ratio and adjust image container dimensions
    this.ratioWidth = this.windowWidth / this.popupImageWidth;
    this.ratioHeight = this.windowHeight / this.popupImageHeight;
    this.minRatio = Math.min(this.ratioWidth, this.ratioHeight);

    if (this.minRatio < 1) {
        this.popupImageHeight = (this.popupImageHeight * this.minRatio) - (this.popupMargin * 2);
    }

    if (this.minRatio === 1) {
        this.popupImageWidth = this.popupImageWidth - this.popupMargin * 2;
        this.popupImageHeight = (this.popupImageHeight * this.minRatio) - (this.popupMargin * 2);
    }

    this.popupSetDimensions();
    // this.dimensionsLog();
};

Popup.prototype.popupSetDimensions = function() {
    // this.popupContainer.height(this.popupImageHeight - (this.popupMargin * 2));
    // this.popupContainer.width(this.popupImageWidth - (this.popupMargin * 2));
    this.popupContainer.css({
        height: this.popupImageHeight + 'px',
        width: this.popupImageWidth + 'px',
        top: ((this.windowHeight - this.popupImageHeight) / 2) + 'px'
    });
};

Popup.prototype.popupResize = function() {
    this.resetValues();
    this.popupCalculate();
    this.popupSetDimensions();
};

Popup.prototype.popupClose = function() {
    this.popupOverlay.fadeOut('400', $.proxy(this.resetValues, this));
    this.disableKeyboard();
};

Popup.prototype.resetValues = function() {
    this.popupContainer.removeAttr('style');
};

Popup.prototype.enableKeyboard = function() {
    $(document).on('keyup.keyboard', $.proxy(this.keyboardActions, this));
};

Popup.prototype.disableKeyboard = function() {
    $(document).off('.keyboard');
};

Popup.prototype.keyboardActions = function(key) {
    var ESC = 27;
    var LEFT_ARROW = 37;
    var RIGHT_ARROW = 39;

    var keycode = key.keyCode;

    switch(keycode){
        case ESC:
            this.popupClose();
            break;
        case LEFT_ARROW:
            console.log('left arrow');
            break;
        case RIGHT_ARROW:
            console.log('right arrow');
            break;
        default:
            break;
    }
};

Popup.prototype.dimensionsLog = function() {
    console.log(' ');
    console.log('ratioHeight: ' + this.ratioHeight);
    console.log('ratioWidth: ' + this.ratioWidth);
    console.log('minRatio: ' + this.minRatio);
    console.log('windowWidth: ' + this.windowWidth);
    console.log('imageWidth: ' + this.popupImageWidth);
    console.log('windowHeight: ' + this.windowHeight);
    console.log('imageHeight: ' + this.popupImageHeight);
    console.log('top: ' + this.popupContainer.css('top'));
};
