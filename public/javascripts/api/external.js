const responseRequest = (id, type ) => {
    $.ajax({
        url: '/api/admin/vip/responseRequest',
        type: 'POST',
        dataType: "json",
        data: {
            "id_vip": id,
            "response": type == 'true' ? true : false
        },
        beforeSend: function () {},
        success: function (data) {
            if (data.getEtat) {
                if (type == 'true') {
                    Snackbar.show({
                        text: "Le boostage du compte à commencer...",
                        pos: 'bottom-center',
                        duration: 3000,
                        textColor: '#fff',
                        backgroundColor: '#3696f5'
                    });
                } else {
                    Snackbar.show({
                        text: "Nous avons enregistrer votre reponse !",
                        pos: 'bottom-center',
                        duration: 3000,
                        textColor: '#fff',
                        backgroundColor: '#3696f5'
                    });
                }

                window.location.reload();
            } else {
                Snackbar.show({
                    text: "Un petit problème !",
                    pos: 'bottom-center',
                    duration: 3000,
                    textColor: '#fff',
                    backgroundColor: '#ad344b'
                });
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}