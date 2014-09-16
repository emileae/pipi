$(document).ready(function(){
        
        if (localStorage.record_pos == undefined){localStorage.record_pos = 0;};
        if (localStorage.time == undefined){localStorage.time = last_time;};
        
            $('body').on('touchend mouseup', '#record', function(){
                
                if (localStorage.name_id){
                    $('body').append('\
                        <div id="record_submit_overlay">\
                            <div id="overlay_close">Close</div>\
                        </div>\
                        \
                        <div id="record_submit_form_container">\
                            <div id="log_container">\
                                <div id="score_log" class="log_box">'+localStorage.record_pos+' digits<br> in<br> '+localStorage.time+' <span class="small_txt">seconds</span></div>\
                                <div id="rank_log" class="log_box">Rank: '+localStorage.rank+'</div>\
                                <div id="id_log" class="log_box">Your ID: '+localStorage.name_id+' <br>(use your ID at www.piheroes.com to see where you place in the rankings)</div>\
                            </div>\
                            \
                            <br>\
                            \
                            <form action="emile-pi.appspot.com/submit_record" method="post" id="pi_score_form">\
                                \
                                    <input type="hidden" id="pi_name_id" name="name_id" value="'+localStorage.name_id+'">\
                                    <input type="hidden" id="pi_name" name="name" value="">\
                                    <input type="hidden" id="pi_time" name="time" value="'+localStorage.time+'">\
                                    <input type="hidden" id="pi_score" name="score" value="'+localStorage.record_pos+'">\
                                \
                                <br>\
                                \
                                <input class="submit_btn" type="submit" value="Submit">\
                                \
                            </form>\
                            <div id="form_loading_indicator" style="width:100%; text-align:center;">Loading</div>\
                        </div>\
                        \
                    ')
                    
                    $('#form_loading_indicator').hide();
                    
                }else{
                    $('body').append('\
                        <div id="record_submit_overlay">\
                            <div id="overlay_close">Close</div>\
                        </div>\
                        \
                        <div id="record_submit_form_container">\
                            <div class="log_box">Score : '+localStorage.record_pos+'</div>\
                            \
                            <br>\
                            \
                            <form action="emile-pi.appspot.com/submit_record" method="post" id="pi_score_form">\
                                \
                                <label for="name">\
                                    <b> Please enter your name</b>\
                                    <input type="text" id="pi_name" name="name">\
                                </label>\
                                    <input type="hidden" id="pi_name_id" name="name_id" value="">\
                                    <input type="hidden" id="pi_time" name="time" value="'+localStorage.time+'">\
                                    <input type="hidden" id="pi_score" name="score" value="'+localStorage.record_pos+'">\
                                \
                                <br>\
                                \
                                <input class="submit_btn" type="submit" value="Submit">\
                                \
                            </form>\
                            <div id="form_loading_indicator" style="width:100%; text-align:center;">Loading</div>\
                        </div>\
                        \
                    ')
                    
                    $('#form_loading_indicator').hide();
                };
            });
        
    $('body').on('touchend', '#overlay_close', close_submit_overlay);
    function close_submit_overlay(){
        $('#record_submit_overlay').remove();
        $('#record_submit_form_container').remove();
    };
    $('body').on('submit', '#pi_score_form', function(){
        $('#form_loading_indicator').show();
        var name = $('#pi_name').val();
        var name_id = $('#pi_name_id').val();
        var score = $('#pi_score').val();
        var time = $('#pi_time').val();
        $.ajax({
            type: 'POST',
            data: {name:name, score:score, name_id:name_id, time:time},
            dataType:'json',
            url: 'http://emile-pi.appspot.com/submit_record',
            crossDomain: true,
            success: function(data){
               $('#form_loading_indicator').html('<div>Your record was successfully submitted</div><div id="loading_div_close">Close</div>')
               $('body').on('touchend', '#loading_div_close', function(){
                    $('#form_loading_indicator').hide();
                    if (data['id']){
                        localStorage.rank = data['rank'];
                        localStorage.name_id = data['id'];
                        localStorage.name = data['name'];
                    };
                    close_submit_overlay();
               });
            },
            error: function(data){
                $('#form_loading_indicator').html('<div>There was a problem submitting your score, please try again later</div><div id="loading_div_close">Close</div>')
                
               $('body').on('touchend', '#loading_div_close', function(){
                    $('#form_loading_indicator').hide();
                    close_submit_overlay();
                });
            }
        });
        return false;
    });
});
