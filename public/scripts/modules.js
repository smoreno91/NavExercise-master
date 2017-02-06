/**
 * Module of nav bar
 * @param {function} sandbox is the facade for mediator or core
 */
CORE.createModule("nav-module", function(sandbox) {  
    var _listItem, 
        _cacheDom = {},
        _cacheButtonsNavMovil = {},
        _cacheNavItemsWithSubitem = {};
    
    var _buildView = function () {
        var $title, $navMovil;
        
        $title = _createTitle();
        sandbox.addElement($title);
        sandbox.addElement($navMovil);
    };

    var _createTitle = function () {
        var $title, $img;

        $title = sandbox.createElement('div');
        sandbox.addClass($title, 'nav-title');

        $img = _createImg('/images/HUGE-white.png');
        sandbox.addElement($img, $title);
        
        return $title;
    }

    var _createImg = function (url){
        var $img;

        $img = sandbox.createElement('img');
        sandbox.addAttribute($img, {
            'src': url
        });
    
        return $img;
    };
    
    var _buildViewMovil = function () {
        var $navMovil, $title, $buttonOpen, $buttonClose;
        
        $navMovil = _createNavBarMovil();
        $title = _createTitle();
        $buttonOpen = _createButtonOpenMovil();
        $buttonClose = _createButtonCloseMovil();

        sandbox.addClass($title, 'movil');
        sandbox.addElement($title, $navMovil);
        sandbox.addElement($buttonOpen, $navMovil);
        sandbox.addElement($buttonClose, $navMovil);

        _cacheButtonsNavMovil['title-movil'] = $title;
        
        sandbox.addElement($navMovil);
    };

    var _createNavBarMovil = function () {
        var $nav;
        
        $nav = sandbox.createElement('div');
        sandbox.addClass($nav, "nav-movil");    

        return $nav;
    }

    var _createButtonOpenMovil = function () {
        var $buttonOpen, $content;
        
        $content = sandbox.createElement('div');
        $buttonOpen = _createImg('/images/toggle-open.svg');
        
        sandbox.addClass($content, ['nav-btn-open', 'movil', 'is-active']);
        sandbox.addElement($buttonOpen, $content);
        
        _cacheButtonsNavMovil['nav-btn-open'] = $content;
        $content.addEventListener('click', _onClickButtonOpen, false);

        return $content;    
    };

    var _createButtonCloseMovil = function () {
        var $buttonClose, $content;

        $content = sandbox.createElement('div');
        $buttonClose = _createImg('/images/toggle-close.svg');
        
        sandbox.addClass($content, ['nav-btn-close', 'movil']);
        sandbox.addElement($buttonClose, $content);

        _cacheButtonsNavMovil['nav-btn-close'] = $content;
        $content.addEventListener('click', _onClickButtonClose, false);

        return $content;    
    };

    var _onClickButtonOpen = function (event) {
        _hideButtonsNav();
        _toggleNavMovil();
    };

    var _onClickButtonClose = function (event) {
        _hideButtonsNav();
        _toggleNavMovil();
    };

    var _createNavBar = function (navData) {
        var i = 0, 
            $navContainer, $subItem, $copyRight, $background, 
            item, subItem;
        
        var items = (navData.items && navData.items.length) 
                    ? navData.items 
                    : [];

        $navContainer = sandbox.createElement('nav');
        _cacheDom['nav'] = $navContainer;

        items.map(function(item) {
            var $item, $link, $subItems;
            
            $item = _createNavItem(item);
            $link = _createLinkItem(item);
            $subItems = _createNavSubItem(item);
            
            sandbox.addElement($link, $item);
            sandbox.addElement($item, $navContainer);     
            
            if ($subItems){
                sandbox.addElement($subItems, $item);
            }
        
        });
        
        $copyRight = _createCopyRight();
        $background = _createBackground();
        sandbox.addElement($copyRight, $navContainer);
        sandbox.addElement($background);
        
        sandbox.addElement($navContainer);
    };

    var _createBackground = function () {
        var $background;

        $background = sandbox.createElement('div');
        sandbox.addClass($background, 'nav-module-background');
        _cacheDom['nav-background'] = $background;

        return $background;    
    };

    var _createCopyRight = function () {
        var $copyRight;

        $copyRight = sandbox.createElement('div');
        sandbox.addClass($copyRight, 'copy-right');
        $copyRight.innerHTML = "<span>\&#169 2015 Huge. All Rights Reserved.</span>";

        return $copyRight;    
    };
    
    var _hasSubitems = function (item) {
        return item.items && item.items.length > 0;    
    };

    var _createNavItem = function (item) {
        var $item, classList;
        
        $item = sandbox.createElement('div');
        if (_hasSubitems(item)) {
            classList = ['nav-item', 'dropdown']; 
            $item.addEventListener('click', _onClickNavItem, true);
            _cacheNavItemsWithSubitem[item.label] = $item;
            sandbox.addAttribute($item, {
                'data-label': item.label
            });
        }
        else{
            classList = "nav-item";
        }

        sandbox.addClass($item, classList);
        return $item;    
    };

    var _createNavSubItem = function (item) {
        var subItems, $subItemContent;
        if (item.items && item.items.length > 0) {
            subItems = item.items;
            $subItemContent = _createSubItemContent();

            subItems.map(function(subItem) {
                var $subItemLink;
                $subItemLink = _createLinkItem(subItem);
                sandbox.addElement($subItemLink, $subItemContent);
            });     
        }
        return $subItemContent;
    };
    
    var _createArrowForDropdown = function () {
        var $arrow;

        $arrow = sandbox.createElement('div');
        sandbox.addClass($arrow, 'dropdown-arrow');

        return $arrow;    
    };

    var _createLinkItem = function (item) {
        var $link, $arrow;
        
        $link = sandbox.createElement('a');
        $link.text = item.label;

        if (!_hasSubitems(item)) {
            $link.addEventListener('click', _onClickLinkItem);
        }
        else {
            $arrow = _createArrowForDropdown();
            sandbox.addElement($arrow, $link);
        }

        sandbox.addAttribute($link, {
            'href': item.url
        });
        
        return $link;    
    };

    var _createSubItemContent = function () {
        var $subItemContent;

        $subItemContent = sandbox.createElement('div');
        sandbox.addClass($subItemContent, 'nav-subitem');

        return $subItemContent;    
    }

    var _onClickNavItem = function (event) {
        var $navItem, itemLabel;
        
        $navItem = event.target.parentElement;
        itemLabel = sandbox.getAttributeValue($navItem, 'data-label');
        _hideSubitemsOpen(itemLabel);
        sandbox.toggleClass($navItem, 'is-active');    
    };

    var _onClickLinkItem = function (event) {
        _hideSubitemsOpen();
        _hideButtonsNav();
        _toggleNavMovil();
    };

    var _hideNavMovil = function (){
        var $nav, $navBackground;

        $nav = _cacheDom['nav'];
        $navBackground = _cacheDom['nav-background'];

        sandbox.removeClass($nav, 'is-active');
        sandbox.removeClass($navBackground, 'is-actived');
    };

    var _hideSubitemsOpen = function (noHideItem) {
        var item;
        for (item in _cacheNavItemsWithSubitem)
            if (noHideItem !== item){
                sandbox.removeClass(_cacheNavItemsWithSubitem[item], 'is-active');        
            }
    };

    var _hideButtonsNav = function (noItemHide) {
        var item;   
        for (item in _cacheButtonsNavMovil)
            sandbox.toggleClass(_cacheButtonsNavMovil[item], 'is-active');
    };

    var _toggleNavMovil = function () {
        var $nav, $navBackground;

        $nav = _cacheDom['nav'];
        $navBackground = _cacheDom['nav-background'];

        sandbox.toggleClass($nav, 'is-active');
        sandbox.toggleClass($navBackground, 'is-actived');
    };

    return {
        init: function () {
            sandbox.listen({
                'got-nav-data': this.show,
                'on-click-body': _hideSubitemsOpen    
            });

            sandbox.notify({ 
                type : 'get-nav-data', 
            });

            _buildView();
            _buildViewMovil();
        },
        
        destroy: function () {
            _listItem = null;
        },

        show: function (data) {
            var $temp;
            if (data && sandbox.helper.isObject(data)){
                _createNavBar(data);
            }
        }
    }    
});

/**
 * Module for communication with server
 * @param {function} sandbox is the facade for mediator or core
 */
CORE.createModule("communication-module", function(sandbox) {
    
    var _getDataFromServer = function(type, resource, func) {
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                if (func){
                    func(xhttp.responseText);
                }
            }
        };
        
        xhttp.open(type, resource, true);
        xhttp.send();
    };

    return {
        init: function() {
            sandbox.listen({
                "get-nav-data": this.getNavData    
            });
        },
        destroy: function() {},

        getNavData: function () {
            var navDataJSON;
            _getDataFromServer("GET", "nav.json", function(navData) {
                navDataJSON = JSON.parse(navData);
                sandbox.notify({
                    type : 'got-nav-data', 
                    data : navDataJSON
                })    
            });
        }    
    };
});

CORE.init();
CORE.startModule("communication-module");
CORE.startModule("nav-module");