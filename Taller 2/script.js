function addNew(autor, contenido, fecha) {
    var a = $("<h5/>", {
      html: autor 
    });
    var c = $("<p/>",{
      html: contenido
    });
    var f=$("<p/>",{
    html:fecha  
    });

    var au= $("<div/>", {
      "class": "row"
    });

    var conten= $("<div/>", {
      "class": "row"
    });
    
    var fe = $("<div/>", {
      "class": "row"
    });
    var div = $( "<div/>", {
        "class": "row card-body"
    });
    a.appendTo(au);
    c.appendTo(conten);
    f.appendTo(fe);
    au.appendTo(div);
    conten.appendTo(div);
    fe.appendTo(div);
    div.appendTo("#noticias");

}

function loadTweets() {
  $.ajax({
      type: "GET",
      url: "https://twitrss.me/twitter_user_to_rss/?user=suert_o_tripa",
      dataType: "xml",
      success: function(xml){
          $(xml).find('item').each(function(){
            var autor = $(this).find('dc\\:creator').text();
            var contenido=$(this).find('description').text();
            var fecha=$(this).find('pubDate').text();
            addNew(autor,contenido,fecha);
          });
      },
      error: function() {
        alert("Error al procesar el xml");
      }
  });
}
$(document).ready(function(){
  loadTweets();

  $("button").click(function(e){

    var texto = $('input#buscador').val();
    
    if(texto.length != 0) {
      
      var noticias = $('#noticias .card-body');
      $('#noticias .card-body').filter(function(index){
        
        $(this).show();
        
        var noticia = $(this).text()
        if(noticia.indexOf(texto) == -1) {
          $(this).hide()
        }

      });

    } else {
      $('#noticias .card-body').each(function(){
        $(this).show();
      });
    }
  })
});

