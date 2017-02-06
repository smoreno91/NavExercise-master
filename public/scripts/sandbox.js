var Sandbox = {

    create: function (core, moduleSelector) {
        var _container = CORE.dom.query("#" + moduleSelector)[0];
        return {
            /**
             * @param {object} 
             */
            notify : function (event) {
                if(this.helper.isObject(event) && event.type) { 
                    core.triggerEvent(event); 
                } 
            },
             
            listen : function (events) {
                if (this.helper.isObject(events)) {
                    core.registerEvents(events, moduleSelector); 
                }
            },
            
            query: function(query) {
                return CORE.dom.query(query);
            },
            
            /**
             * create a element html
             * @param {string} elementType is of type element to create (div|li|ul etc.)
             * @return {object} html element
             */
            createElement: function(elementType) {
                return (typeof(elementType) === "string") 
                        ? CORE.dom.createElement(elementType)
                        : null;
            },
            
            /**
             * Append a html element to parent or _container
             * @param {object}    
             * @param {object|null} html element parent. if parent is null then 
             *  the parent will be _container 
             */
            addElement: function ($element, $parent) {
                if ($element){
                    CORE.dom.addElement($element, $parent || _container);
                }
            },

            addAttribute: function ($element, attrs) {
                if ($element && this.helper.isObject(attrs)){
                    CORE.dom.addAttribute($element, attrs);
                }
            },
            
            getAttributeValue: function($element, attrName) {
                return CORE.dom.getAttributeValue($element, attrName);    
            },

            addClass: function ($element, args) {
                if ($element && this.helper.isObject($element)){
                    CORE.dom.addClass($element, args);
                }
            },

            toggleClass: function ($element, nameClass) {
                CORE.dom.toggleClass($element, nameClass);
            },

            removeClass: function ($element, nameClass) {
                CORE.dom.removeClass($element, nameClass);    
            },

            helper: {
                isObject: function (arg) {
                    return CORE.isObject(arg);    
                },

                isFunction: function (arg) {
                    return CORE.isFunction(arg);
                }
            }
        }
    }
};