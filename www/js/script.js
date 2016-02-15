var Popup = function() {
    this.popupCreate();

    var self = this;
    $('body').on('click', 'a[data-popup]', function(event) {
        event.preventDefault();
        self.popupStart($(event.currentTarget));
    });

    $('body')
            .on('click', '#popup-overlay', $.proxy(this.popupClose, this))
            .on('click', '.popup-next', $.proxy(this.showNextImage, this))
            .on('click', '.popup-prev', $.proxy(this.showPrevImage, this));

    // $(window).on('resize', $.proxy(this.popupResize, this));

    /**

        TODO:
        - fix resize
        - dorobit next/prev funkcionalitu
        - touch events
        - caption, how many images info

     */
};

Popup.prototype.popupCreate = function() {
    $('body').append($('<div id="popup-overlay"><a class="close" href="#"><i class="material-icons">close</i></a></div><div id="popup-container"><div class="image-container"><img class="popup-image" src=""><div class="popup-nav"><a class="popup-next"><i class="material-icons">keyboard_arrow_right</i></a><a class="popup-prev"><i class="material-icons">keyboard_arrow_left</i></a></div></div></div>'));

    this.popupOverlay = $('#popup-overlay');
    this.popupContainer = $('#popup-container');
    this.popupImageContainer = this.popupContainer.find('.image-container');
    this.popupNextImageBtn = this.popupContainer.find('.popup-next');
    this.popupPrevImageBtn = this.popupContainer.find('.popup-prev');
};

Popup.prototype.popupStart = function($targetImage) {
    this.album = [];
    var imagePosition = 0;
    var dataPopup = $targetImage.attr('data-popup');

    $targetImages = $('[data-popup="' + dataPopup + '"]');

    for (var i = 0; i < $targetImages.length; i++) {
        this.addToAlbum($($targetImages[i]));

        if ($targetImages[i] === $targetImage[0]) {
          imagePosition = i;
        }
    }

    this.popupImageLoad(imagePosition);

    this.popupOverlay.fadeIn(400);
    this.popupContainer.fadeIn(400);
    this.enableKeyboard();
};

Popup.prototype.addToAlbum = function($targetImage) {
    this.album.push({
        link: $targetImage.attr('href'),
        data: $targetImage.data('popup')
    });
};

Popup.prototype.popupImageLoad = function(imagePosition) {
    var self = this;
    var $image = this.popupContainer.find('.popup-image');
    var preloader = new Image();

    preloader.onload = function () {
        var windowWidth;
        var windowHeight;
        var popupImageWidth;
        var popupImageHeight;
        var popupMargin;

        $image.attr('src', self.album[imagePosition].link);

        windowWidth = $(window).width();
        windowHeight = $(window).height();
        popupImageWidth = $image.width();
        popupImageHeight = $image.height();
        popupMargin = 20;

        // Calculate ratio and adjust image container dimensions
        var ratioWidth = windowWidth / popupImageWidth;
        var ratioHeight = windowHeight / popupImageHeight;
        var minRatio = Math.min(ratioWidth, ratioHeight);

        if (minRatio < 1) {
            popupImageHeight = (popupImageHeight * minRatio) - (popupMargin * 2);
        }

        if (minRatio === 1) {
            popupImageWidth = popupImageWidth - popupMargin * 2;
            popupImageHeight = (popupImageHeight * minRatio) - (popupMargin * 2);
        }

        self.popupContainer.css('top', ((windowHeight - popupImageHeight) / 2) + 'px');
        self.popupImageContainer.css({
            width: popupImageWidth,
            height: popupImageHeight
        });
    };

    preloader.src = this.album[imagePosition].link;
    this.currentImageIndex = imagePosition;

    if (this.album.length > 1) {
        this.showNavArrows();
    }
};

Popup.prototype.showNavArrows = function() {
    if (this.currentImageIndex > 0) {
        this.popupPrevImageBtn.show();
    }

    if (this.currentImageIndex === 0) {
        this.popupPrevImageBtn.hide();
    }

    if (this.currentImageIndex < this.album.length) {
        this.popupNextImageBtn.show();
    }

    if (this.currentImageIndex === this.album.length - 1) {
        this.popupNextImageBtn.hide();
    }
};

Popup.prototype.showNextImage = function() {
    this.popupImageLoad(this.currentImageIndex + 1);
};

Popup.prototype.showPrevImage = function() {
    this.popupImageLoad(this.currentImageIndex - 1);
};

Popup.prototype.popupResize = function() {
    this.resetValues();
    this.popupImageLoad();
};

Popup.prototype.popupClose = function() {
    this.popupOverlay.fadeOut('400', $.proxy(this.resetValues, this));
    this.popupContainer.fadeOut();
    this.disableKeyboard();
};

Popup.prototype.resetValues = function() {
    this.popupContainer.removeAttr('style');
    this.popupImageContainer.removeAttr('style');
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

    switch (keycode){
        case ESC:
            this.popupClose();
            console.log('esc close');
            break;
        case LEFT_ARROW:
            this.showPrevImage();
            console.log('show prev image');
            break;
        case RIGHT_ARROW:
            this.showNextImage();
            console.log('show next image');
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
