/* Start Header Menu Search Input Dropdown Js */
$(".status_change .dropdown-item").click(function(){
  var getStatusText = $(this).text();
  $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
  var generateStatusClass = `${$(this).attr('data-class')}-status`
  $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
})

/* End Header Menu Search Input Dropdown Js */


/* Header Search button on click open Product list div js */
 $("#inputSearch").click(function(){
 $("#response_search_results").toggleClass("open");
 });
/* Header Search button on click open Product list div js */