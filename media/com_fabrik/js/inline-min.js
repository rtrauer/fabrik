/*! Fabrik */
var inline=my.Class({options:{},constructor:function(a,b){var c=this;this.options=$.extend(this.options,b),$(document).on("dblclick",a,function(){var a;$(this).hide(),$(this).data("origValue",this.text()),$(this).data("inline")?a=$(this).data("inline"):(a=$("<input />"),a.on("keydown",function(a){c.checkKey(a,this)}),a.inject($(this),"after").focus(),a.hide(),$(this).data("inline",a)),a.val($(this).text()).toggle().focus(),a.select()})},checkKey:function(a,b){("enter"===a.key||"esc"===a.key||"tab"===a.key)&&($(b).data("inline").hide(),$(b).show()),("enter"===a.key||"tab"===a.key)&&($(b).text($(a.target).val()),Fabrik.trigger("fabrik.inline.save",[b,a]))}});