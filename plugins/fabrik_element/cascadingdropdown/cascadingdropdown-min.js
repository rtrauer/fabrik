/*! Fabrik */
var FbCascadingdropdown=my.Class(FbDatabasejoin,{options:{showPleaseSelect:!1,watchInSameGroup:!0,watchChangeEvent:"change"},constructor:function(a,b){var c=this;this.ignoreAjax=!1,b=$.extend(this.options,b),FbCascadingdropdown.Super.call(this,a,b),this.plugin="cascadingdropdown",this.doChangeEvent=this.doChange.bind(this),$("#"+this.options.watch).on(this.options.watchChangeEvent,this.doChangeEvent),this.options.showDesc===!0&&this.element.on("change",function(a){c.showDesc(a)}),this.element.length>0&&(this.spinner=new Spinner(this.element.parent(".fabrikElementContainer")))},attachedToForm:function(){if(this.ignoreAjax||this.options.editable&&!this.options.editing){var a=this.form.formElements.get(this.options.watch).getValue();this.change(a,$(this.options.watch).prop("id"))}},dowatch:function(a){var b=Fabrik.blocks[this.form.form.prop("id")].formElements[this.options.watch].getValue();this.change(b,a.target.id)},doChange:function(a){"auto-complete"===this.options.displayType&&(this.element.value="",this.getAutoCompleteLabelField().value=""),this.dowatch(a)},change:function(a,b){var c=this;if(window.ie&&0===parseInt(this.options.repeatCounter,10)){var d=b.substr(b.length-2,1),e=b.substr(b.length-1,1);if("_"===d&&"number"==typeof parseInt(e,10)&&"0"!==e)return}this.spinner.show();var f=this.form.getFormElementData(),g={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"cascadingdropdown",method:"ajax_getOptions",element_id:this.options.id,v:a,formid:this.form.id,fabrik_cascade_ajax_update:1,lang:this.options.lang};g=Object.append(f,g),this.myAjax&&this.myAjax.abort(),this.myAjax=$.ajax({url:"",method:"post",data:g,dataType:"json"}).fail(function(a,b,c){console.log(b+"",""+c)}).done(function(){c.spinner.hide()}).success(function(a){var b,d,e=c.getValue();c.spinner.hide(),c.options.editable?c.destroyElement():c.element.find("div").destroy(),c.options.showDesc===!0&&(d=c.getContainer().find(".dbjoin-description"),d.empty()),c.myAjax=null;var f=1===a.length;if(this.ignoreAjax){if(c.options.showPleaseSelect&&a.length>0){var g=a.shift();c.options.editable===!1?$(document.createElement("div")).text(g.text).inject(this.element):(b=""!==g.value&&g.value===e||f,c.addOption(g.value,g.text,b),$(document.createElement("option")).attr({value:g.value,selected:"selected"}).text(g.text).inject(this.element))}}else a.each(function(a){var g=this;if(c.options.editable===!1?(g.text=g.text.replace(/\n/g,"<br />"),$(document.createElement("div")).html(g.text).inject(c.element)):(b=""!==g.value&&g.value===e||f,c.addOption(g.value,g.text,b)),c.options.showDesc===!0&&g.description){var h=c.options.showPleaseSelect?"notice description-"+a:"notice description-"+(a-1);$(document.createElement("div")).css({display:"none"}).addClass(h).html(g.description).inject(d)}});c.ignoreAjax=!1,c.options.editable&&"dropdown"===c.options.displayType&&(1===c.element.options.length?c.element.addClass("readonly"):c.element.removeClass("readonly")),c.renewEvents(),c.ignoreAjax||(c.ingoreShowDesc=!0,c.element.trigger("change"),c.ingoreShowDesc=!1),c.ignoreAjax=!1;var h=[c.getValue()];c.setValue(h),Fabrik.trigger("fabrik.cdd.update",c)})},destroyElement:function(){switch(this.options.displayType){case"radio":case"checkbox":this.getContainer().getElements('*[data-role="suboption"]').destroy();break;case"dropdown":default:this.element.empty()}},cloned:function(a){var b=$("#"+this.options.watch),c=this;this.myAjax=null,FbCascadingdropdown.Super.prototype.cloned(this,a),this.spinner=new Spinner(this.element.closest(".fabrikElementContainer")),this.options.watchInSameGroup===!0&&(this.options.watch=this.options.watch.test(/_(\d+)$/)?this.options.watch.replace(/_(\d+)$/,"_"+a):this.options.watch+"_"+a),this.options.watchInSameGroup&&b.removeEvent(this.options.watchChangeEvent,this.doChangeEvent),this.doChangeEvent=this.doChange.bind(this),b.on(this.options.watchChangeEvent,this.doChangeEvent),this.options.watchInSameGroup===!0&&(this.element.empty(),this.ignoreAjax=!0),this.options.showDesc===!0&&this.element.on("change",function(){c.showDesc()}),Fabrik.trigger("fabrik.cdd.update",this)},cloneAutoComplete:function(){var a=this.getAutoCompleteLabelField();a.id=this.element.prop("id")+"-auto-complete",a.name=this.element.name.replace("[]","")+"-auto-complete",$("#"+a.id).val(""),new FabCddAutocomplete(this.element.id,this.options.autoCompleteOpts)},showDesc:function(a){if(this.ingoreShowDesc!==!0){var b=a.target.selectedIndex,c=this.getContainer().find(".dbjoin-description"),d=c.find(".description-"+b);c.find(".notice").each(function(){$(this)===d?(d.fadeIn(),$(this).show()):$(this).hide()}.bind(this))}}});