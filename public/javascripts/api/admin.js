const login = () => {
    $("#login-form").on('submit', (e) => {
        e.preventDefault();

        var inputs = e.target.elements,
            objData = {};

        for (let index = 0; index < inputs.length; index++) {
            var name = e.target.elements[index].name;
            objData[name] = e.target.elements[index].value;
        }

        $.ajax({
            url: '/api/admin/login',
            type: 'POST',
            dataType: "json",
            data: objData,
            beforeSend: function () {
                $("#login-button").text("Verification ...");
            },
            success: function (infos) {
                
                $("#login-button").html(`Se connecter <i class="icon-material-outline-arrow-right-alt"></i>`);
                if (infos.getEtat) {

                    window.location.href = "/dashboard";
                    
                } else {
                    Snackbar.show({
                        text: infos.getMessage,
                        pos: 'bottom-center',
                        showAction: true,
                        actionText: "Fermer",
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
    })
}

export { login }