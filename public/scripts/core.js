var CORE = (function () {
    var _moduleData = {};
    
    var _query = function (query) {
        return document.querySelectorAll(query);
    };
        
    var _addDomEvents = function (func) {
        var $body;
        
        $body = _query('body')[0];
        $body.addEventListener('click', function() {
            if (window.innerWidth >= 768){
                func({type : 'on-click-body'})
            }
        }, true);            
    };

    return {
        init: function () {
            _addDomEvents(this.triggerEvent);        
        },

        createModule: function (moduleID, creator) {
            var tempInstaceModule;

            if (typeof moduleID === 'string' && this.isFunction(creator)) { 
                tempInstaceModule = creator(Sandbox.create(this, moduleID)); 
                
                if (tempInstaceModule.init && tempInstaceModule.destroy && 
                    this.isFunction(tempInstaceModule.init) &&
                    this.isFunction(tempInstaceModule.destroy)) { 
                    
                    _moduleData[moduleID] = { 
                        create : creator, 
                        instance : null 
                    }; 
                    
                    tempInstaceModule = null; 
                } 
            }
        },
        
        startModule : function (moduleID) { 
            var module = _moduleData[moduleID]; 
            
            if (module) { 
                module.instance = module.create(Sandbox.create(this, moduleID)); 
                module.instance.init(); 
            } 
        }, 

        startAllModules : function () { 
            var moduleID; 
            
            for (moduleID in _moduleData) { 
                if (_moduleData.hasOwnProperty(moduleID)) {
                    this.start(moduleID); 
                }
            } 
        },

        registerEvents : function (events, module) { 
            if (this.isObject(events) && module && _moduleData[module]) {
                _moduleData[module].events = events; 
            }
        },

        triggerEvent : function (event) { 
            var module; 
            
            for (module in _moduleData) { 
                if (_moduleData.hasOwnProperty(module)){ 
                    module = _moduleData[module]; 
                    
                    if (module.events && module.events[event.type]) {
                        module.events[event.type](event.data); 
                    }
                } 
            } 
        },

        isObject : function(object) { 
            return typeof(object) === "object";          
        },

        isFunction: function(func) {
            return typeof(func) === "function";    
        },

        isString: function (str) {
            return typeof(str) === "string";    
        },

        dom: {
            query: function(query) {
                return _query(query);
            },

            createElement: function(elementType){
                return document.createElement(elementType);
            },

            addElement: function($element, parent) {
                if (parent && parent.appendChild) {
                    parent.appendChild($element);
                }
            },

            addAttribute: function($element, attrs) {
                for (attr in attrs) {
                    $element.setAttribute(attr, attrs[attr]);        
                }
            },
            
            getAttributeValue: function($element, attrName) {
                var attributeValue;

                if ($element && attrName && CORE.isString(attrName)) {
                    attributeValue = $element.getAttribute(attrName);
                }
                
                return attributeValue;
            },

            addClass: function($element, args) {
                var i;
                if (!args) {
                    return
                }
                
                if (CORE.isObject(args)){
                    for (i = 0; i < args.length; i++) {
                        $element.classList.add(args[i]);
                    }
                }
                else if (typeof(args) === "string"){
                    $element.classList.add(args);
                }
                
            },

            toggleClass: function ($element, nameClass) {
                if ($element && nameClass && CORE.isString(nameClass)) {
                    if ($element.classList.contains(nameClass)){
                        this.removeClass($element, nameClass);
                    }
                    else {
                        this.addClass($element, nameClass);
                    }
                }        
            },

            removeClass: function ($element, nameClass) {
                if ($element && nameClass && CORE.isString(nameClass)) {
                    $element.classList.remove(nameClass);
                }
            }
        }
    };
        
})();