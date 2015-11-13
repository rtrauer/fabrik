/*! Fabrik */
var FbTextarea=my.Class(FbElement,{constructor:function(a,b){this.plugin="fabriktextarea",FbTextarea.Super.call(this,a,b);var c=this,d=function(){c.getTextContainer(),"undefined"!=typeof tinyMCE?c.container!==!1&&(clearInterval(e),c.watchTextContainer()):(clearInterval(e),c.watchTextContainer())},e=setInterval(function(){d.call(this)},200);Fabrik.addEvent("fabrik.form.page.change.end",function(){this.refreshEditor()}.bind(this)),Fabrik.addEvent("fabrik.form.elements.added",function(a){a.isMultiPage()&&this.refreshEditor()}.bind(this)),Fabrik.addEvent("fabrik.form.submit.start",function(a){this.options.wysiwyg&&a.options.ajax&&"undefined"!=typeof tinyMCE&&tinyMCE.triggerSave()}.bind(this))},unclonableProperties:function(){var a=FbTextarea.Super.prototype.unclonableProperties(this);return a.push("container"),a},cloneUpdateIds:function(a){this.element=$("#"+a),this.options.element=a,this.options.htmlId=a},watchTextContainer:function(){var a=this;if(0===this.element.length&&(this.element=$("#"+this.options.element)),(0!==this.element.lenth||(this.element=$("#"+this.options.htmlId),0!==this.element.length))&&this.options.editable===!0){var b=this.getContainer();if(b===!1)return void fconsole("no fabrikElementContainer class found for textarea");var c=b.find(".fabrik_characters_left");if(c.length>0)if(this.warningFX=new Fx.Morph(c,{duration:1e3,transition:Fx.Transitions.Quart.easeOut}),this.origCol=c.css("color"),this.options.wysiwyg&&"undefined"!=typeof tinymce)if(tinymce.majorVersion>=4){var d=this._getTinyInstance();d.on("keyup",function(b){a.informKeyPress(b)}),d.on("focus",function(){var b=a.element.closest(".fabrikElementContainer");b.find("span.badge").addClass("badge-info"),b.find(".fabrik_characters_left").removeClass("muted")}),d.on("blur",function(){var b=a.element.closest(".fabrikElementContainer");b.find("span.badge").removeClass("badge-info"),b.find(".fabrik_characters_left").addClass("muted")}),d.on("blur",function(){a.forwardEvent("blur")})}else tinymce.dom.Event.add(this.container,"keyup",function(b){a.informKeyPress(b)}),tinymce.dom.Event.add(this.container,"blur",function(){a.forwardEvent("blur")});else this.container.on("keydown",function(b){a.informKeyPress(b)}),this.container.on("blur",function(b){a.blurCharsLeft(b)}),this.container.on("focus",function(b){a.focusCharsLeft(b)})}},forwardEvent:function(){var a=tinyMCE.activeEditor.getElement(),b=this.getContent();a.set("value",b),a.trigger("blur")},focusCharsLeft:function(){var a=this.element.closest(".fabrikElementContainer");a.find("span.badge").addClass("badge-info"),a.find(".fabrik_characters_left").removeClass("muted")},blurCharsLeft:function(){var a=this.element.closest(".fabrikElementContainer");a.find("span.badge").removeClass("badge-info"),a.find(".fabrik_characters_left").addClass("muted")},getCloneName:function(){var a=this.options.isGroupJoin?this.options.htmlId:this.options.element;return a},cloned:function(a){if(this.options.wysiwyg){var b=this.element.closest(".fabrikElement"),c=b.find("textarea").clone(!0,!0),d=b.find(".fabrik_characters_left");b.empty(),b.append(c),d.length>0&&b.append(d.clone()),c.removeClass("mce_editable"),c.css("display",""),this.element=c;var e=this.options.isGroupJoin?this.options.htmlId:this.options.element;this._addTinyEditor(e)}this.getTextContainer(),this.watchTextContainer(),FbTextarea.Super.prototype.clone(this,a)},decloned:function(){if(this.options.wysiwyg){var a=this.options.isGroupJoin?this.options.htmlId:this.options.element;tinyMCE.execCommand("mceFocus",!1,a),this._removeTinyEditor(a)}},getTextContainer:function(){if(this.options.wysiwyg&&this.options.editable){var a=this.options.isGroupJoin?this.options.htmlId:this.options.element;$("#"+a).addClass("fabrikinput");var b="undefined"!=typeof tinyMCE?tinyMCE.get(a):!1;b?this.container=b.getDoc():this.contaner=!1}else this.element=$("#"+this.options.element),this.container=this.element;return this.container},getContent:function(){return this.options.wysiwyg?tinyMCE.activeEditor.getContent().replace(/<\/?[^>]+(>|$)/g,""):this.container.value},refreshEditor:function(){this.options.wysiwyg&&("undefined"!=typeof WFEditor?WFEditor.init(WFEditor.settings):"undefined"!=typeof tinymce&&tinyMCE.init(tinymce.settings),this.watchTextContainer())},_getTinyInstance:function(){var a=this.element.prop("id");return parseInt(tinyMCE.majorVersion,10)>=4?tinyMCE.get(a):tinyMCE.getInstanceById(a)},_addTinyEditor:function(a){parseInt(tinyMCE.majorVersion,10)>=4?tinyMCE.execCommand("mceAddEditor",!1,a):tinyMCE.execCommand("mceAddControl",!1,a)},_removeTinyEditor:function(a){parseInt(tinyMCE.majorVersion,10)>=4?tinyMCE.execCommand("mceRemoveEditor",!1,a):tinyMCE.execCommand("mceRemoveControl",!1,a)},setContent:function(a){if(this.options.wysiwyg){var b=this._getTinyInstance(),c=b.setContent(a);return this.moveCursorToEnd(),c}return this.getTextContainer(),this.container.val(a),null},moveCursorToEnd:function(){var a=this._getTinyInstance();a.selection.select(a.getBody(),!0),a.selection.collapse(!1)},informKeyPress:function(){var a=this.getContainer().find(".fabrik_characters_left"),b=this.itemsLeft();this.limitReached()?(this.limitContent(),this.warningFX.start({opacity:0,color:"#FF0000"}).chain(function(){this.start({opacity:1,color:"#FF0000"}).chain(function(){this.start({opacity:0,color:this.origCol}).chain(function(){this.start({opacity:1})})})})):a.css("color",this.origCol),a.find("span").html(b)},itemsLeft:function(){var a=0,b=this.getContent();return a="word"===this.options.maxType?this.options.max-b.split(" ").length:this.options.max-(b.length+1),0>a&&(a=0),a},limitContent:function(){var a,b=this.getContent();"word"===this.options.maxType?(a=b.split(" ").splice(0,this.options.max),a=a.join(" "),a+=this.options.wysiwyg?"&nbsp;":" "):a=b.substring(0,this.options.max),this.setContent(a)},limitReached:function(){var a=this.getContent();if("word"===this.options.maxType){var b=a.split(" ");return b.length>this.options.max}var c=this.options.max-(a.length+1);return 0>c?!0:!1},reset:function(){this.update(this.options.defaultVal)},update:function(a){return this.getElement(),this.getTextContainer(),this.options.editable?void this.setContent(a):void this.element.html(a)}});