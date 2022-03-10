$(document).ready(function (e) {
    $('.cb-wrap').on('click', '#page1Submit', function () {
        let name = $('.cb-form-main input[name="cb-name"]').val();
        $('#page1').css('display', 'none');
        $('#page2').css('display', 'block');
        $('#page2 #cb-show-name').html(name);
    });

    $('.cb-wrap').on('click', '#tarot_cards .flip-card', function () {
        let count = parseInt($('#resultCards input[name="cardSelected"]').val());
        if (count < 3) {
            let choose = $(this).clone();
            $(this).css('visibility', 'hidden');
            $('#resultCards').append(choose);
            count++;
            $('#resultCards input[name="cardSelected"]').val(count)
        }
        if (count === 3) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#resultCards").offset().top
            }, 2000);
        }
    });

    $('.cb-wrap').on('click', '#submitPage2', function () {
        $('#page2').css('display', 'none');
        $('#screenFirst').css('display', 'block');
    })
});

$(document).ready(function () {
    let camera_button = document.querySelector("#take_a_picture");
    let video = document.querySelector("#video_face");
    let canvas = document.querySelector("#canvas_face");
    let selectPicture = document.querySelector("#select_a_picture");

    camera_button.addEventListener('click', function () {
     
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user'
            },
            audio: false
        })
            .then(function (stream) {
                video.srcObject = stream;
                $('#take_a_picture').css('display', 'none');
                $('#click-photo').css('display', 'block');

                let click_button = document.querySelector("#click-photo");
                click_button.addEventListener('click', function () {
                    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

                    let image_data_url = canvas.toDataURL('image/jpeg');

                    let appendText = `<div class="chat-content-item manager "><div class="chat-content-desc"><img class="chat-content-desc-image" src="img/Hanz-Cua12.png" alt=""><div class="chat-content-desc-item manager"><img width="200px" src="${image_data_url}"></div></div></div>`;
                    $('.chat-content-list').prepend(appendText);
                });
            })
            .catch(function () {
                alert('Allow Camera Access to take photo.');
            });
    });

    selectPicture.addEventListener('click', function () {
        $('input[name=select_a_picture]').click();

    });

    $('input[name=select_a_picture]').change(function () {
        readURL(this);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                console.log(e.target.result);
                console.log(input.files[0]);

                let appendText = `<div class="chat-content-item manager "><div class="chat-content-desc"><img class="chat-content-desc-image" src="img/Hanz-Cua12.png" alt=""><div class="chat-content-desc-item manager"><img width="200px" src="${e.target.result}"></div></div></div>`;
                $('.chat-content-list').prepend(appendText);
                base_image = new Image();
                base_image.src = e.target.result;
                base_image.onload = function () {
                    let canvas = document.querySelector("#canvas_face");
                    canvas.getContext('2d').drawImage(base_image, 0, 0, canvas.width, canvas.height);
                }
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
});

