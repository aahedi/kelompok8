$(document).ready(function(){

  initSliders();

  //NOTE: To append in different container
  var appendToContainer = function(htmlele, record){
    console.log(record)
  };

  var FJS = FilterJS(movies, '#movies', {
    template: '#movie-template',
    search: {ele: '#searchbox'},
    //search: {ele: '#searchbox', fields: ['runtime']}, // With specific fields
    callbacks: {
      afterFilter: function(result){
        $('#total_movies').text(result.length);
      }
    }
    //appendToContainer: appendToContainer
    //filter_on_init: true
  });

  FJS.addCallback('beforeAddRecords', function(){
    if(this.recordsCount >= 450){
      this.stopStreaming();
    }
  });

  FJS.addCallback('afterAddRecords', function(){
    var percent = (this.recordsCount - 250)*100/250;

    $('#stream_progress').text(percent + '%').attr('style', 'width: '+ percent +'%;');

    if (percent == 100){
      $('#stream_progress').parent().fadeOut(1000);
    }
  });

  FJS.setStreaming({
    data_url: 'data/stream_movies.json',
    stream_after: 1,
    batch_size: 50
  });

  FJS.addCriteria({field: 'year', ele: '#year_filter', type: 'range', all: 'all'});
  FJS.addCriteria({field: 'rating', ele: '#rating_filter', type: 'range'});
  FJS.addCriteria({field: 'runtime', ele: '#runtime_filter', type: 'range'});
  FJS.addCriteria({field: 'genre', ele: '#genre_criteria input:checkbox'});

  /*
   * Add multiple criterial.
    FJS.addCriteria([
      {field: 'genre', ele: '#genre_criteria input:checkbox'},
      {field: 'year', ele: '#year_filter', type: 'range'}
    ])
  */

  window.FJS = FJS;
  
  ran_col();
  changeBackground();
});
		
	function changeBackground() {
            var i=1;
            for(i=1;i<=250;i++){
            document.getElementById("fjs_"+i).style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16); 
            }
        }

        function ran_col() { //function name
            var color = '#'; // hexadecimal starting symbol
            var letters = ['efefef']; //Set your colors here
            color += letters[Math.floor(Math.random() * letters.length)];
			
			var div = document.getElementsByClassName("thumbnail"); 
			for (var i = 0; i < div.length; i++) {
            div[i].style.background = color; // Setting the random color on your div element.
			}
        }
		
function initSliders(){
  $("#rating_slider").slider({
    min: 8,
    max: 10,
    values:[8, 10],
    step: 0.1,
    range:true,
    slide: function( event, ui ) {
      $("#rating_range_label" ).html(ui.values[ 0 ] + ' - ' + ui.values[ 1 ]);
      $('#rating_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $("#runtime_slider").slider({
    min: 50,
    max: 250,
    values:[0, 250],
    step: 10,
    range:true,
    slide: function( event, ui ) {
      $("#runtime_range_label" ).html(ui.values[ 0 ] + ' mins. - ' + ui.values[ 1 ] + ' mins.');
      $('#runtime_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $('#genre_criteria :checkbox').prop('checked', true);
  $('#all_genre').on('click', function(){
    $('#genre_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
}
