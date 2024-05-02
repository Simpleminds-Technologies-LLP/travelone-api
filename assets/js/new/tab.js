   function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  $('.multiple-items').slick('refresh');
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();



/* Itinery tab  */
$(document).on('click', '.itinerary_tab_Bg2 .rightFlexProperty  li', function(){
  $('li').removeClass('active');
  $('ul').toggleClass('expanded');
  $(this).addClass('active');
  var tab_id = $(this).attr('data-tab');
  $('.tab-content').removeClass('current');
  $(this).addClass('current');
  $('#'+tab_id).addClass('current');
});
/* Itinery tab  */

