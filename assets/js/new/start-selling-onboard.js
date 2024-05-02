(function(jQuery){
    'use strict'
    jQuery('#checkUnchecAllTheme').on('click',function(){
        if(this.checked){
            jQuery('input[name="service_type[]"]:checkbox').each(function(){
                this.checked = true;
            });
            jQuery(this).next().html('Unselect All');
        } else{
            jQuery('input[name="service_type[]"]:checkbox').each(function(){
                this.checked = false;
            });
            jQuery(this).next().html('Select All');
        }
    });

    jQuery('input[name="service_type[]"]:checkbox').on('click',function(){
        if(jQuery('input[name="service_type[]"]:checked').length == jQuery('input[name="service_type[]"]:checkbox').length){
            jQuery('#checkUnchecAllTheme').prop('checked',true).next().html('Unselect All');
        }else{
            jQuery('#checkUnchecAllTheme').prop('checked',false).next().html('Select All');
        }
    });

    jQuery(document).ready(function(){
       if(jQuery('input[name="service_type[]"]:checked').length == jQuery('input[name="service_type[]"]:checkbox').length){
            jQuery('#checkUnchecAllTheme').prop('checked',true).next().html('Unselect All');
        }else{
            jQuery('#checkUnchecAllTheme').prop('checked',false).next().html('Select All');
        } 
    });

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    
    var onboardMemberForm = jQuery('#onboardMemberForm');
    var progressBar       = jQuery('.progress__bar__container');
    var currentStep       = jQuery('#current_step'); 

    jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 5 && phone_number.length < 11;
    }, "*Please enter a valid phone number");

    jQuery.validator.addMethod("noSpace", function(value, element) { 
      return value.indexOf(" ") < 0 && value != ""; 
    }, "*Space is not allow");

    $.validator.addMethod("noCaps", function(value, element) {
      return this.optional(element) || !/[A-Z]{1}/.test(value); 
    }, "*Only lower case letters allow.");

    onboardMemberForm.validate({
        rules : {
            plan_id : { 
                required : function(){
                    return currentStep.val() == 1;
                }
            },
            shop_name: {
                required: function(){
                    return currentStep.val() == 2;
                },
                noSpace: function(){
                    return currentStep.val() == 2;
                },
                noCaps: function(){
                    return currentStep.val() == 2;
                },
                remote: {
                    url: mds_config.base_url + "ajax_controller/checkShopNameIsExists",
                    type: "post",
                    data: {
                      shop_name: function() {
                        return jQuery( "input[ name=shop_name]" ).val();
                      }
                    }
                }
            },
            first_name: {
                required: function(){
                    return currentStep.val() == 2;
                }
            },
            last_name: {
                required: function(){
                    return currentStep.val() == 2;
                }
            },
            phone_number: {
                required: function(){
                    return currentStep.val() == 2;
                },
                phoneUS: true
            },
            country_code:{
                required: function(){
                    return currentStep.val() == 2;
                }
            },
            country_id: {
                required: function(){
                    return currentStep.val() == 2;
                }
            },
            state_id: {
                required: function(){
                    return currentStep.val() == 2 && jQuery("#select_countries").val();
                }
            },
            city_id: {
                required: function(){
                    return currentStep.val() == 2 && jQuery("#select_states").val();
                }
            },
            type_of_agency:{
                required: function(){
                    return currentStep.val() == 2;
                }
            },
            shop_currency:{
                required: function(){
                    return currentStep.val() == 2;
                }
            },
            'file[]': {
                required: function(){
                    return currentStep.val() == 2;
                }
            },
            about_me: {
                required: function(){
                    return currentStep.val() == 2;
                }
            },
            'destination_place[]': {
                required: function(){
                    return currentStep.val() == 3;
                }
            },
            'service_type[]': {
                required: function(){
                    return currentStep.val() == 3;
                }
            },
            accept_terms_and_conditions: {
                required: function(){
                    return currentStep.val() == 3;
                }  
            }
            
        },
        messages:{
            plan_id: {
                required: "*Please select any plan."
            },
            shop_name: {
                required: "*Please enter a valid shop name",
                remote: function(){
                    return "*The shop name '"+ jQuery( "input[ name=shop_name]" ).val() +"' is already being used. Please try another name.";
                }
            },
            first_name                 : "*Please enter a valid name",
            last_name                  : "*Please enter a valid name",
            phone_number               : "*Please enter a valid phone number",
            country_code               : "*Select Country code",
            country_id                 : "*Please select your country",
            type_of_agency             : "*Please select types of agency",
            shop_currency              : "*Please select your shop currency",
            'file[]'                   : "*Please upload valid document",
            about_me                   : "*Please enter a valid description",
            'destination_place[]'      : "*Please select destinations!",
            'service_type[]'           : "*Please select type of services!",
            accept_terms_and_conditions: "*You have to accept the terms!"
        },
        errorPlacement: function (error, element) {
            if (element.attr("type") == "radio") {
                error.appendTo(jQuery('#planErrorPlace'));
            } else if (element.attr("name") == "destination_place[]") {
                error.appendTo(jQuery('#destinationErrorPlace'));
            } else if (element.attr("name") == "service_type[]") {
                error.appendTo(jQuery('#serviceErrorPlace'));
            } else if (element.attr("name") == "accept_terms_and_conditions") {
                error.appendTo(jQuery('#terms-error'));
            } else {
                error.insertAfter(element);
            }
        }
    });

    jQuery(document).on('click','.prev__btn',function(e) {
        e.preventDefault();
        var $this = jQuery(this);
        progressBar.find('ul > li.active').last().removeClass('active');
        $this.parents('fieldset').removeClass('active__form').prev().addClass('active__form');
        currentStep.val(parseInt(currentStep.val()) - 1);
    });

    jQuery(document).on('click','.nxt__btn',function(e) {
        e.preventDefault();
        var $this = jQuery(this);
        if(onboardMemberForm.valid()){
            progressBar.find('ul > li.active').next().addClass('active');
            $this.parents('fieldset').removeClass('active__form').next().addClass('active__form');  
            currentStep.val(parseInt(currentStep.val()) + 1);
        }

    });

    jQuery('#onboardMemberForm').on('submit',function(e) {
        e.preventDefault();
        if(onboardMemberForm.valid()){
            var formData = new FormData(this);
            formData.append(mds_config.csfr_token_name, $.cookie(mds_config.csfr_cookie_name));
            jQuery('.final_step__btn').prop('disabled', true).html('Submitting');
            $.ajax({
                type: "POST",
                url: mds_config.base_url + "ajax_controller/register_member_onboard",
                data: formData,
                contentType: false,
                dataType: 'json',
                cache: false,
                processData:false,
                success: function (response) {
                    if(response.status == "sent") {
                        onboardMemberForm.addClass('d-none');
                        jQuery('.needHelpSec').addClass('d-none');
                        window.location.href = response.redirect_url;
                    } else if(response.status == "payouts") {
                        window.location.href = response.redirect_url;
                    } else if(response.status == "applied") {
                        onboardMemberForm.addClass('d-none');
                        jQuery('#applicationAlreadyApplied').removeClass('d-none');
                    }
                }
            });
        }

        return false;
    });
})(jQuery);

function get_states(val, map, id_suffix = "") {
    if (id_suffix != "") {
        id_suffix = '_' + id_suffix;
    }
    jQuery('#select_states' + id_suffix).children('option').remove();
    jQuery('#get_states_container' + id_suffix).hide();
    if (jQuery('#select_cities' + id_suffix).length) {
        jQuery('#select_cities' + id_suffix).children('option').remove();
        jQuery('#get_cities_container' + id_suffix).hide();
    }
    var data = {
        "country_id": val,
        "sys_lang_id": mds_config.sys_lang_id
    };
    data[mds_config.csfr_token_name] = $.cookie(mds_config.csfr_cookie_name);
    $.ajax({
        type: "POST",
        url: mds_config.base_url + "ajax_controller/get_states",
        data: data,
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                document.getElementById("select_states" + id_suffix).innerHTML = obj.content;
                jQuery('#get_states_container' + id_suffix).show();
            } else {
                document.getElementById("select_states" + id_suffix).innerHTML = "";
                jQuery('#get_states_container' + id_suffix).hide();
            }
            if (map) {
                update_product_map();
            }
        }
    });
}

function get_cities(val, map) {
    var data = {
        "state_id": val,
        "sys_lang_id": mds_config.sys_lang_id
    };
    data[mds_config.csfr_token_name] = $.cookie(mds_config.csfr_cookie_name);
    $.ajax({
        type: "POST",
        url: mds_config.base_url + "ajax_controller/get_cities",
        data: data,
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.result == 1) {
                document.getElementById("select_cities").innerHTML = obj.content;
                jQuery('#get_cities_container').show();
            } else {
                document.getElementById("select_cities").innerHTML = "";
                jQuery('#get_cities_container').hide();
            }
            if (map) {
                update_product_map();
            }
        }
    });
}


