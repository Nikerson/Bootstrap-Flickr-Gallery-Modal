
// Programado por Gestioo.com

$(function() {
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: "http://api.flickr.com/services/feeds/photoset.gne?set=72157649721895693&nsid=109203789%40N03&format=json&jsoncallback=?",
      success: function(data) {
        
        var contador = 0;
        $.each(data.items, function(i, imagen) {

            var imagen_m  = imagen.media.m; //240 x 180
            var imagen_s  = imagen_m.replace("_m", "_s"); // 75 x 75
            var imagen_q  = imagen_m.replace("_m", "_q"); // 150 x 150
            var imagen_t  = imagen_m.replace("_m", "_t"); // 100 x 75
            var imagen_n  = imagen_m.replace("_m", "_n"); // 320 x 240
            var imagen_mm = imagen_m.replace("_m", "");   // 500 x 375
            var imagen_z  = imagen_m.replace("_m", "_z"); // 640 x 480
            var imagen_c  = imagen_m.replace("_m", "_c"); // 800 x 600
            var imagen_b  = imagen_m.replace("_m", "_b"); // 1024 x 768
            var imagen_o  = imagen_m.replace("_m", "_o"); // 2400 x 1800

            var html  = $(imagen.description);
            var ancho = html.find('img').attr('width');
            var alto  = html.find('img').attr('height');
            if(contador < 12){
              if(alto < ancho){
                $("#galeriaFlickr").append('<div class="col-md-3"><div class="contenedor_img_flickr"><a class="thumbnail" href="#" data-image-id="" data-toggle="modal" data-title="Galeria de Fotos" data-caption="" data-image="'+imagen_c+'" data-target="#image-gallery"><div class="imagen" style="background-image: url('+imagen_c+'); background-position: center; background-repeat: no-repeat; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"></div></a></div></div>');
                contador++;
              }
            }
        });
      },complete: function(){ 

            function disableButtons(counter_max, counter_current){
                $('#show-previous-image, #show-next-image').show();
                if(counter_max == counter_current){
                    $('#show-next-image').hide();
                } else if (counter_current == 1){
                    $('#show-previous-image').hide();
                }
            }

            loadGallery(true, 'a.thumbnail');

            function loadGallery(setIDs, setClickAttr){
                var current_image, selector, counter = 0;
                $('#show-next-image, #show-previous-image').click(function(){
                    if($(this).attr('id') == 'show-previous-image'){
                        current_image--;
                    } else {
                        current_image++;
                    }

                    selector = $('[data-image-id="' + current_image + '"]');
                    updateGallery(selector);
                });
                function updateGallery(selector) {
                    var $sel = selector;
                    current_image = $sel.data('image-id');
                    $('#image-gallery-caption').text($sel.data('caption'));
                    $('#image-gallery-title').text($sel.data('title'));
                    $('#image-gallery-image').attr('src', $sel.data('image'));
                    disableButtons(counter, $sel.data('image-id'));
                }
                if(setIDs == true){
                    $('[data-image-id]').each(function(){
                        counter++;
                        $(this).attr('data-image-id',counter);
                    });
                }
                $(setClickAttr).on('click',function(){
                    updateGallery($(this));
                });
            }

    }
    });
  });